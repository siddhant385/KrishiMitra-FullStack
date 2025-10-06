
import { Camera, Upload, Repeat, Clock, ChevronRight, Zap } from 'lucide-react';
import React, { useRef, useState, useCallback,useEffect } from 'react';
import Webcam from 'react-webcam';
import { useAuth } from "@clerk/clerk-react";
import { detectImage,getHistory } from "../../api/image"

const ImageScanner = () => {


    const webcamRef = useRef(null);
    const { getToken,userId } = useAuth();
    const [scanHistory, setScanHistory] = useState([]);
    const [imgSrc, setImgSrc] = useState(null);
    const [image_captured, setImage_captured] = useState(null); // New variable to store captured image
    const [mirrored, setMirrored] = useState(false);
    const [facingMode, setFacingMode] = useState("environment"); // Track camera facing mode


    const timeAgo = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;

      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHrs = Math.floor(diffMin / 60);
      const diffDays = Math.floor(diffHrs / 24);

      if (diffSec < 60) return `${diffSec} सेकंड पहले`;
      if (diffMin < 60) return `${diffMin} मिनट पहले`;
      if (diffHrs < 24) return `${diffHrs} घंटे पहले`;
      return `${diffDays} दिन पहले`;
    };



    useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = await getToken();
        const history = await getHistory(userId, token);
        setScanHistory(history.data || []);
        console.log(history.data)
      } catch (err) {
        console.error("History fetch error:", err);
      }
    };
    fetchHistory();
      }, [getToken, userId]);


    // Video constraints with dynamic facing mode
    const videoConstraints = {
        width: 200,
        height: 200,
        facingMode: facingMode // Dynamic camera selection
    };

    // Function to switch camera
    const switchCamera = () => {
        setFacingMode(prevMode => prevMode === "environment" ? "user" : "environment");
    };

    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        const file = dataURLtoFile(imageSrc, "capture.jpg"); // convert base64 to file
        setImage_captured(file);
        setSelectedImage(file); // yahi file backend ke liye
        console.log('Image captured file:', file);
    }, [webcamRef]);




    // const capture = useCallback(() => {
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     setImgSrc(imageSrc);
    //     setImage_captured(imageSrc); // Save to image_captured variable
    //     console.log('Image captured and saved to image_captured variable:', imageSrc);
    // }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
        setImage_captured(null); // Clear the captured image variable
    };

    //
    const [selectedImage, setSelectedImage] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file); // <-- yaha file rakhna hai, base64 nahi
            simulateScan(file);     // pass file directly
        }
    };


    const simulateScan = async (file = selectedImage) => {
        if (!(file instanceof File)) {
            console.error("❌ Not a File object:", file);
            return;
          }
        setIsScanning(true);
        try {
            const token = await getToken()
            const response = {response_result: await detectImage(file,token),detected_at: new Date()};
            console.log("Scan result:", response);
            if (response.response_result.status_code === 404){
                alert(response.response_result.detail)
                setIsScanning(false)
                return 
            }
            setScanResult(response.response_result);
            setImgSrc(null);
            setSelectedImage(null);
            setImage_captured(null);
            // 👇 new result ko local state ke top pe add karo
          setScanHistory((prev) => [
            { id: Date.now().toString(), ...response }, // temp id
            ...prev,
          ]);

        } catch (error) {
            console.error("Error during scan:", error);
            console.error("Error status:", error.response.status);
            console.error("Error detail:", error.response.data.detail);

        } finally {
            setIsScanning(false);
        }
    };


    

        // setTimeout(() => {
        //     setIsScanning(false);
        //     setScanResult({
        //         disease: "टमाटर पत्ता",
        //         confidence: "85%",
        //         status: "प्रारंभिक छत्रा रोग",
        //         recommendations: "2 घंटे पहले"
        //     });
        // }, 2000);
    // };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const [ anime, SetAnime ] = useState(0)

    return (
        <div className="sm-max-w-[80%] px-6 py-6 lg:px-44 mx-auto bg-white ">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-green-800 mb-2">फसल स्वास्थ्य स्कैनर</h1>
                <p className="text-gray-600 text-sm">कोट और बीमारियों का पता लगाने के लिए फोटो लें</p>
            </div>

            {/* Camera/Upload Area */}
            <div
                // onClick={triggerFileInput}
                className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-dashed border-green-400 rounded-xl p-3 text-center mb-5 cursor-pointer hover:from-green-100 hover:to-green-200 transition-all duration-300"
            >
                <div>
                    {imgSrc ? (
                        <img
                            src={imgSrc}
                            alt="captured"
                            className="w-full h-auto max-w-lg mx-auto rounded-lg shadow-lg"
                        />
                    ) : (
                        <Webcam
                            height="auto"
                            width="auto"
                            ref={webcamRef}
                            mirrored={mirrored}
                            screenshotFormat="image/jpeg"
                            screenshotQuality={0.8}
                            videoConstraints={videoConstraints}
                            className="mx-auto rounded-lg h-[50vh] w-[90vw]"
                        />
                    )}
                </div>
            </div>

            {/* Camera Button */}
            {imgSrc ? (<div>
                <button
                    onClick={retake}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium mb-4 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                >
                    Retake photo
                </button>
                <button
                    onClick={() => simulateScan(selectedImage)}
                    className="w-full bg-amber-500 text-white py-3 rounded-xl font-medium mb-4 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                >
                    send
                </button>

            </div>
            ) : (<button
                onClick={capture}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-medium mb-4 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
            >
                <Camera className="w-5 h-5" />
                फोटो लें
            </button>)}

            {/* Loader while scanning */}
            {isScanning && (
              <div className="flex items-center justify-center my-4">
                <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></span>
                <span className="ml-2 text-green-700">स्कैन हो रहा है...</span>
              </div>
            )}


            {/* switch camera */}

            <div className='flex gap-2' >
                <button
                    onClick={switchCamera}
                    className="h-auto px-6 py-2 mb-6 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors items-center justify-center"
                >
                    <Repeat className="w-5 h-5" />
                </button>


                {/* Upload Button */}
                <button
                    onClick={triggerFileInput}
                    className="w-full border border-green-600 text-green-600 py-2 rounded-xl font-medium mb-6 flex items-center justify-center gap-2 hover:bg-green-50 transition-colors"
                >
                    <Upload className="w-4 h-4" />
                    गैलरी से अपलोड करें
                </button>
            </div>

            {/* Photo Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-2 mb-2">
                    <Camera className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <h3 className="font-medium text-yellow-800">फोटो टिप्स</h3>
                </div>
                <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• स्पष्ट, अच्छी रोशनी में फोटो लें</li>
                    <li>• प्रभावित पत्तियों या हिस्सों पर फोकस करें</li>
                    <li>• यदि संभव हो तो कई कोणों से फोटो लें</li>
                </ul>
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                capture="environment"
            />

            {/* below section  */}

            {/* Header */}
            <h1 className="text-xl font-semibold text-gray-800 mb-6">हाल की स्कैन</h1>

            {/* Scan Results */}
            <div className="space-y-4">
               {scanHistory.map((scan, idx) => (
        <div
          key={scan.id || idx}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xl">🌱</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{scan.response_result.plant_name}</h3>
                <div className="flex items-center space-x-1 text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{scan.response_result.disease}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {scan.response_result.disease_probability}
              </span>
              <div className="w-10 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">🌱</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                {scan.response_result.severity}
              </span>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <span>{timeAgo(scan.detected_at)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
            </div>

            {/* AI Detection Section */}
            <div className="mt-8 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-800">AI-संचालित पहचान</h3>
                        <p className="text-sm text-gray-600">तुरंत 100+ बीमारियों और कीटों की पहचान करता है</p>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default ImageScanner;
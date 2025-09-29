import React from 'react'
import './Dashboard-styles.css'
import { useUser } from "@clerk/clerk-react";
import { useEffect,useState } from 'react';
import { useSupabaseAuth } from "@/utils/supabase";



const Dashboard = () => {
	const [userData,setUserData] = useState(null)
	const [loading,setLoading] = useState(true);
	  


	// User Contexts
	const { createClientWithToken } = useSupabaseAuth();
	const { user,isLoaded,isSignedIn } = useUser();


	useEffect(()=> {
		if (!isLoaded || !isSignedIn) return;


		const supabaseUser = async() => {
			setLoading(true);
			const supabase = await createClientWithToken(); // ✅ await here
			const { data } = await supabase
	        .from("users")
	        .select("*")
	        .eq("id", user.id)
	        .single();
	        // console.log(data)
	        setUserData(data)
	        // console.log(userData)
	        setLoading(false);

	    }

	    supabaseUser();


	},[isSignedIn, user])

	return (
		<>
			<div className="app-container">

				<main className="app-main">
					<div className="welcome-section">
						<img src={user.imageUrl} alt="किसान अवतार" className="user-avatar" loading="lazy" />
						<h1 className="welcome-title">नमस्ते, {loading ? "User":userData?.name || "User"} !</h1>
						<p className="welcome-subtitle">आज आपकी फसल के लिए क्या योजना है?</p>
					</div>

					<div className="tools-section">
						<div className="section-heading">
							<h2>कृषि उपकरण</h2>
						</div>

						<div className="tools-grid">
							<div className="tool-card soil-health" data-tool="soil-health">
								<div className="tool-icon leaf">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="मृदा स्वास्थ्य आइकन">
										<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
										<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
									</svg>
								</div>
								<div className="tool-title">मृदा स्वास्थ्य</div>
								<div className="tool-description">मिट्टी का विश्लेषण</div>
							</div>

							<div className="tool-card weather" data-tool="weather">
								<div className="tool-icon cloud">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="मौसम आइकन">
										<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
										<path d="M16 14v6" />
										<path d="M8 14v6" />
										<path d="M12 16v6" />
									</svg>
								</div>
								<div className="tool-title">मौसम</div>
								<div className="tool-description">अद्यतन और पूर्वानुमान</div>
							</div>

							<div className="tool-card crop" data-tool="crop">
								<div className="tool-icon camera">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="फसल आइकन">
										<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
										<circle cx="12" cy="13" r="3" />
									</svg>
								</div>
								<div className="tool-title">फसल</div>
								<div className="tool-description">रोग और कीट पहचान</div>
							</div>

							<div className="tool-card market" data-tool="market">
								<div className="tool-icon rupee">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="बाज़ार आइकन">
										<path d="M6 3h12" />
										<path d="M6 8h12" />
										<path d="m6 13 8.5 8" />
										<path d="M6 13h3" />
										<path d="M9 13c6.667 0 6.667-10 0-10" />
									</svg>
								</div>
								<div className="tool-title">बाज़ार</div>
								<div className="tool-description">भाव और लाभ दर</div>
							</div>

							<div className="tool-card voice-chat" data-tool="voice-chat">
								<div className="tool-icon mic">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="वॉइस चैट आइकन">
										<path d="M12 19v3" />
										<path d="M19 10v2a7 7 0 0 1-14 0v-2" />
										<rect x="9" y="2" width="6" height="13" rx="3" />
									</svg>
								</div>
								<div className="tool-title">वॉइस चैट</div>
								<div className="tool-description">विशेषज्ञ से पूछें</div>
							</div>

							<div className="tool-card seeds" data-tool="seeds">
								<div className="tool-icon book">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="सीड्स आइकन">
										<path d="M12 21V7" />
										<path d="m16 12 2 2 4-4" />
										<path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3" />
									</svg>
								</div>
								<div className="tool-title">सीड्स</div>
								<div className="tool-description">बीज और गुणवत्ता</div>
							</div>
						</div>
					</div>

					<div className="learning-section">
						<div className="section-heading">
							<h2>क्विज़</h2>
						</div>

						<div className="progress">
							<div className="text">
								साप्ताहिक प्रगति <br />
								<span>3/5 पूर्ण हुआ</span>
							</div>
							<svg width="80" height="80" viewBox="0 0 100 100" className="circular-progress" aria-label="साप्ताहिक प्रगति: 60% पूर्ण">
								<defs>
									<linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
										<stop offset="0%" style={{ stopColor: "#4CAF50", stopOpacity: 1 }} />
										<stop offset="100%" style={{ stopColor: "#2196F3", stopOpacity: 1 }} />
									</linearGradient>
								</defs>
								<circle className="bg" cx="50" cy="50" r="40" stroke="#ddd" strokeWidth="10"></circle>
								<circle className="fg" cx="50" cy="50" r="40" strokeWidth="10"></circle>
								<text x="45.3" y="40.6" dy="0.1em">60%</text>
							</svg>
						</div>

						<div className="learning-card" data-learning="organic-farming">
							<div className="learning-content-wrapper">
								<div className="learning-icon">🌱</div>
								<div className="learning-content">
									<div className="learning-title">जैविक खेती की मूल बातें</div>
									<div className="learning-meta">
										<span className="learning-time">⏱ 3 min</span>
										<span className="difficulty-badge easy">Easy</span>
										<span className="points-badge">+50 pts</span>
									</div>
								</div>
							</div>
							<div className="learning-arrow">&gt;</div>
						</div>

						<div className="learning-card" data-learning="pest-management">
							<div className="learning-content-wrapper">
								<div className="learning-icon">🦗</div>
								<div className="learning-content">
									<div className="learning-title">कीट प्रबंधन</div>
									<div className="learning-meta">
										<span className="learning-time">⏱ 5 min</span>
										<span className="difficulty-badge medium">Medium</span>
										<span className="points-badge">+80 pts</span>
									</div>
								</div>
							</div>
							<div className="learning-arrow">&gt;</div>
						</div>

						<div className="learning-card monsoon" data-learning="monsoon-farming">
							<div className="learning-content-wrapper">
								<div className="learning-icon purple">🌧️</div>
								<div className="learning-content">
									<div className="learning-title">मानसून खेती</div>
									<div className="learning-meta">
										<span className="learning-time">⏱ 4 min</span>
										<span className="difficulty-badge easy">Easy</span>
										<span className="points-badge">+60 pts</span>
									</div>
								</div>
							</div>
							<div className="learning-arrow">&gt;</div>
						</div>

						<div className="learning-card challenge">
							<div className="learning-content-wrapper">
								<div className="learning-icon orange">🏆</div>
								<div className="learning-content">
									<div className="learning-title">दैनिक चुनौती</div>
									<div className="learning-description">आज के लिए पूरा करें</div>
								</div>
							</div>
							<button className="start-button">Start</button>
						</div>
					</div>

					<div className="section-heading">
						<h2>मौसम</h2>
					</div>

					<div className="weather-card">
						<div className="weather-info">
							<div className="weather-label">आज का मौसम</div>
							<div className="weather-temp">28°C</div>
							<div className="weather-description">
								<span>🌧️</span>
								<span>हल्की बारिश की संभावना</span>
							</div>
						</div>
						<div className="weather-details">
							<div>नमी 12°</div>
							<div>हवा 6 किमी/घंटा</div>
						</div>
					</div>
					<button className="weather-button">7 दिन का पूर्वानुमान देखें</button>

					<div className="tool-content">
						<h2 id="tool-content-title">Tool Title</h2>
						<p id="tool-content-description">Tool Description</p>
						<button className="back-button">वापस</button>
					</div>

					<div id="start-interface" className="start-interface">
						<h2>दैनिक चुनौती शुरू</h2>
						<p>Placeholder for the new start interface (to be replaced with your code).</p>
						<button className="back-button">वापस</button>
					</div>
				</main>
			</div>

		</>
	)
}

export default Dashboard
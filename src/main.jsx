import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "@/components/ui/sonner"
import './index.css'
// import App from './App.jsx'

import { ClerkProvider } from '@clerk/clerk-react'
import { hiIN } from '@clerk/localizations'
import { Routes, Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'
import ProtectedRoute from './ProtectedLayout'
import Home from './components/Home/Home'
import ImageScanner from "./components/ImageScanner/ImageScanner";
import Dashboard from './components/Dashboard/Dashboard'
import Trade from './components/Trade/Trade'
import Chatbot from './components/Chatbot/Chatbot'
import AccessDenied from './components/AccessDenied/AccessDenied'
import { LanguageProvider } from "./contexts/LanguageContext";
import Test from './components/Test/Test'
import Profile from './components/Profile/Profile'
import FarmerErrorPage from './components/Error404/Error404'


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

// const router = createBrowserRouter([
//   createRoutesFromElements(
//     <Route path='/' element={<Layout />}>
//       <Route path='' element={<Home />} />
//     </Route>

//     // {/* Protected Route*/}
//     // <Route element={<ProtectedRoute/>}>
//     //   <Route path='/dashboard' element={<Dashboard/>}/>
//     // </Route>
//     )
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="access-denied" element={<AccessDenied />} />

      <Route path="test" element={<Test />} />
      <Route path="*" element={<FarmerErrorPage />} />

      {/* Protected Route */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/trade" element={<Trade />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/camera" element={<ImageScanner />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider localization={hiIN} publishableKey={PUBLISHABLE_KEY}>
      <LanguageProvider>
        <Toaster richColors position="top-center" />
        <RouterProvider router={router} />
      </LanguageProvider>
    </ClerkProvider>

  </StrictMode>,
)

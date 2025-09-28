import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'

import { ClerkProvider } from '@clerk/clerk-react'
import {hiIN} from '@clerk/localizations'
import {Routes,Route, createBrowserRouter, RouterProvider,createRoutesFromElements } from 'react-router-dom' 
import Layout from './Layout'
import ProtectedRoute from './ProtectedLayout'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import AccessDenied from './components/AccessDenied/AccessDenied'


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
      <Route index element={<Home />} />
      <Route path="access-denied" element={<AccessDenied/>}/>
      
      {/* Protected Route */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider localization={hiIN} publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router}/>
    </ClerkProvider>
    
  </StrictMode>,
)

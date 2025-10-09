import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
	return (
		<>
		<Header/>
		
		<Outlet />
		<div className='bottom-0 text-black'>
			
		<Footer/>
		</div>
		</>
	)
}

export default Layout
// import { Outlet } from 'react-router-dom';

// function Layout() {
//   return (
//     <div>
//       <h1>This is the Layout</h1>
//       <Outlet />
//     </div>
//   );
// }
// export default Layout;
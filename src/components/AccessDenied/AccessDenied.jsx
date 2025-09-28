import React from 'react'
import {Link} from 'react-router-dom'
const AccessDenied = () => {
	return (
		<div>
			<p>You have to login to access this page. Access is Denied</p>
			<Link to="/" className='text-center bg-red-500'>
				Home
			</Link>
		</div>
	)
}

export default AccessDenied
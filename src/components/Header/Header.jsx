import React from 'react'
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'
import Navbar from './Navbar'

const Header = () => {
	return (
		<div>
			 {/* <header className="flex items-center justify-center py-8 px-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header> */}
      <Navbar/>
		</div>
	)
}

export default Header
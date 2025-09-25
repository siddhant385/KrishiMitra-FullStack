import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import {hiIN} from '@clerk/localizations'

function App() {

  return (
    <header>
      <SignedOut localization={hiIN}>
        <SignInButton localization={hiIN}/>
      </SignedOut>
      <SignedIn localization={hiIN}>
        <UserButton localization={hiIN} />
      </SignedIn>
    </header>

  )
}

export default App

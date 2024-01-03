import Logo from '../assets/logo.svg?react'
import './Navbar.css'

function Maintop() {
  return (
    <>
      <nav className="top">
        <div className="header-logowrap">
          <Logo className="App-logo"/>
        </div>
        <div className="navbar-brand">
          Rovers - Game
        </div>
      </nav>
    </>
  )
}

export default Maintop

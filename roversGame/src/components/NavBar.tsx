import Logo from '../assets/logo.svg?react'
import './Navbar.css'

const ElementsBar = () => (
  <div className="navbar-nav me-auto">
    <ul className='navbar ul'>
      <li className="nav-item">
        <a href="/" className="nav-link elements">Home</a>
      </li>
      <li className="nav-item">
        <a href="/many" className="nav-link elements">Many</a>
      </li>
    </ul>
  </div>
)

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
        <ElementsBar/>
      </nav>
    </>
  )
}

export default Maintop

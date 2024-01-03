import Logo from '../assets/logo.svg?react'
import './Navbar.css'

const ElementsBar = () => (
  <div className="navbar-nav me-auto">
    <ul className='navbar ul'>
      <li className="nav-item">
        <a href="/" className="nav-link elements">Home</a>
      </li>
      <li className="nav-item">
        <a href="/about" className="nav-link elements">About</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Projects
        </a>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="/calculator">Calculator</a></li>
          <li><a className="dropdown-item" href="/Multi">MultiApp</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="#action5">Coming soon</a></li>
        </ul>
      </li>
    </ul>
  </div>
)

function Maintop() {
  return (
    <>
      <nav className="prueba">
        <div className="header-logowrap">
          <Logo className="App-logo"/>
        </div>
        <div className="navbar-brand">
          Omar Oporto Bernal
        </div>
        <ElementsBar/>
      </nav>
    </>
  )
}

export default Maintop

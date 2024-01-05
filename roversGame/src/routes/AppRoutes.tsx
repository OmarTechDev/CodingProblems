import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage, Many} from './Pages'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/many/" element={<Many />}></Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes

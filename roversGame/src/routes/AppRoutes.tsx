import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage} from './Pages'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes

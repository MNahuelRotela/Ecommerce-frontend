import './App.css'
import { Routes, Route } from 'react-router-dom'
// import ProductComponent from './components/ProductComponent.jsx'
import Store from './views/Store'
import Detail from './views/Detail'
import NavBar from './components/NavBar/NavBar'
// import Filtersa from './components/Filter/filterOptions'
import Filters from './components/Filter/filterCard'






function App() {

  return (
    <div className="App">
        
        <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/home/:productId" element={<Detail />} />
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/filter" element={<Filters />} />
        
        
        </Routes>

    </div>
  )
}

export default App
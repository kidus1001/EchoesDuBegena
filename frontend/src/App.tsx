import { Routes, Route } from 'react-router-dom'

import { Footer } from "./components/layout/Footer"
import { Header } from "./components/layout/Header" 
import Home from './pages/Home'
import Recordings from './pages/Recordings'
import About from './pages/About'

import './index.css'

function App() {
  return (
    <>
      <Header />
      <main> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/recordings' element={<Recordings/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

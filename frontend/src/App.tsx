import { Routes, Route } from 'react-router-dom'

import { Footer } from "./components/layout/Footer"
import { Header } from "./components/layout/Header" 
import Home from './pages/Home'
import Album from './pages/Albums'
import Recordings from './pages/Recordings'
import Gallery from './pages/Gallery'
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
          <Route path='/albums' element={<Album/>}/>
          <Route path='/gallery' element={<Gallery/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

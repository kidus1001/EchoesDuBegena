import { Routes, Route } from 'react-router-dom'

import { Footer } from "./components/layout/Footer"
import { Header } from "./components/layout/Header" 
import Home from './pages/Home'
import './index.css'

function App() {
  return (
    <>
      <Header />
      <main> 
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

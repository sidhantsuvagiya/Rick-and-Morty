import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { Home } from './pages/Home'
import CharacterDetails from './pages/CharacterDetails'
import NotFound from './pages/NotFound'
import { LocationPage } from './pages/LocationPage'

function App() {

  return (
    <BrowserRouter>
      <div className='font-inter'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/location' element={<LocationPage />} />
          <Route path="/character/:characterId" element={<CharacterDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

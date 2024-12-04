import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Watch } from './pages/Watch'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/watch/:id' element={<Watch />} />
      </Routes>
    </BrowserRouter>
  )
}

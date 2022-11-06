import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home/Home'
import Create from './pages/Create/Create'
import Recipe from './pages/Recipe/Recipe'
import Search from './pages/Search/Search'

import './App.css'
import Navbar from './components/Navbar/Navbar'
import ThemeSelector from './components/ThemeSelector/ThemeSelector'
import { useTheme } from './hooks/useTheme'

function App() {
  const { mode } = useTheme()

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route path='/recipes/:id' element={<Recipe />}></Route>
          <Route path='/search' element={<Search />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

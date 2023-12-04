import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductsContextProvider } from '../ProductsContext'

import Home from './pages/Home'
import Menu from './pages/Menu'
import NoMatch from './pages/NoMatch'
import MenuCoffee from './pages/MenuCoffee'
import MenuCake from './pages/MenuCake'
import MenuLunch from './pages/MenuLunch'
import MenuDrink from './pages/MenuDrink'
import Admin from './pages/Admin'

function App() {
    return (
        <BrowserRouter>
            <ProductsContextProvider>
                <Routes>
                    <Route path="/" element={<Home />}></Route>

                    <Route path="/Admin" element={<Admin />}></Route>
                    <Route path="/Menu" element={<Menu />}></Route>
                    <Route path="/MenuCoffee" element={<MenuCoffee />}></Route>
                    <Route path="/MenuCake" element={<MenuCake />}></Route>
                    <Route path="/MenuLunch" element={<MenuLunch />}></Route>
                    <Route path="/MenuDrink" element={<MenuDrink />}></Route>
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </ProductsContextProvider>
        </BrowserRouter>
    )
}
export default App

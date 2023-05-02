import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Container} from "react-bootstrap"
import Homepage from "./pages/Homepage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ProductScreen from "./pages/ProductSreen"

import CartScreen from "./pages/CartScreen"
import ProfilScreens from "./pages/ProfilScreens"
import PrivateRouter from "./components/ProtectRouter"
import ShippingScrens from "./pages/ShippingScrens"

function App() {


  return (
    <>
    <Header />
     <Container>
      <main>
        <Router>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product/:id" element={<ProductScreen/>} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/profile" element={<PrivateRouter />}>
                <Route path="/profile" element={<ProfilScreens />} />
            </Route>
            <Route path="/shipping" element={<PrivateRouter />}>
              <Route path="/shipping" element={<ShippingScrens />} />
            </Route>
          </Routes>
        </Router>
      </main>
     </Container>
     <Footer />
    </>
  )
}

export default App

import './App.css'
import Products from './Pages/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddProduct from './Pages/AddProduct'
import EditProductPage from './Pages/EditProductPage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'
import { Users } from './Pages/Users'
import LandingPage from './Pages/LandingPage'
import Detail from './components/Detail/Detail'

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/users' element={
      <PrivateRoute isAuthenticated={true}>
        <Users/>
      </PrivateRoute>
    } isPrivate:true/>
    <Route path='/add-product' element={
      <PrivateRoute isAuthenticated={true}>
        <AddProduct/>
      </PrivateRoute>
    } isPrivate:true/>
    <Route path='/' element={
      <PrivateRoute isAuthenticated={true}>
        <Products/>
      </PrivateRoute>
    } isPrivate:false/>
    <Route path='/login' element={<Login/>} isPrivate:false/>
    <Route path='/register' element={
      <PrivateRoute isAuthenticated={true}>
        <Register/>
      </PrivateRoute>
    } isPrivate:false/>
    <Route path='/edit-product/:id' element={
      <PrivateRoute isAuthenticated={true}>
        <EditProductPage/>
      </PrivateRoute>
    } isPrivate:true/>
    <Route path='/landing' element={
      <PrivateRoute isAuthenticated={true}>
        <LandingPage/>
      </PrivateRoute>
    } isPrivate:true/>
    <Route path='/detail/:id' element={
      <PrivateRoute isAuthenticated={true}>
        <Detail/>
      </PrivateRoute>
    } isPrivate:true/>
   </Routes>
   </BrowserRouter>

  )
}

export default App

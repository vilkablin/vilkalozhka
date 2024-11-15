import { useState } from 'react'
import HomePage from './pages/HomePage'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import RecipePage from './pages/RecipePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import  './styles/index.scss'
import ProfilePage from './pages/ProfilePage'
// import AddRecipe from './pages/AddRecipe'
import RecipesPage from './pages/RecipesPage'
import SubscribesPage from './pages/SubscribesPage'
import FavouritesPage from './pages/FavouritesPage'
import EditProfilePage from './pages/EditProfile'
import AdminPanelPage from './pages/AdminPanelPage'
import Exit from './components/Exit/Exit'
import  {AuthProvider}  from './context/AuthContext'

function App() {

  return (
    <AuthProvider>
    <Header/>
    <Routes>
      <Route path="/" element= {<HomePage/>}/>
      <Route path="/product" element= {<RecipePage/>}/>
      <Route path="/signin" element= {<LoginPage/>}/>
      <Route path="/exit" element={<Exit/>} />
      <Route path="/signup" element= {<SignupPage/>}/>
      <Route path="/profile" element= {<ProfilePage/>}/>
      {/* <Route path='/add-recipe' element={<AddRecipe/>} /> */}
      <Route path='/recipes' element={<RecipesPage/>} />
      <Route path='/subscribes' element={<SubscribesPage/>} />
      <Route path='/favourites' element={<FavouritesPage/>} />
      <Route path='/editProfile' element={<EditProfilePage/>} />
    <Route path='/admin' element={<AdminPanelPage/>} />
      </Routes>
    <Footer/>
    </AuthProvider>
    
  )
}

export default App;

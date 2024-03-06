  import {useDispatch} from 'react-redux';
import React, { useEffect } from 'react';
import { useState } from 'react'
import authService from "./appwrite/auth"
import {login,logout} from './store/authSlice'
import './App.css'
import {Header, Footer} from './components';
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch=useDispatch();


  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])


  return !loading ? (
    <div className='max-h-screen flex flex-wrap
    content-between bg-slate-100'>
      <div className='w-full block'>
       <Header/>
       <main>
       <Outlet/>
       </main>
       <Footer/>
      </div>
    </div>
  ): null
}

export default App

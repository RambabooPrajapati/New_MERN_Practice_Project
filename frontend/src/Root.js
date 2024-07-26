import React from 'react'
import Header from './conponents/Header'
import Footer from  './conponents/Footer'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Root

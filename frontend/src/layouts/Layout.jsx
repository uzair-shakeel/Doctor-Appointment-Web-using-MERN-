import React from 'react'
import Routers from '../routes/Routers'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'



const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
Layout
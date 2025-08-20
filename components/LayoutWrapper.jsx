import React from 'react'
import Header from '@/components/Header/header'
import Footer from '@/components/Footer/footer'

const LayoutWrapper = ({children}) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default LayoutWrapper
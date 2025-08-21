import React from 'react'
import Header from '@/components/Header/header'
import Footer from '@/components/Footer/footer'

const LayoutWrapper = ({children}) => {
  return (
    <div className='w-full'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default LayoutWrapper
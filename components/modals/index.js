import React from 'react'

const ModalWrapper = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative flex max-w-[689px] w-full p-[40px_45px] flex-col items-start gap-2 rounded-[18px] bg-white/90 backdrop-blur-[18px] shadow-[0_4px_44px_0_rgba(64,165,165,0.17)]">
          {children}
      </div>
    </div>
  )
}

export default ModalWrapper
import { useState, useEffect } from 'react'
import { CURSOR_STATUS, BUTTON_LABEL } from './constants'
import './App.css'

function App() {

  const [status, setStatus] = useState(CURSOR_STATUS.NORMAL)
  const [smartCursor, setSmartCursor] = useState({ clientX: 0, clientY: 0 })

  const handleMove = (event) => {
    const { clientX, clientY } = event
    setSmartCursor({ clientX, clientY })
  }

  useEffect(() => {
    if (status === CURSOR_STATUS.SMART) {
      window.addEventListener('pointermove', handleMove, true)

    } 
    return () => {
      if (status === CURSOR_STATUS.SMART) {
        window.removeEventListener('pointermove', handleMove, true)
      }
    }
  }, [status])

  const handleBtnClick = () => {
    setStatus(
      currentStatus => 
        currentStatus === CURSOR_STATUS.NORMAL 
          ? CURSOR_STATUS.SMART 
          : CURSOR_STATUS.NORMAL
    )
  }

  return (
    <>
      {status === CURSOR_STATUS.SMART && (
        <div 
          className='smart-cursor' 
          style={{ 
            left: smartCursor?.clientX - 24, 
            top: smartCursor?.clientY - 24,
          }} 
        />
      )}
      <button 
        className='toggle-button' 
        onClick={ handleBtnClick }
      >
        { BUTTON_LABEL[status] }
      </button>
    </>
  )
}

export default App

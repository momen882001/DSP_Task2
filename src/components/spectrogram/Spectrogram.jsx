import React, { useState } from 'react'
import './Spectrogram.css'

function Spectrogram() {

    const [showSpectrogram , setShowSpectrogram] = useState(false)
    const [spec , setSpec] = useState('http://localhost:8080/static/original.png')

    const handleClick = () => {
       setShowSpectrogram(!showSpectrogram)
       setSpec('')
       setSpec('http://localhost:8080/static/original.png')
    }


  return (
    <div>
        <button onClick={handleClick} className="spectrogram-btn">Spectrogram</button>
        {showSpectrogram ? <img src={spec} alt="not reloaded" /> : null }
    </div>
  )
}

export default Spectrogram
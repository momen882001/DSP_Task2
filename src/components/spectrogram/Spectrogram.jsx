import React, { useState } from 'react'
import './Spectrogram.css'

function Spectrogram() {

    const [showSpectrogram , setShowSpectrogram] = useState(false)
    const handleClick = () => {
       setShowSpectrogram(!showSpectrogram)
    }
    

  return (
    <div>
        <button onClick={handleClick} className="spectrogram-btn">Spectrogram</button>
        {showSpectrogram ? <p>Mo'men</p> : <p>Mohamed</p>}
    </div>
  )
}

export default Spectrogram
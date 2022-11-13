import React, { useState } from 'react'
import './Spectrogram.css'
import axios from 'axios'

function Spectrogram() {

    const [showSpectrogram , setShowSpectrogram] = useState(false)
    const handleClick = () => {
       setShowSpectrogram(!showSpectrogram)
       axios.get(''
       ).then((response) => {
        console.log(response)
       }).catch((err) => {
        console.log(err)
       })
    }


    

  return (
    <div>
        <button onClick={handleClick} className="spectrogram-btn">Spectrogram</button>
        {showSpectrogram ? <p>Mo'men</p> : <p>Mohamed</p>}
    </div>
  )
}

export default Spectrogram
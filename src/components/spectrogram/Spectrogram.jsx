import React, { useContext, useState } from 'react'
import { FileContext } from '../../contexts/fileContext';
import axios from 'axios';
import './Spectrogram.css'
import Sliders from '../Sliders/Sliders';


function Spectrogram() {

    const {spec , setSpec}=useContext(FileContext)

    const [showspec,setShowSpec] = useState(false)

    const handleClick = () => {
      setShowSpec(!showspec)
   
      axios.get('http://localhost:8080/static/original.png').then((response) => {
        setSpec('')
        setSpec('http://localhost:8080/static/original.png')
       }).catch((err) => {
        console.log(err)
       })
    }
    

  return (
    <div className='spec-cont'>
      <section className='sliders-section'>
      <Sliders/>
      </section>
      <section className='spectro-section'>
      <button className='spectrogram-btn' onClick={handleClick}>Spectrogram</button>
      {showspec ? <img src={spec} alt="" /> : null}
      </section>
    </div>
  )
}

export default Spectrogram
import React, { useContext, useState } from 'react'
import { FileContext } from '../../contexts/fileContext';
import axios from 'axios';
import './Spectrogram.css'

function Spectrogram() {

    const {spec , setSpec}=useContext(FileContext)
    

  return (
    <div>
       <img src={spec} alt="" />
    </div>
  )
}

export default Spectrogram
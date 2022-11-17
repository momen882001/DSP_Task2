import React, { useContext, useState } from 'react'
import { FileContext } from '../../contexts/fileContext';
import axios from 'axios';
import './Spectrogram.css'
import Sliders from '../Sliders/Sliders';

function Spectrogram() {

    const {spec , setSpec}=useContext(FileContext)
    

  return (
    <div className='spec-cont'>
      <section>
      <div>hi</div>

      </section>
      <section>
      <Sliders/>
      </section>
    </div>
  )
}

export default Spectrogram
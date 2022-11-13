import React, { useState ,useEffect,useContext } from 'react'
import { FileContext } from '../../contexts/fileContext';
import { mode1_Sliders, mode2_Sliders,mode3_sliders } from '../../constants';
import './sliders.css'
import Modes from '../Modes/Modes';
import axios from 'axios'

function Sliders() {
	const { modesIndex, setModesIndex ,slidersList,setSlidersList,fileUpdated, setFileUpdated} = useContext(FileContext);



  useEffect(() => {
    if(modesIndex===0){
      setSlidersList(mode1_Sliders);
    }else  if(modesIndex===1){
      setSlidersList(mode2_Sliders);
    }else  if(modesIndex===2){
      setSlidersList(mode3_sliders);
    }
  }, [modesIndex])

  useEffect(() => {
    if(modesIndex===0){
     mode2_Sliders.map((mode) => {
      mode.value=250
     })
     mode3_sliders.map((mode) => {
      mode.value=250
     })
    }else if(modesIndex===1) {
      mode1_Sliders.map((mode) => {
        mode.value=250
       })
      mode3_sliders.map((mode) => {
        mode.value=250
       })
    }else if(modesIndex===2) {
      mode1_Sliders.map((mode) => {
        mode.value=250
       })
      mode2_Sliders.map((mode) => {
        mode.value=250
       })
    }
  }, [modesIndex])
  

  const on_change_slider = (event, index) => {
    const newSliderList = [...slidersList];
    newSliderList[index].value = event.target.value;
    setSlidersList(newSliderList);
  };

 const get_values = () => {
  const values = []
  slidersList.map((slider) => {
    values.push(slider.value)
    values.push(modesIndex)
  })
  return values;
 }
  

  const handleSubmit = () => {
    const formData = new FormData();
		formData.append("array" , get_values() )
    axios.post('http://localhost:8080/sliders',
    formData
    ).then((response) => {
      console.log(response)
      setFileUpdated('http://localhost:8080/static/modified.mp3')
    }).catch((err) => {
      console.log(err)
    })
  }
  console.log(slidersList)

  return (
    <div className='sliders-modes-container'>
      <Modes/>
      <div className="sliders-container">
    {slidersList.map((element, index) => {
      return (
        <div className='momen' >
          <label className='slider-label'>{modesIndex === 0 ? element.value : modesIndex === 1 || modesIndex === 2 ? element.label : null}</label>
        <input
            type={"range"}
            id={element.id}
            min={element.min}
            max={element.max}
            step={element.step}
            value={element.value}
            className='slider-modes'
            onChange={(event) => on_change_slider(event, index)}
        ></input>
        </div>
      );
    })}
    </div>
    <button onClick={handleSubmit} className='play-btn'>Play</button>
  </div>
  )
}

export default Sliders
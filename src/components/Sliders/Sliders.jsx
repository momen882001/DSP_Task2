import React, { useState ,useEffect,useContext } from 'react'
import { FileContext } from '../../contexts/fileContext';
import { mode1_Sliders, mode2_Sliders,mode3_sliders } from '../../constants';
import './sliders.css'
import Modes from '../Modes/Modes';

function Sliders() {
  // const [mode_1,setMode_1] = useState([]);
	const { modesIndex, setModesIndex ,slidersList,setSlidersList} = useContext(FileContext);


  useEffect(() => {
    if(modesIndex===0){
      setSlidersList(mode1_Sliders);
    }else  if(modesIndex===1){
      setSlidersList(mode2_Sliders);
    }else  if(modesIndex===2){
      setSlidersList(mode3_sliders);
    }
  }, [modesIndex])
  

  const on_change_slider = (event, index) => {
    const newSliderList = [...slidersList];
    newSliderList[index].value = event.target.value;
    setSlidersList(newSliderList);
  };

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
  </div>
  )
}

export default Sliders
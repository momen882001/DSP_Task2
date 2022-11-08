import React, { useState ,useEffect } from 'react'

function Sliders() {
  const [mode_1,setMode_1] = useState([]);

  useEffect(() => {
    setMode_1(mode1_Sliders);
  }, [])
  
  const mode1_Sliders = [
    {
      "id":0,
      "min":0,
      "max":500,
      "step":1,
      "value":250
    },
    {
      "id":1,
      "min":0,
      "max":500,
      "step":1,
      "value":250
    },
    {
      "id":2,
      "min":0,
      "max":500,
      "step":1,
      "value":250
    },
    {
      "id":3,
      "min":0,
      "max":500,
      "step":1,
      "value":250
    },
    {
      "id":4,
      "min":0,
      "max":500,
      "step":1,
      "value":250
    }
  ]

  const on_change_slider = (event, index) => {
    const newSliderList = [...mode_1];
    newSliderList[index].value = event.target.value;
    setMode_1(newSliderList);
  };

  return (
    <div>
    {mode_1.map((element, index) => {
      return (
        <div>
          <input
            type={"range"}
            id={element.id}
            min={element.min}
            max={element.max}
            step={element.step}
            value={element.value}
            onChange={(event) => on_change_slider(event, index)}
          ></input>
          {element.value}
        </div>
      );
    })}
  </div>
  )
}

export default Sliders
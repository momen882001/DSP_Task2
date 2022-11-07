# DSP_Task2

<!-- import React, { useRef, useState } from 'react'

function Sliders() {
  const [mode_1,setMode_1] = useState(mode1);
  const mode1 = [
    {
      "min":0,
      "max":200,
      "step":1,
      "value": 50
    },
    {
      "min":0,
      "max":400,
      "step":20,
      "value": 30
    }
  ]
  const arr1 = mode1.map((mode,index) => {
    const handleChange = (index,e) => {
      setMode_1(mode.value)
    }
    return(
      <label key={index}>
        <input type="range" name="range" min={mode.min} max={mode.max} step={mode.step} value={mode.value} onChange={handleChange(index)} />
        {mode.value}
      </label>
    )
  })

  return (
    <div>
  {arr1}      
    </div>
  )
}

export default Sliders -->
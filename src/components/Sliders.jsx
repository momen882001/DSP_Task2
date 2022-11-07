import React, { useState } from 'react'

function Sliders() {
  const [slider,setSlider] = useState(50);
  const mode1 = [
    {
      "min":0,
      "max":200,
      "step":1
    },
    {
      "min":0,
      "max":400,
      "step":20
    }
  ]
  const arr1 = mode1.map((mode,index) => {
    return(
      <label key={index}>
        <input type="range" name="range" min={mode.min} max={mode.max} step={mode.step} value={slider} onChange={(e) => setSlider(e.target.value)} />
        {slider}
      </label>
    )
  })

  return (
    <div>
  {arr1}      
    </div>
  )
}

export default Sliders
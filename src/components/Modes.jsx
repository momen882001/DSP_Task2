import React from 'react'

function Modes() {
    const modes = ["mode1" , "mode2", "mode3", "mode4", "mode5"]
    const mode = modes.map((mode,index) => {
        return (
                <label key={index}>
                <input type="radio" name='radio' />
                {mode}
            </label>
        )
    })
  return (
    <div>{mode}</div>
  )
}

export default Modes
import React, { useContext } from 'react'
import { FileContext } from '../../contexts/fileContext';
import './modes.css'


function Modes() {
  const { setModesIndex, } = useContext(FileContext);
  const modesList = [
    {
      id: 0,
      label: "Frequency Bands",
      isChecked: true,
    },
    {
      id: 1,
      label: "Music",
      isChecked: false,
    },
    {
      id: 2,
      label: "Vowels",
      isChecked: false,
    }
  ]

  return (
    <>
      {modesList.map((mode, index) => {
        return (
          <label key={index}>
            <input type="radio" name='radio' defaultChecked={mode.isChecked} onClick={() => {
              setModesIndex(mode.id)
            }} />
            {mode.label}
          </label>
        )
      })}
    </>
  )
}

export default Modes
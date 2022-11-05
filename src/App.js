import { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {

  const [slider,setSlider] = useState(30);
  let formData = new FormData();

  const onfileChange = (e) => {
     console.log(e.target.files[0] , "taaaaaaaaaaaaaaaaaaaamer")
     if(e.target && e.target.files[0]) {
      formData.append("file" , e.target.files[0])
     }
     axios.post('http://127.0.0.1:8080/upload',{
      formData
    }).then((response) => {
     console.log(response)
    }).catch((err) => {
     console.log(err)
    })
  } 

  return (
    <div className="App">

      
        <div>
          <label>Select file</label>
          <input type="file" name="file" onChange={onfileChange}/>
        </div>      

      <div class="slider">
        <input type="range" min={0} max={200} value={slider} step={1} onChange={(e) => setSlider(e.target.value)} />
        <p>{slider}</p>
      </div>
    </div>
  );
}

export default App;

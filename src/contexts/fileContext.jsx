import React, { createContext, useState } from 'react';
import { mode1_Sliders } from '../constants';
const FileContext = createContext();

const FileContextProvider = ({ children }) => {
	const [fileURL, setFileURL] = useState('');
	const [fileUpdated, setFileUpdated] = useState('');
	const [modesIndex, setModesIndex] = useState(0);
	const [slidersList,setSlidersList] =useState(mode1_Sliders)
	return (
		<FileContext.Provider value={{ fileURL, setFileURL,fileUpdated,setFileUpdated ,modesIndex,setModesIndex,slidersList,setSlidersList}}>
			{children}
		</FileContext.Provider>
	);
};

export { FileContext, FileContextProvider };

import React, { useState, useEffect, useRef, useContext } from 'react';
import { FileContext } from '../../contexts/fileContext';
import axios from 'axios'
import './upload.css'

const UploadAudio = ({}) => {
	const inputFile = useRef(null);
	const { fileURL, setFileURL , version , setVersion } = useContext(FileContext);
	const [file, setFile] = useState(null);

	useEffect(() => {
		if (file) {
			setFileURL(file);
		}
	}, [file, setFileURL]);

	const handleButtonClick = () => {
		inputFile.current.click();
	};

	const handleFileUpload = (e) => {
		setFile(URL.createObjectURL(e.target.files[0]));
		const formData = new FormData();
		formData.append("file" , e.target.files[0])
		console.log(formData)
		axios.post('http://127.0.0.1:8080/upload',
			formData
		  ).then((response) => {
		   console.log(response)
		  }).catch((err) => {
		   console.log(err)
		  })

	};

	return (
		<div className='upload-audio'>
			<button className='upload-btn' onClick={handleButtonClick}>
				Upload
			</button>
			<input
				type='file'
				id='file'
				ref={inputFile}
				style={{ display: 'none' }}
				accept='audio/*'
				onChange={handleFileUpload}
			/>
		</div>
	);
};

export default UploadAudio;

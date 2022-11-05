import React, { useState, useEffect, useRef, useContext } from 'react';
import { FileContext } from '../contexts/fileContext';
import axios from 'axios'

const UploadAudio = ({  }) => {
	const inputFile = useRef(null);
	const { fileURL, setFileURL } = useContext(FileContext);
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
		// console.log(file);
		setFile(URL.createObjectURL(e.target.files[0]));
		const formData = new FormData();
		formData.append("file" , e.target.files[0])
		axios.post('http://127.0.0.1:8080/upload',{
			formData
		  }).then((response) => {
		   console.log(response)
		  }).catch((err) => {
		   console.log(err)
		  })

	};

	return (
		<div className='upload-audio'>
			<h1>Upload your audio file here</h1>
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

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FileContextProvider } from './contexts/fileContext';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<React.StrictMode>
		<FileContextProvider>
			<App />
		</FileContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);



import React from 'react';
import UploadAudio from '../components/UploadAudio';
import AudioWaveform from '../components/AudioWaveform'
import Modes from '../components/Modes';
import Sliders from '../components/Sliders';

const HomePage = ({ history }) => {
	return (
		<>
			<UploadAudio history={history} />
			<br />
			<AudioWaveform />
			<Modes/>
			<br />
			<Sliders/>
		</>
	);
};

export default HomePage;

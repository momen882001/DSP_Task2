import React from 'react';
import UploadAudio from '../components/upload/UploadAudio';
import AudioWaveform from '../components/Wave/AudioWaveform'
import Modes from '../components/Modes/Modes';
import Sliders from '../components/Sliders/Sliders';

const HomePage = ({ history }) => {
	return (
		<>
			<br />
			<UploadAudio history={history} />
			<AudioWaveform />
			<Modes/>
			<br />
			<Sliders/>
		</>
	);
};

export default HomePage;

import React from 'react';
import Spectrogram from '../components/spectrogram/Spectrogram';
import UploadAudio from '../components/upload/UploadAudio';
import AudioWaveform from '../components/Wave/AudioWaveform'
// import Sliders from '../components/Sliders/Sliders';

const HomePage = ({ history }) => {
	return (
		<>
			<UploadAudio history={history} />
			<AudioWaveform />
			<Spectrogram/>
		</>
	);
};

export default HomePage;

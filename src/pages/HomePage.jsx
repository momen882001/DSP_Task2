import React from 'react';
// import Sliders from '../components/Sliders/Sliders';
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
			{/* <Sliders/> */}
		</>
	);
};

export default HomePage;

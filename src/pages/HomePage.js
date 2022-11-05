import React from 'react';
import UploadAudio from '../components/UploadAudio';
import AudioWaveform from '../components/AudioWaveform'

const HomePage = ({ history }) => {
	return (
		<div>
			<UploadAudio history={history} />
			<br />
			<AudioWaveform />
		</div>
	);
};

export default HomePage;

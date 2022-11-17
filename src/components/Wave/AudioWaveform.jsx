import React, { useState, useEffect, useContext, useRef } from 'react';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import { FileContext } from '../../contexts/fileContext';
import wavesurfer from 'wavesurfer.js';
import Sliders from '../Sliders/Sliders';
import './wave.css'

const AudioWaveform = () => {
	const wavesurferRef = useRef(null);
	const timelineRef = useRef(null);

	// fetch file url from the context
	const { fileURL, setFileURL , fileUpdated, setFileUpdated } = useContext(FileContext);

	// crate an instance of the wavesurfer
	const [wavesurferObj, setWavesurferObj] = useState();
	const [wavesurferObjUpdated, setWavesurferObjUpdated] = useState();

	const [playing, setPlaying] = useState(true); // to keep track whether audio is currently playing or not
	// const [playing2, setPlaying2] = useState(true); // to keep track whether audio is currently playing or not
	const [volume, setVolume] = useState(1); // to control volume level of the audio. 0-mute, 1-max
	const [volume2, setVolume2] = useState(0); // to control volume level of the audio. 0-mute, 1-max
	const [zoom, setZoom] = useState(5000); // to control the zoom level of the waveform
	const [speed, setSpeed] = useState(1); // to control the speed level of the waveform

	// create the waveform inside the correct component
	useEffect(() => {
		if (wavesurferRef.current && !wavesurferObj) {
			setWavesurferObj(
				wavesurfer.create({
					container: '#waveform',
					scrollParent: true,
					autoCenter: true,
					cursorColor: 'blue',
					loopSelection: true,
					waveColor: '#211027',
					progressColor: '#5ca1e1',
					responsive: true,
					plugins: [
						TimelinePlugin.create({
							container: '#wave-timeline',
						}),
						RegionsPlugin.create({}),
					],
				})
			);
		}
	}, [wavesurferRef, wavesurferObj]);

	// create the waveform updated inside the correct component
	useEffect(() => {
		if (wavesurferRef.current && !wavesurferObjUpdated) {
			setWavesurferObjUpdated(
				wavesurfer.create({
					container: '#waveformUpdated',
					scrollParent: true,
					autoCenter: true,
					cursorColor: 'blue',
					loopSelection: true,
					waveColor: '#211027',
					progressColor: '#5ca1e1',
					responsive: true,
					plugins: [
						TimelinePlugin.create({
							container: '#wave-timeline',
						}),
						RegionsPlugin.create({}),
					],
				})
			);
		}
	}, [wavesurferRef, wavesurferObjUpdated]);

	// once the file URL is ready, load the file to produce the waveform
	useEffect(() => {
		if (fileURL && wavesurferObj) {
			wavesurferObj.load(fileURL);
		}
	}, [fileURL, wavesurferObj]);

	// once the file URL is ready, load the file updated to produce the waveform
	useEffect(() => {
		if (fileUpdated && wavesurferObjUpdated) {
			wavesurferObjUpdated.load(fileUpdated);
			wavesurferObj.stop();
			wavesurferObj.play();
		}
	}, [fileUpdated , wavesurferObjUpdated , wavesurferObj]);

	

	useEffect(() => {
		if (wavesurferObj && wavesurferObjUpdated) {
			// once the waveform is ready, play the audio
			wavesurferObj.on('ready', () => {
				wavesurferObj.play();
			});

			// once the waveform updated is ready, play the audio
			wavesurferObjUpdated.on('ready', () => {
				wavesurferObjUpdated.play();
			});

			// once audio starts playing, set the state variable to true
			wavesurferObj.on('play', () => {
				setPlaying(true);
			});

			// once audio updated starts playing, set the state variable to true
			wavesurferObjUpdated.on('play', () => {
				setPlaying(true);
			});

			// once audio starts playing, set the state variable to false
			wavesurferObj.on('finish', () => {
				setPlaying(false);
			});

			// once audio updated starts playing, set the state variable to false
			wavesurferObjUpdated.on('finish', () => {
				setPlaying(false);
			});

			// if multiple regions are created, then remove all the previous regions so that only 1 is present at any given time
			wavesurferObj.on('region-updated', (region) => {
				const regions = region.wavesurfer.regions.list;
				const keys = Object.keys(regions);
				if (keys.length > 1) {
					regions[keys[0]].remove();
				}
			});

			// if multiple regions are created, then remove all the previous regions so that only 1 is present at any given time (updated file)
			wavesurferObjUpdated.on('region-updated', (region) => {
				const regions = region.wavesurfer.regions.list;
				const keys = Object.keys(regions);
				if (keys.length > 1) {
					regions[keys[0]].remove();
				}
			});
		}
	}, [wavesurferObj,wavesurferObjUpdated]);

	// set volume of the wavesurfer object, whenever volume variable in state is changed
	useEffect(() => {
		if (wavesurferObj) wavesurferObj.setVolume(volume);
	}, [volume, wavesurferObj]);

	// set volume 2 of the wavesurfer object updated, whenever volume variable in state is changed
	useEffect(() => {
		if (wavesurferObjUpdated) wavesurferObjUpdated.setVolume(volume2)
	}, [volume2, wavesurferObjUpdated]);

	// set zoom level of the wavesurfer object, whenever the zoom variable in state is changed
	useEffect(() => {
		if (wavesurferObj) wavesurferObj.zoom(zoom);
	}, [zoom, wavesurferObj]);

	// set zoom level of the wavesurfer object updated, whenever the zoom variable in state is changed
	useEffect(() => {
		if (wavesurferObjUpdated) wavesurferObjUpdated.zoom(zoom);
	}, [zoom, wavesurferObjUpdated]);

	// set speed level of the wavesurfer object , whenever the speed variable in state is changed
	useEffect(() => {
		if (wavesurferObj) {
			 wavesurferObj.setPlaybackRate(speed);
			 wavesurferObjUpdated.setPlaybackRate(speed);
		}
	}, [speed, wavesurferObj , wavesurferObjUpdated]);


	const handlePlayPause = (e) => {
		wavesurferObj.playPause();
		wavesurferObjUpdated.playPause();
		setPlaying(!playing);
	};

	// const handlePlayPause2 = (e) => {
	// 	wavesurferObjUpdated.playPause();
	// 	setPlaying2(!playing);
	// };

	const handleReload = (e) => {
		// stop will return the audio to 0s, then play it again
		wavesurferObj.stop();
		wavesurferObj.play();
		wavesurferObjUpdated.stop();
		wavesurferObjUpdated.play();
		setPlaying(true); // to toggle the play/pause button icon
		// setPlaying2(true); // to toggle the play/pause button icon
	};

	// const handleReload2 = (e) => {
	// 	// stop will return the audio to 0s, then play it again
	// 	wavesurferObjUpdated.stop();
	// 	setPlaying(true); // to toggle the play/pause button icon
	// 	// setPlaying2(true); // to toggle the play/pause button icon
	// };

	const handleVolumeSlider = (e) => {
		setVolume(e.target.value);
	};

	const handleVolumeSlider2 = (e) => {
		setVolume2(e.target.value);
	};

	const handleZoomSlider = (e) => {
		setZoom(e.target.value);
	};

	const handleSpeedSlider = (e) => {
		setSpeed(e.target.value);
	};



	return (
		<div className="container">
		<section className='waveform-container'>
			<div ref={wavesurferRef} id='waveform' />
			<div ref={timelineRef} id='wave-timeline' />
			<div className='all-controls'>
				<div className='left-container'>
				{/* <button
						title='reload'
						className='controls'
						onClick={handleReload}>
						<i className='material-icons'>replay</i>
					</button> */}
				</div>
				<div className='right-container'>
					<div className='volume-slide-container'>
					{volume > 0 ? (
							<i className='material-icons'>volume_up</i>
						) : (
							<i className='material-icons'>volume_off</i>
						)}
						<input
							type='range'
							min='0'
							max='1'
							step='0.05'
							value={volume}
							onChange={handleVolumeSlider}
							className='slider volume-slider'
						/>
					</div>
					</div>
				
			</div>

			<div ref={wavesurferRef} id='waveformUpdated' />
			<div ref={timelineRef} id='wave-timeline' />
			<div className='all-controls'>
				<div className='left-container'>
				<button
						title='play/pause'
						className='controls'
						onClick={handlePlayPause}>
						{playing ? (
							<i className='material-icons'>pause</i>
						) : (
							<i className='material-icons'>play_arrow</i>
						)}
					</button>
					<button
						title='reload'
						className='controls'
						onClick={handleReload}>
						<i className='material-icons'>replay</i>
					</button>
				</div>
				<div className='right-container'>
					<div className='volume-slide-container'>
						<i className='material-icons'>
							remove_circle
						</i>
						<input
							type='range'
							min='5000'
							max='7000'
							value={zoom}
							onChange={handleZoomSlider}
							class='slider zoom-slider'
						/>
						<i className='material-icons'>add_circle</i>
					</div>
					<div className='volume-slide-container'>
						{volume2 > 0 ? (
							<i className='material-icons'>volume_up</i>
						) : (
							<i className='material-icons'>volume_off</i>
						)}
						<input
							type='range'
							min='0'
							max='1'
							step='0.05'
							value={volume2}
							onChange={handleVolumeSlider2}
							className='slider volume-slider'
						/>
						<input
							type='range'
							min='0.25'
							max='2'
							step='0.25'
							value={speed}
							onChange={handleSpeedSlider}
							className='slider volume-slider'
						/>
						x{speed}
					</div>
				</div>
				</div>

		</section>
		<section className='sliders-section'>
			<Sliders/>
			</section>
		</div>
	);
};

export default AudioWaveform;

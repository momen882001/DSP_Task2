import React, { useState, useEffect, useContext, useRef } from 'react';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import { FileContext } from '../contexts/fileContext';
import wavesurfer from 'wavesurfer.js';

const AudioWaveform = () => {
	const wavesurferRef = useRef(null);
	const timelineRef = useRef(null);

	// fetch file url from the context
	const { fileURL, setFileURL } = useContext(FileContext);
	const { fileUpdated, setFileUpdated } = useContext(FileContext);

	// crate an instance of the wavesurfer
	const [wavesurferObj, setWavesurferObj] = useState();
	const [wavesurferObjUpdated, setWavesurferObjUpdated] = useState();

	const [playing, setPlaying] = useState(true); // to keep track whether audio is currently playing or not
	const [volume, setVolume] = useState(1); // to control volume level of the audio. 0-mute, 1-max
	const [zoom, setZoom] = useState(1); // to control the zoom level of the waveform

	// create the waveform inside the correct component
	useEffect(() => {
		if (wavesurferRef.current && !wavesurferObj) {
			setWavesurferObj(
				wavesurfer.create({
					container: '#waveform',
					scrollParent: true,
					autoCenter: true,
					cursorColor: 'violet',
					loopSelection: true,
					waveColor: '#211027',
					progressColor: '#69207F',
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
					container: '#waveform',
					scrollParent: true,
					autoCenter: true,
					cursorColor: 'violet',
					loopSelection: true,
					waveColor: '#211027',
					progressColor: '#69207F',
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
		}
	}, [fileUpdated, wavesurferObjUpdated]);

	useEffect(() => {
		if (wavesurferObj && wavesurferObjUpdated) {
			// once the waveform is ready, play the audio
			wavesurferObj.on('ready', () => {
				wavesurferObj.play();
				wavesurferObj.enableDragSelection({}); // to select the region to be trimmed
			});

			// once the waveform updated is ready, play the audio
			wavesurferObjUpdated.on('ready', () => {
				wavesurferObjUpdated.play();
				wavesurferObjUpdated.enableDragSelection({}); // to select the region to be trimmed
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

	// set volume of the wavesurfer object updated, whenever volume variable in state is changed
	useEffect(() => {
		if (wavesurferObjUpdated) wavesurferObjUpdated.setVolume(volume);
	}, [volume, wavesurferObjUpdated]);

	// set zoom level of the wavesurfer object, whenever the zoom variable in state is changed
	useEffect(() => {
		if (wavesurferObj) wavesurferObj.zoom(zoom);
	}, [zoom, wavesurferObj]);

	// set zoom level of the wavesurfer object updated, whenever the zoom variable in state is changed
	useEffect(() => {
		if (wavesurferObjUpdated) wavesurferObjUpdated.zoom(zoom);
	}, [zoom, wavesurferObjUpdated]);


	const handlePlayPause = (e) => {
		wavesurferObj.playPause();
		wavesurferObjUpdated.playPause();
		setPlaying(!playing);
	};

	const handleReload = (e) => {
		// stop will return the audio to 0s, then play it again
		wavesurferObj.stop();
		wavesurferObjUpdated.stop();
		wavesurferObj.play();
		wavesurferObjUpdated.play();
		setPlaying(true); // to toggle the play/pause button icon
	};

	const handleVolumeSlider = (e) => {
		setVolume(e.target.value);
	};

	const handleZoomSlider = (e) => {
		setZoom(e.target.value);
	};



	return (
		<section className='waveform-container'>
			<div ref={wavesurferRef} id='waveform' />
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
						<i className='material-icons zoom-icon'>
							remove_circle
						</i>
						<input
							type='range'
							min='1'
							max='1000'
							value={zoom}
							onChange={handleZoomSlider}
							class='slider zoom-slider'
						/>
						<i className='material-icons zoom-icon'>add_circle</i>
					</div>
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
		</section>
	);
};

export default AudioWaveform;

import React, { useEffect, useState } from 'react';
import './Footer.css';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import { Grid, Slider } from '@material-ui/core';
import { useDataLayerValue } from './DataLayer';

function Footer({ spotify }) {
  const [{ item, playing }, dispatch] = useDataLayerValue();
  const [volume, setVolume] = useState(75);

  useEffect(() => {
    spotify.setVolume(volume);
    spotify.getMyCurrentPlaybackState().then((response) => {
      console.log('Res ->', response);

      dispatch({
        type: 'SET_PLAYING',
        playing: response.is_playing,
      });

      dispatch({
        type: 'SET_ITEM',
        item: response.item,
      });
    });
  }, [spotify, item, volume]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: 'SET_PLAYING',
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: 'SET_PLAYING',
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: 'SET_PLAYING',
        playing: true,
      });
      dispatch({
        type: 'SET_ITEM',
        item: r.item,
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: 'SET_PLAYING',
        playing: true,
      });
      dispatch({
        type: 'SET_ITEM',
        item: r.item,
      });
    });
  };

  const handleVolumeChange = (e, newVolume) => {
    setVolume(newVolume);
  };

  return (
    <div className='footer'>
      <div className='footer__left'>
        <img
          className='footer__albumLogo'
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className='footer__songInfo'>
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(', ')}</p>
          </div>
        ) : (
          <div className='footer__songInfo'>
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>
      <div className='footer__center'>
        <ShuffleIcon className='footer__green' />
        <SkipPreviousIcon onClick={skipPrevious} className='footer__icon' />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize='large'
            className='footer__icon'
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize='large'
            className='footer__icon'
          />
        )}
        <SkipNextIcon onClick={skipNext} className='footer_icon' />
        <RepeatIcon className='footer__green' />
      </div>
      <div className='footer__right'>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            {volume >= 66 && <VolumeUpIcon />}
            {volume < 66 && volume >= 33 && <VolumeDownIcon />}
            {volume < 33 && volume > 0 && <VolumeMuteIcon />}
            {volume === 0 && <VolumeOffIcon />}
          </Grid>
          <Grid item xs>
            <Slider
              className='footer__slider'
              aria-labelledby='continuous-slider'
              value={volume}
              onChange={handleVolumeChange}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;

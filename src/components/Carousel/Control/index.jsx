import React from 'react';
import PropTypes from 'prop-types';
import styles from './Control.module.scss';
import Icon from '@mdi/react'
import {mdiSkipPrevious, mdiSkipNext, mdiFullscreen, mdiFullscreenExit, mdiPlay, mdiPause} from '@mdi/js';

class Control extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 1000,
            isPlaying: false,
            isFullscreen: false,
        }
        this.timeoutId = null;
    }

    slideshowHandler = () => {
        const {isPlaying} = this.state;
        this.setState({
            isPlaying: !isPlaying,
        })
    }

    delayHandler = ({target: {value}}) => {
        this.setState({
            delay: value,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {isPlaying, delay} = this.state;
        const {next} = this.props;
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
        if (isPlaying) {
            this.timeoutId = setTimeout(next, delay);
        }
    }

    fullscreenMode = () => {
        const {isFullscreen} = this.state;
        const {fullscreenMode} = this.props;
        this.setState({
            isFullscreen: !isFullscreen,
        });
        fullscreenMode(isFullscreen);
    }

    render() {
        const {isPlaying, delay, isFullscreen} = this.state;
        const {next, prev} = this.props;
        return (
            <div className={styles.slideControl}>
                <div className={styles.delay}>
                    <input type='range' value={delay} min={1} max={10000} onChange={this.delayHandler}/>
                    <div>{delay}</div>
                </div>
                <div className={styles.nextPrev}>
                    <Icon onClick={prev} path={mdiSkipPrevious}/>
                    <Icon onClick={next} path={mdiSkipNext}/>
                </div>
                <div className={styles.slideshow}>
                    <Icon onClick={this.slideshowHandler} path={isPlaying ? mdiPause : mdiPlay}/>
                    <Icon onClick={this.fullscreenMode} path={isFullscreen ? mdiFullscreenExit : mdiFullscreen}/>
                </div>
            </div>
        );
    }
}

Control.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    fullscreenMode: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
}

export default Control;
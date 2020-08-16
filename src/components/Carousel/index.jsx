import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Slide from './Slide';
import styles from './Carousel.module.scss';
import classNames from 'classnames';
import Icon from '@mdi/react'
import {mdiSkipPrevious, mdiSkipNext, mdiFullscreen, mdiFullscreenExit, mdiPlay, mdiPause} from '@mdi/js';

class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            delay: 1000,
            isPlaying: false,
            isFullscreen: false,
            currentIndex: 0,
        };
        this.timeoutId = null;
    }

    nextIndex = () => {
        const {currentIndex} = this.state;
        const {slides} = this.props;
        this.setState({
            currentIndex: (currentIndex + 1) % slides.length,
        });
    }

    prevIndex = () => {
        const {currentIndex} = this.state;
        const {slides} = this.props;
        this.setState({
            currentIndex: (currentIndex - 1 + slides.length) % slides.length,
        });
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

    fullscreenMode = () => {
        const {isFullscreen} = this.state;
        this.setState({
            isFullscreen: !isFullscreen,
        });
        if (!isFullscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'initial';
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {isPlaying, delay} = this.state;
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
        if (isPlaying) {
            this.timeoutId = setTimeout(this.nextIndex, delay);
        }
    }

    render() {
        const {slides, download} = this.props;
        const {currentIndex, isPlaying, delay, isFullscreen} = this.state;
        const containerClass = classNames(styles.container, {
            [styles.fullscreen]: isFullscreen,
        });
        return (
            <article className={containerClass}>
                {download && (
                    <>
                        <Slide download {...slides[currentIndex]} isCurrent isFullscreen={isFullscreen}/>
                    </>
                )}
                <div className={styles.slideControl}>
                    <div className={styles.delay}>
                        <input type='range' value={delay} min={1} max={10000} onChange={this.delayHandler}/>
                        <div>{delay}</div>
                    </div>
                    <div className={styles.nextPrev}>
                        <Icon onClick={this.prevIndex} path={mdiSkipPrevious}/>
                        <Icon onClick={this.nextIndex} path={mdiSkipNext}/>
                    </div>
                    <div className={styles.slideshow}>
                        <Icon onClick={this.slideshowHandler} path={isPlaying ? mdiPause : mdiPlay}/>
                        <Icon onClick={this.fullscreenMode} path={isFullscreen ? mdiFullscreenExit : mdiFullscreen}/>
                    </div>
                </div>
            </article>
        );
    }
}

Carousel.propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        src: PropTypes.string,
    })),
    download: PropTypes.bool,
}

Carousel.defaultProps = {
    slides: [{
        title: 'title',
        description: 'description',
        src: '',
    }],
    download: true,
}

export default Carousel;
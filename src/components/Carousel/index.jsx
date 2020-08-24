import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Slide from './Slide';
import Control from './Control';
import styles from './Carousel.module.scss';

class Carousel extends Component {
    constructor(props) {
        super(props);
        const {width, height} = this.props;
        this.state = {
            currentIndex: 0,
            width: width,
            height: height,
        }
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

    resize = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    fullscreenMode = (isFullscreen) => {
        const {width, height} = this.props;
        if (isFullscreen) {
            this.setState({
                width: width,
                height: height,
            });
            window.removeEventListener('resize', this.resize);
        } else {
            this.resize();
            window.addEventListener('resize', this.resize);
        }
        document.body.style.overflow = isFullscreen ? 'initial' : 'hidden';
    }

    render() {
        const {currentIndex, width, height} = this.state;
        const {slides} = this.props;
        const containerAspectRatio = width / height;
        const containerSize = {
            width,
            height,
        };
        return (
            <article className={styles.container} style={containerSize}>
                <Slide containerAspectRatio={containerAspectRatio} currentSlide={slides[currentIndex]}/>
                <Control next={this.nextIndex} prev={this.prevIndex} fullscreenMode={this.fullscreenMode} width={width} height={height}/>
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
    width: PropTypes.number,
    height: PropTypes.number,
}

Carousel.defaultProps = {
    slides: [{
        title: 'title',
        description: 'description',
        src: '',
    }],
    width: 900,
    height: 600,
}

export default Carousel;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Slide.module.scss';

class Slide extends Component {
    constructor(props) {
        super(props);

        const img = new Image();

        img.addEventListener('load', this.handleLoad);
        img.addEventListener('error', this.handleError);

        this.state = {
            img,
            isLoaded: false,
            error: null,
        };
    }

    handleLoad = () => {
        this.setState({
            isLoaded: true,
        });
    };

    handleError = () => {
        this.setState({
            error: true,
        });
    };

    load = () => {
        const {img} = this.state;
        const {currentSlide: {src}} = this.props;
        img.src = src;
    };

    componentDidMount() {
        this.load();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {isLoaded, error} = this.state;
        const {currentSlide: {src}} = this.props;
        if (src !== prevProps.currentSlide.src && isLoaded && !error) {
            this.load();
        }
    }

    render() {
        const {img, error, isLoaded} = this.state;
        const {currentSlide, containerAspectRatio} = this.props;
        const imageAspectRatio = img.width / img.height;
        const imageSize = {
            [imageAspectRatio > containerAspectRatio ? 'width' : 'height']: 'inherit',
        };
        return (
            <>
                {!error && isLoaded && <figure className={styles.container} title={currentSlide.title}>
                    <img src={currentSlide.src} alt={currentSlide.title} style={imageSize}/>
                    <figcaption className={styles.caption}>
                        <h3>{currentSlide.title}</h3>
                        <p>{currentSlide.description}</p>
                    </figcaption>
                </figure>}
            </>
        );
    }
}

Slide.propTypes = {
    containerAspectRatio: PropTypes.number.isRequired,
    currentSlide: PropTypes.shape({
        src: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
}

export default Slide;
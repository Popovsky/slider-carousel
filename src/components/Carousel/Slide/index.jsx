import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Slide.module.scss';
import classNames from 'classnames';
import defaultImage from './Black.jpg';

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
        const {src} = this.props;
        img.src = src;
    };

    componentDidMount() {
        const {download} = this.props;
        if (download) {
            this.load();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {download, src} = this.props;
        const {isLoaded, error} = this.state;
        if (download && !isLoaded && !error) {
            this.load();
        }

        if (src !== prevProps.src) {
            this.setState({
                isLoaded: false,
                error: null,
            });
        }
    }

    render() {
        const {isLoaded} = this.state;
        const {isCurrent, src, title, description} = this.props;
        const className = classNames(styles.slide, {
            [styles.currentSlide]: isCurrent,
        });
        return (
            <figure className={className} title={title}>
                <img className={styles.slideImage} src={isLoaded ? src : defaultImage} alt={title}/>
                <figcaption className={styles.caption}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </figcaption>
            </figure>
        );
    }
}

Slide.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    src: PropTypes.string,
    isCurrent: PropTypes.bool,
    isFullscreen: PropTypes.bool,
};

Slide.defaultProps = {
    title: 'title',
    description: 'description',
    src: defaultImage,
    isCurrent: true,
    isFullscreen: false,
};

export default Slide;
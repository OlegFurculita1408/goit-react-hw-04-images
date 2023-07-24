import { Component } from "react";
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown)
    }
    onKeyDown = e => {
        if(e.code === 'Escape') {
            this.props.onModalClick();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
    }

    onBackDroClick = e => {
        if (e.target === e.currentTarget) {
            this.props.onModalClick()
        }
    }


render() {
    const { largeImageURL, alt } = this.props;

    return(
        <div className={css.Overlay} onClick={this.onBackDroClick}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt={alt} />
            </div>
        </div>
        )
    }
}
Modal.propTypes = {
    alt: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onModalClick: PropTypes.func.isRequired,
}
export default Modal
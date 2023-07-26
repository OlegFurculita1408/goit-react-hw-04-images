import { useEffect } from "react";
import PropTypes from 'prop-types';
import css from './Modal.module.css';


const Modal = ({alt, largeImageURL, onModalClick}) => {

    useEffect(() => {
        const onKeyDown = e => {
            if(e.code === 'Escape') {
                onModalClick();
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [onModalClick]);

    const onBackDropClick = e => {
        if (e.target === e.currentTarget) {
            onModalClick()
        }
    }

    return(
        <div className={css.Overlay} onClick={onBackDropClick}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt={alt} />
            </div>
        </div>
        )
    }

// class Modal extends Component {
//     componentDidMount() {
//         window.addEventListener('keydown', this.onKeyDown)
//     }
//     onKeyDown = e => {
//         if(e.code === 'Escape') {
//             this.props.onModalClick();
//         }
//     }

//     componentWillUnmount() {
//         window.removeEventListener('keydown', this.onKeyDown)
//     }

//     onBackDropClick = e => {
//         if (e.target === e.currentTarget) {
//             this.props.onModalClick()
//         }
//     }


// render() {
//     const { largeImageURL, alt } = this.props;

//     return(
//         <div className={css.Overlay} onClick={this.onBackDropClick}>
//             <div className={css.Modal}>
//                 <img src={largeImageURL} alt={alt} />
//             </div>
//         </div>
//         )
//     }
// }
Modal.propTypes = {
    alt: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onModalClick: PropTypes.func.isRequired,
}
export default Modal
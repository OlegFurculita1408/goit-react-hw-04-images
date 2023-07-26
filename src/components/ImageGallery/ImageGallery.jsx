import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'

const ImageGallery = ({ images, onOpenModal }) => (
        <ul className={css.ImageGallery}>
        { images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
                    key={id}
                    url={webformatURL}
                    largeImageURL={largeImageURL}
                    tags={tags}
                    openModal={onOpenModal}
            />
            ))}
        </ul>
)
ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        })
    ).isRequired,
    onOpenModal: PropTypes.func.isRequired,
}
export default ImageGallery
import { useEffect, useState } from 'react';
import { getAllImages, necessaryValues } from 'api/api';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const App = () => {
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageUrl] = useState('');
  // const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState('');
  const [totalHits, setTotalHits] = useState(null);


  useEffect(() => {
    if (!searchQuery) return 
          
  const renderGalery = async () => {
     setIsLoading(true);

     try {
      const { hits, totalHits } = await getAllImages(searchQuery, page);

        if (totalHits === 0) {
          toast.warning(`Sory, no images!`, {position: toast.POSITION.TOP_LEFT});
        }

      const newImages = necessaryValues(hits);
        setImages(images => [...images, ...newImages])
        setTotalHits(totalHits)
      
     } catch (error) {
        error({ error })
          toast.error({error})

     } finally {
        setIsLoading(false)
     }
  }
    renderGalery();
  },[searchQuery, page])


  const onFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  }

  const onLoadMore = () => {
    setPage(page + 1);
  }

  const openModal = largeImageURL => {
    setLargeImageUrl(largeImageURL)
    toggleModal()
  }

  const toggleModal = () => {
    setShowModal(prev => !prev)
  }

  const allImages = images === totalHits;

  return (
    <>
      <SearchBar
       onSubmit={onFormSubmit}
        />
      <ImageGallery
       images={images}
       onOpenModal={openModal}
        />
      <ToastContainer />
        {isLoading && <Loader />}
        {images.length !== 0 && !isLoading && !allImages && (
      <Button onClick={onLoadMore} />)}
        {showModal && (
          <Modal 
            onModalClick={toggleModal}
            largeImageURL={largeImageURL}
            alt={tags}/>)}
    </>
  )
};
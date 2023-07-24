import { Component } from 'react';
import { getAllImages, necessaryValues } from 'api/api';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class App extends Component  {
  state = {
    images:[],
    largeImageURL:'',
    searchQuery:'',
    error:null,
    page:1,
    isLoading: false,
    showModal: false,
    tags:'',
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevState.searchQuery;
    const nextSearchQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const page = this.state.page;

    if (prevSearchQuery !== nextSearchQuery || prevPage !== page) {
      this.renderGalery();
    }
  }

  renderGalery = async () => {
    const { searchQuery, page } = this.state
     this.setState({ isLoading:true });

     try {
      const { hits, totalHits } = await getAllImages(searchQuery, page);

        if (totalHits === 0) {
          toast.warning(`Sory, no images!`, {position: toast.POSITION.TOP_LEFT});
        }

      const newImages = necessaryValues(hits);
        this.setState(({ images }) => ({
          images: [...images, ...newImages],
          totalHits,
        }))
      
     } catch (error) {
        this.setState({ error })
          toast.error({error})

     } finally {
        this.setState({ isLoading: false})
     }
  }

  onFormSubmit = searchQuery => {
    this.setState({ searchQuery, images: [], page: 1 });
  }

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  openModal = (largeImageURL, tags) => {
    this.tggleModal()
    this.setState({ largeImageURL, tags })
  }

  tggleModal = () => {
    this.setState(({ showModal}) => ({
      showModal: !showModal,
    }))
  }


render() {
  const { images, largeImageURL, isLoading, showModal, tags, totalHits} = this.state;
  const allImages = images.length === totalHits;

  return (
    <>
      <SearchBar
       onSubmit={this.onFormSubmit}
        />
      <ImageGallery
       images={images}
       onOpenModal={this.openModal}
        />
      <ToastContainer />
      {isLoading && <Loader />}
      {images.length !== 0 && !isLoading && !allImages && (
        <Button onClick={this.onLoadMore} />)}
      {showModal && (<Modal 
                        onModalClick={this.tggleModal}
                        largeImageURL={largeImageURL}
                        alt={tags}/>)}
    </>
  );
}
  
};

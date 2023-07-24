// Your API key: 37017731-87154c65e3580dd14aba57926
// ?q=cat&page=12&key=37017731-87154c65e3580dd14aba57926&image_type=photo&orientation=horizontal&per_page=12
import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
    key: '37017731-87154c65e3580dd14aba57926',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
}

export function necessaryValues(data) {
    return data.map(({ id, tags, largeImageURL, webformatURL }) => ({
        id,
        tags,
        largeImageURL,
        webformatURL,
    }))
}

export const getAllImages = async (searchQuery, page) => {
    const answer = await axios.get(`?q=${searchQuery}&page=${page}`);
    return answer.data;
}
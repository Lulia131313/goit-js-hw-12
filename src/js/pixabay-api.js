import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '42750421-25533ceabe92b3d649fd552d3';

export async function getPhotos(q, page) {
  const params = {
    key: API_KEY,
    q,
    page,
    per_page: 15,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  const res = await axios.get(`${BASE_URL}`, { params });
  return res.data;
}

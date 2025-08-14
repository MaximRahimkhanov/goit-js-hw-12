

// export axios.get('https://pixabay.com/api/?key=51719730-f0601b97791df742fe437894d&image_type=photo')
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.error(error);
//   });
import axios from 'axios';

export function getImagesByQuery(query) {
  const API_KEY = '51719730-f0601b97791df742fe437894d';
  const BASE_URL = 'https://pixabay.com/api/';

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true
  };

  return axios.get(BASE_URL, { params }).then(res => res.data);
}

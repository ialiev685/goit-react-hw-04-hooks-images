const KEY = '22163812-fdf68a623e9a64649f570bea3';

const PixabayApi = ({ currentPage, query }) => {
  return fetch(`https://pixabay.com/api/?q=${query}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12
  `).then(response => response.json());
};

export default PixabayApi;

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadBtn,
  hideLoadBtn
} from './js/render-functions.js';

const formEl = document.querySelector('.form');
const inputEl = document.querySelector('.form-input');
const loadbtnEl = document.querySelector('.js-loadbtn');

let currentQuery = '';
let currentPage = 1;
let totalLoaded = 0;
let totalHits = 0;

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = inputEl.value.trim();
  if (!query) {
    iziToast.info({
      title: 'Info',
      message: 'Please enter a search query!',
      position: 'topCenter'
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalLoaded = 0;

  clearGallery();
  hideLoadBtn();
  showLoader();

  try {
    const response = await getImagesByQuery(currentQuery, currentPage);
    totalHits = response.totalHits;

    if (response.hits.length === 0) {
      iziToast.info({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topCenter'
      });
      return;
    }

    createGallery(response.hits);
    totalLoaded += response.hits.length;

    if (shouldShowLoadBtn()) {
      showLoadBtn();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later.',
      position: 'topCenter'
    });
    console.error('Fetch error:', error);
  } finally {
    hideLoader();
  }
});

loadbtnEl.addEventListener('click', async () => {
  currentPage += 1;
  disableLoadBtn();
  showLoader();

  try {
    const response = await getImagesByQuery(currentQuery, currentPage);

    createGallery(response.hits);
    totalLoaded += response.hits.length;

    if (totalLoaded >= totalHits) {
      hideLoadBtn();
      iziToast.info({
        title: 'End of Results',
        message: "You've reached the end of search results.",
        position: 'topCenter'
      });
    } else {
      enableLoadBtn(); 
    }

    smoothScrollAfterLoad();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
      position: 'topCenter'
    });
    console.error('Load more error:', error);
    enableLoadBtn(); 
  } finally {
    hideLoader();
  }
});



function shouldShowLoadBtn() {
  return totalLoaded < totalHits;
}

function smoothScrollAfterLoad() {
  const firstCard = document.querySelector('.gallery__item');
  if (!firstCard) return;

  const cardHeight = firstCard.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth'
  });
}

function disableLoadBtn() {
  loadbtnEl.disabled = true;
  loadbtnEl.classList.add('is-disabled'); // стилізуй у CSS
}

function enableLoadBtn() {
  loadbtnEl.disabled = false;
  loadbtnEl.classList.remove('is-disabled');
}

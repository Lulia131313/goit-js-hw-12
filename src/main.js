import axios from 'axios';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPhotos } from './js/pixabay-api';

import { createMarkup } from './js/render-function';

const ulEl = document.querySelector('.js-gallery');
const ulForm = document.querySelector('.js-search-form');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.js-load-more');

ulForm.addEventListener('submit', onFormSubmit);
loadMore.addEventListener('click', onBtnClick);

let page = 1;
let input;
let parPage = 15;

async function onFormSubmit(e) {
  e.preventDefault();

  page = 1;
  ulEl.innerHTML = '';

  showLoader();

  input = e.currentTarget.elements['user-search-query'].value.trim();

  if (!input) {
    hideLoader();
    loadMoreHide();
    return iziToast.error({
      title: 'Error',
      message: 'error',
    });
  }

  try {
    const res = await getPhotos(input, page);

    if (res.hits.length === 0) {
      loadMoreHide();
      return iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
    ulEl.innerHTML = createMarkup(res.hits);

    lightbox.refresh();

    res.totalHits < parPage ? loadMoreHide() : loadMoreShow();
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
    e.target.reset();
  }
}

async function onBtnClick() {
  showLoader();
  page += 1;

  try {
    const res = await getPhotos(input, page);

    const lastPage = Math.ceil(res.totalHits / parPage);
    if (lastPage === page) {
      loadMoreHide();
      iziToast.error({
        title: 'Error',
        message: 'Sorry, thats all',
      });
    }
    ulEl.insertAdjacentHTML('beforeend', createMarkup(res.hits));

    lightbox.refresh();
    scroll();
  } catch (error) {
    console.log('error');
  } finally {
    hideLoader();
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}
function loadMoreShow() {
  loadMore.classList.remove('is-hidden');
}
function loadMoreHide() {
  loadMore.classList.add('is-hidden');
}

function scroll() {
  const cardEL = ulEl.firstElementChild;

  const hidden = cardEL.getBoundingClientRect().height * 2;
  scrollBy({
    behavior: 'smooth',
    top: hidden,
  });
}

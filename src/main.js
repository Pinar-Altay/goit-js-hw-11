import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import './css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let currentPage = 1;
const perPage = 12;
const form = document.querySelector('#search-form');
const input = form.querySelector('input');
const loader = document.querySelector('.loader');


export const galleryLightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'data-caption',
  captionDelay: 250,
});

let lastFocusedElement;

form.addEventListener('submit', onSearch);

galleryLightbox.on('show.simplelightbox', () => {
  lastFocusedElement = document.activeElement;
  document.body.classList.add('lightbox-open');
});

galleryLightbox.on('close.simplelightbox', () => {
  if (lastFocusedElement) lastFocusedElement.focus();
  document.body.classList.remove('lightbox-open');
});

function onSearch(e) {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    showNotification('warning', 'Please enter a search query!');
    return;
  }

  currentPage = 1;
  clearGallery();
  searchImages(query);
}

function toggleLoader(isLoading) {
  loader.style.display = isLoading ? 'block' : 'none';
}

function showNotification(type, message) {
  iziToast[type]({ title: type.charAt(0).toUpperCase() + type.slice(1), message });
}

async function searchImages(query) {
  toggleLoader(true);
  try {
    const data = await fetchImages(query, currentPage, perPage);
    if (data.hits.length === 0) {
      showNotification('info', 'Sorry, no images were found for your search query.');
      return;
    }

    renderGallery(data.hits);
    galleryLightbox.refresh();
    input.value = '';
  } catch (error) {
    showNotification('error', 'Something went wrong. Please try again later.');
    console.error(error);
  } finally {
    toggleLoader(false);
  }
}
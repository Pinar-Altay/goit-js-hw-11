import { galleryLightbox } from '../main';

export function createImageCard(image) {
  return `
    <a href="${image.largeImageURL}" class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" width="360" loading="lazy" data-caption="${image.tags}" />
      <div class="info">
        <p><b>Likes:</b> ${image.likes}</p>
        <p><b>Views:</b> ${image.views}</p>
        <p><b>Comments:</b> ${image.comments}</p>
        <p><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </a>
  `;
}

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const imageCards = images.map(createImageCard).join('');
  gallery.insertAdjacentHTML('beforeend', imageCards);
  galleryLightbox.refresh();
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}
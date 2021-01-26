import gallery from '../gallery-items.js';
//----------------------------------------
const refs = {
  galleryList: document.querySelector('.js-gallery'),
};
//----------------create markup
const galleryMarkUpString = arr =>
  arr.reduce((str, { preview, original, description }) => {
    str += `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`;
    return str;
  }, '');
const createMarkUp = arr => {
  refs.galleryList.insertAdjacentHTML('afterbegin', galleryMarkUpString(arr));
};
createMarkUp(gallery);
//----------------delegation
refs.galleryList.addEventListener('click', event => {
  event.preventDefault();
  if(event.target !== event.currentTarget) {
    console.log(event.target);
    console.log(event.currentTarget);
  }
});

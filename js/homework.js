import gallery from '../gallery-items.js';
//add index to gallery
gallery.forEach((galleryElem, index) => {
  galleryElem.index = index;
});

//----------------------------------------
const refs = {
  galleryListRef: document.querySelector('.js-gallery'),
  overlayRef: document.querySelector('.lightbox'),
  bigPicRef: document.querySelector('.lightbox__image'),
  closeOverlayBtnRef: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
};

//function mark up string
const galleryMarkUpString = arr =>
  arr.reduce((str, { preview, original, description, index }) => {
    str += `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      data-index=${index}
      alt=${description}
    />
  </a>
</li>`;
    return str;
  }, '');
//function add markup string to HTML
const addMarkUpToHTML = str => {
  refs.galleryListRef.insertAdjacentHTML(
    'afterbegin',
    galleryMarkUpString(str),
  );
};
// function add class is-open to overlay
const addClassToOverlayIsOpen = () => {
  refs.overlayRef.classList.add('is-open');
};
// function clear url and alt of pic
const clearPicSrcAndAlt = () => {
  refs.bigPicRef.src = '';
  refs.bigPicRef.alt = '';
};
//function remove class is-open on overlay
const removeClassOverlayIsOpen = () => {
  refs.overlayRef.classList.remove('is-open');
};
//function close overlay after click on close btn
const closeClickOnBtn = () => {
  refs.closeOverlayBtnRef.addEventListener('click', event => {
    clearPicSrcAndAlt();
    removeClassOverlayIsOpen();
  });
};
//function close overlay after click on overlay
const closeAfterClickOnOverlay = () => {
  refs.overlayRef.addEventListener('click', event => {
    if (event.target.classList.contains('lightbox__overlay')) {
      clearPicSrcAndAlt();
      removeClassOverlayIsOpen();
    }
  });
};
//function press Escape
const pressEscape = event => {
  if (event.code === 'Escape') {
    clearPicSrcAndAlt();
    removeClassOverlayIsOpen();
  }
};
//function set new pic when press right or press left arrow keyboard
const setNewImg = indexOfImage => {
  refs.bigPicRef.src = gallery[indexOfImage].original;
  refs.bigPicRef.alt = gallery[indexOfImage].description;
};

addMarkUpToHTML(gallery);

//----------------listener
refs.galleryListRef.addEventListener('click', event => {
  //default action
  event.preventDefault();
  //click on list return
  if (event.target === event.currentTarget) return;
  // index big pic
  let indexOfImage = event.target.dataset.index;
  //open overlayRef
  addClassToOverlayIsOpen();
  //overlayRef pic
  refs.bigPicRef.src = event.target.dataset.source;
  refs.bigPicRef.alt = event.target.alt;
  // close overlayRef  btn
  closeClickOnBtn();
  //close overlayRef click not on pic;
  closeAfterClickOnOverlay();
  // close overlayRef  escape
  window.addEventListener('keydown', event => {
    pressEscape(event);
    //arrowRight
    if (event.code === 'ArrowRight') {
      clearPicSrcAndAlt();
      indexOfImage =
        indexOfImage === gallery.length - 1 ? 0 : +indexOfImage + 1;
      setNewImg(indexOfImage);
    }
    //arrowLeft
    if (event.code === 'ArrowLeft') {
      clearPicSrcAndAlt();
      indexOfImage =
        indexOfImage === 0 ? gallery.length - 1 : +indexOfImage - 1;
      setNewImg(indexOfImage);
    }
  });
});

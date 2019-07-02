import navigation from './Navigation'
require("core-js/fn/array/from");

navigation();

function stickyHeaderInit() {
  const header = document.querySelector('.header__inner');

  if (!header) 
    return false;
  
  const onScrollHandler = function () {
    const topOffset = window.scrollY
      ? window.scrollY
      : window.pageYOffset;

    if ((topOffset + 25) > header.offsetHeight) {
      header
        .classList
        .add('sticky');
    } else {
      header
        .classList
        .remove('sticky');
    }
  };

  window.addEventListener('scroll', onScrollHandler);
}


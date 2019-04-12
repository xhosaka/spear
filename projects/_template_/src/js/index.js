import navigation from './Navigation'
require("core-js/fn/array/from");
import Tabs from './Tabs';

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


const tabs = new Tabs(document.querySelector('.tabs'));

function xz() {
  const targetNode = document.body;
  const config = { attributes: true, childList: true, subtree: true };

  const callback = () => {
    var iframe = document.querySelector('.trustpilot-widget iframe');
    if (!iframe) return null;
    var elmnt = iframe.contentWindow.document.getElementsByTagName("a")[0];
  }

  const observer = new MutationObserver(callback);

  observer.observe(targetNode, config);
}

xz();
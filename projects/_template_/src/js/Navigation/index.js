import './style.scss';

export default function navigation() {
  const button = document.getElementById('nav-button');

  if (!button) 
    return false;
  
  const nav = document.querySelector('.nav');
  const navList = nav.querySelector('.nav__main');

  if (!navList.offsetWidth, !navList.offsetHeight) {
    navList.setAttribute('aria-hidden', true);
  }

  const toggle = () => {
    button
      .classList
      .toggle('is-active');
    navList
      .classList
      .toggle('is-active');

    document
      .documentElement
      .classList
      .toggle('no-scroll');
    document
      .body
      .classList
      .toggle('no-scroll');

    if (navList.classList.contains('is-active')) {
      navList.setAttribute('aria-hidden', false);
      button.setAttribute('aria-expanded', true);

      navList.style.height = `${window.innerHeight}px`;

      navList.addEventListener('click', menuOnClickHandler);
    } else {
      navList.setAttribute('aria-hidden', true);
      button.setAttribute('aria-expanded', false);

      navList.style.height = '';
      navList.removeEventListener('click', menuOnClickHandler);
    }
  }

  const menuOnClickHandler = e => e.target === navList && toggle();

  button.addEventListener('click', toggle);
}
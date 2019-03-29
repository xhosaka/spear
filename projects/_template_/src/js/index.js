require("core-js/fn/array/from");

function mobileNavigationInit(){
  const button = document.querySelector('.mob-menu__nav-btn');

  if (!button) return false;

  const menuBlock = document.querySelector('.menu');
  const menu = menuBlock.querySelector('ul');

  if (getComputedStyle(menuBlock).visibility === 'hidden') {
    menuBlock.setAttribute('aria-hidden', true);
  }

  const toggle = () => {
    button.classList.toggle('is-active');
    menuBlock.classList.toggle('is-active');

    document.documentElement.classList.toggle('no-scroll');
    document.body.classList.toggle('no-scroll');

    if (menuBlock.classList.contains('is-active')) {
      menuBlock.setAttribute('aria-hidden', false);
      button.setAttribute('aria-expanded', true);

      menuBlock.style.height = `${window.innerHeight}px`;

      menuBlock.addEventListener('click', menuOnClickHandler);
    } else {
      menuBlock.setAttribute('aria-hidden', true);
      button.setAttribute('aria-expanded', false);

      menuBlock.style.height = '';
      menuBlock.removeEventListener('click', menuOnClickHandler);
    }
  }

  const menuOnClickHandler = (e) => e.target === menuBlock && toggle();

  button.addEventListener('click', toggle);
}


function camelize(prop) {
		var wordsArr = prop.split('-');

		wordsArr = wordsArr.map((word, index) => {

				if (index !== 0) {
						var word = word.split('');
						word[0] = word[0].toUpperCase();
						return word.join('')
						//word.splice(0, 1, word.charAt(0).toUpperCase()) return word.toUpperCase();
				}

				return word;
		})

		var result = wordsArr.join('');
		console.log(result)
}

function stickyHeaderInit() {
  const header = document.querySelector('.header__inner');

  if (!header) return false;

  const onScrollHandler = function() {
    const topOffset = window.scrollY ? window.scrollY : window.pageYOffset;

    if ((topOffset + 25) > header.offsetHeight) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  };

  window.addEventListener('scroll', onScrollHandler);
}


import navigation from './Navigation';
require('core-js/fn/array/from');
import { h, app } from 'hyperapp';

navigation();

function stickyHeaderInit() {
  const header = document.querySelector('.header__inner');

  if (!header) return false;

  const onScrollHandler = function() {
    const topOffset = window.scrollY ? window.scrollY : window.pageYOffset;

    if (topOffset + 25 > header.offsetHeight) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  };

  window.addEventListener('scroll', onScrollHandler);
}

const state = {
  count: 0
};

const actions = {
  down: value => state => ({ count: state.count - value }),
  up: value => state => ({ count: state.count + value })
};

const view = (state, actions) =>
  h('div', {}, [
    h('h1', {}, state.count),
    h('button', { onclick: () => actions.down(1) }, '-'),
    h('button', { onclick: () => actions.up(1) }, '+')
  ]);

const el = document.getElementById('app');

app(state, actions, view, el);

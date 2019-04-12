import './style.scss';
import './theme.scss';

var hasInParents = function (node, attrs) {
  if (node.matches('[data-tab-selector]') || node.id === attrs) return node;
  if (node.parentNode) return hasInParents(node.parentNode, attrs);
  return false;
};

export default class Tabs {
  constructor(container, startPaneIndex = 0) {
    this._container = container;
    this._startPaneIndex = startPaneIndex;
    this._selectorList = container.querySelectorAll('[data-tab-selector]');
    this._selectorListContainer = this._selectorList[0].parentNode;
    this._panesList = container.querySelectorAll('[data-tab-pane]');

    this.state = {
      current: null
    };

    this.selectorClickHandler = this.selectorClickHandler.bind(this);

    this.init();
  }

  init() {

    if (!this._container.hasAttribute('data-tabs')) this._container.setAttribute('data-tabs', '');

    Array.prototype.slice.call(this._selectorList).forEach((selector, index) => {selector.setAttribute('data-tab-selector-id', index)});
    Array.prototype.slice.call(this._panesList).forEach((pane, index) => {pane.setAttribute('data-tab-pane-id', index)});

    this.changePane(this._startPaneIndex);
    this._selectorListContainer.addEventListener('click', this.selectorClickHandler);
  }

  unBindHandlers() {
    this._selectorListContainer.removeEventListener('click', this.selectorClickHandler);
  }

  hidePane() {
    if (this.state.current !== null) {
      this._selectorList[this.state.current].removeAttribute('is-active');
      this._selectorList[this.state.current].setAttribute('aria-selected', false);

      this._panesList[this.state.current].removeAttribute('is-active');
      this._panesList[this.state.current].setAttribute('aria-hidden', true);
    }
  }

  showPane(index) {
    this.state.current = index;

    this._selectorList[this.state.current].setAttribute('is-active', '');
    this._selectorList[this.state.current].setAttribute('aria-selected', true);

    this._panesList[this.state.current].setAttribute('is-active', '');
    this._panesList[this.state.current].setAttribute('aria-hidden', false);
  }

  changePane(index) {
    this.hidePane();
    this.showPane(index);


    const event = new CustomEvent(
      'tabChanged',
      {
        detail: {
          currentPane: this.state.current
        },
        bubbles: true,
        cancelable: true
      }
    );

    this._container.dispatchEvent(event);
  };

  selectorClickHandler(e) {
    const target = e.target;

    if (target !== this._selectorListContainer) {
      if (!target.matches('[data-tab-selector]')) {
        if (hasInParents(target, '[data-tab-selector]')) {
          target = hasInParents(target, '[data-tab-selector]');
        } else {
          target = null
        }
      }

      if (target && !target.hasAttribute('is-active')) {
        this.changePane(target.getAttribute('data-tab-selector-id'));
      }
    }
  };
}
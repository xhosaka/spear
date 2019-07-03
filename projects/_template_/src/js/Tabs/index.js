import './style.scss';

function Tabs(selector, startPaneIndex) {
  var startPaneIndex = startPaneIndex || 0,
    tabSelectors = selector.querySelectorAll('[data-tab-selector]'),
    tabSelectorsContainer = tabSelectors[0].parentNode,
    tabPanes = selector.querySelectorAll('[data-tab-pane]');

  this.selector = selector;

  var state = {
    currentTabPane: null,
    quantity: tabSelectors.length
  };

  this.refresh = function() {
    this.unBindHandlers();

    for (var i = 0; i < state.quantity; i++) {
      if (tabSelectors[i].hasAttribute('data-tab-selector--is-active'))
        tabSelectors[i].removeAttribute('data-tab-selector--is-active');

      if (tabPanes[i].hasAttribute('data-tab-pane--is-active'))
        tabPanes[i].removeAttribute('data-tab-pane--is-active');

      tabSelectors[i].setAttribute('data-tab-selector-id', i);
      tabPanes[i].setAttribute('data-tab-pane-id', i);
    }
    this.changeTabPane(startPaneIndex);
  };

  this.unBindHandlers = function() {
    tabSelectorsContainer.removeEventListener('click', selectorClickHandler.bind(this));
  };

  this.changeTabPane = index => {
    if (state.currentTabPane !== null) {
      tabSelectors[state.currentTabPane].removeAttribute('data-tab-selector--is-active');
      tabSelectors[state.currentTabPane].setAttribute('aria-selected', false);

      tabPanes[state.currentTabPane].removeAttribute('data-tab-pane--is-active');
      tabPanes[state.currentTabPane].setAttribute('aria-hidden', true);
    }

    state.currentTabPane = index;

    tabSelectors[state.currentTabPane].setAttribute('data-tab-selector--is-active', '');
    tabSelectors[state.currentTabPane].setAttribute('aria-selected', true);

    tabPanes[state.currentTabPane].setAttribute('data-tab-pane--is-active', '');
    tabPanes[state.currentTabPane].setAttribute('aria-hidden', false);
    this.test = index;

    const event = new CustomEvent('tabChanged', {
      detail: {
        currentTabPane: state.currentTabPane
      },
      bubbles: true,
      cancelable: true
    });

    this.selector.dispatchEvent(event);
  };

  var hasInParents = function(node, attrs) {
    if (node.matches('[data-tab-selector]') || node.id === attrs) return node;
    if (node.parentNode) return hasInParents(node.parentNode, attrs);
    return false;
  };

  var selectorClickHandler = function(e) {
    var target = e.target;

    if (target !== tabSelectorsContainer) {
      if (!target.matches('[data-tab-selector]')) {
        if (hasInParents(target, '[data-tab-selector]')) {
          target = hasInParents(target, '[data-tab-selector]');
        } else {
          target = null;
        }
      }

      if (target && !target.hasAttribute('data-tab-selector--is-active')) {
        this.changeTabPane(target.getAttribute('data-tab-selector-id'));
      }
    }
  };

  this.refresh();
  tabSelectorsContainer.addEventListener('click', selectorClickHandler.bind(this), false);
}

import './style.scss';

function Accordion({
  selector,
  oneItem = false, // при true будет раскрываться только один элемент аккордеона
  itemSelector = null,
  buttonSelector = null,
  contentSelector = null,
  contentInnerSelector = null
}) {

  const setDataAttr = (nodeList, attr, className) => {
    Array.prototype.slice.call(nodeList).forEach(item => {
      item.setAttribute(attr, '');
      className && item.classList.add(className);
    });
  };

  itemSelector && setDataAttr(itemSelector, 'data-accordion-item', 'accordion__item');
  buttonSelector && setDataAttr(buttonSelector, 'data-accordion-button', 'accordion__button');
  contentSelector && setDataAttr(contentSelector, 'data-accordion-content', 'accordion__content');
  contentInnerSelector && setDataAttr(contentInnerSelector, 'data-accordion-content-inner');

  if (!selector.classList.contains('accordion')) selector.classList.add('accordion');
  

  this.state = {
    currentItem: null
  };

  this.toggleContent = index => {
    const item = selector.querySelectorAll('[data-accordion-item]')[index],
          button = selector.querySelectorAll('[data-accordion-button]')[index],
          content = selector.querySelectorAll('[data-accordion-content]')[index];

    !item.classList.contains('is-active') ? item.classList.add('is-active') : item.classList.remove('is-active');



    toggleSlide(content, () => {
      if (item.classList.contains('is-active')) {
        content.setAttribute('aria-hidden', false);
        button.setAttribute('aria-expanded', true);
      } else {
        content.setAttribute('aria-hidden', true);
        button.setAttribute('aria-expanded', false);
      }
    });

    this.state.currentItem = this.state.currentItem !== index ? index : null;
  };

  const buttonClickHandler = (e) => {
    if (oneItem) return false;

    if (!e.target.matches('[data-accordion-button]') && !hasParent(e.target, '[data-accordion-button]')) return false;

    const item = e.target.parentNode;
    const itemIndex = Array.prototype.slice.call(item.parentNode.children).indexOf(item);

    if (oneItem && this.state.currentItem !== null && this.state.currentItem !== itemIndex) this.toggleContent(this.state.currentItem);

    this.toggleContent(itemIndex);
  };

  selector.addEventListener('click', buttonClickHandler);
}
const loadScript = (source, beforeEl, async = true, defer = true) => {
  return new Promise((resolve, reject) => {
    if (source && typeof source === 'string') {
      let script = document.createElement('script');
      const prior = beforeEl || document.getElementsByTagName('script')[0];

      script.async = async;
      script.defer = defer;

      const onloadHandler = (_, isAbort) => {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
          script.onload = null;
          script.onreadystatechange = null;
          script = undefined;

          if (isAbort) {
            reject();
          } else {
            resolve();
          }
        }
      };

      script.onload = onloadHandler;
      script.onreadystatechange = onloadHandler;

      script.src = `${source}?v=${getDeployHash}`;
      prior.parentNode.insertBefore(script, prior);
    }
  });
};

const observeElement = ({
  element,
  marginValue = 200,
  callback = {},
}) => {
  if (element && typeof element === 'string') {
    const targets = document.querySelectorAll(element);
    const targetsConfig = {
      rootMargin: `${marginValue}px 0px ${marginValue}px 0px`,
      threshold: 0,
    };

    const elementObserver = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          self.unobserve(entry.target);
          callback(entry.target);
        }
      });
    }, targetsConfig);

    if (targets) {
      Array.prototype.slice.call(targets).forEach((target) => {
        elementObserver.observe(target);
      });
    }
  }
};

const hasParent = (el, parent, stopEl) => {
  if (el.parentNode === document.documentElement || el.parentNode.matches(stopEl)) return false;

  if (el.parentNode.matches(parent)) {
    return true;
  } else {
    hasParent(el.parentNode, parent);
  } 
};


function toggleSlide(block) {
  !block.offsetHeight ? slideDown(block) : slideUp(block); 
}

function slideUp(block) {
  // if (!block.offsetHeight) return false;
  
  block.style.height = '0';
}

function slideDown(block) {
  // if (block.offsetHeight) return false;
  
  block.style.height = `${block.children[0].offsetHeight}px`;
}

function is_touch_device() {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  const mq = query => {
    return window.matchMedia(query).matches;
  };

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}


function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

var wrapAll = (query, tag) => {
  document.querySelectorAll( query ).forEach( elem => {
    const div = document.createElement(tag);
    elem.parentElement.insertBefore(div, elem);
    div.appendChild(elem);
  });
};

function wrapInner(parent, wrapper) {
  if (typeof wrapper === "string") wrapper = document.createElement(wrapper);

  var div = parent.appendChild(wrapper);

  while(parent.firstChild !== wrapper)
    wrapper.appendChild(parent.firstChild);
}




// generate ie11 polyfills!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
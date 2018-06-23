!function() {
  function $(sel, parent = document) {
    return parent.querySelector(sel);
  }

  $.all = (sel, parent = document) => parent.querySelectorAll(sel);

  $.find = curry($);

  $.findAll = curry($.all);

  $.closest = curry((sel, el) => el.closest(sel));

  $.els = htmlStr => {
    const container = document.createElement('div');
    container.innerHTML = htmlStr;
    return container.children;
  };

  $.el = pipe($.els, first);

  $.append = curry((parent, child) => parent.appendChild(child));

  $.on = function(el, event, sel, f, ...opts) {
    if (typeof el == 'string') return el => $.on(el, ...arguments);
    if (typeof sel != 'string') return el.addEventListener(event, sel, f);

    el.addEventListener(event, e => go(
      el,
      $.findAll(sel),
      find(el => el.contains(e.target)),
      currentTarget =>
        currentTarget &&
        f(defaults({ originalEvent: e, currentTarget, delegateTarget: el }, e))
    ));
    return el;
  };

  $.remove = el => el.parentNode.removeChild(el);

  $.text = el => el.textContent;

  $.setVal = curry((value, el) => el.value = value);
  $.val = el => el.value;

  window.$ = $;
} ();


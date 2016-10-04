(function(window) {
  var $ = window.$ = window.$ || {},
      document = window.document;

  $.update = update;

  function update(newSpec, node) {
    var oldSpec = {};
    if (node && node.nodeName === newSpec.name.toUpperCase()) {
      oldSpec = node.__spec || {};
    }
    else {
      node = document.createElement(newSpec.name);
    }

    childNodes(node, newSpec.nodes || []);
    attributes(node, oldSpec.attrs || {}, newSpec.attrs || {});
    properties(node, oldSpec.props || {}, newSpec.props || {});
    events(node, oldSpec.events || {}, newSpec.events || {});

    node.__spec = newSpec;
    return node;
  }


  function events(elt, oldEvents, newEvents) {
    var name;
    for (name in oldEvents) if (newEvents[name] !== oldEvents[name]) {
      elt.removeEventListener(name, oldEvents[name]);
    }
    for (name in newEvents) if (newEvents[name] !== oldEvents[name]) {
      elt.addEventListener(name, newEvents[name]);
    }
  }


  function attributes(elt, oldAttrs, newAttrs) {
    var name;
    for (name in oldAttrs) if (!(name in newAttrs)) {
      elt.removeAttribute(name);
    }
    for (name in newAttrs) if (newAttrs[name] !== oldAttrs[name]) {
      elt.setAttribute(name, newAttrs[name]);
    }
  }


  function properties(elt, oldProps, newProps) {
    var name;
    for (name in oldProps) if (!(name in newProps)) {
      elt[name] = null;
    }
    for (name in newProps) {
      elt[name] = newProps[name];
    }
  }


  function text(text, node) {
    if (node && node.nodeType === 3) {
      if (node.nodeValue !== text) {
        node.nodeValue = text;
      }
      return node;
    }
    return document.createTextNode(text);
  }


  function childNodes(elt, newNodes) {
    var i, node, child, nodes = elt.childNodes;
    for (i = 0; i < newNodes.length; i++) {
      node = null;
      child = newNodes[i];
      if (child !== null) {
        if (typeof child === 'object') {
          if (typeof child.render === 'function') {
            node = update(child.render(), nodes[i]);
            child.model = child.model || {};
            child.model.__ref = node;
          }
          else {
            node = update(child, nodes[i]);
          }
        }
        else {
          node = text('' + child, nodes[i]);
        }
      }
      if (node && node !== nodes[i]) {
        elt.insertBefore(node, nodes[i]);
      }
    }
    while (nodes[i]) {
      elt.removeChild(nodes[i]);
    }
  }
})(this);

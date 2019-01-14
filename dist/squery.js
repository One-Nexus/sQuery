(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getModuleNamespace;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Get the Module name from a Synergy query
 * 
 * @param {*} query 
 * @param {Bool} strict
 */
function getModuleNamespace(query, componentGlue, modifierGlue) {
  var strict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (query instanceof HTMLElement) {
    if (query.hasAttribute('data-module')) {
      return query.getAttribute('data-module');
    }

    if (query.classList.length) {
      if (strict) {
        return query.classList[0].split(modifierGlue)[0].split(componentGlue)[0];
      }

      return query.classList[0].split(modifierGlue)[0];
    }
  }

  if (typeof query === 'string' && query.match("^[a-zA-Z0-9_-]+$")) {
    return query;
  }

  if (_typeof(query) === 'object' && 'name' in query) {
    return query.name;
  }

  if (query && query.constructor === Array) {
    return query[1];
  }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getComponents;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_isValidSelector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parent__ = __webpack_require__(8);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }




/**
 * @param {*} componentName 
 */

function getComponents() {
  var _this = this;

  var componentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var modifier = arguments.length > 1 ? arguments[1] : undefined;
  var namespace = arguments.length > 2 ? arguments[2] : undefined;
  if (componentName && !Object(__WEBPACK_IMPORTED_MODULE_1__utilities_isValidSelector__["a" /* default */])(componentName)) return [];

  if (this.DOMNodes instanceof NodeList) {
    return _toConsumableArray(this.DOMNodes).reduce(function (matches, node) {
      return matches.concat.apply(matches, _toConsumableArray(getComponents.bind(Object.assign(_this, {
        DOMNodes: node
      }))(componentName, modifier, namespace)));
    }, []);
  }

  if (componentName.indexOf('modifier(') === 0) return;
  namespace = namespace || this.namespace || Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(this.DOMNodes, this.componentGlue, this.modifierGlue, 'strict');
  var query = namespace + (componentName ? this.componentGlue + componentName : '');
  var selector = ".".concat(query, ", [class*=\"").concat(query + this.modifierGlue, "\"]");

  if (!componentName) {
    selector = "[class*=\"".concat(query + this.componentGlue, "\"]");
  }

  var subComponents = _toConsumableArray(this.DOMNodes.querySelectorAll(selector)).filter(function (component) {
    var parentModule = __WEBPACK_IMPORTED_MODULE_2__parent__["a" /* default */].bind(Object.assign(_this, {
      DOMNodes: component
    }))(namespace);
    var parentElementIsModule = _this.parentElement ? _this.parentElement.matches(".".concat(namespace, ", [class*=\"").concat(namespace, "-\"]")) : false;

    if (parentElementIsModule && _this.parentElement !== parentModule) {
      return false;
    }

    return _toConsumableArray(component.classList).some(function (className) {
      var isComponent = className.split(_this.componentGlue).length - 1 === 1;
      var isQueryMatch = className.indexOf(query) === 0;

      if (modifier) {
        return isQueryMatch && isComponent && className.indexOf(modifier) > -1;
      } else {
        return isQueryMatch && isComponent;
      }
    });
  }); // console.log(subComponents)


  return subComponents;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isValidSelector;
/**
 * Test the validity (not existance) of a CSS selector
 * 
 * @param {String} selector - the selector to test for validity
 * 
 * @returns {Bool}
 * 
 * @example isValidSelector('[data-foo-bar]') // returns true
 * @example isValidSelector(4) // returns false
 */
function isValidSelector(selector) {
  if (!selector || typeof selector !== 'string') return false;
  var stub = document.createElement('br');
  stub.textContent = 'Hello!';

  try {
    selector && stub.querySelector(selector);
  } catch (e) {
    return false;
  }

  return true;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["fizzBuzz"] = fizzBuzz;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__addModifier__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return __WEBPACK_IMPORTED_MODULE_0__addModifier__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "addModifier", function() { return __WEBPACK_IMPORTED_MODULE_0__addModifier__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "component", function() { return __WEBPACK_IMPORTED_MODULE_1__component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return __WEBPACK_IMPORTED_MODULE_1__component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__find__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "find", function() { return __WEBPACK_IMPORTED_MODULE_2__find__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getComponent__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__getComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getComponents__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getComponents", function() { return __WEBPACK_IMPORTED_MODULE_4__getComponents__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__getModifiers__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getModifiers", function() { return __WEBPACK_IMPORTED_MODULE_5__getModifiers__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__getSubComponent__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getSubComponent", function() { return __WEBPACK_IMPORTED_MODULE_6__getSubComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__getSubComponents__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getSubComponents", function() { return __WEBPACK_IMPORTED_MODULE_7__getSubComponents__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__hasModifier__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "has", function() { return __WEBPACK_IMPORTED_MODULE_8__hasModifier__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "hasModifier", function() { return __WEBPACK_IMPORTED_MODULE_8__hasModifier__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__is__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return __WEBPACK_IMPORTED_MODULE_9__is__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__isComponent__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isComponent", function() { return __WEBPACK_IMPORTED_MODULE_10__isComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__modifier__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "modifier", function() { return __WEBPACK_IMPORTED_MODULE_11__modifier__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__removeModifier__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "removeModifier", function() { return __WEBPACK_IMPORTED_MODULE_12__removeModifier__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__parent__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "parent", function() { return __WEBPACK_IMPORTED_MODULE_13__parent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__parentComponent__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "parentComponent", function() { return __WEBPACK_IMPORTED_MODULE_14__parentComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__setComponent__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "setComponent", function() { return __WEBPACK_IMPORTED_MODULE_15__setComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__subComponent__ = __webpack_require__(26);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "subComponent", function() { return __WEBPACK_IMPORTED_MODULE_16__subComponent__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "subComponents", function() { return __WEBPACK_IMPORTED_MODULE_16__subComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__unsetComponent__ = __webpack_require__(27);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "unsetComponent", function() { return __WEBPACK_IMPORTED_MODULE_17__unsetComponent__["a"]; });


















function fizzBuzz(test) {
  console.log(test);
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isComponent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__ = __webpack_require__(0);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


/**
 * @param {*} componentName 
 */

function isComponent(componentName) {
  var _this = this;

  if (this.DOMNodes instanceof NodeList) {
    return _toConsumableArray(this.DOMNodes).every(function (DOMNodes) {
      return isComponent.bind(Object.assign(_this, {
        DOMNodes: DOMNodes
      }))(componentName);
    });
  }

  return _toConsumableArray(this.DOMNodes.classList).some(function (className) {
    var isAComponent = className.split(_this.componentGlue).length - 1 === 1;
    var query = (_this.namespace || Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(_this.DOMNodes, _this.componentGlue, _this.modifierGlue, 'strict')) + _this.componentGlue + componentName;
    var isMatch = query.indexOf(_this.componentGlue + componentName) > -1;
    return className.indexOf(query) === 0 && isAComponent && isMatch;
  });
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getSubComponts;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_isValidSelector__ = __webpack_require__(2);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }



/**
 * @param {*} subComponentName 
 */

function getSubComponts(subComponentName) {
  var _this = this;

  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var modifier = arguments.length > 2 ? arguments[2] : undefined;
  if (subComponentName && !Object(__WEBPACK_IMPORTED_MODULE_1__utilities_isValidSelector__["a" /* default */])(subComponentName)) return [];

  if (this.DOMNodes instanceof NodeList) {
    return _toConsumableArray(this.DOMNodes).reduce(function (matches, DOMNodes) {
      return matches.concat.apply(matches, _toConsumableArray(getSubComponts.bind(Object.assign(_this, {
        DOMNodes: DOMNodes
      }))(subComponentName, context, modifier)));
    }, []);
  }

  var namespace = this.namespace || Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(this.DOMNodes, this.componentGlue, this.modifierGlue) || '';
  var depth = namespace.split(this.componentGlue).length - 1;

  if (context.length) {
    namespace = [namespace].concat(context, [subComponentName]).join(this.componentGlue);
  } else if (subComponentName) {
    namespace = namespace + this.componentGlue + subComponentName;
  }

  var selector = ".".concat(namespace, ", [class*=\"").concat(namespace + this.modifierGlue, "\"]");

  if (!subComponentName) {
    selector = "[class*=\"".concat(namespace + this.componentGlue, "\"]");
  }

  return _toConsumableArray(this.DOMNodes.querySelectorAll(selector)).filter(function (subComponent) {
    return _toConsumableArray(subComponent.classList).some(function (className) {
      if ((className.match(new RegExp(_this.componentGlue, 'g')) || []).length < 2) {
        return false;
      }

      var namespaceMatch;

      if (modifier) {
        namespaceMatch = className.indexOf(namespace) === 0 && className.indexOf(modifier) > -1;
      } else {
        namespaceMatch = className.indexOf(namespace) === 0;
      }

      var depthMatch = className.split(_this.componentGlue).length - 1 === (context.length ? depth : depth + 1);
      return depth ? namespaceMatch && depthMatch : namespaceMatch;
    });
  });
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = hasModifier;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__ = __webpack_require__(0);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


/**
 * @param {*} modifier 
 */

function hasModifier(modifier) {
  var _this = this;

  if (modifier) {
    if (modifier.constructor === Array) {
      return modifier.every(function (_modifier) {
        return hasModifier.bind(_this)(_modifier);
      });
    }

    if (this.DOMNodes instanceof NodeList) {
      return _toConsumableArray(this.DOMNodes).every(function (DOMNodes) {
        return hasModifier.bind(Object.assign(_this, {
          DOMNodes: DOMNodes
        }))(modifier);
      });
    }

    var node = this.DOMNodes;
    return _toConsumableArray(node.classList).some(function (className) {
      var namespace = _this.namespace || node.namespace || Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(node, _this.modifierGlue, _this.componentGlue);
      var matchIndex = className.indexOf(_this.modifierGlue + modifier);
      var namespaceMatch = className.indexOf(namespace) === 0;
      var isModifierTest1 = className.indexOf(_this.modifierGlue + modifier + _this.modifierGlue) > -1;
      var isModifierTest2 = matchIndex > -1 && matchIndex === className.length - modifier.length - 1;
      return namespaceMatch && (isModifierTest1 || isModifierTest2);
    });
  }
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addModifier;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__ = __webpack_require__(0);

/**
 * @param {(String|Array)} modifier 
 */

function addModifier(modifier) {
  var _this = this;

  if (this.DOMNodes instanceof NodeList) {
    return this.DOMNodes.forEach(function (node) {
      return addModifier.bind(Object.assign(_this, {
        DOMNodes: node
      }))(modifier);
    });
  }

  if (modifier.constructor === Array) {
    modifier = modifier.join(this.modifierGlue);
  }

  var namespace = this.namespace || Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(this.DOMNodes, this.componentGlue, this.modifierGlue);
  this.DOMNodes.classList.add(namespace + this.modifierGlue + modifier);
  return this.DOMNodes;
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__ = __webpack_require__(0);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


/**
 * @param {(String|'module'|'component')} query 
 */

function parent(query, namespace) {
  var _this = this;

  if (query === 'module') {
    return _toConsumableArray(this.DOMNodes).map(function (node) {
      return node.parentNode.closest('[data-module]');
    });
  }

  if (query === 'component') {
    return _toConsumableArray(this.DOMNodes).map(function (node) {
      return node.parentNode.closest('[data-component]');
    });
  }

  if (query && typeof query === 'string') {
    var moduleMatch = function moduleMatch() {
      var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.DOMNodes;
      var parentModule;

      if (nodes instanceof NodeList) {
        return _toConsumableArray(nodes).map(function (node) {
          return moduleMatch(node);
        });
      }

      parentModule = nodes.parentNode.closest("[data-module=\"".concat(query, "\"]"));

      if (parentModule) {
        return parentModule;
      }

      parentModule = nodes.closest(".".concat(query, ", [class*=\"").concat(query + _this.modifierGlue, "\"]"));

      if (parentModule && Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(parentModule, _this.componentGlue, _this.modifierGlue, 'strict') === query) {
        return parentModule;
      }
    };

    var componentMatch = function componentMatch() {
      var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.DOMNodes;
      namespace = namespace || Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(nodes, _this.componentGlue, _this.modifierGlue, 'strict');
      var parentModule, selector;

      if (nodes instanceof NodeList) {
        return _toConsumableArray(nodes).map(function (node) {
          return componentMatch(node);
        });
      }

      parentModule = nodes.parentNode.closest("[data-component=\"".concat(query, "\"]"));

      if (parentModule) {
        return parentModule;
      }

      parentModule = nodes.parentNode.closest(".".concat(namespace + _this.componentGlue + query));

      if (parentModule) {
        return parentModule;
      }

      selector = "[class*=\"".concat(namespace + _this.componentGlue, "\"][class*=\"").concat(_this.componentGlue + query, "\"]");
      parentModule = nodes.parentNode.closest(selector);

      if (parentModule) {
        return parentModule;
      }
    };

    if (this.DOMNodes instanceof HTMLElement) {
      return moduleMatch() || componentMatch();
    }

    return moduleMatch()[0] ? moduleMatch() : componentMatch();
  }
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = removeModifier;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__ = __webpack_require__(0);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


/**
 * @param {(String|Array)} modifier 
 */

function removeModifier(modifier) {
  var _this = this;

  if (modifier.constructor === Array) {
    return modifier.forEach(function (_modifier) {
      removeModifier.bind(Object.assign(_this))(_modifier);
    });
  }

  if (this.DOMNodes instanceof NodeList) {
    return this.DOMNodes.forEach(function (node) {
      return removeModifier.bind(Object.assign(_this, {
        DOMNodes: node
      }))(modifier);
    });
  }

  var node = this.DOMNodes;

  _toConsumableArray(node.classList).forEach(function (className) {
    var moduleMatch = className.indexOf((_this.namespace || Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(node, _this.componentGlue, _this.modifierGlue)) + _this.modifierGlue) === 0;
    var modifierMatch = className.indexOf(_this.modifierGlue + modifier) > -1;
    var newClass = className.replace(new RegExp(_this.modifierGlue + modifier, 'g'), '');

    if (moduleMatch && modifierMatch) {
      node.classList.remove(className);
      node.classList.add(newClass);
    }
  });
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = sQuery;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_getConfig__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_getDomNodes__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilities_getModuleNamespace__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_init__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["add"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "addModifier", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["addModifier"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "component", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["component"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["components"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "find", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["find"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["getComponent"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getComponents", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["getComponents"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getModifiers", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["getModifiers"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getSubComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["getSubComponent"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getSubComponents", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["getSubComponents"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "has", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["has"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "hasModifier", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["hasModifier"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["is"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["isComponent"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "modifier", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["modifier"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "removeModifier", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["removeModifier"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "parent", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["parent"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "parentComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["parentComponent"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "setComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["setComponent"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "subComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["subComponent"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "subComponents", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["subComponents"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "unsetComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__api__["unsetComponent"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getModuleNamespace", function() { return __WEBPACK_IMPORTED_MODULE_2__utilities_getModuleNamespace__["a"]; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







/**
 * @param {*} SynergyQuery
 * @param {Function} [callback]
 * @param {Object} [defaults]
 * @param {Object} [custom]
 * @param {Object} [parser]
 */

function sQuery(SynergyQuery, callback, defaults, custom, parser) {
  var methods = {};
  var config = Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getConfig__["a" /* default */])(defaults, custom, parser);
  var componentGlue = config.componentGlue || window.Synergy && window.Synergy.componentGlue || '_';
  var modifierGlue = config.modifierGlue || window.Synergy && window.Synergy.modifierGlue || '-';
  var namespace = Object(__WEBPACK_IMPORTED_MODULE_2__utilities_getModuleNamespace__["a" /* default */])(SynergyQuery, componentGlue, modifierGlue);
  var DOMNodes = Object(__WEBPACK_IMPORTED_MODULE_1__utilities_getDomNodes__["a" /* default */])(SynergyQuery);

  var _arr = Object.entries(__WEBPACK_IMPORTED_MODULE_4__api__);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        key = _arr$_i[0],
        method = _arr$_i[1];

    methods[key] = method.bind({
      namespace: namespace,
      DOMNodes: DOMNodes,
      componentGlue: componentGlue,
      modifierGlue: modifierGlue
    });
  }

  if (typeof callback === 'function') {
    if (DOMNodes instanceof NodeList) {
      DOMNodes.forEach(function (node) {
        return callback(node, config);
      });
    } else {
      callback(node, DOMNodes);
    }
  }

  return Object.assign(methods, {
    namespace: namespace,
    DOMNodes: DOMNodes,
    DOMNode: DOMNodes ? DOMNodes[0] : null
  });
}

sQuery.init = __WEBPACK_IMPORTED_MODULE_3__utilities_init__["a" /* default */];

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConfig;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_deep_extend__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_deep_extend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_deep_extend__);

/**
 * @param {*} defaults 
 * @param {*} custom 
 * @param {*} parser 
 */

function getConfig(defaults, custom, parser) {
  var extendedConfig = __WEBPACK_IMPORTED_MODULE_0_deep_extend___default()(defaults, custom);

  if (typeof parser === 'function') {
    return parser(extendedConfig);
  }

  return extendedConfig;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * @description Recursive object extending
 * @author Viacheslav Lotsmanov <lotsmanov89@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2018 Viacheslav Lotsmanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */



function isSpecificValue(val) {
	return (
		val instanceof Buffer
		|| val instanceof Date
		|| val instanceof RegExp
	) ? true : false;
}

function cloneSpecificValue(val) {
	if (val instanceof Buffer) {
		var x = Buffer.alloc
			? Buffer.alloc(val.length)
			: new Buffer(val.length);
		val.copy(x);
		return x;
	} else if (val instanceof Date) {
		return new Date(val.getTime());
	} else if (val instanceof RegExp) {
		return new RegExp(val);
	} else {
		throw new Error('Unexpected situation');
	}
}

/**
 * Recursive cloning array.
 */
function deepCloneArray(arr) {
	var clone = [];
	arr.forEach(function (item, index) {
		if (typeof item === 'object' && item !== null) {
			if (Array.isArray(item)) {
				clone[index] = deepCloneArray(item);
			} else if (isSpecificValue(item)) {
				clone[index] = cloneSpecificValue(item);
			} else {
				clone[index] = deepExtend({}, item);
			}
		} else {
			clone[index] = item;
		}
	});
	return clone;
}

function safeGetProperty(object, property) {
	return property === '__proto__' ? undefined : object[property];
}

/**
 * Extening object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
var deepExtend = module.exports = function (/*obj_1, [obj_2], [obj_N]*/) {
	if (arguments.length < 1 || typeof arguments[0] !== 'object') {
		return false;
	}

	if (arguments.length < 2) {
		return arguments[0];
	}

	var target = arguments[0];

	// convert arguments to array and cut off target object
	var args = Array.prototype.slice.call(arguments, 1);

	var val, src, clone;

	args.forEach(function (obj) {
		// skip argument if isn't an object, is null, or is an array
		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
			return;
		}

		Object.keys(obj).forEach(function (key) {
			src = safeGetProperty(target, key); // source value
			val = safeGetProperty(obj, key); // new value

			// recursion prevention
			if (val === target) {
				return;

			/**
			 * if new value isn't object then just overwrite by new value
			 * instead of extending.
			 */
			} else if (typeof val !== 'object' || val === null) {
				target[key] = val;
				return;

			// just clone arrays (and recursive clone objects inside)
			} else if (Array.isArray(val)) {
				target[key] = deepCloneArray(val);
				return;

			// custom cloning and overwrite for specific objects
			} else if (isSpecificValue(val)) {
				target[key] = cloneSpecificValue(val);
				return;

			// overwrite by new value if source isn't object or array
			} else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
				target[key] = deepExtend({}, val);
				return;

			// source value and new value is objects both, extending...
			} else {
				target[key] = deepExtend(src, val);
				return;
			}
		});
	});

	return target;
};


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getDomNodes;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__isValidSelector__ = __webpack_require__(2);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/**
 * Find matching DOM nodes against passed Synergy query
 * 
 * @param {*} query 
 */

function getDomNodes(query) {
  if (query instanceof NodeList) {
    return query;
  }

  if (query instanceof HTMLElement) {
    return query;
  }

  if (query instanceof Array) {
    return getDomNodes(query[0]);
  }

  if (Object(__WEBPACK_IMPORTED_MODULE_0__isValidSelector__["a" /* default */])(query) && document.querySelectorAll(query).length) {
    return document.querySelectorAll(query);
  }

  if (_typeof(query) === 'object' && query.name) {
    return getDomNodes(query.name);
  }

  if (typeof query === 'string' && query.match("^[a-zA-Z0-9_-]+$")) {
    return document.querySelectorAll(".".concat(query, ", [class*=\"").concat(query, "-\"]"));
  }
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(3);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


function init(custom) {
  var options = Object.assign({
    elementProto: true,
    nodeListProto: true,
    preset: 'Synergy',
    attachToWindow: true,
    alterMethodName: ['sQuery']
  }, custom);
  options.alterMethodName = options.alterMethodName || [];
  var PRESETS = {
    BEM: ['__', '--', 'block', 'element', 'modifier'],
    Synergy: ['_', '-', 'module', 'component', 'modifier']
  };

  var _ref = _toConsumableArray(PRESETS[options.preset]),
      componentGlue = _ref[0],
      modifierGlue = _ref[1],
      moduleNamespace = _ref[2],
      componentNamespace = _ref[3],
      modifierNamespace = _ref[4];

  componentGlue = options.componentGlue || componentGlue;
  modifierGlue = options.modifierGlue || modifierGlue;

  if (options.attachToWindow) {
    window.sQuery = this;
    window.Synergy = window.Synergy || {};
    Object.assign(window.Synergy, {
      componentGlue: componentGlue,
      modifierGlue: modifierGlue
    });
  }

  var _arr = Object.entries(__WEBPACK_IMPORTED_MODULE_0__api__);

  var _loop = function _loop() {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        key = _arr$_i[0],
        method = _arr$_i[1];

    var methodName = key,
        newMethodName = void 0;

    if (options.alterMethodName.length) {
      var moduleUpperCase = moduleNamespace[0].toUpperCase() + moduleNamespace.substring(1);
      var componentUpperCase = componentNamespace[0].toUpperCase() + componentNamespace.substring(1);
      var modifierUpperCase = modifierNamespace[0].toUpperCase() + modifierNamespace.substring(1);

      if (methodName.toLowerCase().indexOf('module') > -1) {
        newMethodName = methodName.replace(new RegExp('module', 'g'), moduleNamespace);
      }

      if (methodName.toLowerCase().indexOf('Module') > -1) {
        newMethodName = methodName.replace(new RegExp('Module', 'g'), moduleUpperCase);
      }

      if (methodName.indexOf('component') > -1) {
        newMethodName = methodName.replace(new RegExp('component', 'g'), componentNamespace);
      }

      if (methodName.indexOf('Component') > -1) {
        newMethodName = methodName.replace(new RegExp('Component', 'g'), componentUpperCase);
      }

      if (methodName.toLowerCase().indexOf('modifier') > -1) {
        newMethodName = methodName.replace(new RegExp('modifier', 'g'), modifierNamespace);
      }

      if (methodName.toLowerCase().indexOf('Modifier') > -1) {
        newMethodName = methodName.replace(new RegExp('Modifier', 'g'), modifierUpperCase);
      }

      if (options.preset !== 'Synergy' && sQuery && options.alterMethodName.includes('sQuery')) {
        sQuery[newMethodName] = function (node) {
          var _this;

          for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
          }

          return (_this = this(node))[methodName].apply(_this, params);
        };
      }
    }

    if (options.elementProto) {
      methodName = options.alterMethodName.includes('elementProto') ? newMethodName : methodName;

      if (typeof document.body[methodName] === 'undefined') {
        Element.prototype[methodName] = function () {
          return method.bind({
            DOMNodes: this,
            parentElement: this,
            componentGlue: componentGlue,
            modifierGlue: modifierGlue
          }).apply(void 0, arguments);
        };
      }
    }

    if (options.nodeListProto) {
      methodName = options.alterMethodName.includes('nodeListProto') ? newMethodName : methodName;

      NodeList.prototype[methodName] = function () {
        return method.bind({
          DOMNodes: this,
          parentElement: this,
          componentGlue: componentGlue,
          modifierGlue: modifierGlue
        }).apply(void 0, arguments);
      };
    }
  };

  for (var _i = 0; _i < _arr.length; _i++) {
    _loop();
  }
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = component;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getComponents__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isComponent__ = __webpack_require__(4);



/**
 * @param {String} componentName 
 * @param {(('find'|'is'|'set'|'unset')|Function)} operator 
 */

function component(componentName, operator) {
  var _this = this;

  var namespace = function namespace(node) {
    return _this.namespace || Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(node, _this.componentGlue, _this.modifierGlue, 'strict');
  };

  if (!componentName && !operator) {
    return __WEBPACK_IMPORTED_MODULE_1__getComponents__["a" /* default */].bind(this)();
  }

  if (!operator || operator === 'find') {
    return __WEBPACK_IMPORTED_MODULE_1__getComponents__["a" /* default */].bind(this)(componentName);
  }

  if (operator === 'is') {
    return __WEBPACK_IMPORTED_MODULE_2__isComponent__["a" /* default */].bind(this)(componentName);
  }

  if (operator === 'set') {
    if (this.DOMNodes instanceof NodeList) {
      this.DOMNodes.forEach(function (node) {
        return node.classList.add(namespace(node) + _this.componentGlue + componentName);
      });
    } else {
      this.DOMNodes.classList.add(namespace(this.DOMNodes) + this.componentGlue + componentName);
    }
  }

  if (operator === 'unset') {
    if (this.DOMNodes instanceof NodeList) {
      this.DOMNodes.forEach(function (node) {
        return node.classList.remove(namespace(node) + _this.componentGlue + componentName);
      });
    } else {
      this.DOMNodes.classList.remove(namespace(this.DOMNodes) + this.componentGlue + componentName);
    }
  }

  if (typeof operator === 'function') {
    __WEBPACK_IMPORTED_MODULE_1__getComponents__["a" /* default */].bind(this)(componentName).forEach(function (node) {
      return operator(node);
    });
  }
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = find;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_getModules__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getComponents__ = __webpack_require__(1);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




/**
 * @param {*} query 
 */

function find(query) {
  var _this = this;

  if (_typeof(query) === 'object') {
    if (this.DOMNodes instanceof NodeList) {
      return _toConsumableArray(this.DOMNodes).reduce(function (matches, node) {
        return matches.concat(getQueryFromObject.bind(_this)(query, node));
      }, []);
    }

    return getQueryFromObject.bind(this)(query, this.DOMNodes);
  }

  if (typeof query === 'string') {
    var components = __WEBPACK_IMPORTED_MODULE_2__getComponents__["a" /* default */].bind(this)(query);

    if (components.length) {
      return components;
    }

    if (Object(__WEBPACK_IMPORTED_MODULE_1__utilities_getModules__["a" /* default */])(this, query).length) {
      return Object(__WEBPACK_IMPORTED_MODULE_1__utilities_getModules__["a" /* default */])(this, query);
    }
  }
}
/**
 * @param {Object} query 
 * @param {HTMLElement} node 
 */

function getQueryFromObject(query, node) {
  var _this2 = this;

  var matches = [];

  if (query.module) {
    if (query.component) {
      return matches.concat.apply(matches, _toConsumableArray(__WEBPACK_IMPORTED_MODULE_2__getComponents__["a" /* default */].bind(this)(query.component, query.modifier, query.module)));
    }

    return matches.concat.apply(matches, _toConsumableArray(node.querySelectorAll(".".concat(query.module, ", [class*=\"").concat(query.module + query.modifierGlue, "\"]"))));
  }

  if (query.component) {
    var components = __WEBPACK_IMPORTED_MODULE_2__getComponents__["a" /* default */].bind(this)(query.component);

    if (query.modifier) {
      return matches.concat.apply(matches, _toConsumableArray(components.filter(function (component) {
        return _toConsumableArray(component.classList).some(function (className) {
          var isNamespace = className.indexOf(_this2.namespace || Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(component, _this2.componentGlue, _this2.modifierGlue)) === 0;
          var hasModifier = className.indexOf(query.modifier) > -1;
          return isNamespace && hasModifier;
        });
      })));
    }

    return matches.concat.apply(matches, _toConsumableArray(components));
  }

  if (query.modifier) {
    return;
  }
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getModules;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * @param {*} target 
 * @param {*} moduleName 
 */
function getModules(target, moduleName) {
  if (target.DOMNodes instanceof NodeList) {
    return _toConsumableArray(target.DOMNodes).reduce(function (matches, node) {
      return matches.concat.apply(matches, _toConsumableArray(node.querySelectorAll(".".concat(moduleName, ", [class*=\"").concat(moduleName + target.modifierGlue, "\"]"))));
    }, []);
  }

  return target.DOMNodes.querySelectorAll(".".concat(moduleName, ", [class*=\"").concat(moduleName + target.modifierGlue, "\"]"));
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getComponent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getComponents__ = __webpack_require__(1);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


/**
 * @param {*} componentName 
 */

function getComponent(componentName) {
  var _this = this;

  if (this.DOMNodes instanceof NodeList) {
    return _toConsumableArray(this.DOMNodes).map(function (DOMNodes) {
      return getComponent.bind(Object.assign(_this, {
        DOMNodes: DOMNodes
      }))(componentName);
    });
  }

  ;
  return __WEBPACK_IMPORTED_MODULE_0__getComponents__["a" /* default */].bind(this)(componentName)[0];
}

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getModifiers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__ = __webpack_require__(0);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


/**
 * @param {*} componentName 
 */

function getModifiers() {
  var _this = this,
      _ref;

  if (this.DOMNodes instanceof NodeList) {
    return _toConsumableArray(this.DOMNodes).reduce(function (matches, DOMNodes) {
      return matches.concat.apply(matches, _toConsumableArray(getModifiers.bind(Object.assign(_this, {
        DOMNodes: DOMNodes
      }))()));
    }, []);
  }

  return (_ref = []).concat.apply(_ref, _toConsumableArray(_toConsumableArray(this.DOMNodes.classList).filter(function (className) {
    return className.indexOf(_this.namespace || Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(_this.DOMNodes, _this.componentGlue, _this.modifierGlue)) === 0;
  }).map(function (target) {
    return target.split(_this.modifierGlue).slice(1);
  })));
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getComponent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getSubComponents__ = __webpack_require__(5);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


/**
 * @param {*} subComponentName 
 */

function getComponent(subComponentName) {
  var _this = this;

  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (this.DOMNodes instanceof NodeList) {
    return _toConsumableArray(this.DOMNodes).map(function () {
      return __WEBPACK_IMPORTED_MODULE_0__getSubComponents__["a" /* default */].bind(_this)(subComponentName, context)[0];
    });
  }

  return __WEBPACK_IMPORTED_MODULE_0__getSubComponents__["a" /* default */].bind(this)(subComponentName, context)[0];
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = is;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_isModule__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isComponent__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hasModifier__ = __webpack_require__(6);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





/**
 * @param {*} query 
 */

function is(query) {
  var _this = this;

  var DOMNodes = !(this.DOMNodes instanceof NodeList) ? [this.DOMNodes] : this.DOMNodes;

  if (_typeof(query) === 'object') {
    if (query.module) {
      if (query.component) {
        var isModuleNamespace = _toConsumableArray(DOMNodes).every(function (node) {
          return (_this.namespace || Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(node, _this.componentGlue, _this.modifierGlue, true)) === query.module;
        });

        if (query.modifier) {
          return isModuleNamespace && __WEBPACK_IMPORTED_MODULE_2__isComponent__["a" /* default */].bind(this)(query.component) && __WEBPACK_IMPORTED_MODULE_3__hasModifier__["a" /* default */].bind(this)(query.modifier);
        }

        return isModuleNamespace && __WEBPACK_IMPORTED_MODULE_2__isComponent__["a" /* default */].bind(this)(query.component);
      }

      return Object(__WEBPACK_IMPORTED_MODULE_1__utilities_isModule__["a" /* default */])(this, query.module);
    }

    if (query.component) {
      if (query.modifier) {
        return __WEBPACK_IMPORTED_MODULE_2__isComponent__["a" /* default */].bind(this)(query.component) && __WEBPACK_IMPORTED_MODULE_3__hasModifier__["a" /* default */].bind(this)(query.modifier);
      }

      return __WEBPACK_IMPORTED_MODULE_2__isComponent__["a" /* default */].bind(this)(query.component);
    }

    if (query.modifier) {
      return __WEBPACK_IMPORTED_MODULE_3__hasModifier__["a" /* default */].bind(this)(query.modifier);
    }
  }

  if (typeof query === 'string') {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__utilities_isModule__["a" /* default */])(this, query)) {
      return Object(__WEBPACK_IMPORTED_MODULE_1__utilities_isModule__["a" /* default */])(this, query);
    }

    if (__WEBPACK_IMPORTED_MODULE_2__isComponent__["a" /* default */].bind(this)(query)) {
      return __WEBPACK_IMPORTED_MODULE_2__isComponent__["a" /* default */].bind(this)(query);
    }

    if (__WEBPACK_IMPORTED_MODULE_3__hasModifier__["a" /* default */].bind(this)(query)) {
      return __WEBPACK_IMPORTED_MODULE_3__hasModifier__["a" /* default */].bind(this)(query);
    }
  }

  return false;
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isModule;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * @param {*} target 
 * @param {*} moduleName 
 */
function isModule(target, moduleName) {
  var DOMNodes = !(target.DOMNodes instanceof NodeList) ? [target.DOMNodes] : target.DOMNodes;
  return _toConsumableArray(DOMNodes).every(function (node) {
    return node.matches(".".concat(moduleName, ", [class*=\"").concat(moduleName + target.modifierGlue, "\"]"));
  });
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = modifier;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hasModifier__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__addModifier__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__removeModifier__ = __webpack_require__(9);



/**
 * @param {String} modifier 
 * @param {(('is'|'set'|'unset')|Function)} operator 
 */

function modifier(modifier, operator) {
  if (!operator || operator === 'is') {
    return __WEBPACK_IMPORTED_MODULE_0__hasModifier__["a" /* default */].bind(this)(modifier);
  }

  if (operator === 'set' || operator === 'add') {
    return __WEBPACK_IMPORTED_MODULE_1__addModifier__["a" /* default */].bind(this)(modifier);
  }

  if (operator === 'unset' || operator === 'remove') {
    return __WEBPACK_IMPORTED_MODULE_2__removeModifier__["a" /* default */].bind(this)(modifier);
  }
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parentComponent;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * @param {*} componentName 
 */
function parentComponent(componentName) {
  if (this.DOMNodes instanceof NodeList) {
    return _toConsumableArray(this.DOMNodes).map(function (node) {
      return node.parentNode.closest("[data-component=\"".concat(componentName, "\"]"));
    });
  }

  return this.DOMNodes.parentNode.closest("[data-component=\"".concat(componentName, "\"]"));
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setComponent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__ = __webpack_require__(0);

/**
 * @param {*} componentName 
 */

function setComponent(componentName, namespace, replace) {
  var _this = this;

  if (this.DOMNodes instanceof NodeList) {
    return this.DOMNodes.forEach(function (DOMNodes) {
      return setComponent.bind(Object.assign(_this, {
        DOMNodes: DOMNodes
      }))(componentName);
    });
  }

  if (!namespace && !replace) {
    replace = this.namespace || Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(this.DOMNodes, this.componentGlue, this.modifierGlue);
  }

  namespace = namespace || this.namespace || Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(this.DOMNodes, this.componentGlue, this.modifierGlue);
  this.DOMNodes.classList.add(namespace + this.componentGlue + componentName);
  this.DOMNodes.setAttribute('data-component', componentName);
  replace && this.DOMNodes.classList.remove(replace);
}

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = subComponent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getSubComponents__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_getModuleNamespace__ = __webpack_require__(0);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }



/**
 * @param {String} componentName 
 * @param {(('find'|'is')|Function)} operator 
 */

function subComponent(subComponentName, operator) {
  var _this = this;

  if (!subComponentName && !operator) {
    return __WEBPACK_IMPORTED_MODULE_0__getSubComponents__["a" /* default */].bind(this)();
  }

  if (!operator || operator === 'find') {
    return __WEBPACK_IMPORTED_MODULE_0__getSubComponents__["a" /* default */].bind(this)(subComponentName);
  }

  if (operator === 'is') {
    if (this.DOMNodes instanceof NodeList) {
      return _toConsumableArray(this.DOMNodes).every(function (node) {
        return is.bind(_this)(node, subComponentName);
      });
    }

    return is.bind(this)(this.DOMNodes, subComponentName);
  }

  if (typeof operator === 'function') {
    __WEBPACK_IMPORTED_MODULE_0__getSubComponents__["a" /* default */].bind(this)(subComponentName).forEach(function (node) {
      return operator(node);
    });
  }
}
/**
 * @param {HTMLElement} node 
 * @param {String} subComponentName 
 */

function is(node, subComponentName) {
  var query = this.namespace || Object(__WEBPACK_IMPORTED_MODULE_1__utilities_getModuleNamespace__["a" /* default */])(node, this.componentGlue, this.modifierGlue);
  var isMatch = query.indexOf(subComponentName) === query.length - subComponentName.length;
  return _toConsumableArray(node.classList).some(function (className) {
    return className.indexOf(query) > -1 && isMatch;
  });
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = unsetComponent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__ = __webpack_require__(0);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


/**
 * @param {*} componentName 
 */

function unsetComponent(componentName) {
  var _this = this;

  if (this.DOMNodes instanceof NodeList) {
    return this.DOMNodes.forEach(function (DOMNodes) {
      return unsetComponent.bind(Object.assign(_this, {
        DOMNodes: DOMNodes
      }))(componentName);
    });
  }

  return _toConsumableArray(this.DOMNodes.classList).forEach(function (className) {
    var isAComponent = className.split(_this.componentGlue).length - 1 === 1;
    var isMatch = className.indexOf((_this.namespace || Object(__WEBPACK_IMPORTED_MODULE_0__utilities_getModuleNamespace__["a" /* default */])(_this.DOMNodes, _this.componentGlue, _this.modifierGlue)) + _this.componentGlue + componentName) === 0;

    if (isAComponent && isMatch) {
      _this.DOMNodes.classList.remove(className);
    }
  });
}

/***/ })
/******/ ]);
});
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var api_namespaceObject = {};
__webpack_require__.r(api_namespaceObject);
__webpack_require__.d(api_namespaceObject, "add", function() { return addModifier; });
__webpack_require__.d(api_namespaceObject, "addModifier", function() { return addModifier; });
__webpack_require__.d(api_namespaceObject, "component", function() { return component_component; });
__webpack_require__.d(api_namespaceObject, "components", function() { return component_component; });
__webpack_require__.d(api_namespaceObject, "find", function() { return find; });
__webpack_require__.d(api_namespaceObject, "getComponent", function() { return getComponent; });
__webpack_require__.d(api_namespaceObject, "getComponents", function() { return getComponents; });
__webpack_require__.d(api_namespaceObject, "getModifiers", function() { return getModifiers; });
__webpack_require__.d(api_namespaceObject, "getSubComponent", function() { return getSubComponent_getComponent; });
__webpack_require__.d(api_namespaceObject, "getSubComponents", function() { return getSubComponents; });
__webpack_require__.d(api_namespaceObject, "has", function() { return hasModifier_hasModifier; });
__webpack_require__.d(api_namespaceObject, "hasModifier", function() { return hasModifier_hasModifier; });
__webpack_require__.d(api_namespaceObject, "is", function() { return is; });
__webpack_require__.d(api_namespaceObject, "isComponent", function() { return isComponent; });
__webpack_require__.d(api_namespaceObject, "modifier", function() { return modifier_modifier; });
__webpack_require__.d(api_namespaceObject, "removeModifier", function() { return removeModifier; });
__webpack_require__.d(api_namespaceObject, "parent", function() { return parent_parent; });
__webpack_require__.d(api_namespaceObject, "parentComponent", function() { return parentComponent; });
__webpack_require__.d(api_namespaceObject, "setComponent", function() { return setComponent; });
__webpack_require__.d(api_namespaceObject, "subComponent", function() { return subComponent; });
__webpack_require__.d(api_namespaceObject, "subComponents", function() { return subComponent; });
__webpack_require__.d(api_namespaceObject, "unsetComponent", function() { return unsetComponent; });

// CONCATENATED MODULE: ./src/utilities/getConfig.js
/**
 * @param {*} defaults 
 * @param {*} custom 
 * @param {*} parser 
 */
function getConfig(defaults, custom, parser) {
  var extendedConfig;

  if (process.env.SYNERGY) {
    extendedConfig = deepExtend(defaults, custom);
  } else if (typeof deepExtend !== 'undefined') {
    extendedConfig = deepExtend(defaults, custom);
  } else {
    extendedConfig = __webpack_require__(0)(defaults, custom);
  }

  if (typeof parser === 'function') {
    return parser(extendedConfig);
  }

  return extendedConfig;
}
// CONCATENATED MODULE: ./src/utilities/isValidSelector.js
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
// CONCATENATED MODULE: ./src/utilities/getDomNodes.js
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

  if (isValidSelector(query) && document.querySelectorAll(query).length) {
    return document.querySelectorAll(query);
  }

  if (_typeof(query) === 'object' && query.name) {
    return getDomNodes(query.name);
  }

  if (typeof query === 'string' && query.match("^[a-zA-Z0-9_-]+$")) {
    return document.querySelectorAll(".".concat(query, ", [class*=\"").concat(query, "-\"]"));
  }
}
// CONCATENATED MODULE: ./src/utilities/getModuleNamespace.js
function getModuleNamespace_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { getModuleNamespace_typeof = function _typeof(obj) { return typeof obj; }; } else { getModuleNamespace_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return getModuleNamespace_typeof(obj); }

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

  if (getModuleNamespace_typeof(query) === 'object' && 'name' in query) {
    return query.name;
  }

  if (query && query.constructor === Array) {
    return query[1];
  }
}
// CONCATENATED MODULE: ./src/api/addModifier.js

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

  var namespace = this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue);
  this.DOMNodes.classList.add(namespace + this.modifierGlue + modifier);
  return this.DOMNodes;
}
// CONCATENATED MODULE: ./src/api/parent.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


/**
 * @param {(String|'module'|'component')} query 
 */

function parent_parent(query, namespace) {
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

      if (parentModule && getModuleNamespace(parentModule, _this.componentGlue, _this.modifierGlue, 'strict') === query) {
        return parentModule;
      }
    };

    var componentMatch = function componentMatch() {
      var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.DOMNodes;
      namespace = namespace || getModuleNamespace(nodes, _this.componentGlue, _this.modifierGlue, 'strict');
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
// CONCATENATED MODULE: ./src/api/getComponents.js



/**
 * @param {*} componentName 
 */

function getComponents() {
  var _this = this;

  var componentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var modifier = arguments.length > 1 ? arguments[1] : undefined;
  var namespace = arguments.length > 2 ? arguments[2] : undefined;
  if (componentName && !isValidSelector(componentName)) return [];

  if (this.DOMNodes instanceof NodeList) {
    return Array.prototype.slice.call(this.DOMNodes).reduce(function (matches, node) {
      return matches.concat(Array.prototype.slice.call(getComponents.bind(Object.assign(_this, {
        DOMNodes: node
      }))(componentName, modifier, namespace)));
    }, []);
  }

  if (componentName.indexOf('modifier(') === 0) return;
  namespace = namespace || this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue, 'strict');
  var query = namespace + (componentName ? this.componentGlue + componentName : '');
  var selector = ".".concat(query, ", [class*=\"").concat(query + this.modifierGlue, "\"]");

  if (!componentName) {
    selector = "[class*=\"".concat(query + this.componentGlue, "\"]");
  }

  var subComponents = Array.prototype.slice.call(this.DOMNodes.querySelectorAll(selector)).filter(function (component) {
    var parentModule = parent_parent.bind(Object.assign(_this, {
      DOMNodes: component
    }))(namespace);
    var parentElementIsModule = _this.parentElement ? _this.parentElement.matches(".".concat(namespace, ", [class*=\"").concat(namespace, "-\"]")) : false;

    if (parentElementIsModule && _this.parentElement !== parentModule) {
      return false;
    }

    return Array.prototype.slice.call(component.classList).some(function (className) {
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
// CONCATENATED MODULE: ./src/api/isComponent.js

/**
 * @param {*} componentName 
 */

function isComponent(componentName) {
  var _this = this;

  if (this.DOMNodes instanceof NodeList) {
    return Array.prototype.slice.call(this.DOMNodes).every(function (DOMNodes) {
      return isComponent.bind(Object.assign(_this, {
        DOMNodes: DOMNodes
      }))(componentName);
    });
  }

  return Array.prototype.slice.call(this.DOMNodes.classList).some(function (className) {
    var isAComponent = className.split(_this.componentGlue).length - 1 === 1;
    var query = (_this.namespace || getModuleNamespace(_this.DOMNodes, _this.componentGlue, _this.modifierGlue, 'strict')) + _this.componentGlue + componentName;
    var isMatch = query.indexOf(_this.componentGlue + componentName) > -1;
    return className.indexOf(query) === 0 && isAComponent && isMatch;
  });
}
// CONCATENATED MODULE: ./src/api/component.js



/**
 * @param {String} componentName 
 * @param {(('find'|'is'|'set'|'unset')|Function)} operator 
 */

function component_component(componentName, operator) {
  var _this = this;

  var namespace = function namespace(node) {
    return _this.namespace || getModuleNamespace(node, _this.componentGlue, _this.modifierGlue, 'strict');
  };

  if (!componentName && !operator) {
    return getComponents.bind(this)();
  }

  if (!operator || operator === 'find') {
    return getComponents.bind(this)(componentName);
  }

  if (operator === 'is') {
    return isComponent.bind(this)(componentName);
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
    getComponents.bind(this)(componentName).forEach(function (node) {
      return operator(node);
    });
  }
}
// CONCATENATED MODULE: ./src/utilities/getModules.js
/**
 * @param {*} target 
 * @param {*} moduleName 
 */
function getModules(target, moduleName) {
  if (target.DOMNodes instanceof NodeList) {
    return Array.prototype.slice.call(this.DOMNodes).reduce(function (matches, node) {
      return matches.concat(Array.prototype.slice.call(node.querySelectorAll(".".concat(moduleName, ", [class*=\"").concat(moduleName + target.modifierGlue, "\"]"))));
    }, []);
  }

  return target.DOMNodes.querySelectorAll(".".concat(moduleName, ", [class*=\"").concat(moduleName + target.modifierGlue, "\"]"));
}
// CONCATENATED MODULE: ./src/api/find.js
function find_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { find_typeof = function _typeof(obj) { return typeof obj; }; } else { find_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return find_typeof(obj); }




/**
 * @param {*} query 
 */

function find(query) {
  var _this = this;

  if (find_typeof(query) === 'object') {
    if (this.DOMNodes instanceof NodeList) {
      return Array.prototype.slice.call(this.DOMNodes).reduce(function (matches, node) {
        return matches.concat(getQueryFromObject.bind(_this)(query, node));
      }, []);
    }

    return getQueryFromObject.bind(this)(query, this.DOMNodes);
  }

  if (typeof query === 'string') {
    var components = getComponents.bind(this)(query);

    if (components.length) {
      return components;
    }

    if (getModules(this, query).length) {
      return getModules(this, query);
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
      return matches.concat(Array.prototype.slice.call(getComponents.bind(this)(query.component, query.modifier, query.module)));
    }

    return matches.concat(Array.prototype.slice.call(node.querySelectorAll(".".concat(query.module, ", [class*=\"").concat(query.module + query.modifierGlue, "\"]"))));
  }

  if (query.component) {
    var components = getComponents.bind(this)(query.component);

    if (query.modifier) {
      return matches.concat(Array.prototype.slice.call(components.filter(function (component) {
        return Array.prototype.slice.call(component.classList).some(function (className) {
          var isNamespace = className.indexOf(_this2.namespace || getModuleNamespace(component, _this2.componentGlue, _this2.modifierGlue)) === 0;
          var hasModifier = className.indexOf(query.modifier) > -1;
          return isNamespace && hasModifier;
        });
      })));
    }

    return matches.concat(Array.prototype.slice.call(components));
  }

  if (query.modifier) {
    return;
  }
}
// CONCATENATED MODULE: ./src/api/getComponent.js

/**
 * @param {*} componentName 
 */

function getComponent(componentName) {
  var _this = this;

  if (this.DOMNodes instanceof NodeList) {
    return Array.prototype.slice.call(this.DOMNodes).map(function (DOMNodes) {
      return getComponent.bind(Object.assign(_this, {
        DOMNodes: DOMNodes
      }))(componentName);
    });
  }

  ;
  return getComponents.bind(this)(componentName)[0];
}
// CONCATENATED MODULE: ./src/api/getModifiers.js

/**
 * @param {*} componentName 
 */

function getModifiers() {
  var _this = this;

  if (this.DOMNodes instanceof NodeList) {
    return Array.prototype.slice.call(this.DOMNodes).reduce(function (matches, DOMNodes) {
      return matches.concat(getModifiers.bind(Object.assign(_this, {
        DOMNodes: DOMNodes
      }))());
    }, []);
  }

  return Array.prototype.slice.call(this.DOMNodes.classList).filter(function (className) {
    return className.indexOf(_this.namespace || getModuleNamespace(_this.DOMNodes, _this.componentGlue, _this.modifierGlue)) === 0;
  }).map(function (target) {
    return target.split(_this.modifierGlue).slice(1);
  })[0];
}
// CONCATENATED MODULE: ./src/api/getSubComponents.js


/**
 * @param {*} subComponentName 
 */

function getSubComponents(subComponentName) {
  var _this = this;

  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var modifier = arguments.length > 2 ? arguments[2] : undefined;
  if (subComponentName && !isValidSelector(subComponentName)) return [];

  if (this.DOMNodes instanceof NodeList) {
    return Array.prototype.slice.call(this.DOMNodes).reduce(function (matches, DOMNodes) {
      return matches.concat(Array.prototype.slice.call(getSubComponents.bind(Object.assign(_this, {
        DOMNodes: DOMNodes
      }))(subComponentName, context, modifier)));
    }, []);
  }

  var namespace = this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue) || '';
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

  return Array.prototype.slice.call(this.DOMNodes.querySelectorAll(selector)).filter(function (subComponent) {
    return Array.prototype.slice.call(subComponent.classList).some(function (className) {
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
// CONCATENATED MODULE: ./src/api/getSubComponent.js

/**
 * @param {*} subComponentName 
 */

function getSubComponent_getComponent(subComponentName) {
  var _this = this;

  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (this.DOMNodes instanceof NodeList) {
    return Array.prototype.slice.call(this.DOMNodes).map(function () {
      return getSubComponents.bind(_this)(subComponentName, context)[0];
    });
  }

  return getSubComponents.bind(this)(subComponentName, context)[0];
}
// CONCATENATED MODULE: ./src/api/hasModifier.js

/**
 * @param {*} modifier 
 */

function hasModifier_hasModifier(modifier) {
  var _this = this;

  if (modifier) {
    if (modifier.constructor === Array) {
      return modifier.every(function (_modifier) {
        return hasModifier_hasModifier.bind(_this)(_modifier);
      });
    }

    if (this.DOMNodes instanceof NodeList) {
      return Array.prototype.slice.call(this.DOMNodes).every(function (DOMNodes) {
        return hasModifier_hasModifier.bind(Object.assign(_this, {
          DOMNodes: DOMNodes
        }))(modifier);
      });
    }

    var node = this.DOMNodes;
    return Array.prototype.slice.call(node.classList).some(function (className) {
      var namespace = _this.namespace || node.namespace || getModuleNamespace(node, _this.modifierGlue, _this.componentGlue);
      var matchIndex = className.indexOf(_this.modifierGlue + modifier);
      var namespaceMatch = className.indexOf(namespace) === 0;
      var isModifierTest1 = className.indexOf(_this.modifierGlue + modifier + _this.modifierGlue) > -1;
      var isModifierTest2 = matchIndex > -1 && matchIndex === className.length - modifier.length - 1;
      return namespaceMatch && (isModifierTest1 || isModifierTest2);
    });
  }
}
// CONCATENATED MODULE: ./src/utilities/isModule.js
/**
 * @param {*} target 
 * @param {*} moduleName 
 */
function isModule(target, moduleName) {
  var DOMNodes = !(target.DOMNodes instanceof NodeList) ? [target.DOMNodes] : target.DOMNodes;
  return Array.prototype.slice.call(DOMNodes).every(function (node) {
    return node.matches(".".concat(moduleName, ", [class*=\"").concat(moduleName + target.modifierGlue, "\"]"));
  });
}
// CONCATENATED MODULE: ./src/api/is.js
function is_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { is_typeof = function _typeof(obj) { return typeof obj; }; } else { is_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return is_typeof(obj); }





/**
 * @param {*} query 
 */

function is(query) {
  var _this = this;

  var DOMNodes = !(this.DOMNodes instanceof NodeList) ? [this.DOMNodes] : this.DOMNodes;

  if (is_typeof(query) === 'object') {
    if (query.module) {
      if (query.component) {
        var isModuleNamespace = Array.prototype.slice.call(DOMNodes).every(function (node) {
          return (_this.namespace || getModuleNamespace(node, _this.componentGlue, _this.modifierGlue, true)) === query.module;
        });

        if (query.modifier) {
          return isModuleNamespace && isComponent.bind(this)(query.component) && hasModifier_hasModifier.bind(this)(query.modifier);
        }

        return isModuleNamespace && isComponent.bind(this)(query.component);
      }

      return isModule(this, query.module);
    }

    if (query.component) {
      if (query.modifier) {
        return isComponent.bind(this)(query.component) && hasModifier_hasModifier.bind(this)(query.modifier);
      }

      return isComponent.bind(this)(query.component);
    }

    if (query.modifier) {
      return hasModifier_hasModifier.bind(this)(query.modifier);
    }
  }

  if (typeof query === 'string') {
    if (isModule(this, query)) {
      return isModule(this, query);
    }

    if (isComponent.bind(this)(query)) {
      return isComponent.bind(this)(query);
    }

    if (hasModifier_hasModifier.bind(this)(query)) {
      return hasModifier_hasModifier.bind(this)(query);
    }
  }

  return false;
}
// CONCATENATED MODULE: ./src/api/removeModifier.js

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
  Array.prototype.slice.call(node.classList).forEach(function (className) {
    var moduleMatch = className.indexOf((_this.namespace || getModuleNamespace(node, _this.componentGlue, _this.modifierGlue)) + _this.modifierGlue) === 0;
    var modifierMatch = className.indexOf(_this.modifierGlue + modifier) > -1;
    var newClass = className.replace(new RegExp(_this.modifierGlue + modifier, 'g'), '');

    if (moduleMatch && modifierMatch) {
      node.classList.remove(className);
      node.classList.add(newClass);
    }
  });
}
// CONCATENATED MODULE: ./src/api/modifier.js



/**
 * @param {String} modifier 
 * @param {(('is'|'set'|'unset')|Function)} operator 
 */

function modifier_modifier(modifier, operator) {
  if (!operator || operator === 'is') {
    return hasModifier_hasModifier.bind(this)(modifier);
  }

  if (operator === 'set' || operator === 'add') {
    return addModifier.bind(this)(modifier);
  }

  if (operator === 'unset' || operator === 'remove') {
    return removeModifier.bind(this)(modifier);
  }
}
// CONCATENATED MODULE: ./src/api/parentComponent.js
/**
 * @param {*} componentName 
 */
function parentComponent(componentName) {
  if (this.DOMNodes instanceof NodeList) {
    return Array.prototype.slice.call(this.DOMNodes).map(function (node) {
      return node.parentNode.closest("[data-component=\"".concat(componentName, "\"]"));
    });
  }

  return this.DOMNodes.parentNode.closest("[data-component=\"".concat(componentName, "\"]"));
}
// CONCATENATED MODULE: ./src/api/setComponent.js

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
    replace = this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue);
  }

  namespace = namespace || this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue);
  this.DOMNodes.classList.add(namespace + this.componentGlue + componentName);
  this.DOMNodes.setAttribute('data-component', componentName);
  replace && this.DOMNodes.classList.remove(replace);
}
// CONCATENATED MODULE: ./src/api/subComponent.js


/**
 * @param {String} componentName 
 * @param {(('find'|'is')|Function)} operator 
 */

function subComponent(subComponentName, operator) {
  var _this = this;

  if (!subComponentName && !operator) {
    return getSubComponents.bind(this)();
  }

  if (!operator || operator === 'find') {
    return getSubComponents.bind(this)(subComponentName);
  }

  if (operator === 'is') {
    if (this.DOMNodes instanceof NodeList) {
      return Array.prototype.slice.call(this.DOMNodes).every(function (node) {
        return subComponent_is.bind(_this)(node, subComponentName);
      });
    }

    return subComponent_is.bind(this)(this.DOMNodes, subComponentName);
  }

  if (typeof operator === 'function') {
    getSubComponents.bind(this)(subComponentName).forEach(function (node) {
      return operator(node);
    });
  }
}
/**
 * @param {HTMLElement} node 
 * @param {String} subComponentName 
 */

function subComponent_is(node, subComponentName) {
  var query = this.namespace || getModuleNamespace(node, this.componentGlue, this.modifierGlue);
  var isMatch = query.indexOf(subComponentName) === query.length - subComponentName.length;
  return Array.prototype.slice.call(node.classList).some(function (className) {
    return className.indexOf(query) > -1 && isMatch;
  });
}
// CONCATENATED MODULE: ./src/api/unsetComponent.js

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

  return Array.prototype.slice.call(this.DOMNodes.classList).forEach(function (className) {
    var isAComponent = className.split(_this.componentGlue).length - 1 === 1;
    var isMatch = className.indexOf((_this.namespace || getModuleNamespace(_this.DOMNodes, _this.componentGlue, _this.modifierGlue)) + _this.componentGlue + componentName) === 0;

    if (isAComponent && isMatch) {
      _this.DOMNodes.classList.remove(className);
    }
  });
}
// CONCATENATED MODULE: ./src/api/index.js


















// CONCATENATED MODULE: ./src/utilities/init.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


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

  var _Array$prototype$slic = Array.prototype.slice.call(PRESETS[options.preset]),
      _Array$prototype$slic2 = _slicedToArray(_Array$prototype$slic, 5),
      componentGlue = _Array$prototype$slic2[0],
      modifierGlue = _Array$prototype$slic2[1],
      moduleNamespace = _Array$prototype$slic2[2],
      componentNamespace = _Array$prototype$slic2[3],
      modifierNamespace = _Array$prototype$slic2[4];

  componentGlue = options.componentGlue || componentGlue;
  modifierGlue = options.modifierGlue || modifierGlue;

  if (options.attachToWindow) {
    window.Synergy = window.Synergy || {};
    Object.assign(window.Synergy, {
      componentGlue: componentGlue,
      modifierGlue: modifierGlue
    });
  }

  var _arr2 = Object.entries(api_namespaceObject);

  var _loop = function _loop() {
    var _arr2$_i = _slicedToArray(_arr2[_i2], 2),
        key = _arr2$_i[0],
        method = _arr2$_i[1];

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

  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    _loop();
  }
}
// CONCATENATED MODULE: ./src/squery.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return squery_sQuery; });
/* concated harmony reexport add */__webpack_require__.d(__webpack_exports__, "add", function() { return addModifier; });
/* concated harmony reexport addModifier */__webpack_require__.d(__webpack_exports__, "addModifier", function() { return addModifier; });
/* concated harmony reexport component */__webpack_require__.d(__webpack_exports__, "component", function() { return component_component; });
/* concated harmony reexport components */__webpack_require__.d(__webpack_exports__, "components", function() { return component_component; });
/* concated harmony reexport find */__webpack_require__.d(__webpack_exports__, "find", function() { return find; });
/* concated harmony reexport getComponent */__webpack_require__.d(__webpack_exports__, "getComponent", function() { return getComponent; });
/* concated harmony reexport getComponents */__webpack_require__.d(__webpack_exports__, "getComponents", function() { return getComponents; });
/* concated harmony reexport getModifiers */__webpack_require__.d(__webpack_exports__, "getModifiers", function() { return getModifiers; });
/* concated harmony reexport getSubComponent */__webpack_require__.d(__webpack_exports__, "getSubComponent", function() { return getSubComponent_getComponent; });
/* concated harmony reexport getSubComponents */__webpack_require__.d(__webpack_exports__, "getSubComponents", function() { return getSubComponents; });
/* concated harmony reexport has */__webpack_require__.d(__webpack_exports__, "has", function() { return hasModifier_hasModifier; });
/* concated harmony reexport hasModifier */__webpack_require__.d(__webpack_exports__, "hasModifier", function() { return hasModifier_hasModifier; });
/* concated harmony reexport is */__webpack_require__.d(__webpack_exports__, "is", function() { return is; });
/* concated harmony reexport isComponent */__webpack_require__.d(__webpack_exports__, "isComponent", function() { return isComponent; });
/* concated harmony reexport modifier */__webpack_require__.d(__webpack_exports__, "modifier", function() { return modifier_modifier; });
/* concated harmony reexport removeModifier */__webpack_require__.d(__webpack_exports__, "removeModifier", function() { return removeModifier; });
/* concated harmony reexport parent */__webpack_require__.d(__webpack_exports__, "parent", function() { return parent_parent; });
/* concated harmony reexport parentComponent */__webpack_require__.d(__webpack_exports__, "parentComponent", function() { return parentComponent; });
/* concated harmony reexport setComponent */__webpack_require__.d(__webpack_exports__, "setComponent", function() { return setComponent; });
/* concated harmony reexport subComponent */__webpack_require__.d(__webpack_exports__, "subComponent", function() { return subComponent; });
/* concated harmony reexport subComponents */__webpack_require__.d(__webpack_exports__, "subComponents", function() { return subComponent; });
/* concated harmony reexport unsetComponent */__webpack_require__.d(__webpack_exports__, "unsetComponent", function() { return unsetComponent; });
function squery_slicedToArray(arr, i) { return squery_arrayWithHoles(arr) || squery_iterableToArrayLimit(arr, i) || squery_nonIterableRest(); }

function squery_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function squery_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function squery_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






 // spoof env process to assis bundle size

if (typeof process === 'undefined') {
  window.process = {
    env: {}
  };
}
/**
 * @param {*} SynergyQuery
 * @param {Function} [callback]
 * @param {Object} [defaults]
 * @param {Object} [custom]
 * @param {Object} [parser]
 */


function squery_sQuery(SynergyQuery, callback, defaults, custom, parser) {
  var methods = {};
  var config = getConfig(defaults, custom, parser);
  var componentGlue = config.componentGlue || window.Synergy && window.Synergy.componentGlue || '_';
  var modifierGlue = config.modifierGlue || window.Synergy && window.Synergy.modifierGlue || '-';
  var namespace = getModuleNamespace(SynergyQuery, componentGlue, modifierGlue);
  var DOMNodes = getDomNodes(SynergyQuery);

  var _arr = Object.entries(api_namespaceObject);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = squery_slicedToArray(_arr[_i], 2),
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
squery_sQuery.init = init;

var squery_arr2 = Object.entries(api_namespaceObject);

for (var squery_i2 = 0; squery_i2 < squery_arr2.length; squery_i2++) {
  var _arr2$_i = squery_slicedToArray(squery_arr2[squery_i2], 2),
      squery_key = _arr2$_i[0],
      squery_method = _arr2$_i[1];

  squery_sQuery[squery_key] = squery_method;
}

if (typeof window !== 'undefined') {
  window.sQuery = squery_sQuery;
}



/***/ })
/******/ ]);
});
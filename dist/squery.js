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
__webpack_require__.d(api_namespaceObject, "getModules", function() { return getModules; });
__webpack_require__.d(api_namespaceObject, "getSubComponent", function() { return getSubComponent; });
__webpack_require__.d(api_namespaceObject, "getSubComponents", function() { return getSubComponents; });
__webpack_require__.d(api_namespaceObject, "has", function() { return hasModifier; });
__webpack_require__.d(api_namespaceObject, "hasModifier", function() { return hasModifier; });
__webpack_require__.d(api_namespaceObject, "is", function() { return is; });
__webpack_require__.d(api_namespaceObject, "isComponent", function() { return isComponent; });
__webpack_require__.d(api_namespaceObject, "isModule", function() { return isModule; });
__webpack_require__.d(api_namespaceObject, "modifier", function() { return modifier_modifier; });
__webpack_require__.d(api_namespaceObject, "module", function() { return module_module; });
__webpack_require__.d(api_namespaceObject, "modules", function() { return module_module; });
__webpack_require__.d(api_namespaceObject, "parent", function() { return parent_parent; });
__webpack_require__.d(api_namespaceObject, "parentModule", function() { return parentModule; });
__webpack_require__.d(api_namespaceObject, "remove", function() { return removeModifier; });
__webpack_require__.d(api_namespaceObject, "removeModifier", function() { return removeModifier; });
__webpack_require__.d(api_namespaceObject, "setComponent", function() { return setComponent; });
__webpack_require__.d(api_namespaceObject, "subComponent", function() { return subComponent_subComponent; });
__webpack_require__.d(api_namespaceObject, "subComponents", function() { return subComponent_subComponent; });
__webpack_require__.d(api_namespaceObject, "toggle", function() { return toggleModifier; });
__webpack_require__.d(api_namespaceObject, "toggleModifier", function() { return toggleModifier; });
__webpack_require__.d(api_namespaceObject, "toggleModifiers", function() { return toggleModifier; });
__webpack_require__.d(api_namespaceObject, "unsetComponent", function() { return unsetComponent; });

// CONCATENATED MODULE: ./src/utilities/getConfig.js
/**
 * @param {*} defaults 
 * @param {*} custom 
 * @param {*} parser 
 */
function getConfig(defaults, custom, parser) {
  var extendedConfig; // `process` and `require` are exploited to help reduce bundle size

  if (process.env.SYNERGY) {
    extendedConfig = Synergy.config(defaults, custom);
  } else if (typeof Synergy !== 'undefined' && typeof Synergy.config === 'function') {
    extendedConfig = Synergy.config(defaults, custom);
  } else {
    extendedConfig = __webpack_require__(0)(defaults, custom);
  }

  if (typeof parser === 'function') {
    return parser(extendedConfig);
  }

  return extendedConfig;
}
// CONCATENATED MODULE: ./src/utilities/isValidSelector.js
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
// CONCATENATED MODULE: ./src/utilities/getDOMNodes.js
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
    return [query];
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
// CONCATENATED MODULE: ./src/utilities/getNamespace.js
function getNamespace_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { getNamespace_typeof = function _typeof(obj) { return typeof obj; }; } else { getNamespace_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return getNamespace_typeof(obj); }

function getNamespace(query, strict, config) {
  config = Object.assign(this || {}, config || {});
  var _config = config,
      namespace = _config.namespace,
      modifierGlue = _config.modifierGlue,
      componentGlue = _config.componentGlue;

  if (query instanceof HTMLElement) {
    if (query.hasAttribute('data-module')) {
      return query.getAttribute('data-module');
    }

    if (query.classList.length) {
      var targetClass;

      if (namespace) {
        targetClass = [].slice.call(query.classList).filter(function (className) {
          return className.indexOf(namespace) === 0;
        })[0];
      }

      if (!namespace || !targetClass) {
        targetClass = query.classList[0];
      }

      if (strict) {
        return targetClass.split(modifierGlue)[0];
      }

      return targetClass.split(modifierGlue)[0].split(componentGlue)[0];
    }

    if (namespace) {
      return namespace;
    }
  }

  if (typeof query === 'string' && query.match("^[a-zA-Z0-9_-]+$")) {
    return query;
  }

  if (query && getNamespace_typeof(query) === 'object' && query.name) {
    return query.name;
  }

  if (query && query.constructor === Array) {
    return query[1];
  }
}
// CONCATENATED MODULE: ./src/squery.js



/** */

function squery_sQuery(SynergyQuery, callback, defaults, custom, parser, API) {
  API = API || this;
  var Synergy = window.Synergy || {};
  squery_sQuery.config = squery_sQuery.config || {};
  var methods = {};
  var config = getConfig(defaults, custom, parser);
  var modifierGlue = config.modifierGlue || Synergy.modifierGlue || '-';
  var componentGlue = config.componentGlue || Synergy.componentGlue || '_';
  var multipleClasses = config.multipleClasses || Synergy.multipleClasses || false;
  var namespace = getNamespace(SynergyQuery, false, {
    componentGlue: componentGlue,
    modifierGlue: modifierGlue
  });
  var DOMNodes = getDomNodes(SynergyQuery);

  var _arr = Object.entries(API);

  for (var _i = 0; _i < _arr.length; _i++) {
    var entry = _arr[_i];
    var key = entry[0],
        method = entry[1];

    if (squery_sQuery.config.methods && squery_sQuery.config.methods[key]) {
      key = squery_sQuery.config.methods[key];
    }

    var internalConfig = {
      namespace: namespace,
      componentGlue: componentGlue,
      modifierGlue: modifierGlue,
      multipleClasses: multipleClasses
    };

    if (DOMNodes) {
      methods[key] = method.bind(internalConfig, DOMNodes);
    } else {
      methods[key] = method.bind(internalConfig);
    }
  }

  if (typeof callback === 'function') {
    DOMNodes.forEach(function (node) {
      return callback(node, config);
    });
  }

  return Object.assign(methods, {
    namespace: namespace,
    nodes: DOMNodes,
    node: DOMNodes ? DOMNodes[0] : null
  });
}

/* harmony default export */ var squery = (squery_sQuery);
// CONCATENATED MODULE: ./src/utilities/init.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function init(custom, API) {
  API = API || this;
  var Synergy = window.Synergy || {};
  var options = Object.assign({
    elementProto: true,
    nodeListProto: true,
    preset: 'Synergy',
    Synergy: true,
    alterMethodName: ['sQuery'],
    componentGlue: typeof sQuery !== 'undefined' && Synergy.componentGlue,
    modifierGlue: typeof sQuery !== 'undefined' && Synergy.modifierGlue,
    multipleClasses: typeof sQuery !== 'undefined' && Synergy.multipleClasses
  }, custom);
  options.alterMethodName = options.alterMethodName || [];
  var PRESETS = {
    BEM: ['__', '--', 'block', 'element', 'modifier', true],
    Synergy: ['_', '-', 'module', 'component', 'modifier', false]
  };

  var _slice$call = [].slice.call(PRESETS[options.preset]),
      _slice$call2 = _slicedToArray(_slice$call, 6),
      componentGlue = _slice$call2[0],
      modifierGlue = _slice$call2[1],
      moduleNamespace = _slice$call2[2],
      componentNamespace = _slice$call2[3],
      modifierNamespace = _slice$call2[4],
      multipleClasses = _slice$call2[5];

  componentGlue = options.componentGlue || componentGlue;
  modifierGlue = options.modifierGlue || modifierGlue;
  multipleClasses = typeof options.multipleClasses === 'undefined' ? multipleClasses : options.multipleClasses;

  if (options.Synergy) {
    window.Synergy = Synergy;
    Object.assign(window.Synergy, {
      componentGlue: componentGlue,
      modifierGlue: modifierGlue,
      multipleClasses: multipleClasses
    });
  }

  var methods = {};

  var _arr2 = Object.entries(API);

  var _loop = function _loop() {
    var entry = _arr2[_i2];
    var key = entry[0],
        method = entry[1];
    var methodName = key,
        newMethodName = void 0;

    if (options.alterMethodName.length) {
      var moduleUpperCase = moduleNamespace[0].toUpperCase() + moduleNamespace.substring(1);
      var componentUpperCase = componentNamespace[0].toUpperCase() + componentNamespace.substring(1);
      var modifierUpperCase = modifierNamespace[0].toUpperCase() + modifierNamespace.substring(1);

      if (methodName.indexOf('module') > -1) {
        newMethodName = methodName.replace(new RegExp('module', 'g'), moduleNamespace);
      }

      if (methodName.indexOf('Module') > -1) {
        newMethodName = methodName.replace(new RegExp('Module', 'g'), moduleUpperCase);
      }

      if (methodName.indexOf('component') > -1) {
        newMethodName = methodName.replace(new RegExp('component', 'g'), componentNamespace);
      }

      if (methodName.indexOf('Component') > -1) {
        newMethodName = methodName.replace(new RegExp('Component', 'g'), componentUpperCase);
      } // @TODO do modifier renames


      if (options.preset !== 'Synergy' && sQuery && options.alterMethodName.includes('sQuery')) {
        sQuery[newMethodName] = function (node) {
          var _this;

          for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
          }

          return (_this = this(node))[methodName].apply(_this, params);
        };
      }

      methods[methodName] = newMethodName || methodName;
    }

    if (options.elementProto) {
      methodName = options.alterMethodName.includes('elementProto') ? newMethodName : methodName;

      if (Element.prototype[methodName] && Element.prototype[methodName].sQuery) {
        Element.prototype[methodName] = undefined;
      }

      if (typeof document.body[methodName] === 'undefined') {
        Element.prototype[methodName] = function () {
          for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            params[_key2] = arguments[_key2];
          }

          return method.bind({
            componentGlue: componentGlue,
            modifierGlue: modifierGlue,
            multipleClasses: multipleClasses
          }).apply(void 0, [this].concat(params));
        };

        Element.prototype[methodName].sQuery = true;
      }
    }

    if (options.nodeListProto) {
      methodName = options.alterMethodName.includes('nodeListProto') ? newMethodName : methodName; // @todo conditionally add this if not exists (and delete if previously added by sQuery)

      NodeList.prototype[methodName] = function () {
        for (var _len3 = arguments.length, params = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          params[_key3] = arguments[_key3];
        }

        return method.bind({
          componentGlue: componentGlue,
          modifierGlue: modifierGlue,
          multipleClasses: multipleClasses
        }).apply(void 0, [this].concat(params));
      };

      NodeList.prototype[methodName].sQuery = true;
    }
  };

  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    _loop();
  }

  if (typeof sQuery !== 'undefined') {
    sQuery.config = Object.assign(options, {
      methods: methods
    });
  }
}
// CONCATENATED MODULE: ./src/utilities/isSafeElement.js
function isSafeElement(node, namespace, _ref) {
  var modifierGlue = _ref.modifierGlue;

  if (node instanceof NodeList || node instanceof Array) {
    return node.every(function (node) {
      return isSafeElement(node, namespace, {
        modifierGlue: modifierGlue
      });
    });
  }

  var matchedClasses = [].slice.call(node.classList).filter(function (className) {
    var conditions = [className === namespace, className.indexOf(namespace + modifierGlue) === 0];
    return conditions.some(function (condition) {
      return !!condition;
    });
  });
  return matchedClasses.length === 1 ? matchedClasses[0] : false;
}
// CONCATENATED MODULE: ./src/api/addModifier.js


function addModifier(node, modifier, config) {
  config = Object.assign(this || {}, config || {});

  if (node instanceof NodeList || node instanceof Array) {
    return node.forEach(function (node) {
      return addModifier(node, modifier, config);
    });
  }

  var _config = config,
      modifierGlue = _config.modifierGlue;
  var namespace = config.namespace || getNamespace(node, true, config);
  var safeNamespace = isSafeElement(node, namespace, config);

  if (modifier.constructor === Array) {
    modifier = modifier.join(modifierGlue);
  }

  if (safeNamespace && !config.multipleClasses) {
    node.classList.replace(safeNamespace, safeNamespace + modifierGlue + modifier);
  } else {
    node.classList.add(namespace + modifierGlue + modifier);
  }

  if (node.repaint) {
    node.repaint();
  }

  return node;
}
// CONCATENATED MODULE: ./src/api/parent.js

function parent_parent(node, query, config) {
  config = Object.assign(this || {}, config || {});

  if (node instanceof NodeList || node instanceof Array) {
    return [].slice.call(node).map(function (node) {
      return parent_parent(node, query, config);
    });
  }

  var _config = config,
      componentGlue = _config.componentGlue,
      modifierGlue = _config.modifierGlue;
  var namespace = config.namespace || getNamespace(node, false, config);
  var $query = query || namespace;

  if ($query !== namespace) {
    $query = namespace + componentGlue + $query;
  }

  var parentComponent = $query && node.closest(".".concat($query, ", [class*='").concat($query + modifierGlue, "']"));

  if (parentComponent) {
    return parentComponent;
  }

  namespace = config.namespace || getNamespace(node, true, config);

  if (namespace && namespace.indexOf(query > -1)) {
    $query = namespace.substring(0, namespace.indexOf(query) + query.length);
  }

  var parentSubComponent = $query && node.closest(".".concat($query, ", [class*='").concat($query + modifierGlue, "']"));

  if (parentSubComponent) {
    return parentSubComponent;
  }
}
// CONCATENATED MODULE: ./src/utilities/filterElements.js


function filterElements(node, elements, subComponent, config) {
  var namespace = config.namespace || getNamespace(node, subComponent, config);
  var sourceParent = parent_parent(node, namespace, config);
  if (!sourceParent) return elements;
  elements = [].slice.call(elements).filter(function (element) {
    var targetParent = parent_parent(element, namespace, config);

    if (!targetParent) {
      return true;
    }

    return targetParent === sourceParent;
  });
  return elements;
}
// CONCATENATED MODULE: ./src/api/getComponents.js
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function getComponents(node, componentName, config) {
  config = Object.assign(this || {}, config || {});
  if (componentName && !isValidSelector(componentName)) return [];

  if (node instanceof NodeList || node instanceof Array) {
    return [].slice.call(node).reduce(function (matches, node) {
      return matches.concat([].slice.call(getComponents(node, componentName, config)));
    }, []);
  }

  var _config = config,
      subComponent = _config.subComponent,
      modifierGlue = _config.modifierGlue,
      componentGlue = _config.componentGlue;
  var namespace = config.namespace || getNamespace(node, subComponent, config);
  var components;

  if (!componentName) {
    components = node.querySelectorAll("[class*='".concat(namespace + componentGlue, "']"));
  } else {
    var query = namespace + componentGlue + componentName;
    components = node.querySelectorAll(".".concat(query, ", [class*='").concat(query + modifierGlue, "']"));
  }

  components = [].slice.call(components).filter(function (element) {
    var sourceNamespace = getNamespace(node, true, _objectSpread({}, config, {
      namespace: namespace
    }));
    var targetNamespace = getNamespace(element, true, _objectSpread({}, config, {
      namespace: namespace
    }));
    var sourceDepth = (sourceNamespace.match(new RegExp(componentGlue, 'g')) || []).length;
    var targetDepth = (targetNamespace.match(new RegExp(componentGlue, 'g')) || []).length; // Special condition: if no componentName passed and we want sub-components,
    // find ALL child sub-components, as parent modules cannot have direct
    // descendant sub-components

    if (subComponent && !componentName && sourceNamespace.indexOf(componentGlue) === -1) {
      return true;
    }

    if (subComponent && !sourceDepth) {
      return false;
    }

    if (subComponent || !sourceDepth) {
      sourceDepth++;
    }

    var modifierCriteria = true;
    var targetClass = [].slice.call(element.classList).filter(function (className) {
      return className.indexOf(namespace) === 0;
    })[0];

    if (config.modifier) {
      modifierCriteria = targetClass.indexOf(config.modifier) > -1;
    }

    if (!subComponent && sourceDepth > 1) {
      if (targetClass.split(componentGlue).length - 1 > 1) {
        return false;
      }

      return modifierCriteria;
    }

    return modifierCriteria && targetDepth === sourceDepth;
  });
  components = filterElements(node, components, subComponent, config);
  return components;
}
// CONCATENATED MODULE: ./src/api/getComponent.js

/**
 * @TODO allow this API
 * const [title, content] = panel.getComponent(['title', 'content']);
 */

function getComponent(node, componentName, config) {
  config = Object.assign(this || {}, config || {});

  if (node instanceof NodeList || node instanceof Array) {
    return [].slice.call(node).map(function (node) {
      return getComponent(node, componentName, config);
    });
  }

  ;
  return getComponents(node, componentName, config)[0];
}
// CONCATENATED MODULE: ./src/api/setComponent.js

function setComponent(node, componentName, namespace, replace, config) {
  config = Object.assign(this || {}, config || {});

  if (node instanceof NodeList || node instanceof Array) {
    return node.forEach(function (node) {
      return setComponent(node, componentName, namespace, replace, config);
    });
  }

  if (!namespace && !replace) {
    replace = config.namespace || getNamespace(node, false, config);
  }

  namespace = namespace || config.namespace || getNamespace(node, false, config);
  node.classList.add(namespace + config.componentGlue + componentName);
  node.setAttribute('data-component', componentName);
  replace && node.classList.remove(replace);
}
// CONCATENATED MODULE: ./src/api/unsetComponent.js

function unsetComponent(node, componentName, config) {
  config = Object.assign(this || {}, config || {});

  if (node instanceof NodeList || node instanceof Array) {
    return node.forEach(function (node) {
      return unsetComponent(node, componentName, config);
    });
  }

  var _config = config,
      componentGlue = _config.componentGlue;
  var namespace = config.namespace || getNamespace(node, false, config);
  return [].slice.call(node.classList).forEach(function (className) {
    var isAComponent = className.split(componentGlue).length - 1 === 1;
    var isMatch = className.indexOf(namespace + componentGlue + componentName) === 0;

    if (isAComponent && isMatch) {
      node.classList.remove(className);
    }
  });
}
// CONCATENATED MODULE: ./src/api/isComponent.js

function isComponent(node, componentName, config) {
  config = Object.assign(this || {}, config || {});

  if (node instanceof NodeList || node instanceof Array) {
    return [].slice.call(node).every(function (node) {
      return isComponent(node, componentName, config);
    });
  }

  var _config = config,
      componentGlue = _config.componentGlue;
  var namespace = config.namespace || getNamespace(node, false, config);
  return [].slice.call(node.classList).some(function (className) {
    if (config.subComponent) {
      var isASubComponent = className.split(componentGlue).length - 1 > 1;

      var _isMatch = className.indexOf(componentName) === className.length - componentName.length;

      return isASubComponent && _isMatch;
    }

    var isAComponent = className.split(componentGlue).length - 1 === 1;
    var query = namespace + componentGlue + componentName;
    var isMatch = query.indexOf(componentGlue + componentName) > -1;
    return className.indexOf(query) === 0 && isAComponent && isMatch;
  });
}
// CONCATENATED MODULE: ./src/api/component.js





function component_component(node, componentName, operator, config) {
  config = Object.assign(this || {}, config || {});

  if (!componentName && !operator) {
    return (config.getSubComponents || getComponents)(node, false, config);
  }

  if (!operator || operator === 'find') {
    return (config.getSubComponents || getComponents)(node, componentName, config);
  }

  if (operator === 'first') {
    return (config.getSubComponent || getComponent)(node, componentName, config);
  }

  if (operator === 'is') {
    return isComponent(node, componentName, config);
  }

  if (operator === 'set') {
    //@TODO setSubComponent
    return setComponent(node, componentName, null, null, config);
  }

  if (operator === 'unset') {
    //@TODO unsetSubComponent
    return unsetComponent(node, componentName, config);
  }

  if (typeof operator === 'function') {
    return getComponents(node, componentName, config).forEach(function (node) {
      return operator(node);
    });
  }
}
// CONCATENATED MODULE: ./src/api/getModules.js
function getModules(node, moduleName, config) {
  config = Object.assign(this || {}, config || {});
  var _config = config,
      modifierGlue = _config.modifierGlue;

  if (node instanceof NodeList || node instanceof Array) {
    var matchedModules = [].slice.call(node).reduce(function (matches, node) {
      var modules = [].slice.call(getModules(node, moduleName, config));
      matches = matches.filter(function (match) {
        return modules.every(function (module) {
          return module !== match;
        });
      });
      return matches.concat(modules);
    }, []);
    return matchedModules;
  }

  var potentialModules = node.querySelectorAll(".".concat(moduleName, ", [class*=\"").concat(moduleName + modifierGlue, "\"]"));
  var modules = [].slice.call(potentialModules).filter(function (potentialModule) {
    return [].slice.call(potentialModule.classList).some(function (className) {
      return className.indexOf(moduleName) === 0;
    });
  });
  return modules;
}
// CONCATENATED MODULE: ./src/api/hasModifier.js

function hasModifier(node, modifier, config) {
  config = Object.assign(this || {}, config || {});
  if (!modifier) return;

  if (modifier.constructor === Array) {
    return modifier.every(function (modifier) {
      return hasModifier(node, modifier, config);
    });
  }

  if (node instanceof NodeList || node instanceof Array) {
    return [].slice.call(node).every(function (node) {
      return hasModifier(node, modifier, config);
    });
  }

  var _config = config,
      modifierGlue = _config.modifierGlue;
  var namespace = config.namespace || node.namespace || getNamespace(node, false, config);
  return [].slice.call(node.classList).some(function (className) {
    var matchIndex = className.indexOf(modifierGlue + modifier);
    var namespaceMatch = className.indexOf(namespace) === 0;
    var isModifierTest1 = className.indexOf(modifierGlue + modifier + modifierGlue) > -1;
    var isModifierTest2 = matchIndex > -1 && matchIndex === className.length - modifier.length - modifierGlue.length;
    return namespaceMatch && (isModifierTest1 || isModifierTest2);
  });
}
// CONCATENATED MODULE: ./src/api/find.js
function find_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { find_defineProperty(target, key, source[key]); }); } return target; }

function find_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function find_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { find_typeof = function _typeof(obj) { return typeof obj; }; } else { find_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return find_typeof(obj); }




function find(node, query, config) {
  config = Object.assign(this || {}, config || {});

  if (find_typeof(query) === 'object') {
    if (node instanceof NodeList || node instanceof Array) {
      return [].slice.call(node).reduce(function (matches, node) {
        return matches.concat(getQueryFromObject(node, query, config));
      }, []);
    }

    return getQueryFromObject(node, query, config);
  }

  if (typeof query === 'string') {
    var modules = getModules(node, query, config);

    if (modules.length) {
      return modules;
    }

    var components = getComponents(node, query, config);

    if (components.length) {
      return components;
    }
  }
}

function getQueryFromObject(node, query, config) {
  config = Object.assign(this || {}, config || {});
  var module = query.module,
      component = query.component,
      modifier = query.modifier;
  var matches = [];

  if (module) {
    if (component) {
      matches = getComponents(node, component, find_objectSpread({}, config, {
        namespace: module,
        modifier: modifier
      }));
    } else {
      matches = getModules(node, module, config);
    }
  } else if (component) {
    matches = getComponents(node, component, find_objectSpread({}, config, {
      modifier: modifier
    }));
  }

  if (modifier) {
    matches = [].slice.call(matches).filter(function (match) {
      return hasModifier(match, modifier, config);
    });
  }

  return matches;
}
// CONCATENATED MODULE: ./src/api/getModifiers.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


function getModifiers(node, config) {
  config = Object.assign(this || {}, config || {});

  if (node instanceof NodeList || node instanceof Array) {
    var _modifiers = [].slice.call(node).reduce(function (matches, node) {
      return matches.concat(getModifiers(node, config));
    }, []); // remove duplicates


    _modifiers = _toConsumableArray(new Set(_modifiers));
    return _modifiers;
  }

  var _config = config,
      namespace = _config.namespace,
      modifierGlue = _config.modifierGlue;
  var targetClass = [].slice.call(node.classList).filter(function (className) {
    return className.indexOf(namespace || getNamespace(node, false, config)) === 0;
  })[0];
  var modifiers = targetClass.split(modifierGlue).slice(1);
  return modifiers;
}
// CONCATENATED MODULE: ./src/api/getSubComponents.js

function getSubComponents(node, subComponentName, config) {
  config = Object.assign(this || {}, config || {});
  config.subComponent = true;
  return getComponents(node, subComponentName, config);
}
// CONCATENATED MODULE: ./src/api/getSubComponent.js

function getSubComponent(node, componentName, config) {
  config = Object.assign(this || {}, config || {});

  if (node instanceof NodeList || node instanceof Array) {
    return [].slice.call(node).map(function (node) {
      return getSubComponent(node, componentName, config);
    });
  }

  ;
  return getSubComponents(node, componentName, config)[0];
}
// CONCATENATED MODULE: ./src/api/isModule.js
function isModule(node, moduleName, config) {
  config = Object.assign(this || {}, config || {});
  var DOMNodes = !(node instanceof NodeList || node instanceof Array) ? [node] : node;
  return [].slice.call(DOMNodes).every(function (node) {
    return node.matches(".".concat(moduleName, ", [class*=\"").concat(moduleName + config.modifierGlue, "\"]"));
  });
}
// CONCATENATED MODULE: ./src/api/is.js
function is_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { is_typeof = function _typeof(obj) { return typeof obj; }; } else { is_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return is_typeof(obj); }





function is(node, query, config) {
  config = Object.assign(this || {}, config || {});
  var namespace = config.namespace || getNamespace(node, false, config);

  if (is_typeof(query) === 'object') {
    var module = query.module,
        component = query.component,
        modifier = query.modifier;

    if (module) {
      if (component) {
        var namespaceMatch = namespace === module;
        var componentMatch = isComponent(node, component, config);

        if (modifier) {
          return namespaceMatch && componentMatch && hasModifier(node, modifier, config);
        }

        return namespaceMatch && componentMatch;
      }

      if (modifier) {
        return isModule(node, module, config) && hasModifier(node, modifier, config);
      }

      return isModule(node, module, config);
    }

    if (component) {
      if (modifier) {
        return isComponent(node, component, config) && hasModifier(node, modifier, config);
      }

      return isComponent(node, component, config);
    }

    if (modifier) {
      return hasModifier(node, modifier, config);
    }
  }

  if (typeof query === 'string') {
    if (isModule(node, query, config)) {
      return isModule(node, query, config);
    }

    if (isComponent(node, query, config)) {
      return isComponent(node, query, config);
    }

    if (hasModifier(node, query, config)) {
      return hasModifier(node, query, config);
    }
  }

  return false;
}
// CONCATENATED MODULE: ./src/api/removeModifier.js

function removeModifier(node, modifier, config) {
  config = Object.assign(this || {}, config || {});

  if (modifier.constructor === Array) {
    return modifier.forEach(function (_modifier) {
      return removeModifier(node, _modifier, config);
    });
  }

  if (node instanceof NodeList || node instanceof Array) {
    return node.forEach(function (node) {
      return removeModifier(node, modifier, config);
    });
  }

  var _config = config,
      modifierGlue = _config.modifierGlue;
  var namespace = config.namespace || getNamespace(node, true, config);
  [].slice.call(node.classList).forEach(function (className) {
    var moduleMatch = className.indexOf(namespace + modifierGlue) === 0;
    var modifierMatch = className.indexOf(modifierGlue + modifier) > -1;
    var newClass = className.replace(new RegExp(modifierGlue + modifier, 'g'), '');

    if (moduleMatch && modifierMatch) {
      node.classList.replace(className, newClass);
    }
  });

  if (node.repaint) {
    node.repaint();
  }

  return node;
}
// CONCATENATED MODULE: ./src/api/toggleModifier.js



function toggleModifier(node, modifier, config) {
  config = Object.assign(this || {}, config || {});

  if (node instanceof NodeList || node instanceof Array) {
    return node.forEach(function (node) {
      return toggleModifier(node, modifier, config);
    });
  }

  if (hasModifier(node, modifier, config)) {
    return removeModifier(node, modifier, config);
  } else {
    return addModifier(node, modifier, config);
  }
}
// CONCATENATED MODULE: ./src/api/modifier.js





function modifier_modifier(node, modifier, operator, config) {
  config = Object.assign(this || {}, config || {});

  if (!operator && !modifier) {
    return getModifiers(node, config);
  }

  if (!operator || operator === 'is') {
    return hasModifier(node, modifier, config);
  }

  if (operator === 'set' || operator === 'add') {
    return addModifier(node, modifier, config);
  }

  if (operator === 'unset' || operator === 'remove') {
    return removeModifier(node, modifier, config);
  }

  if (operator === 'toggle') {
    return toggleModifier(node, modifier, config);
  }
}
// CONCATENATED MODULE: ./src/api/module.js


function module_module(node, moduleName, operator, config) {
  config = Object.assign(this || {}, config || {});

  if (!operator || operator === 'find') {
    return getModules(node, moduleName, config);
  }

  if (operator === 'is') {
    return isModule(node, moduleName, config);
  }

  if (typeof operator === 'function') {
    return getModules(node, moduleName, config).forEach(function (node) {
      return operator(node);
    });
  }
}
// CONCATENATED MODULE: ./src/api/parentModule.js

function parentModule(node, config) {
  config = Object.assign(this || {}, config || {});

  if (node instanceof NodeList || node instanceof Array) {
    return [].slice.call(node).map(function (node) {
      return parentModule(node, config);
    });
  }

  var namespace = config.namespace || getNamespace(node, false, config);
  return node.closest(".".concat(namespace, ", [class*='").concat(namespace + config.modifierGlue, "']"));
}
// CONCATENATED MODULE: ./src/api/subComponent.js



function subComponent_subComponent(node, subComponentName, operator, config) {
  config = Object.assign(this || {}, config || {});
  config.subComponent = true;
  config.getSubComponent = getSubComponent;
  config.getSubComponents = getSubComponents;
  return component_component(node, subComponentName, operator, config);
}
// CONCATENATED MODULE: ./src/api/index.js
// addModifier
 // component

 // find

 // getComponent

 // getComponents

 // getModifiers

 // getModules

 // getSubComponent

 // getSubComponents

 // hasModifier

 // is

 // isComponent

 // isModule

 // modifier

 // module

 // parent

 // parentModule

 // removeModifier

 // setComponent

 // subComponent

 // toggleModifier

 // unsetComponent


// CONCATENATED MODULE: ./src/index.js


 // spoof env process to assist bundle size

if (typeof process === 'undefined') window.process = {
  env: {}
};
var src_sQuery = squery.bind(api_namespaceObject);
src_sQuery.init = init.bind(api_namespaceObject);

var src_arr = Object.entries(api_namespaceObject);

for (var src_i = 0; src_i < src_arr.length; src_i++) {
  var src_entry = src_arr[src_i];
  src_sQuery[src_entry[0]] = src_entry[1];
}

if (typeof window !== 'undefined') {
  window.sQuery = src_sQuery;
}

/* harmony default export */ var src = __webpack_exports__["default"] = (src_sQuery);

/***/ })
/******/ ]);
});
/******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = getModuleNamespace;
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

    if (typeof query === 'string' && query.match('^[a-zA-Z0-9_-]+$')) {
        return query;
    }

    if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object' && 'name' in query) {
        return query.name;
    }

    if (query && query.constructor === Array) {
        return query[1];
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getComponents;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

var _isValidSelector = __webpack_require__(5);

var _isValidSelector2 = _interopRequireDefault(_isValidSelector);

var _parent = __webpack_require__(8);

var _parent2 = _interopRequireDefault(_parent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {*} componentName 
 */
function getComponents() {
    var componentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _this = this;

    var modifier = arguments[1];
    var namespace = arguments[2];

    if (componentName && !(0, _isValidSelector2.default)(componentName)) return [];

    if (this.DOMNodes instanceof NodeList) {
        return [].concat(_toConsumableArray(this.DOMNodes)).reduce(function (matches, node) {
            return matches.concat.apply(matches, _toConsumableArray(getComponents.bind(Object.assign(_this, { DOMNodes: node }))(componentName, modifier, namespace)));
        }, []);
    }

    if (componentName.indexOf('modifier(') === 0) return;

    namespace = namespace || this.namespace || (0, _getModuleNamespace2.default)(this.DOMNodes, this.componentGlue, this.modifierGlue, 'strict');

    var query = namespace + (componentName ? this.componentGlue + componentName : '');

    var selector = '.' + query + ', [class*="' + (query + this.modifierGlue) + '"]';

    if (!componentName) {
        selector = '[class*="' + (query + this.componentGlue) + '"]';
    }

    var subComponents = [].concat(_toConsumableArray(this.DOMNodes.querySelectorAll(selector))).filter(function (component) {
        var parentModule = _parent2.default.bind(Object.assign(_this, { DOMNodes: component }))(namespace);
        var parentElementIsModule = _this.parentElement ? _this.parentElement.matches('.' + namespace + ', [class*="' + namespace + '-"]') : false;

        if (parentElementIsModule && _this.parentElement !== parentModule) {
            return false;
        }

        return [].concat(_toConsumableArray(component.classList)).some(function (className) {
            var isComponent = className.split(_this.componentGlue).length - 1 === 1;
            var isQueryMatch = className.indexOf(query) === 0;

            if (modifier) {
                return isQueryMatch && isComponent && className.indexOf(modifier) > -1;
            } else {
                return isQueryMatch && isComponent;
            }
        });
    });

    // console.log(subComponents)

    return subComponents;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isComponent;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {*} componentName 
 */
function isComponent(componentName) {
    var _this = this;

    if (this.DOMNodes instanceof NodeList) {
        return [].concat(_toConsumableArray(this.DOMNodes)).every(function (DOMNodes) {
            return isComponent.bind(Object.assign(_this, { DOMNodes: DOMNodes }))(componentName);
        });
    }

    return [].concat(_toConsumableArray(this.DOMNodes.classList)).some(function (className) {
        var isAComponent = className.split(_this.componentGlue).length - 1 === 1;
        var query = (_this.namespace || (0, _getModuleNamespace2.default)(_this.DOMNodes, _this.componentGlue, _this.modifierGlue, 'strict')) + _this.componentGlue + componentName;
        var isMatch = query.indexOf(_this.componentGlue + componentName) > -1;

        return className.indexOf(query) === 0 && isAComponent && isMatch;
    });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getSubComponts;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {*} subComponentName 
 */
function getSubComponts(subComponentName) {
    var _this = this;

    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var modifier = arguments[2];

    if (this.DOMNodes instanceof NodeList) {
        return [].concat(_toConsumableArray(this.DOMNodes)).reduce(function (matches, DOMNodes) {
            return matches.concat.apply(matches, _toConsumableArray(getSubComponts.bind(Object.assign(_this, { DOMNodes: DOMNodes }))(subComponentName, context, modifier)));
        }, []);
    }

    var namespace = this.namespace || (0, _getModuleNamespace2.default)(this.DOMNodes, this.componentGlue, this.modifierGlue);

    var depth = namespace.split(this.componentGlue).length - 1;

    if (context.length) {
        namespace = [namespace].concat(context, [subComponentName]).join(this.componentGlue);
    } else if (subComponentName) {
        namespace = namespace + this.componentGlue + subComponentName;
    }

    var selector = '.' + namespace + ', [class*="' + (namespace + this.modifierGlue) + '"]';

    if (!subComponentName) {
        selector = '[class*="' + (namespace + this.componentGlue) + '"]';
    }

    return [].concat(_toConsumableArray(this.DOMNodes.querySelectorAll(selector))).filter(function (subComponent) {
        return [].concat(_toConsumableArray(subComponent.classList)).some(function (className) {
            if ((className.match(new RegExp(_this.componentGlue, 'g')) || []).length < 2) {
                return false;
            }

            var namespaceMatch = void 0;

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = hasModifier;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
            return [].concat(_toConsumableArray(this.DOMNodes)).every(function (DOMNodes) {
                return hasModifier.bind(Object.assign(_this, { DOMNodes: DOMNodes }))(modifier);
            });
        }

        var node = this.DOMNodes;

        return [].concat(_toConsumableArray(node.classList)).some(function (className) {
            var namespace = _this.namespace || node.namespace || (0, _getModuleNamespace2.default)(node, _this.modifierGlue, _this.componentGlue);
            var matchIndex = className.indexOf(_this.modifierGlue + modifier);
            var namespaceMatch = className.indexOf(namespace) === 0;
            var isModifierTest1 = className.indexOf(_this.modifierGlue + modifier + _this.modifierGlue) > -1;
            var isModifierTest2 = matchIndex > -1 && matchIndex === className.length - modifier.length - 1;

            return namespaceMatch && (isModifierTest1 || isModifierTest2);
        });
    }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isValidSelector;
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

    try {
        selector && stub.querySelector(selector);
    } catch (e) {
        return false;
    }

    return true;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _addModifier = __webpack_require__(7);

Object.defineProperty(exports, 'add', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_addModifier).default;
    }
});
Object.defineProperty(exports, 'addModifier', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_addModifier).default;
    }
});

var _component = __webpack_require__(15);

Object.defineProperty(exports, 'component', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_component).default;
    }
});
Object.defineProperty(exports, 'components', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_component).default;
    }
});

var _find = __webpack_require__(16);

Object.defineProperty(exports, 'find', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_find).default;
    }
});

var _getComponent = __webpack_require__(18);

Object.defineProperty(exports, 'getComponent', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_getComponent).default;
    }
});

var _getComponents = __webpack_require__(1);

Object.defineProperty(exports, 'getComponents', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_getComponents).default;
    }
});

var _getModifiers = __webpack_require__(19);

Object.defineProperty(exports, 'getModifiers', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_getModifiers).default;
    }
});

var _getSubComponent = __webpack_require__(20);

Object.defineProperty(exports, 'getSubComponent', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_getSubComponent).default;
    }
});

var _getSubComponents = __webpack_require__(3);

Object.defineProperty(exports, 'getSubComponents', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_getSubComponents).default;
    }
});

var _hasModifier = __webpack_require__(4);

Object.defineProperty(exports, 'has', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_hasModifier).default;
    }
});
Object.defineProperty(exports, 'hasModifier', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_hasModifier).default;
    }
});

var _is = __webpack_require__(21);

Object.defineProperty(exports, 'is', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_is).default;
    }
});

var _isComponent = __webpack_require__(2);

Object.defineProperty(exports, 'isComponent', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_isComponent).default;
    }
});

var _modifier = __webpack_require__(23);

Object.defineProperty(exports, 'modifier', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_modifier).default;
    }
});

var _removeModifier = __webpack_require__(9);

Object.defineProperty(exports, 'removeModifier', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_removeModifier).default;
    }
});

var _parent = __webpack_require__(8);

Object.defineProperty(exports, 'parent', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_parent).default;
    }
});

var _parentComponent = __webpack_require__(24);

Object.defineProperty(exports, 'parentComponent', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_parentComponent).default;
    }
});

var _setComponent = __webpack_require__(25);

Object.defineProperty(exports, 'setComponent', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_setComponent).default;
    }
});

var _subComponent = __webpack_require__(26);

Object.defineProperty(exports, 'subComponent', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_subComponent).default;
    }
});
Object.defineProperty(exports, 'subComponents', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_subComponent).default;
    }
});

var _unsetComponent = __webpack_require__(27);

Object.defineProperty(exports, 'unsetComponent', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_unsetComponent).default;
    }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = addModifier;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {(String|Array)} modifier 
 */
function addModifier(modifier) {
    var _this = this;

    if (this.DOMNodes instanceof NodeList) {
        return this.DOMNodes.forEach(function (node) {
            return addModifier.bind(Object.assign(_this, { DOMNodes: node }))(modifier);
        });
    }

    if (modifier.constructor === Array) {
        modifier = modifier.join(this.modifierGlue);
    }

    var namespace = this.namespace || (0, _getModuleNamespace2.default)(this.DOMNodes, this.componentGlue, this.modifierGlue);

    this.DOMNodes.classList.add(namespace + this.modifierGlue + modifier);

    return this.DOMNodes;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parent;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {(String|'module'|'component')} query 
 */
function parent(query) {
    var _this = this;

    if (query === 'module') {
        return [].concat(_toConsumableArray(this.DOMNodes)).map(function (node) {
            return node.parentNode.closest('[data-module]');
        });
    }

    if (query === 'component') {
        return [].concat(_toConsumableArray(this.DOMNodes)).map(function (node) {
            return node.parentNode.closest('[data-component]');
        });
    }

    if (typeof query === 'string') {
        var moduleMatch = function moduleMatch() {
            var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.DOMNodes;

            var parentModule = void 0;

            if (nodes instanceof NodeList) {
                // @TODO recurse parent function instead of duplicating logic
                return [].concat(_toConsumableArray(nodes)).map(function (node) {
                    return node.parentNode.closest('[data-module="' + query + '"]');
                });
            }

            parentModule = nodes.parentNode.closest('[data-module="' + query + '"]');

            if (parentModule) {
                return parentModule;
            }

            parentModule = nodes.closest('.' + query + ', [class*="' + (query + _this.modifierGlue) + '"]');

            if (parentModule && (0, _getModuleNamespace2.default)(parentModule, _this.componentGlue, _this.modifierGlue, 'strict') === query) {
                return parentModule;
            }
        };

        var componentMatch = function componentMatch() {
            var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.DOMNodes;

            if (nodes instanceof NodeList) {
                // @TODO recurse parent function instead of duplicating logic
                return [].concat(_toConsumableArray(nodes)).map(function (node) {
                    return node.parentNode.closest('[data-component="' + query + '"]');
                });
            }

            // @TODO similar to moduleMatch, also test selector string query

            return nodes.parentNode.closest('[data-component="' + query + '"]');
        };

        if (this.DOMNodes instanceof HTMLElement) {
            return moduleMatch() || componentMatch();
        }

        return moduleMatch()[0] ? moduleMatch() : componentMatch();
    }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = removeModifier;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
            return removeModifier.bind(Object.assign(_this, { DOMNodes: node }))(modifier);
        });
    }

    var node = this.DOMNodes;

    [].concat(_toConsumableArray(node.classList)).forEach(function (className) {
        var moduleMatch = className.indexOf((_this.namespace || (0, _getModuleNamespace2.default)(node, _this.componentGlue, _this.modifierGlue)) + _this.modifierGlue) === 0;
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getModuleNamespace = exports.API = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = sQuery;

var _getConfig = __webpack_require__(11);

var _getConfig2 = _interopRequireDefault(_getConfig);

var _getDomNodes = __webpack_require__(13);

var _getDomNodes2 = _interopRequireDefault(_getDomNodes);

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

var _init = __webpack_require__(14);

var _init2 = _interopRequireDefault(_init);

var _api = __webpack_require__(6);

var API = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {*} SynergyQuery
 * @param {Function} [callback]
 * @param {Object} [defaults]
 * @param {Object} [custom]
 * @param {Object} [parser]
 */
function sQuery(SynergyQuery, callback, defaults, custom, parser) {
    var methods = {};
    var config = (0, _getConfig2.default)(defaults, custom, parser);

    var componentGlue = config.componentGlue || window.Synergy && window.Synergy.componentGlue || '_';
    var modifierGlue = config.modifierGlue || window.Synergy && window.Synergy.modifierGlue || '-';

    var namespace = (0, _getModuleNamespace2.default)(SynergyQuery, componentGlue, modifierGlue);
    var DOMNodes = (0, _getDomNodes2.default)(SynergyQuery);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.entries(API)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = _slicedToArray(_ref, 2);

            var key = _ref2[0];
            var method = _ref2[1];

            methods[key] = method.bind({ namespace: namespace, DOMNodes: DOMNodes, componentGlue: componentGlue, modifierGlue: modifierGlue });
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
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

exports.API = API;
exports.getModuleNamespace = _getModuleNamespace2.default;


sQuery.init = _init2.default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getConfig;

var _deepExtend = __webpack_require__(12);

var _deepExtend2 = _interopRequireDefault(_deepExtend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {*} defaults 
 * @param {*} custom 
 * @param {*} parser 
 */
function getConfig(defaults, custom, parser) {
    var extendedConfig = (0, _deepExtend2.default)(defaults, custom);

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = getDomNodes;

var _isValidSelector = __webpack_require__(5);

var _isValidSelector2 = _interopRequireDefault(_isValidSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    if ((0, _isValidSelector2.default)(query) && document.querySelectorAll(query).length) {
        return document.querySelectorAll(query);
    }

    if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object' && query.name) {
        return getDomNodes(query.name);
    }

    if (typeof query === 'string' && query.match('^[a-zA-Z0-9_-]+$')) {
        return document.querySelectorAll('.' + query + ', [class*="' + query + '-"]');
    }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = init;

var _api = __webpack_require__(6);

var API = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

    var _ref = [].concat(_toConsumableArray(PRESETS[options.preset])),
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

        Object.assign(window.Synergy, { componentGlue: componentGlue, modifierGlue: modifierGlue });
    }

    var _loop = function _loop(key, method) {
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
                    var _ref4;

                    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        params[_key - 1] = arguments[_key];
                    }

                    return (_ref4 = this(node))[methodName].apply(_ref4, params);
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
                    }).apply(undefined, arguments);
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
                }).apply(undefined, arguments);
            };
        }
    };

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.entries(API)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref2 = _step.value;

            var _ref3 = _slicedToArray(_ref2, 2);

            var key = _ref3[0];
            var method = _ref3[1];

            _loop(key, method);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = component;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

var _getComponents = __webpack_require__(1);

var _getComponents2 = _interopRequireDefault(_getComponents);

var _isComponent = __webpack_require__(2);

var _isComponent2 = _interopRequireDefault(_isComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {String} componentName 
 * @param {(('find'|'is'|'set'|'unset')|Function)} operator 
 */
function component(componentName, operator) {
    var _this = this;

    var namespace = function namespace(node) {
        return _this.namespace || (0, _getModuleNamespace2.default)(node, _this.componentGlue, _this.modifierGlue, 'strict');
    };

    if (!componentName && !operator) {
        return _getComponents2.default.bind(this)();
    }

    if (!operator || operator === 'find') {
        return _getComponents2.default.bind(this)(componentName);
    }

    if (operator === 'is') {
        return _isComponent2.default.bind(this)(componentName);
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
        _getComponents2.default.bind(this)(componentName).forEach(function (node) {
            return operator(node);
        });
    }
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = find;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

var _getModules = __webpack_require__(17);

var _getModules2 = _interopRequireDefault(_getModules);

var _getComponents = __webpack_require__(1);

var _getComponents2 = _interopRequireDefault(_getComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {*} query 
 */
function find(query) {
    var _this = this;

    if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {
        if (this.DOMNodes instanceof NodeList) {
            return [].concat(_toConsumableArray(this.DOMNodes)).reduce(function (matches, node) {
                return matches.concat(getQueryFromObject.bind(_this)(query, node));
            }, []);
        }

        return getQueryFromObject.bind(this)(query, this.DOMNodes);
    }

    if (typeof query === 'string') {
        var components = _getComponents2.default.bind(this)(query);

        if (components.length) {
            return components;
        }

        if ((0, _getModules2.default)(this, query).length) {
            return (0, _getModules2.default)(this, query);
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
            return matches.concat.apply(matches, _toConsumableArray(_getComponents2.default.bind(this)(query.component, query.modifier, query.module)));
        }

        return matches.concat.apply(matches, _toConsumableArray(node.querySelectorAll('.' + query.module + ', [class*="' + (query.module + query.modifierGlue) + '"]')));
    }

    if (query.component) {
        var components = _getComponents2.default.bind(this)(query.component);

        if (query.modifier) {
            return matches.concat.apply(matches, _toConsumableArray(components.filter(function (component) {
                return [].concat(_toConsumableArray(component.classList)).some(function (className) {
                    var isNamespace = className.indexOf(_this2.namespace || (0, _getModuleNamespace2.default)(component, _this2.componentGlue, _this2.modifierGlue)) === 0;
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getModules;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {*} target 
 * @param {*} moduleName 
 */
function getModules(target, moduleName) {
    if (target.DOMNodes instanceof NodeList) {
        return [].concat(_toConsumableArray(target.DOMNodes)).reduce(function (matches, node) {
            return matches.concat.apply(matches, _toConsumableArray(node.querySelectorAll("." + moduleName + ", [class*=\"" + (moduleName + target.modifierGlue) + "\"]")));
        }, []);
    }

    return target.DOMNodes.querySelectorAll("." + moduleName + ", [class*=\"" + (moduleName + target.modifierGlue) + "\"]");
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getComponent;

var _getComponents = __webpack_require__(1);

var _getComponents2 = _interopRequireDefault(_getComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {*} componentName 
 */
function getComponent(componentName) {
    var _this = this;

    if (this.DOMNodes instanceof NodeList) {
        return [].concat(_toConsumableArray(this.DOMNodes)).map(function (DOMNodes) {
            return getComponent.bind(Object.assign(_this, { DOMNodes: DOMNodes }))(componentName);
        });
    };

    return _getComponents2.default.bind(this)(componentName)[0];
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getModifiers;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {*} componentName 
 */
function getModifiers() {
    var _this = this,
        _ref;

    if (this.DOMNodes instanceof NodeList) {
        return [].concat(_toConsumableArray(this.DOMNodes)).reduce(function (matches, DOMNodes) {
            return matches.concat.apply(matches, _toConsumableArray(getModifiers.bind(Object.assign(_this, { DOMNodes: DOMNodes }))()));
        }, []);
    }

    return (_ref = []).concat.apply(_ref, _toConsumableArray([].concat(_toConsumableArray(this.DOMNodes.classList)).filter(function (className) {
        return className.indexOf(_this.namespace || (0, _getModuleNamespace2.default)(_this.DOMNodes, _this.componentGlue, _this.modifierGlue)) === 0;
    }).map(function (target) {
        return target.split(_this.modifierGlue).slice(1);
    })));
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getComponent;

var _getSubComponents = __webpack_require__(3);

var _getSubComponents2 = _interopRequireDefault(_getSubComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {*} subComponentName 
 */
function getComponent(subComponentName) {
    var _this = this;

    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (this.DOMNodes instanceof NodeList) {
        return [].concat(_toConsumableArray(this.DOMNodes)).map(function () {
            return _getSubComponents2.default.bind(_this)(subComponentName, context)[0];
        });
    }

    return _getSubComponents2.default.bind(this)(subComponentName, context)[0];
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = is;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

var _isModule = __webpack_require__(22);

var _isModule2 = _interopRequireDefault(_isModule);

var _isComponent = __webpack_require__(2);

var _isComponent2 = _interopRequireDefault(_isComponent);

var _hasModifier = __webpack_require__(4);

var _hasModifier2 = _interopRequireDefault(_hasModifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {*} query 
 */
function is(query) {
    var _this = this;

    if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {
        if (query.module) {
            if (query.component) {
                var isModuleNamespace = [].concat(_toConsumableArray(this.DOMNodes)).every(function (node) {
                    return (_this.namespace || (0, _getModuleNamespace2.default)(node, _this.componentGlue, _this.modifierGlue, true)) === query.module;
                });

                if (query.modifier) {
                    return isModuleNamespace && _isComponent2.default.bind(this)(query.component) && _hasModifier2.default.bind(this)(query.modifier);
                }

                return isModuleNamespace && _isComponent2.default.bind(this)(query.component);
            }

            return (0, _isModule2.default)(this, query.module);
        }

        if (query.component) {
            if (query.modifier) {
                return _isComponent2.default.bind(this)(query.component) && _hasModifier2.default.bind(this)(query.modifier);
            }

            return _isComponent2.default.bind(this)(query.component);
        }

        if (query.modifier) {
            return _hasModifier2.default.bind(this)(query.modifier);
        }
    }

    if (typeof query === 'string') {
        if ((0, _isModule2.default)(this, query)) {
            return (0, _isModule2.default)(this, query);
        }

        if (_isComponent2.default.bind(this)(query)) {
            return _isComponent2.default.bind(this)(query);
        }

        if (_hasModifier2.default.bind(this)(query)) {
            return _hasModifier2.default.bind(this)(query);
        }
    }

    return false;
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isModule;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {*} target 
 * @param {*} moduleName 
 */
function isModule(target, moduleName) {
    return [].concat(_toConsumableArray(target.DOMNodes)).every(function (node) {
        return node.matches("." + moduleName + ", [class*=\"" + (moduleName + target.modifierGlue) + "\"]");
    });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = modifier;

var _hasModifier = __webpack_require__(4);

var _hasModifier2 = _interopRequireDefault(_hasModifier);

var _addModifier = __webpack_require__(7);

var _addModifier2 = _interopRequireDefault(_addModifier);

var _removeModifier = __webpack_require__(9);

var _removeModifier2 = _interopRequireDefault(_removeModifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {String} modifier 
 * @param {(('is'|'set'|'unset')|Function)} operator 
 */
function modifier(modifier, operator) {
    if (!operator || operator === 'is') {
        return _hasModifier2.default.bind(this)(modifier);
    }

    if (operator === 'set' || operator === 'add') {
        return _addModifier2.default.bind(this)(modifier);
    }

    if (operator === 'unset' || operator === 'remove') {
        return _removeModifier2.default.bind(this)(modifier);
    }
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parentComponent;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {*} componentName 
 */
function parentComponent(componentName) {
    if (this.DOMNodes instanceof NodeList) {
        return [].concat(_toConsumableArray(this.DOMNodes)).map(function (node) {
            return node.parentNode.closest("[data-component=\"" + componentName + "\"]");
        });
    }

    return this.DOMNodes.parentNode.closest("[data-component=\"" + componentName + "\"]");
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = setComponent;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {*} componentName 
 */
function setComponent(componentName, namespace, replace) {
    var _this = this;

    if (this.DOMNodes instanceof NodeList) {
        return this.DOMNodes.forEach(function (DOMNodes) {
            return setComponent.bind(Object.assign(_this, { DOMNodes: DOMNodes }))(componentName);
        });
    }

    if (!namespace && !replace) {
        replace = this.namespace || (0, _getModuleNamespace2.default)(this.DOMNodes, this.componentGlue, this.modifierGlue);
    }

    namespace = namespace || this.namespace || (0, _getModuleNamespace2.default)(this.DOMNodes, this.componentGlue, this.modifierGlue);

    this.DOMNodes.classList.add(namespace + this.componentGlue + componentName);
    this.DOMNodes.setAttribute('data-component', componentName);

    replace && this.DOMNodes.classList.remove(replace);
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = subComponent;

var _getSubComponents = __webpack_require__(3);

var _getSubComponents2 = _interopRequireDefault(_getSubComponents);

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {String} componentName 
 * @param {(('find'|'is')|Function)} operator 
 */
function subComponent(subComponentName, operator) {
    var _this = this;

    if (!subComponentName && !operator) {
        return _getSubComponents2.default.bind(this)();
    }

    if (!operator || operator === 'find') {
        return _getSubComponents2.default.bind(this)(subComponentName);
    }

    if (operator === 'is') {
        if (this.DOMNodes instanceof NodeList) {
            return [].concat(_toConsumableArray(this.DOMNodes)).every(function (node) {
                return is.bind(_this)(node, subComponentName);
            });
        }

        return is.bind(this)(this.DOMNodes, subComponentName);
    }

    if (typeof operator === 'function') {
        _getSubComponents2.default.bind(this)(subComponentName).forEach(function (node) {
            return operator(node);
        });
    }
}

/**
 * @param {HTMLElement} node 
 * @param {String} subComponentName 
 */
function is(node, subComponentName) {
    var query = this.namespace || (0, _getModuleNamespace2.default)(node, this.componentGlue, this.modifierGlue);
    var isMatch = query.indexOf(subComponentName) === query.length - subComponentName.length;

    return [].concat(_toConsumableArray(node.classList)).some(function (className) {
        return className.indexOf(query) > -1 && isMatch;
    });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = unsetComponent;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {*} componentName 
 */
function unsetComponent(componentName) {
    var _this = this;

    if (this.DOMNodes instanceof NodeList) {
        return this.DOMNodes.forEach(function (DOMNodes) {
            return unsetComponent.bind(Object.assign(_this, { DOMNodes: DOMNodes }))(componentName);
        });
    }

    return [].concat(_toConsumableArray(this.DOMNodes.classList)).forEach(function (className) {
        var isAComponent = className.split(_this.componentGlue).length - 1 === 1;
        var isMatch = className.indexOf((_this.namespace || (0, _getModuleNamespace2.default)(_this.DOMNodes, _this.componentGlue, _this.modifierGlue)) + _this.componentGlue + componentName) === 0;

        if (isAComponent && isMatch) {
            _this.DOMNodes.classList.remove(className);
        }
    });
}

/***/ })
/******/ ]);
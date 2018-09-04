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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
function getModuleNamespace(query) {
    var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (typeof query === 'string' && query.match('^[a-zA-Z0-9_-]+$')) {
        return query;
    }

    if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object' && 'name' in query) {
        return query.name;
    }

    if (query instanceof HTMLElement) {
        if (query.closest('[data-module]')) {
            return query.closest('[data-module]').getAttribute('data-module');
        }

        if (query.classList.length) {
            if (strict) {
                return query.classList[0].split(/-(.+)/)[0].split(/_(.+)/)[0];
            }

            return query.classList[0].split(/-(.+)/)[0];
        }
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

    return [].concat(_toConsumableArray(this.DOMNodes)).reduce(function (matches, node) {
        namespace = namespace || _this.namespace || (0, _getModuleNamespace2.default)(node, 'strict');

        var query = namespace + (componentName ? _this.componentGlue + componentName : '');

        return matches.concat.apply(matches, _toConsumableArray([].concat(_toConsumableArray(node.querySelectorAll('[class*="' + query + '"]'))).filter(function (component) {
            return [].concat(_toConsumableArray(component.classList)).some(function (className) {
                var isComponent = className.split(_this.componentGlue).length - 1 === 1;
                var isQueryMatch = className.indexOf(query) === 0;

                if (modifier) {
                    return isQueryMatch && isComponent && className.indexOf(modifier) > -1;
                } else {
                    return isQueryMatch && isComponent;
                }
            });
        })));
    }, []);
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

    return [].concat(_toConsumableArray(this.DOMNodes)).every(function (node) {
        return [].concat(_toConsumableArray(node.classList)).some(function (className) {
            var isAComponent = className.split(_this.componentGlue).length - 1 === 1;
            var query = _this.namespace || (0, _getModuleNamespace2.default)(node);
            var isMatch = query.indexOf(_this.componentGlue + componentName) > -1;

            return className.indexOf(query) === 0 && isAComponent && isMatch;
        });
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

    return [].concat(_toConsumableArray(this.DOMNodes)).reduce(function (matches, node) {
        var namespace = _this.namespace || (0, _getModuleNamespace2.default)(node);

        if (context.length) {
            namespace = [namespace].concat(context, [subComponentName]).join(_this.componentGlue);
        }

        var depth = namespace.split(_this.componentGlue).length - 1;

        return matches.concat.apply(matches, _toConsumableArray([].concat(_toConsumableArray(node.querySelectorAll('[class*="' + namespace + '"]'))).filter(function (subComponent) {
            return [].concat(_toConsumableArray(subComponent.classList)).some(function (className) {
                var namespaceMatch = void 0;

                if (modifier) {
                    namespaceMatch = className.indexOf(namespace) === 0 && className.indexOf(modifier) > -1;
                } else {
                    namespaceMatch = className.indexOf(namespace) === 0;
                }

                var depthMatch = className.split(_this.componentGlue).length - 1 === (context.length ? depth : depth + 1);

                return namespaceMatch && depthMatch;
            });
        })));
    }, []);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = hasModifier;

var _getModifiers = __webpack_require__(6);

var _getModifiers2 = _interopRequireDefault(_getModifiers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {*} modifier 
 */
function hasModifier(modifier) {
    var _this = this;

    if (modifier.constructor === Array) {
        return modifier.every(function (_modifier) {
            return hasModifier.bind(_this)(_modifier);
        });
    }

    return [].concat(_toConsumableArray(this.DOMNodes)).every(function (node) {
        return _getModifiers2.default.bind(Object.assign(_this, { DOMNodes: [node] }))().includes(modifier);
    });
}

/***/ }),
/* 5 */
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

    this.DOMNodes.forEach(function (node) {
        if (modifier.constructor === Array) {
            modifier = modifier.join(_this.modifierGlue);
        }

        node.classList.add((_this.namespace || (0, _getModuleNamespace2.default)(node)) + _this.modifierGlue + modifier);
    });
}

/***/ }),
/* 6 */
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
    var _this = this;

    var matches = [];

    this.DOMNodes.forEach(function (node) {
        matches.push.apply(matches, _toConsumableArray([].concat(_toConsumableArray(node.classList)).filter(function (className) {
            return className.indexOf(_this.namespace || (0, _getModuleNamespace2.default)(node)) === 0;
        }).map(function (target) {
            return target.split(_this.modifierGlue).slice(1);
        })[0]));
    });

    return matches;
}

/***/ }),
/* 7 */
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

    this.DOMNodes.forEach(function (node) {
        if (modifier.constructor === Array) {
            return modifier.forEach(function (_modifier) {
                removeModifier.bind(Object.assign(_this, { DOMNodes: [node] }))(_modifier);
            });
        }

        [].concat(_toConsumableArray(node.classList)).forEach(function (className) {
            var moduleMatch = className.indexOf((_this.namespace || (0, _getModuleNamespace2.default)(node)) + _this.modifierGlue) === 0;
            var modifierMatch = className.indexOf(_this.modifierGlue + modifier) > -1;
            var newClass = className.replace(new RegExp(_this.modifierGlue + modifier, 'g'), '');

            if (moduleMatch && modifierMatch) {
                node.classList.remove(className);
                node.classList.add(newClass);
            }
        });
    });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = sQuery;

var _getConfig = __webpack_require__(9);

var _getConfig2 = _interopRequireDefault(_getConfig);

var _getDomNodes = __webpack_require__(11);

var _getDomNodes2 = _interopRequireDefault(_getDomNodes);

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

var _api = __webpack_require__(13);

var API = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
    var namespace = (0, _getModuleNamespace2.default)(SynergyQuery);
    var DOMNodes = (0, _getDomNodes2.default)(SynergyQuery);

    var componentGlue = config.componentGlue || window.Synergy && Synergy.componentGlue || '_';
    var modifierGlue = config.modifierGlue || window.Synergy && Synergy.modifierGlue || '-';

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
        DOMNodes.forEach(function (node) {
            return callback(node, config);
        });
    }

    return Object.assign(methods, {
        namespace: namespace,
        DOMNodes: DOMNodes,
        DOMNode: DOMNodes ? DOMNodes[0] : null
    });
}

/**
 */
sQuery.init = function (custom) {
    var options = Object.assign({
        elementProto: true,
        nodeListProto: true,
        preset: 'Synergy',
        attachToWindow: true,
        alterMethodName: true
    }, custom);

    var attachToWindow = options.attachToWindow;
    var elementProto = options.elementProto;
    var nodeListProto = options.nodeListProto;
    var alterMethodName = options.alterMethodName;
    var preset = options.preset;

    var PRESETS = {
        BEM: ['__', '--', 'block', 'element', 'modifier'],
        Synergy: ['_', '-', 'module', 'component', 'modifier']
    };

    var _ref3 = [].concat(_toConsumableArray(PRESETS[preset])),
        componentGlue = _ref3[0],
        modifierGlue = _ref3[1],
        moduleNamespace = _ref3[2],
        componentNamespace = _ref3[3],
        modifierNamespace = _ref3[4];

    if (elementProto || nodeListProto) {
        var _loop = function _loop(key, method) {
            if (alterMethodName) {
                if (key.toLowerCase().indexOf(moduleNamespace) > -1) {
                    console.log(key);
                }

                if (key.toLowerCase().indexOf(componentNamespace) > -1) {
                    console.log(key);
                }

                if (key.toLowerCase().indexOf(modifierNamespace) > -1) {
                    console.log(key);
                }
            }

            if (elementProto) {
                Element.prototype[key] = function () {
                    method.bind({
                        namespace: (0, _getModuleNamespace2.default)(this), DOMNodes: [this], componentGlue: componentGlue, modifierGlue: modifierGlue
                    }).apply(undefined, arguments);
                };
            }

            if (nodeListProto) {
                NodeList.prototype[key] = function () {
                    method.bind({
                        namespace: (0, _getModuleNamespace2.default)(this[0]), DOMNodes: this, componentGlue: componentGlue, modifierGlue: modifierGlue
                    }).apply(undefined, arguments);
                };
            }
        };

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = Object.entries(API)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _ref4 = _step2.value;

                var _ref5 = _slicedToArray(_ref4, 2);

                var key = _ref5[0];
                var method = _ref5[1];

                _loop(key, method);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }

    if (attachToWindow) {
        // window.Synergy = window.Synergy || {};

        // window.Synergy.componentGlue = componentGlue;
        // window.Synergy.modifierGlue = modifierGlue;
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getConfig;

var _deepExtend = __webpack_require__(10);

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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = getDomNodes;

var _isValidSelector = __webpack_require__(12);

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
        return [query];
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
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _addModifier = __webpack_require__(5);

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

var _component = __webpack_require__(14);

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

var _find = __webpack_require__(15);

Object.defineProperty(exports, 'find', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_find).default;
    }
});

var _getComponent = __webpack_require__(17);

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

var _getModifiers = __webpack_require__(6);

Object.defineProperty(exports, 'getModifiers', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_getModifiers).default;
    }
});

var _getSubComponent = __webpack_require__(18);

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

var _is = __webpack_require__(19);

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

var _modifier = __webpack_require__(21);

Object.defineProperty(exports, 'modifier', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_modifier).default;
    }
});

var _removeModifier = __webpack_require__(7);

Object.defineProperty(exports, 'removeModifier', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_removeModifier).default;
    }
});

var _parent = __webpack_require__(22);

Object.defineProperty(exports, 'parent', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_parent).default;
    }
});

var _parentComponent = __webpack_require__(23);

Object.defineProperty(exports, 'parentComponent', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_parentComponent).default;
    }
});

var _setComponent = __webpack_require__(24);

Object.defineProperty(exports, 'setComponent', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_setComponent).default;
    }
});

var _subComponent = __webpack_require__(25);

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

var _unsetComponent = __webpack_require__(26);

Object.defineProperty(exports, 'unsetComponent', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_unsetComponent).default;
    }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 14 */
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
        this.DOMNodes.forEach(function (node) {
            return node.classList.add(_this.namespace || (0, _getModuleNamespace2.default)(node) + _this.componentGlue + componentName);
        });
    }

    if (operator === 'unset') {
        this.DOMNodes.forEach(function (node) {
            return node.classList.remove(_this.namespace || (0, _getModuleNamespace2.default)(node));
        });
    }

    if (typeof operator === 'function') {
        _getComponents2.default.bind(this)(componentName).forEach(function (node) {
            return operator(node);
        });
    }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = find;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

var _getModules = __webpack_require__(16);

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
        var matches = [];

        this.DOMNodes.forEach(function (node) {
            if (query.module) {
                if (query.component) {
                    return matches.push.apply(matches, _toConsumableArray(_getComponents2.default.bind(_this)(query.component, query.modifier, query.module)));
                }

                return matches.push.apply(matches, _toConsumableArray(node.querySelectorAll('.' + query.module + ', [class*="' + (query.module + query.modifierGlue) + '"]')));
            }

            if (query.component) {
                var components = _getComponents2.default.bind(_this)(query.component);

                if (query.modifier) {
                    return matches.push.apply(matches, _toConsumableArray(components.filter(function (component) {
                        return [].concat(_toConsumableArray(component.classList)).some(function (className) {
                            var isNamespace = className.indexOf(_this.namespace || (0, _getModuleNamespace2.default)(component)) === 0;
                            var hasModifier = className.indexOf(query.modifier) > -1;

                            return isNamespace && hasModifier;
                        });
                    })));
                }

                return matches.push.apply(matches, _toConsumableArray(components));
            }

            if (query.modifier) {
                return;
            }
        });

        return matches;
    }

    if (typeof query === 'string') {
        if (_getComponents2.default.bind(this)(query).length) {
            return _getComponents2.default.bind(this)(query);
        }

        if ((0, _getModules2.default)(this, query).length) {
            return (0, _getModules2.default)(this, query);
        }
    }
}

/***/ }),
/* 16 */
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
    return [].concat(_toConsumableArray(target.DOMNodes)).reduce(function (matches, node) {
        return matches.concat.apply(matches, _toConsumableArray(node.querySelectorAll("." + moduleName + ", [class*=\"" + (moduleName + target.modifierGlue) + "\"]")));
    }, []);
}

/***/ }),
/* 17 */
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

    return [].concat(_toConsumableArray(this.DOMNodes)).map(function () {
        return _getComponents2.default.bind(_this)(componentName)[0];
    });
}

/***/ }),
/* 18 */
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

    return [].concat(_toConsumableArray(this.DOMNodes)).map(function () {
        return _getSubComponents2.default.bind(_this)(subComponentName, context)[0];
    });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = is;

var _getModuleNamespace = __webpack_require__(0);

var _getModuleNamespace2 = _interopRequireDefault(_getModuleNamespace);

var _isModule = __webpack_require__(20);

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

    console.log(query, this);
    if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {
        if (query.module) {
            if (query.component) {
                var isModuleNamespace = [].concat(_toConsumableArray(this.DOMNodes)).every(function (node) {
                    return (_this.namespace || (0, _getModuleNamespace2.default)(node, true)) === query.module;
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
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = modifier;

var _hasModifier = __webpack_require__(4);

var _hasModifier2 = _interopRequireDefault(_hasModifier);

var _addModifier = __webpack_require__(5);

var _addModifier2 = _interopRequireDefault(_addModifier);

var _removeModifier = __webpack_require__(7);

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

    if (operator === 'set') {
        return _addModifier2.default.bind(this)(modifier);
    }

    if (operator === 'unset') {
        return _removeModifier2.default.bind(this)(modifier);
    }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parent;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {(String|'module'|'component')} query 
 */
function parent(query) {
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
        var moduleMatch = [].concat(_toConsumableArray(this.DOMNodes)).map(function (node) {
            return node.parentNode.closest('[data-module="' + query + '"]');
        });
        var componentMatch = [].concat(_toConsumableArray(this.DOMNodes)).map(function (node) {
            return node.parentNode.closest('[data-component="' + query + '"]');
        });

        return moduleMatch[0] ? moduleMatch : componentMatch;
    }
}

/***/ }),
/* 23 */
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
  return [].concat(_toConsumableArray(this.DOMNodes)).map(function (node) {
    return node.parentNode.closest("[data-component=\"" + componentName + "\"]");
  });
}

/***/ }),
/* 24 */
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
function setComponent(componentName) {
    var _this = this;

    this.DOMNodes.forEach(function (node) {
        var namespace = _this.namespace || (0, _getModuleNamespace2.default)(node);

        node.classList.remove(namespace);
        node.classList.add(namespace + _this.componentGlue + componentName);
    });
}

/***/ }),
/* 25 */
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
        return [].concat(_toConsumableArray(this.DOMNodes)).every(function (node) {
            var query = _this.namespace || (0, _getModuleNamespace2.default)(node);
            var isMatch = query.indexOf(subComponentName) === query.length - subComponentName.length;

            return [].concat(_toConsumableArray(node.classList)).some(function (className) {
                return className.indexOf(query) > -1 && isMatch;
            });
        });
    }

    if (typeof operator === 'function') {
        _getSubComponents2.default.bind(this)(subComponentName).forEach(function (node) {
            return operator(node);
        });
    }
}

/***/ }),
/* 26 */
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

    return [].concat(_toConsumableArray(this.DOMNodes)).forEach(function (node) {
        return [].concat(_toConsumableArray(node.classList)).forEach(function (className) {
            var isAComponent = className.split(_this.componentGlue).length - 1 === 1;
            var isMatch = className.indexOf((_this.namespace || (0, _getModuleNamespace2.default)(node)) + _this.componentGlue + componentName) === 0;

            if (isAComponent && isMatch) {
                node.classList.remove(className);
            }
        });
    });
}

/***/ })
/******/ ]);
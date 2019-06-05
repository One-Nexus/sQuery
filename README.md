[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/One-Nexus/sQuery/blob/master/LICENSE)
[![Inline docs](http://inch-ci.org/github/One-Nexus/sQuery.svg?branch=master)](http://inch-ci.org/github/One-Nexus/sQuery)
[![Build Status](https://travis-ci.com/One-Nexus/sQuery.svg?branch=master)](https://travis-ci.com/One-Nexus/sQuery)
[![npm version](https://badge.fury.io/js/%40onenexus%2Fsquery.svg)](https://www.npmjs.com/package/@onenexus/squery)
[![npm downloads](https://img.shields.io/npm/dm/@onenexus/squery.svg)](https://www.npmjs.com/package/@onenexus/squery)
[![codecov](https://codecov.io/gh/One-Nexus/sQuery/branch/master/graph/badge.svg)](https://codecov.io/gh/One-Nexus/sQuery)

> Interact with Synergy modules/BEM DOM elements

<img height="56px" src="http://www.onenexus.io/squery/images/squery-logo.png?v=2" />

* [Overview](#overview)
* [Installation & Setup](#installation--setup)
* [sQuery()](https://github.com/One-Nexus/sQuery/wiki/sQuery())
* [API](#api)

## Overview

sQuery is used for interacting with DOM elements that follow the [Synergy naming convention](https://github.com/One-Nexus/Synergy-Front-End-Guides/wiki/Synergy-Values#synergy-naming-convention).

> [Learn how to integrate with React components](https://github.com/One-Nexus/Lucid/wiki/Interactions#adding-an-interaction)

###### Example

```html
<div class="foo">
    <div class="foo_bar"><div>
    <div class="foo_bar-alpha"><div>
</div>

<div class="foo-fizz">
    <div class="foo_bar"><div>
    <div class="foo_bar-beta"><div>
</div>
```

```js
sQuery('foo').getComponents('bar').addModifier('buzz');
```

###### Result

```html
<div class="foo">
    <div class="foo_bar-buzz"><div>
    <div class="foo_bar-alpha-buzz"><div>
</div>

<div class="foo-fizz">
    <div class="foo_bar-buzz"><div>
    <div class="foo_bar-beta-buzz"><div>
</div>
```

### Why?

In a world where DOM elements are becoming more structured and modular, querying DOM elements via classes quickly makes your code become WET, affecting things like readability, scalability and maintainability. The Synergy naming convention (as used above) keeps the DOM as clean and DRY as possible by only requiring one class per element, even if that element has modifiers ([learn more](https://github.com/One-Nexus/Synergy-Front-End-Guides/wiki/Synergy-Values#3-naming-convention)).

Consider attempting something like the above using vanilla JS:

```js
// get all `foo` modules
const foos = document.querySelectorAll('.foo, [class*="foo-"]');

foos.forEach(foo => {
    // get all `bar` components
    const bars = foo.querySelectorAll('.foo_bar, [class*="foo_bar-"]');

    bars.forEach(bar => {
        // replace old class with new class
        bar.classList.forEach(className => {
            if (className.indexOf('foo_bar') === 0) {
                bar.classList.replace(className, `${className}-buzz`);
            }
        });
    }
});
```

Some issues here include:

* Repeating the module name `foo`
* Repeating the component name `bar`
* Awkward `querySelectorAll` query (required to allow the 'one class per element' paradigm)
* Hard coded [component/modifier glue](https://github.com/One-Nexus/sQuery/wiki/config#componentgluemodifierglue) (typically a non-issue, but still...)
* Order of magnitude more code required than initial 1 line example

Something like this would be a common occurance in projects that use the Synergy naming convention (and indeed any convention that requires you to query DOM elements and manipulate their `classList` property, such as BEM), so by identifying and abstracting these commonly-occurring behaviours into their own API, sQuery allows you to interact with structured DOM elements effortlessly by targeting [modules](https://github.com/One-Nexus/Synergy/wiki/Modules,-Components-and-Modifiers#modules) and [components](https://github.com/One-Nexus/Synergy/wiki/Modules,-Components-and-Modifiers#components) and adding/removing [modifiers](https://github.com/One-Nexus/Synergy/wiki/Modules,-Components-and-Modifiers#modifiers) to them, allowing you to achieve the above with that one liner from earlier:

```js
sQuery('foo').getComponents('bar').addModifier('buzz');
```

Checkout these other One-Nexus tools for working with Synergy modules:

* [Cell](https://github.com/One-Nexus/Cell) - Style DOM elements that follow the Synergy naming convention (including BEM) using Sass
* [Polymorph](https://github.com/One-Nexus/Polymorph) - Style DOM elements that follow the Synergy naming convention (including BEM) using JavaScript
* [Lucid](https://github.com/One-Nexus/Lucid) - A set of Higher-Order React Components for rendering UI elements that follow the Synergy naming convention
* [Synergy](https://github.com/One-Nexus/Synergy) - A front-end framework for creating modular, configurable and scalable UI components (all of the above in one packaged framework)

## Installation & Setup

> Want to render your DOM elements with React, style them with JavaScript, and interact with them using sQuery? Checkout the [Synergy framework](https://github.com/One-Nexus/Synergy) instead

```
npm install --save @onenexus/squery
```

```jsx
import 'sQuery' from '@onenexus/squery';

sQuery.init(); 
```

> See the [`sQuery.init()`](https://github.com/One-Nexus/sQuery/wiki/.init()) method for advanced setup

> Using BEM? Checkout the [Working With BEM](https://github.com/One-Nexus/sQuery/wiki/Working-With-BEM) page

## API

* [.add()](https://github.com/One-Nexus/sQuery/wiki/.addModifier())
* [.addModifier()](https://github.com/One-Nexus/sQuery/wiki/.addModifier())
* [.component()](https://github.com/One-Nexus/sQuery/wiki/.component())
* [.components()](https://github.com/One-Nexus/sQuery/wiki/.component())
* [.find()](https://github.com/One-Nexus/sQuery/wiki/.find())
* [.getComponent()](https://github.com/One-Nexus/sQuery/wiki/.getComponent())
* [.getComponents()](https://github.com/One-Nexus/sQuery/wiki/.getComponents())
* [.getModifiers()](https://github.com/One-Nexus/sQuery/wiki/.getModifiers())
* [.getModules()](https://github.com/One-Nexus/sQuery/wiki/.getModules())
* [.getSubComponent()](https://github.com/One-Nexus/sQuery/wiki/.getSubComponent())
* [.getSubComponents()](https://github.com/One-Nexus/sQuery/wiki/.getSubComponents())
* [.has()](https://github.com/One-Nexus/sQuery/wiki/.hasModifier())
* [.hasModifier()](https://github.com/One-Nexus/sQuery/wiki/.hasModifier())
* [.is()](https://github.com/One-Nexus/sQuery/wiki/.is())
* [.isComponent()](https://github.com/One-Nexus/sQuery/wiki/.isComponent())
* [.isModule()](https://github.com/One-Nexus/sQuery/wiki/.isModule())
* [.modifier()](https://github.com/One-Nexus/sQuery/wiki/.modifier())
* [.module()](https://github.com/One-Nexus/sQuery/wiki/.module())
* [.modules()](https://github.com/One-Nexus/sQuery/wiki/.module())
* [.parent()](https://github.com/One-Nexus/sQuery/wiki/.parent())
* [.parentModule()](https://github.com/One-Nexus/sQuery/wiki/.parentModule())
* [.remove()](https://github.com/One-Nexus/sQuery/wiki/.removeModifier())
* [.removeModifier()](https://github.com/One-Nexus/sQuery/wiki/.removeModifier())
* [.setComponent()](https://github.com/One-Nexus/sQuery/wiki/.setComponent())
* [.subComponent()](https://github.com/One-Nexus/sQuery/wiki/.subComponent())
* [.subComponents()](https://github.com/One-Nexus/sQuery/wiki/.subComponent())
* [.toggleModifier()](https://github.com/One-Nexus/sQuery/wiki/.toggleModifier())
* [.unsetComponent()](https://github.com/One-Nexus/sQuery/wiki/.unsetComponent())

### Usage

The above APIs can be used in the following ways:

#### Return value of `sQuery()` function (Recommended)

* Element(s) retreived via a [Synergy query](https://github.com/One-Nexus/sQuery/wiki/sQuery()#query)
* Config automatically deteced from global `Synergy` object

> See the [`sQuery()`](https://github.com/One-Nexus/sQuery/wiki/sQuery()) page for more information

```js
sQuery(query)[method](...args);
```

###### Example

```js
sQuery('.accordion').getComponents('panel');
```

#### Property of sQuery

* Element(s) must be explicitly passed as the first argument
* Config must be explicitly passed via the `config` argument

```js
sQuery[method](node, ...args, config);
```

###### Example

```js
sQuery.getComponents(document.querySelectorAll('.accordion'), 'panel', {
    componentGlue: '_',
    modifierGlue: '-'
});
```

#### Via Element/NodeList Prototype

* Requires setting up via the [`sQuery.init()` method](#init)
* Automatically passes modifier/component glue

> This may be useful and convenient, but use with caution as it is recommended to avoid modifying JavaScript prototypes

```js
Element[method](...args);
NodeList[method](...args);
```

###### Example

```js
document.querySelectorAll('.accordion').getComponents('panel');
```

---

<a href="https://twitter.com/ESR360">
    <img src="http://edmundreed.com/assets/images/twitter.gif?v=1" width="250px" />
</a>
<a href="https://github.com/ESR360">
    <img src="http://edmundreed.com/assets/images/github.gif?v=1" width="250px" />
</a>
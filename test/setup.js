import assert from 'assert';
import jsdom from 'jsdom-global';
import deepExtend from 'deep-extend';
import NodeListsAreEqual from './nodeListsAreEqual';
import sQuery from '../src';

jsdom();

sQuery.init();

sQuery.config = {
    singleClass: true
}

Object.assign(global, {
    deepExtend,
    assert,
    sQuery,
    NodeListsAreEqual
});
import assert from 'assert';
import jsdom from 'jsdom-global';
import deepExtend from 'deep-extend';
import sQuery from '../src/squery';
import NodeListsAreEqual from './nodeListsAreEqual';

jsdom();

sQuery.init();

Object.assign(global, {
    deepExtend,
    assert,
    sQuery,
    NodeListsAreEqual
});
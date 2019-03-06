import assert from 'assert';
import jsdom from 'jsdom-global';
import deepExtend from 'deep-extend';
import sQuery from '../src/squery';
// import * as sQuery from '../src/squery';
import NodeListsAreEqual from './nodeListsAreEqual';

jsdom();

sQuery.init();

global.deepExtend = deepExtend;
global.assert = assert;
global.sQuery = sQuery;
global.NodeListsAreEqual = NodeListsAreEqual;
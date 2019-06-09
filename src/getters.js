import INTERFACE from './squery';
import init from './utilities/init';
import * as API from './api/getters';

// spoof env process to assist bundle size
if (typeof process === 'undefined') window.process = { env: {} };

const sQuery = INTERFACE.bind(API);

sQuery.init = init.bind(API);

for (let entry of Object.entries(API)) {
    sQuery[entry[0]] = entry[1];
}

if (typeof window !== 'undefined') {
    window.sQuery = sQuery;
}

export default sQuery;
export default function BEMAPI(API) {
    let NEW_API = {};

    for (let entry of Object.entries(API)) {
        const key = entry[0], method = entry[1];

        let methodName = key;

        if (methodName.indexOf('module') > -1) {
            methodName = methodName.replace(new RegExp('module', 'g'), 'block');
        }

        if (methodName.indexOf('Module') > -1) {
            methodName = methodName.replace(new RegExp('Module', 'g'), 'Block');
        }

        if (methodName.indexOf('component') > -1) {
            methodName = methodName.replace(new RegExp('component', 'g'), 'element');
        }

        if (methodName.indexOf('Component') > -1) {
            methodName = methodName.replace(new RegExp('Component', 'g'), 'Element');
        }

        NEW_API[methodName] = method;
    }

    return NEW_API;
}
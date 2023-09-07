'use strict';

// ajax函数将返回Promise对象:
function ajax(method, url, data) {
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        request.onreadystatechange = () => {
            const { readyState, status, responseText } = request;
            if (readyState === 4) {
                if (status === 200) {
                    resolve(responseText);
                } else {
                    reject(status);
                }
            }
        };
        request.open(method, url);
        request.send(data);
    });
}
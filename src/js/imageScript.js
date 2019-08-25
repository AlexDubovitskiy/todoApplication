let cache = {};

function importAll(r) {
    r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context('../img', true, /\.png|jpe?g|svg|ico$/));

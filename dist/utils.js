export function hex2bin(hex) {
    function pad(num, size) {
        const s = "000" + num;
        return s.substr(s.length - size);
    }
    const hexArr = hex.split("");
    let bin = "";
    hexArr.forEach(function (e, i, arr) {
        const dec = parseInt(arr[i], 16);
        bin += pad(dec.toString(2), 4);
    });
    return bin;
}
export function hex2rgb(hex) {
    if (hex.charAt(0) === "#") {
        hex = hex.substr(1);
    }
    const parts = hex.match(/[0-9A-Za-z]{2}/g);
    if (!parts) {
        return [0, 0, 0];
    }
    return parts.map(function (e) {
        return parseInt(e, 16);
    });
}

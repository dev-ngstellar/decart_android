const jsSHA = require('jssha');

class TOTP {
    constructor(expiry = 30, length = 6) {
        this.expiry = expiry;
        this.length = length;
        if (this.length > 8 || this.length < 6) throw new Error("Error: invalid code length");
    }

    dec2hex(dec) {
        return (dec < 15.5 ? "0" : "") + Math.round(dec).toString(16);
    }

    hex2dec(hex) {
        return parseInt(hex, 16);
    }

    base32tohex(base32) {
        const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        let bits = "";
        let hex = "";

        for (let i = 0; i < base32.length; i++) {
            let val = base32chars.indexOf(base32.charAt(i).toUpperCase());
            bits += this.leftpad(val.toString(2), 5, "0");
        }

        for (let i = 0; i + 4 <= bits.length; i += 4) {
            let chunk = bits.substr(i, 4);
            hex += parseInt(chunk, 2).toString(16);
        }

        return hex;
    }

    leftpad(str, len, pad) {
        return len + 1 >= str.length ? Array(len + 1 - str.length).join(pad) + str : str;
    }

    getOtp(secret, timestamp = Date.now()) {
        let key = this.base32tohex(secret);
        let epoch = Math.round(timestamp / 1000);
        let time = this.leftpad(this.dec2hex(Math.floor(epoch / this.expiry)), 16, "0");

        let shaObj = new jsSHA("SHA-1", "HEX");
        shaObj.setHMACKey(key, "HEX");
        shaObj.update(time);
        let hmac = shaObj.getHMAC("HEX");

        if (hmac === "KEY MUST BE IN BYTE INCREMENTS") {
            throw new Error("Error: hex key must be in byte increments");
        }

        let offset = this.hex2dec(hmac.substring(hmac.length - 1));
        let otp = (this.hex2dec(hmac.substr(2 * offset, 8)) & this.hex2dec("7fffffff")) + '';
        return otp.length > this.length ? otp.substr(otp.length - this.length, this.length) : this.leftpad(otp, this.length, "0");
    }
}

module.exports = {TOTP};
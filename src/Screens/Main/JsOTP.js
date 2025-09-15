import { Component } from 'react';

class JsTOTP extends Component {
  constructor() {
    super();
    this.expiry = 30;
    this.length = 6;
    if (this.length > 8 || this.length < 6) throw "Error: invalid code length";
  }

  dec2hex(dec) {
    return (dec < 15.5 ? "0" : "") + Math.round(dec).toString(16);
  }

  hex2dec(hex) {
    return parseInt(hex, 16);
  }

  base32tohex(base32) {
    var hex = "";
    var binary = "";
    for (var i = 0; i < base32.length; i++) {
      var val = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".indexOf(base32.charAt(i).toUpperCase());
      binary += this.leftpad(val.toString(2), 5, "0");
    }
    for (var j = 0; j + 4 <= binary.length; j += 4) {
      var part = binary.substr(j, 4);
      hex += parseInt(part, 2).toString(16);
    }
    return hex;
  }

  leftpad(str, len, pad) {
    return len + 1 >= str.length && (str = Array(len + 1 - str.length).join(pad) + str), str;
  }

  getOtp(key, time = (new Date).getTime()) {
    var hexKey = this.base32tohex(key);
    var now = Math.round(time / 1000);
    var timeSlice = this.leftpad(this.dec2hex(Math.floor(now / this.expiry)), 16, "0");
    var hmacObj = new jsSHA("SHA-1", "HEX");
    hmacObj.setHMACKey(hexKey, "HEX");
    hmacObj.update(timeSlice);
    var hmac = hmacObj.getHMAC("HEX");
    if (hmac === "KEY MUST BE IN BYTE INCREMENTS") throw "Error: hex key must be in byte increments";
    var offset = this.hex2dec(hmac.substring(hmac.length - 1));
    var otp = (this.hex2dec(hmac.substr(2 * offset, 8)) & this.hex2dec("7fffffff")).toString();
    otp = otp.length > this.length ? otp.substr(otp.length - this.length, this.length) : this.leftpad(otp, this.length, "0");
    return otp;
  }
}

export default JsTOTP;

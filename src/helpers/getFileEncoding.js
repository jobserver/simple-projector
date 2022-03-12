const fs = require("fs");

module.exports = {
     getFileEncoding(f){
        var d = new Buffer.alloc(5, [0, 0, 0, 0, 0]);
        var fd = fs.openSync(f, "r");
        fs.readSync(fd, d, 0, 5, 0);
        fs.closeSync(fd);
      
        // https://en.wikipedia.org/wiki/Byte_order_mark
        var e = false;
        if (!e && d[0] === 0xef && d[1] === 0xbb && d[2] === 0xbf) e = "utf8";
        if (!e && d[0] === 0xfe && d[1] === 0xff) e = "utf16be";
        if (!e && d[0] === 0xff && d[1] === 0xfe) e = "utf16le";
        if (!e) e = "ascii";
      
        return f;
      }
}
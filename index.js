var through = require('through2');

var escapeStringRegexp = function(str){
  var matchOperatorsRe = /[|\\{}()[\]^$+*?.\/]/g;
  return str.replace(matchOperatorsRe, '\\$&');
};

var stream = function (opts, replaceCallback) {
    return through.obj(function (file, enc, cb) {

        var content = file.contents.toString();

        var reg = eval(`/${escapeStringRegexp(opts.startTag)}([\\s\\S]*?)${escapeStringRegexp(opts.endTag)}/`);
        content = content.replace(reg, replaceCallback);

        file.contents = new Buffer(content);

        this.push(file);

        cb();
    })
};
module.exports = {
    append: function (opts) {
        return stream(opts, function (rep, content) {
            var newContent = `
          ${opts.startTag}
          ${content}
          ${opts.string}
          ${opts.endTag}
          `;
            return newContent;
        });
    },
    prepend: function (opts) {
        return stream(opts, function (rep, content) {
            var newContent = `
          ${opts.startTag}
          ${opts.string}
          ${content}
          ${opts.endTag}
          `;
            return newContent;
        });
    }
};
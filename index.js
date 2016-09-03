"use strict"
const WriterT = require('./trans/writer');
const Writer = require('./type/writer');

module.exports = {
    WriterT: WriterT,
    Writer: Writer,

    trans: { writer: WriterT },
    type: { writer: Writer }
};

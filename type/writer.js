"use strict"
const Identity = require('akh.identity').Identity
const WriterT = require('../trans/writer')

/**
 * Writer monad
 */
const Writer = WriterT(Identity)

/**
 * Extract result from Writer monad as an `{ output, value }` pair
 * 
 * @param m Writer.
 * @param w Initial monoid value.
 */
Writer.run = (m, w) =>
    Identity.run(WriterT.run(m, w))

Writer.prototype.run = function(w) {
    return Writer.run(this, w)
}

/**
 * Extract result value Writer monad.
 * 
 * @param m Writer.
 * @param w Initial monoid value.
 */
Writer.exec = (m, w) =>
    Writer.run(m, w).value

Writer.prototype.exec = function(w) {
    return Writer.exec(this, w)
}

module.exports = Writer

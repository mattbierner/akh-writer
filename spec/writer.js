"use strict"

/**
 * Define writer monad operations
 */
const WriterMonad = (Instance, spec) => {
    /**
     * Exec current monad which returns a `[value, f]`.
     * 
     * Modifies current output with `f` and returns `value`.
     */
    Instance.prototype.pass = spec.pass

    /**
     * Produce the current output, value pair.
     */
    Instance.prototype.listen = spec.listen

    /**
     * Append a set of values to the environment
     */
    Instance.tell = spec.tell

    
    // Derived

    /**
     * Exectue current monad and apply `f` to output.
     */
    Instance.prototype.censor = function (f) {
        return this.map(x => [x, f]).pass()
    }

    return Instance
}

module.exports = WriterMonad
"use strict"
const spec = require('akh.core.spec')
const WriterMonad = require('../spec/writer')

const Pair = (value, output) => ({
    value: value,
    output: output
})

const runWriterT = (m, w) => m._run(w)

/**
 * Writer monad transformer.
 * 
 * @param m Base monad.
 */
const WriterT = m => {
    const Instance = function (run) {
        this._run = run
    }

    spec.Monad(Instance,
        x => new Instance(w => m.of(Pair(x, w.zero))),

        function (f) {
            return new Instance(w =>
                runWriterT(this, w)
                    .chain(a => runWriterT(f(a.value), a.output)
                        .chain(b => m.of(Pair(b.value, a.output.concat(b.output))))))
        })

    spec.Monoid(Instance,
        new Instance(_ => m.zero),

        function (b) {
            return new Instance(w =>
                runWriterT(this, w).concat(runWriterT(b, w)))
        })

    spec.Transformer(Instance, m,
        t =>
            new Instance(_ =>
                t.chain(x => m.of(Pair(x, m.zero)))))

    WriterMonad(Instance, {
        tell: w =>
            new Instance(_ => m.of(Pair(undefined, w))),

        listen: function (f) {
            return new Instance(w =>
                runWriterT(this, w).chain(r =>
                    m.of(Pair(x.value, f(r.output), r.output))))
        },

        pass: function () {
            return new Instance(w => {
                return runWriterT(this, w).chain(r => {
                    return m.of(Pair(r.value[0], r.value[1](r.output)))
                })
            })
        }
    })

    Instance.prototype.run = function (w) {
        return WriterT.run(this, w)
    }

    return Instance
}

/**
 * Get an inner monad of an `Writer` { value, output } pair.
 * 
 * @param m WriterT computation.
 */
WriterT.run = runWriterT


module.exports = WriterT

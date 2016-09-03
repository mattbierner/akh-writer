"use strict"
const assert = require('chai').assert
const Writer = require('../index').Writer
const List = require('akh.list').List

describe('Writer', () => {
    it("should return value for `of`", () => {
        assert.strictEqual(3, Writer.exec(Writer.of(3), List.zero))
        assert.strictEqual(3, Writer.of(3).exec(List.zero))
    })

    it("should return empty output for `of`", () => {
        const r = Writer.run(Writer.of(3), List.of(1))

        assert.strictEqual(3, r.value)
        assert.deepEqual([], r.output.run())
    })

    it("should chain basic `of` to return second value", () => {
        const c = Writer.of(3)
            .chain(x => Writer.of(x * 2))

        assert.strictEqual(6, Writer.exec(c, List.zero))
    })

    it('should chain in order', () => {
        const c = Writer.of(1)
            .chain(x => Writer.of(x + 1))
            .chain(x => Writer.of(x * 2))

        assert.strictEqual(4, Writer.exec(c, List.zero))
    })

     it('should combine output for chain', () => {
        const c = Writer.tell(List.of(1)).chain(x => Writer.tell(List.of(2)))

        assert.deepEqual([1, 2], Writer.run(c, List.zero).output.run())
    })

    it('should set output for `tell`', () => {
        const r = Writer.run(Writer.tell(List.of(3)), List.of(1))

        assert.strictEqual(undefined, r.value)
        assert.deepEqual([3], r.output.run())
    })

    it("map_right", () => {
        const c = Writer.of(3)
            .map(x => x * 2)
            .chain(x => Writer.of(x / 3))

        assert.strictEqual(2, Writer.exec(c, List.zero))
    })

    it('should set modify output with `f` for pass', () => {
        const r = Writer.run(
            Writer.tell(List.of(1)).map(v => [v, x => x.concat(List.of(5))]).pass(),
            List.zero)

        assert.deepEqual([1, 5], r.output.run())
    })

    it('should set modify output with `f` for censor', () => {
        const r = Writer.run(
            Writer.tell(List.of(1)).censor(x => x.concat(List.of(5))),
            List.of(1))

        assert.deepEqual([1, 5], r.output.run())
    })
})

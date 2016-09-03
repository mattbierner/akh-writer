# Writer Monad and Monad Transformer for [Akh Javascript Monad Library](https://github.com/mattbierner/akh)

The WriterT transformer, `WriterT`, adds error control to a monad. The base type, `Writer`, provides error logic on its own.

```bash
# To use as standalone package
$ npm install --save akh.writer

# To use as part of akh library
$ npm install --save akh
```

## Usage
`WriterT` and `Writer` implement the [Fantasy Land][fl] monad, functor, and applicative functor interfaces.

<a href="https://github.com/fantasyland/fantasy-land">
    <img src="https://raw.github.com/fantasyland/fantasy-land/master/logo.png" align="right" width="82px" height="82px" alt="Fantasy Land logo" />
</a>

```js
// Writer monad
require('akh.writer').Writer
require('akh').Writer

// Writer monad transformer
require('akh.writer').WriterT
require('akh').WriterT
```

#### `Writer.run(m, w)`, `m.run(w)`
Perform a writer computation `m`  without output monoid `w` and return { value, output}

```js
const List = require('akh.list').List

Writer.run(
    Writer.asks(r => r.a).map(x => x * 2),
    List.zero
) === 20
```

#### `WriterT.run(t, w)`, `t.run(w)`
Same as `Writer.run` but for a monad transformer. Returns an `Writer` value inside of the inner monad.

#### `Writer.exec(m, w)`, `m.exec(w)`
Perform a writer computation `m`  without output monoid `w` and return resulting value


## Writer Interface

#### `Writer.tell(b)`
#### `WriterT(M).tell(b)`
Append `b` to the output.

```js
Writer.of(4)
    .chain(x => writer.tell(List.of('output1')).map(_ => x)))
    .run(List.zero) === { value: 4, output: List of ['output1'] }
```

#### `Writer.listen()`
#### `WriterT(M).listen()`
Produces the current value output pair as `{ value, output }`

#### `m.pass()`
#### `t.pass()`
Exec current monad which returns a `[value, f]`, then modify current output with `f` and return `value`.


#### `m.censor(f)`
#### `t.censor(f)`
Exec current monad, then modify current output with `f` and return original `value`.


## Contributing
Contributions are welcome.

To get started:

```bash
$ cd akh-writer
$ npm install # install dev packages
$ npm test # run tests
```

[fl]: https://github.com/fantasyland/fantasy-land


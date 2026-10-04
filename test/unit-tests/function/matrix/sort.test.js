import assert from 'assert'
import math from '../../../../src/defaultInstance.js'

describe('sort', function () {
  it('should sort an array with numbers', function () {
    assert.deepStrictEqual(math.sort([5, 10, 1]), [1, 5, 10])
  })

  it('should sort an array with strings', function () {
    assert.deepStrictEqual(math.sort(['C', 'B', 'A', 'D'], 'natural'), ['A', 'B', 'C', 'D'])
    assert.deepStrictEqual(math.sort(['1', '2', '10'], 'asc'), ['1', '2', '10'])
    assert.deepStrictEqual(math.sort(['1', '2', '10'], 'natural'), ['1', '2', '10'])
  })

  it('should sort a Matrix', function () {
    assert.deepStrictEqual(math.sort(math.matrix([5, 10, 1])), math.matrix([1, 5, 10]))
  })

  it('should sort an array in ascending order', function () {
    assert.deepStrictEqual(math.sort([5, 10, 1], 'asc'), [1, 5, 10])
  })

  it('should sort an array in descending order', function () {
    assert.deepStrictEqual(math.sort([5, 10, 1], 'desc'), [10, 5, 1])
  })

  it('should sort an array naturally', function () {
    assert.deepStrictEqual(math.sort([{ a: 4 }, { a: 2 }, { a: 3 }], 'natural'), [{ a: 2 }, { a: 3 }, { a: 4 }])
  })

  it('should sort an array with a custom compare function', function () {
    function sortByLength (a, b) {
      return a.length - b.length
    }
    assert.deepStrictEqual(math.sort(['Langdon', 'Tom', 'Sara'], sortByLength),
      ['Tom', 'Sara', 'Langdon'])
  })

  it('should sort an array with bigints', function () {
    assert.deepStrictEqual(math.sort([3n, 1n, 2n]), [1n, 2n, 3n])
    assert.deepStrictEqual(math.sort([3n, 1n, 2n], 'asc'), [1n, 2n, 3n])
    assert.deepStrictEqual(math.sort([3n, 1n, 2n], 'desc'), [3n, 2n, 1n])
    assert.deepStrictEqual(math.sort([3n, 1n, 2n], 'natural'), [1n, 2n, 3n])
  })

  it('should sort bigints larger than the max safe integer without losing precision', function () {
    assert.deepStrictEqual(
      math.sort([123123123123123123123n, 99999999999999999999n, 123123123123123123124n]),
      [99999999999999999999n, 123123123123123123123n, 123123123123123123124n])
  })

  it('should sort a Matrix with bigints', function () {
    assert.deepStrictEqual(math.sort(math.matrix([3n, 1n, 2n])), math.matrix([1n, 2n, 3n]))
  })

  it('should sort an array with bigints using a custom compare function', function () {
    assert.deepStrictEqual(math.sort([3n, 1n, 2n], math.compare), [1n, 2n, 3n])
    assert.deepStrictEqual(math.sort([3n, 1n, 2n], (a, b) => b - a), [3n, 2n, 1n])
  })

  it('should sort an array with bigints (with bigint config)', function () {
    const bigmath = math.create({ number: 'bigint' })
    assert.deepStrictEqual(bigmath.evaluate('sort([3, 1, 2])'), bigmath.matrix([1n, 2n, 3n]))
    assert.deepStrictEqual(bigmath.evaluate('sort([3, 1, 2], "desc")'), bigmath.matrix([3n, 2n, 1n]))
    assert.deepStrictEqual(bigmath.evaluate('sort([3, 1, 2], "natural")'), bigmath.matrix([1n, 2n, 3n]))
    assert.deepStrictEqual(bigmath.evaluate('sort([3, 1, 2], compare)'), bigmath.matrix([1n, 2n, 3n]))
  })

  it('should throw an error if called with a multi dimensional matrix', function () {
    assert.throws(function () { math.sort(math.matrix([[1, 2], [3, 4]])) }, /One dimensional matrix expected/)
  })

  it('should throw an error if called with unsupported type', function () {
    assert.throws(function () { math.sort(2) })
    assert.throws(function () { math.sort('string') })
    assert.throws(function () { math.sort([], 'string') }, /String "asc", "desc", or "natural" expected/)
    assert.throws(function () { math.sort([], {}) })
  })

  it('should throw an error if called with invalid number of arguments', function () {
    assert.throws(function () { math.sort([], 'asc', 'foo') })
    assert.throws(function () { math.sort() })
  })

  it('should LaTeX sort', function () {
    const expression = math.parse('sort([3,2,1])')
    assert.strictEqual(expression.toTex(), '\\mathrm{sort}\\left(\\begin{bmatrix}3\\\\2\\\\1\\end{bmatrix}\\right)')
  })
})

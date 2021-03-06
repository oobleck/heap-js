# ![Heap.js](assets/heap-js.png) Heap.js

[![npm version](https://img.shields.io/npm/v/heap-js.svg?style=flat)](https://www.npmjs.com/package/heap-js)
[![Build Status](https://travis-ci.org/ignlg/heap-js.svg?branch=master)](https://travis-ci.org/ignlg/heap-js)
[![Coverage Status](https://img.shields.io/coveralls/ignlg/heap-js/master.svg?style=flat)](https://coveralls.io/github/ignlg/heap-js?branch=master)
[![Dependencies](https://david-dm.org/ignlg/heap-js.png?theme=shields.io)](https://david-dm.org/ignlg/heap-js)
[![devDependency Status](https://david-dm.org/ignlg/heap-js/dev-status.svg)](https://david-dm.org/ignlg/heap-js#info=devDependencies)

**Efficient Binary heap (priority queue, binary tree) data structure for JavaScript / TypeScript.**

Includes JavaScript methods, Python's _heapq module_ methods, and Java's _PriorityQueue_ methods.

Easy to use, known interfaces, tested, and well documented JavaScript binary heap library.

Instances are `integer min heap` by default.

## Recent changes

_v1.5:_ Adds `Iterator` interface and `iterator()` method.

## Examples

```js
// Basic usage example
import Heap from 'heap-js';

const minHeap = new Heap();
const maxHeap = new Heap(Heap.maxComparator);

minHeap.init([5, 18, 1]);
minHeap.push(2);
console.log(minHeap.peek()); //> 1
console.log(minHeap.pop()); //> 1
console.log(minHeap.peek()); //> 2

// Iterator
maxHeap.init([3, 4, 1, 12, 8]);
for (const value of maxHeap) {
  console.log('Next top value is', value);
}
```

```js
// Priority Queue usage example
const { Heap } = require('heap-js');

const tasks = db.collection.find().toArray();
const customPriorityComparator = (a, b) => a.priority - b.priority;

const priorityQueue = new Heap(customPriorityComparator);
priorityQueue.init(tasks);

// priorityQueue === priorityQueue.iterator()
for (const task of priorityQueue) {
  // Do something
}
```

```js
// Python-like static methods example
import { Heap } from 'heap-js';
const numbers = [2, 3, 7, 5];

Heap.heapify(numbers);
console.log(numbers); //> [ 2, 3, 5, 7 ]

Heap.heappush(numbers, 1);
console.log(numbers); //> [ 1, 2, 5, 7, 3 ]
```

## Installation

```bash
yarn add heap-js # if you use yarn

npm install --save heap-js # if you use npm
```

## Constructor

```js
new Heap([comparator]);
```

Basic comparators already included:

- `Heap.minComparator` Integer min heap _(default)_
- `Heap.maxComparator` Integer max heap

## Implements JavaScript style methods

- `length` of the heap
- `limit` amount of elements in the heap
- `pop()` the top element
- `push(...elements)` one or more elements to the heap
- `pushpop(element)` faster than `push` & `pop`
- `replace(element)` faster than `pop` & `push`
- `top(number?)` most valuable elements from the heap
- `bottom(number?)` least valuable elements from the heap

## Implements Java's `PriorityQueue` interface:

- `add(element)` to the heap
- `addAll([elment, element, ... ])` to the heap, faster than loop `add`
- `clear()`
- `clone()`
- `comparator()`
- `contains(element, fn?)`
- _`element()` alias of `peek()`_
- `isEmpty()`
- `iterator()` returns `this` because it is iterable
- _`offer(element)` alias of `add(element)`_
- `peek()`
- _`poll()` alias of `pop()`_
- `remove(element?)`
- _`removeAll()` alias of `clear()`_
- _`size()` alias of `length`_
- `toArray()`
- `toString()`

To do:

- `containsAll`
- `equals`
- `retainAll`

## Implements static Python's `heapq` interface:

- `Heap.heapify(array, comparator?)` that converts an array to an array-heap
- `Heap.heappop(heapArray, comparator?)` that takes the peek of the array-heap
- `Heap.heappush(heapArray, item, comparator?)` that appends elements to the array-heap
- `Heap.heappushpop(heapArray, item, comparator?)` faster than `heappush` & `heappop`
- `Heap.heapreplace(heapArray, item, comparator?)` faster than `heappop` & `heappush`

Extras:

- `Heap.heaptop(n, heapArray, comparator?)` that returns the `n` most valuable elements of the array-heap
- `Heap.heapbottom(n, heapArray, comparator?)` that returns the `n` least valuable elements of the array-heap

To do:

- `merge(...iterables, comparator?)`
- `nlargest(n, iterable, comparator?)`
- `nsmallest(n, iterable, comparator?)`

## Documentation

Extensive documentation included at `./dist/docs`. It'll be published to `gh-pages` in a next release.

## Contributing

Development of **Heap.js** happens in the open on GitHub, and I am grateful to the community for contributing bugfixes and improvements.

### Dev setup

```bash
yarn # if you use yarn

npm install # if you use npm
```

### Tests

```bash
yarn test # if you use yarn

npm test # if you use npm
```

### License

Heap.js is [BSD licensed](LICENSE).

export type Comparator<T> = (a: T, b: T) => number;
export type IsEqual<T> = (e: T, o: T) => boolean;

/**
 * Heap
 * @type {Class}
 */
export class Heap<T> implements Iterable<T> {
  heapArray: Array<T> = [];
  _limit: number = 0;

  /**
   * Alias of add
   */
  offer = this.add;

  /**
   * Alias of peek
   */
  element = this.peek;

  /**
   * Alias of pop
   */
  poll = this.pop;

  /**
   * Heap instance constructor.
   * @param  {Function} compare Optional comparison function, defaults to Heap.minComparator<number>
   */
  constructor(public compare: Comparator<T> = Heap.minComparator) {}

  /*
            Static methods
   */

  /**
   * Gets children indices for given index.
   * @param  {Number} idx     Parent index
   * @return {Array(Number)}  Array of children indices
   */
  static getChildrenIndexOf(idx: number): Array<number> {
    return [idx * 2 + 1, idx * 2 + 2];
  }

  /**
   * Gets parent index for given index.
   * @param  {Number} idx  Children index
   * @return {Number | undefined}      Parent index, -1 if idx is 0
   */
  static getParentIndexOf(idx: number): number {
    if (idx <= 0) {
      return -1;
    }
    const whichChildren = idx % 2 ? 1 : 2;
    return Math.floor((idx - whichChildren) / 2);
  }

  /**
   * Gets sibling index for given index.
   * @param  {Number} idx  Children index
   * @return {Number | undefined}      Sibling index, -1 if idx is 0
   */
  static getSiblingIndexOf(idx: number): number {
    if (idx <= 0) {
      return -1;
    }
    const whichChildren = idx % 2 ? 1 : -1;
    return idx + whichChildren;
  }

  /**
   * Min heap comparison function, default.
   * @param  {any} a     First element
   * @param  {any} b     Second element
   * @return {Number}    0 if they're equal, positive if `a` goes up, negative if `b` goes up
   */
  static minComparator<N>(a: N, b: N): number {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  }

  /**
   * Max heap comparison function.
   * @param  {any} a     First element
   * @param  {any} b     Second element
   * @return {Number}    0 if they're equal, positive if `a` goes up, negative if `b` goes up
   */
  static maxComparator<N>(a: N, b: N): number {
    if (b > a) {
      return 1;
    } else if (b < a) {
      return -1;
    } else {
      return 0;
    }
  }

  /**
   * Min number heap comparison function, default.
   * @param  {Number} a     First element
   * @param  {Number} b     Second element
   * @return {Number}    0 if they're equal, positive if `a` goes up, negative if `b` goes up
   */
  static minComparatorNumber(a: number, b: number): number {
    return a - b;
  }

  /**
   * Max number heap comparison function.
   * @param  {Number} a     First element
   * @param  {Number} b     Second element
   * @return {Number}    0 if they're equal, positive if `a` goes up, negative if `b` goes up
   */
  static maxComparatorNumber(a: number, b: number): number {
    return b - a;
  }

  /**
   * Default equality function.
   * @param  {any} a    First element
   * @param  {any} b    Second element
   * @return {Boolean}  True if equal, false otherwise
   */
  static defaultIsEqual<N>(a: N, b: N): boolean {
    return a === b;
  }

  /**
   * Prints a heap.
   * @param  {Heap} heap Heap to be printed
   * @returns {String}
   */
  static print<N>(heap: Heap<N>): string {
    function deep(i: number) {
      const pi = Heap.getParentIndexOf(i);
      return Math.floor(Math.log2(pi + 1));
    }

    function repeat(str: string, times: number) {
      let out = '';
      for (; times > 0; --times) {
        out += str;
      }
      return out;
    }

    let node = 0;
    const lines: Array<Array<string>> = [];
    const maxLines = deep(heap.length - 1) + 2;
    let maxLength = 0;

    while (node < heap.length) {
      let i = deep(node) + 1;
      if (node === 0) {
        i = 0;
      }
      // Text representation
      const nodeText = String(heap.get(node));
      if (nodeText.length > maxLength) {
        maxLength = nodeText.length;
      }
      // Add to line
      lines[i] = lines[i] || [];
      lines[i].push(nodeText);
      node += 1;
    }

    return lines
      .map((line, i) => {
        const times = Math.pow(2, maxLines - i) - 1;
        return (
          repeat(' ', Math.floor(times / 2) * maxLength) +
          line
            .map(el => {
              // centered
              const half = (maxLength - el.length) / 2;
              return repeat(' ', Math.ceil(half)) + el + repeat(' ', Math.floor(half));
            })
            .join(repeat(' ', times * maxLength))
        );
      })
      .join('\n');
  }

  /*
            Python style
   */
  /**
   * Converts an array into an array-heap
   * @param  {Array}    arr      Array to be modified
   * @param  {Function} compare  Optional compare function
   * @return {Heap}              For convenience, it returns a Heap instance
   */
  static heapify<N>(arr: Array<N>, compare?: Comparator<N>) {
    const heap = new Heap(compare);
    heap.heapArray = arr;
    heap.init();
    return heap;
  }
  /**
   * Extract the peek of an array-heap
   * @param  {Array}    heapArr  Array to be modified, should be a heap
   * @param  {Function} compare  Optional compare function
   * @return {any}               Returns the extracted peek
   */
  static heappop<N>(heapArr: Array<N>, compare?: Comparator<N>) {
    const heap = new Heap(compare);
    heap.heapArray = heapArr;
    return heap.pop();
  }
  /**
   * Pushes a item into an array-heap
   * @param  {Array}    heapArr  Array to be modified, should be a heap
   * @param  {any}      item     Item to push
   * @param  {Function} compare  Optional compare function
   */
  static heappush<N>(heapArr: Array<N>, item: N, compare?: Comparator<N>) {
    const heap = new Heap(compare);
    heap.heapArray = heapArr;
    heap.push(item);
  }
  /**
   * Push followed by pop, faster
   * @param  {Array}    heapArr  Array to be modified, should be a heap
   * @param  {any}      item     Item to push
   * @param  {Function} compare  Optional compare function
   * @return {any}               Returns the extracted peek
   */
  static heappushpop<N>(heapArr: Array<N>, item: N, compare?: Comparator<N>) {
    const heap = new Heap(compare);
    heap.heapArray = heapArr;
    return heap.pushpop(item);
  }
  /**
   * Replace peek with item
   * @param  {Array}    heapArr  Array to be modified, should be a heap
   * @param  {any}      item     Item as replacement
   * @param  {Function} compare  Optional compare function
   * @return {any}               Returns the extracted peek
   */
  static heapreplace<N>(heapArr: Array<N>, item: N, compare?: Comparator<N>) {
    const heap = new Heap(compare);
    heap.heapArray = heapArr;
    return heap.replace(item);
  }

  /**
   * Return the `n` most valuable elements
   * @param  {Array}    heapArr  Array, should be a heap
   * @param  {number}   n        Max number of elements
   * @param  {Function} compare  Optional compare function
   * @return {any}               Elements
   */
  static heaptop<N>(heapArr: Array<N>, n: number = 1, compare?: Comparator<N>) {
    const heap = new Heap(compare);
    heap.heapArray = heapArr;
    return heap.top(n);
  }

  /**
   * Return the `n` least valuable elements
   * @param  {Array}    heapArr  Array, should be a heap
   * @param  {number}   n        Max number of elements
   * @param  {Function} compare  Optional compare function
   * @return {any}               Elements
   */
  static heapbottom<N>(heapArr: Array<N>, n: number = 1, compare?: Comparator<N>) {
    const heap = new Heap(compare);
    heap.heapArray = heapArr;
    return heap.bottom(n);
  }

  /*
            Instance methods
   */

  /**
   * Adds an element to the heap. Aliases: `offer`.
   * Same as: push(element)
   * @param {any} element Element to be added
   * @return {Boolean} true
   */
  add(element: T): boolean {
    this._sortNodeUp(this.heapArray.push(element) - 1);
    this._applyLimit();
    return true;
  }

  /**
   * Adds an array of elements to the heap.
   * Similar as: push(element, element, ...).
   * @param {Array} elements Elements to be added
   * @return {Boolean} true
   */
  addAll(elements: Array<T>): boolean {
    let i = this.length;
    this.heapArray.push(...elements);
    for (const l = this.length; i < l; ++i) {
      this._sortNodeUp(i);
    }
    this._applyLimit();
    return true;
  }

  /**
   * Return the bottom (lowest value) N elements of the heap.
   *
   * @param  {Number} n  Number of elements.
   * @return {Array}     Array of length <= N.
   */
  bottom(n: number = 1): Array<T> {
    if (this.heapArray.length === 0 || n <= 0) {
      // Nothing to do
      return [];
    } else if (this.heapArray.length === 1) {
      // Just the peek
      return [this.heapArray[0]];
    } else if (n >= this.heapArray.length) {
      // The whole peek
      // Clone is needed due to the sort method (in-place) that would destroy the heap
      const cloned = this.heapArray.slice(0);
      cloned.sort(this._invertedCompare);
      return cloned;
    } else {
      // Some elements
      const result = this._bottomN(n);
      result.sort(this._invertedCompare);
      return result;
    }
  }

  /**
   * Check if the heap is sorted, useful for testing purposes.
   * @return {Undefined | Element}  Returns an element if something wrong is found, otherwise it's undefined
   */
  check(): T | undefined {
    return this.heapArray.find(
      (el: T, j: number, arr: Array<T>) => !!this.getChildrenOf(j).find(ch => this.compare(el, ch) > 0)
    );
  }

  /**
   * Remove all of the elements from this heap.
   */
  clear(): void {
    this.heapArray = [];
  }

  /**
   * Clone this heap
   * @return {Heap}
   */
  clone(): Heap<T> {
    const cloned = new Heap<T>(this.comparator());
    cloned.heapArray = this.toArray();
    cloned._limit = this._limit;
    return cloned;
  }

  /**
   * Returns the comparison function.
   * @return {Function}
   */
  comparator(): Comparator<T> {
    return this.compare;
  }

  /**
   * Returns true if this queue contains the specified element.
   * @param  {any}      o   Element to be found
   * @param  {Function} fn  Optional comparison function, receives (element, needle)
   * @return {Boolean}
   */
  contains(o: T, fn: IsEqual<T> = Heap.defaultIsEqual): boolean {
    return this.heapArray.findIndex(el => fn(el, o)) >= 0;
  }

  /**
   * Initialise a heap, sorting nodes
   * @param  {Array} array Optional initial state array
   */
  init(array?: Array<T>): void {
    if (array) {
      this.heapArray = array.slice(0);
    }
    for (let i = Math.floor(this.heapArray.length); i >= 0; --i) {
      this._sortNodeDown(i);
    }
    this._applyLimit();
  }

  /**
   * Test if the heap has no elements.
   * @return {Boolean} True if no elements on the heap
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Get the leafs of the tree (no children nodes)
   */
  leafs() {
    if (this.heapArray.length === 0) {
      return [];
    }
    const pi = Heap.getParentIndexOf(this.heapArray.length - 1);
    return this.heapArray.slice(pi + 1);
  }

  /**
   * Length of the heap.
   * @return {Number}
   */
  get length(): number {
    return this.heapArray.length;
  }

  /**
   * Get length limit of the heap.
   * @return {Number}
   */
  get limit(): number {
    return this._limit;
  }

  /**
   * Set length limit of the heap.
   * @return {Number}
   */
  set limit(_l: number) {
    this._limit = _l;
    this._applyLimit();
  }

  /**
   * Top node. Aliases: `element`.
   * Same as: `top(1)[0]`
   * @return {any} Top node
   */
  peek(): T | undefined {
    return this.heapArray[0];
  }

  /**
   * Extract the top node (root). Aliases: `poll`.
   * @return {any} Extracted top node, undefined if empty
   */
  pop(): T | undefined {
    const pop = this.heapArray.pop();
    if (this.length > 0 && pop !== undefined) {
      return this.replace(pop);
    }
    return pop;
  }

  /**
   * Pushes element(s) to the heap.
   * @param  {...any} elements Elements to insert
   * @return {Boolean} True if elements are present
   */
  push(...elements: Array<T>): boolean {
    if (elements.length < 1) {
      return false;
    } else if (elements.length === 1) {
      return this.add(elements[0]);
    } else {
      return this.addAll(elements);
    }
  }

  /**
   * Same as push & pop in sequence, but faster
   * @param  {any} element Element to insert
   * @return {any}  Extracted top node
   */
  pushpop(element: T): T {
    if (this.compare(this.heapArray[0], element) < 0) {
      [element, this.heapArray[0]] = [this.heapArray[0], element];
      this._sortNodeDown(0);
    }
    return element;
  }

  /**
   * Remove an element from the heap.
   * @param  {any}   o      Element to be found
   * @param  {Function} fn  Optional function to compare
   * @return {Boolean}      True if the heap was modified
   */
  remove(o?: T, fn: IsEqual<T> = Heap.defaultIsEqual) {
    if (this.length > 0) {
      if (o === undefined) {
        this.pop();
        return true;
      } else {
        const idx = this.heapArray.findIndex(el => fn(el, o));
        if (idx >= 0) {
          if (idx === 0) {
            this.pop();
          } else if (idx === this.length - 1) {
            this.heapArray.pop();
          } else {
            this.heapArray.splice(idx, 1, this.heapArray.pop() as T);
            this._sortNodeUp(idx);
            this._sortNodeDown(idx);
          }
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Pop the current peek value, and add the new item.
   * @param  {any} element  Element to replace peek
   * @return {any}         Old peek
   */
  replace(element: T): T {
    const peek = this.heapArray[0];
    this.heapArray[0] = element;
    this._sortNodeDown(0);
    return peek;
  }

  /**
   * Size of the heap
   * @return {Number}
   */
  size(): number {
    return this.length;
  }

  /**
   * Return the top (highest value) N elements of the heap.
   *
   * @param  {Number} n  Number of elements.
   * @return {Array}    Array of length <= N.
   */
  top(n: number = 1): Array<T> {
    if (this.heapArray.length === 0 || n <= 0) {
      // Nothing to do
      return [];
    } else if (this.heapArray.length === 1 || n === 1) {
      // Just the peek
      return [this.heapArray[0]];
    } else if (n >= this.heapArray.length) {
      // The whole peek
      // Clone is needed due to the sort method (in-place) that would destroy the heap
      const cloned = this.heapArray.slice(0);
      cloned.sort(this.compare);
      return cloned;
    } else {
      // Some elements
      const result = this._topN(n);
      result.sort(this.compare);
      return result;
    }
  }

  /**
   * Clone the heap's internal array
   * @return {Array}
   */
  toArray(): Array<T> {
    return this.heapArray.slice(0);
  }

  /**
   * String output, call to Array.prototype.toString()
   * @return {String}
   */
  toString(): string {
    return this.heapArray.toString();
  }

  /**
   * Get the element at the given index.
   * @param  {Number} i Index to get
   * @return {any}       Element at that index
   */
  get(i: number): T {
    return this.heapArray[i];
  }

  /**
   * Get the elements of these node's children
   * @param  {Number} idx Node index
   * @return {Array(any)}  Children elements
   */
  getChildrenOf(idx: number): Array<T> {
    return Heap.getChildrenIndexOf(idx)
      .map(i => this.heapArray[i])
      .filter(e => e !== undefined);
  }

  /**
   * Get the element of this node's parent
   * @param  {Number} idx Node index
   * @return {any}     Parent element
   */
  getParentOf(idx: number): T | undefined {
    const pi = Heap.getParentIndexOf(idx);
    return this.heapArray[pi];
  }

  /**
   * Iterator interface
   */
  *[Symbol.iterator]() {
    while (this.length) {
      yield this.pop() as T;
    }
  }

  /**
   * Returns an iterator. To comply with Java interface.
   */
  iterator() {
    return this;
  }

  /**
   * Limit heap size if needed
   */
  _applyLimit() {
    if (this._limit && this._limit < this.heapArray.length) {
      let rm = this.heapArray.length - this._limit;
      // It's much faster than splice
      while (rm) {
        this.heapArray.pop();
        --rm;
      }
    }
  }

  /**
   * Return the bottom (lowest value) N elements of the heap, without corner cases, unsorted
   *
   * @param  {Number} n  Number of elements.
   * @return {Array}     Array of length <= N.
   */
  _bottomN(n: number): Array<T> {
    // Use an inverted heap
    const bottomHeap = new Heap(this.compare);
    bottomHeap.limit = n;
    bottomHeap.init(this.heapArray.slice(-n));
    const startAt = this.heapArray.length - 1 - n;
    const parentStartAt = Heap.getParentIndexOf(startAt);
    const indices = [];
    for (let i = startAt; i > parentStartAt; --i) {
      indices.push(i);
    }
    const arr = this.heapArray;
    while (indices.length) {
      const i = indices.shift() as number;
      if (this.compare(arr[i], bottomHeap.peek() as T) > 0) {
        bottomHeap.replace(arr[i]);
        if (i % 2) {
          indices.push(Heap.getParentIndexOf(i));
        }
      }
    }
    return bottomHeap.toArray();
  }

  /**
   * Returns the inverse to the comparison function.
   * @return {Function}
   */
  _invertedCompare = (a: T, b: T): number => {
    return -1 * this.compare(a, b);
  };

  /**
   * Move a node to a new index, switching places
   * @param  {Number} j First node index
   * @param  {Number} k Another node index
   */
  _moveNode(j: number, k: number): void {
    [this.heapArray[j], this.heapArray[k]] = [this.heapArray[k], this.heapArray[j]];
  }

  /**
   * Move a node down the tree (to the leaves) to find a place where the heap is sorted.
   * @param  {Number} i Index of the node
   */
  _sortNodeDown(i: number): boolean {
    let moveIt = i < this.heapArray.length - 1;
    let moved = false;
    const self = this.heapArray[i];

    const getPotentialParent = (best: number, j: number) => {
      if (this.compare(this.heapArray[j], this.heapArray[best]) < 0) {
        best = j;
      }
      return best;
    };

    while (moveIt) {
      const childrenIdx = Heap.getChildrenIndexOf(i);
      const bestChildIndex = childrenIdx.reduce(getPotentialParent, childrenIdx[0]);
      const bestChild = this.heapArray[bestChildIndex];
      if (typeof bestChild !== 'undefined' && this.compare(self, bestChild) > 0) {
        this._moveNode(i, bestChildIndex);
        i = bestChildIndex;
        moved = true;
      } else {
        moveIt = false;
      }
    }
    return moved;
  }

  /**
   * Move a node up the tree (to the root) to find a place where the heap is sorted.
   * @param  {Number} i Index of the node
   */
  _sortNodeUp(i: number): boolean {
    let moveIt = i > 0;
    let moved = false;
    while (moveIt) {
      const pi = Heap.getParentIndexOf(i);
      if (pi >= 0 && this.compare(this.heapArray[pi], this.heapArray[i]) > 0) {
        this._moveNode(i, pi);
        i = pi;
        moved = true;
      } else {
        moveIt = false;
      }
    }
    return moved;
  }

  /**
   * Return the top (highest value) N elements of the heap, without corner cases, unsorted
   *
   * @param  {Number} n  Number of elements.
   * @return {Array}     Array of length <= N.
   */
  _topN(n: number): Array<T> {
    // Use an inverted heap
    const topHeap = new Heap(this._invertedCompare);
    topHeap.limit = n;
    const indices = [0];
    const arr = this.heapArray;
    while (indices.length) {
      const i = indices.shift() as number;
      if (i < arr.length) {
        if (topHeap.length < n) {
          topHeap.push(arr[i]);
          indices.push(...Heap.getChildrenIndexOf(i));
        } else if (this.compare(arr[i], topHeap.peek() as T) <= 0) {
          topHeap.replace(arr[i]);
          indices.push(...Heap.getChildrenIndexOf(i));
        }
      }
    }
    return topHeap.toArray();
  }
}

export default Heap;

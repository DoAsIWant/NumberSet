const {InstanceError} = require("./errors/InstanceError");
const {TypeError} = require("./errors/TypeError");
const {CallbackError} = require("./errors/CallBackError");
const {ThisArgsError} = require("./errors/ThisArgsError");
const {EmptyArgsError} = require("./errors/EmptyArgsError");

class mySet {
    #setValues;

    constructor(iterableObj) {
        this.#setValues = this.fillSet(iterableObj);
    }

    getSize() {
        return this.#setValues.length
    }

    add(addValue) {
        if(arguments.length === 0) {
            throw new EmptyArgsError("Add")
        }
        let isInSet = this.#setValues.some((el) => el === addValue)
        if (!isInSet) {
            this.#setValues.push(addValue)
        }
        return this
    }

    has(searchValue) {
        if(arguments.length === 0) {
            throw new EmptyArgsError("Has")
        }
        for (let e of this) {
            if (e === searchValue) {
                return true;
            }
        }

        return false;
    }

    delete(deletedValue) {
        if(arguments.length === 0) {
            throw new EmptyArgsError("Delete")
        }
        this.#setValues.forEach((el, index) => {
            if (el === deletedValue) {
                this.#setValues.splice(index, 1);
            }
        })

        return this;
    }

    multiply(insertedSet) {
        if (!(insertedSet instanceof mySet)) {
            throw new InstanceError(insertedSet)
        }

        let newSet = new mySet()
        if (insertedSet.#setValues.length === 0) {
            return new mySet()
        }
        for (let el of insertedSet) {
            if (this.#setValues.includes(el)) {
                newSet.add(el)
            }
        }

        return newSet;
    }

    plus(unionSet) {
        if (!(unionSet instanceof mySet)) {
            throw new InstanceError(unionSet)
        }

        let newSet = new mySet()
        for (let el of this) {
            newSet.add(el);
        }
        for (let el of unionSet) {
            if (!(this.#setValues.includes(el))) {
                newSet.add(el)
            }
        }

        return newSet;
    }

    minus(minusSet) {
        if (!(minusSet instanceof mySet)) {
            throw new InstanceError(minusSet)
        }
        let newSet = new mySet();
        for (let el of this) {
            if (!(minusSet.#setValues.includes(el))) {
                newSet.add(el)
            }
        }

        return newSet
    }

    include(includedSet) {
        if (!(includedSet instanceof mySet)) {
            throw new InstanceError(includedSet);
        }
        let isInclude = includedSet.#setValues.every((el => this.#setValues.includes(el)))

        if ((isInclude || includedSet.#setValues.length === 0) && this.#setValues.length !== 0) {
            return true
        }
        if (this.#setValues.length === 0 || !isInclude) {
            return false
        }
    }

    filter(callback, thisArgs) {
        if (typeof (callback) !== "function") {
            throw new CallbackError("forEach", typeof (callback));
        }
        if(thisArgs && (typeof thisArgs!=="object")){
            throw new ThisArgsError("forEach", typeof (thisArgs))
        }
        let newSet = new mySet();

        for (let el of this) {
            let isFilter = callback.call(thisArgs, el, this)

            if (isFilter) {
                newSet.add(el)
            }
        }

        return newSet
    }

    forEach(callback, thisArgs) {
        if (typeof (callback) !== "function") {
            throw new CallbackError("forEach", typeof (callback));
        }
        if(thisArgs && (typeof thisArgs!=="object")){
            throw new ThisArgsError("forEach", typeof (thisArgs))
        }

        for (let el of this) {
            callback.call(thisArgs, el, this)
        }
    }

    fillSet(obj) {
        let newSetValue = [];

        if (typeof (obj) === "undefined") {
            return []
        } else if (!(typeof obj[Symbol.iterator] === 'function')) {
            throw new TypeError(obj)
        }

        for (let el of obj) {
            if (!newSetValue.includes(el)) {
                newSetValue.push(el);
            }
        }

        return newSetValue;
    }

    * [Symbol.iterator]() {
        for (let el of this.#setValues) {
            yield el
        }
    }
}


module.exports = {
    mySet
}






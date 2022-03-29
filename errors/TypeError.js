const {MySetError} = require("./MySetError");

class TypeError extends MySetError{
    constructor(obj) {
        super(`${obj} is not iterable`);
        this.name = "TypeError";
    }
}

module.exports = {
   TypeError
}
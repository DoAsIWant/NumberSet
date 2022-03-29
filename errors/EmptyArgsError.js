const {MySetError} = require("./MySetError");

class EmptyArgsError extends MySetError{
    constructor(methodName) {
        super(`No arguments passed. MySet method ${methodName} should have an argument`);
        this.name = "EmptyArgsError";
    }
}

module.exports = {
    EmptyArgsError
}

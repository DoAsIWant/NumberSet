const {MySetError} = require("./MySetError");

class ThisArgsError extends MySetError{
    constructor(methodName, type) {
        super(`MySet method ${methodName}. The type of thisArgs must be object. But ${type} provided!`);
        this.name = "ThisArgsError";
    }
}

module.exports = {
    ThisArgsError
}


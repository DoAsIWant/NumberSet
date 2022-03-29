const {MySetError} = require("./MySetError");

class CallBackError extends MySetError{
    constructor(methodName, type) {
        super(`MySet method ${methodName} can get only function type as argument. But ${type} provided!`);
        this.name = "CallbackError";
    }
}

module.exports = {
    CallBackError
}



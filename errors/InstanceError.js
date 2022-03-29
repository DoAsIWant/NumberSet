const {MySetError} = require("./MySetError");

class InstanceError extends MySetError{
    constructor(obj) {
        super(`${obj} is not instance of MySet`);
        this.name = "Instance Error";
    }
}

module.exports = {
    InstanceError
}
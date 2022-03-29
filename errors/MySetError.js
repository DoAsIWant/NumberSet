class MySetError extends Error{
    constructor(message) {
        super(message);
        this.name = "MySetError";
    }
}

module.exports = {
    MySetError
}
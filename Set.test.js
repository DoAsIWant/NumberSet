const {mySet} = require("./Set")
const {TypeError} = require("./errors/TypeError");
const {InstanceError} = require("./errors/InstanceError");
const {CallbackError} = require("./errors/CallBackError");
const {ThisArgsError} = require("./errors/ThisArgsError");
const {EmptyArgsError} = require("./errors/EmptyArgsError");

describe("mySet test", () => {
    describe("Initialization", () => {
        describe("Creating Set", () => {
            test("Created object must be instance of mySet ", () => {
                const set = new mySet();

                expect(set instanceof mySet).toBeTruthy();
            });
        });

        describe("Fill set by argument in constructor", () => {
            test("If value of argument is undefined create empty Set", () => {
                const set = new mySet();

                expect([...set]).toEqual([]);
            });

            test("if value of argument is not iterable object throw TYpe Error", () => {
                expect(() => {
                    new mySet({a: 1});
                }).toThrow(TypeError);
            });

            test("if value of argument is iterable object add elements of this object to Set ", () => {
                const set = new mySet([1, 2, 3]);

                expect([...set]).toEqual([1, 2, 3]);
            })
        });

        describe("Unique value of set", () => {
            test("Values of the set should be unique", () => {
                const set = new mySet([1, 2, 3, 2, 4, 4, 2, 3]);

                expect([...set]).toEqual([1, 2, 3, 4]);
            });

            test("Should be unique in larger set", () => {
                const set = new mySet([1, 1, 1, 1, 1, 1, 1, 1]);

                expect([...set]).toEqual([1]);
            });
        })
    })

    describe("Set.prototype.add", () => {
        describe("Arguments", () => {
            test("If argument is not passed throw emptyArgumentError", () => {
                const set = new mySet([1, 2, 3]);

                expect(() => {
                    set.add()
                }).toThrow(EmptyArgsError)
            })

            test("If argument is passed function will be invoked and return object", () => {
                const set = new mySet([1, 2, 3]);

                expect(set.add(9)).toEqual({})
            })
        })

        describe("Function execution", () => {
            test("Should add new element to the instance of Set", () => {
                const set1 = new mySet([]);

                set1.add(1);

                expect([...set1]).toEqual([1]);
            });

            test("Should add the element to Set", () => {
                const set1 = new mySet([1, 2, 3]);

                set1.add(5);

                expect([...set1]).toEqual([1, 2, 3, 5]);
            });

            test("Shouldn't add the element to the set if this element already exists", () => {
                const set1 = new mySet([1, 2, 3, 10]);

                set1.add(10);

                expect([...set1]).toEqual([1, 2, 3, 10]);
            });
        });

        describe("Return value", () => {
            test("Return type of the value should be instance of mySet", () => {
                const set = new mySet([1, 2, 3]);
                const addedItem = set.add(10);

                expect(addedItem instanceof mySet).toBeTruthy();
            });

            test("Return value should be current set", () => {
                const set = new mySet([1, 2, 3]);
                const addResult = set.add(10);

                expect(Object.is(set, addResult)).toBeTruthy();
            });
        })
    })

    describe("Set.prototype.has", () => {
        describe("Arguments", () => {
            test("If argument is not passed throw emptyArgumentError", () => {
                const set = new mySet([1, 2, 3]);

                expect(() => {
                    set.has()
                }).toThrow(EmptyArgsError)
            })

            test("If argument is passed function will be invoked and return true or false", () => {
                const set = new mySet([1, 2, 3]);

                expect(set.has(9)).toBeFalsy();
                expect(set.has(1)).toBeTruthy();
            })
        })

        describe("Function execution", () => {
            test("Set has a value", () => {
                const set = new mySet([20, 13, 9, 3]);

                expect(set.has(20)).toBeTruthy();
            });

            test("Set hasn't a value ", () => {
                const set = new mySet([10, 45, 12]);

                expect(set.has(21)).toBeFalsy();
            });

            test("If set is empty return false", () => {
                const set = new mySet([]);

                expect(set.has(777)).toBeFalsy();
            });
        });
    });

    describe("Set.prototype.delete", () => {
        describe("Arguments", () => {
            test("If argument is not passed throw emptyArgumentError", () => {
                const set = new mySet([1, 2, 3]);

                expect(() => {
                    set.delete()
                }).toThrow(EmptyArgsError)
            })

            test("If argument is passed function will be invoked and return object", () => {
                const set = new mySet([1, 2, 3]);

                expect(set.delete(1)).toEqual({})
            })
        })

        describe("Function execution", () => {
            test("Should delete element if it exist in Set", () => {
                const set = new mySet([1, 2, 3]);

                set.delete(1);

                expect([...set]).toEqual([2, 3]);
            });

            test("Shouldn't delete element if it doesn't exist in Set", () => {
                const set = new mySet([1, 2, 3]);

                set.delete(22222);

                expect([...set]).toEqual([1, 2, 3]);
            });

            test("Shouldn't delete element if set is empty", () => {
                const set = new mySet([]);

                set.delete(1);

                expect([...set]).toEqual([]);
            });
        });

        describe("Return value", () => {
            test("Type of return value should be instance of mySet", () => {
                const
                    set = new mySet([1, 2, 3, 10]),
                    deletedItem = set.delete(10);

                expect(deletedItem instanceof mySet).toBeTruthy();
            });

            test("Return value should be current set", () => {
                const
                    set = new mySet([1, 2, 3, 10]),
                    deletedSet = set.delete(10);

                expect(Object.is(set, deletedSet)).toBeTruthy();
            });
        })
    });

    describe("Set.prototype.multiply", () => {
        describe("Arguments", () => {
            test("Throws InstanceError if type of argument is not a mySet", () => {
                const set = new mySet([1, 2, 3, 4]);

                expect(() => {
                    set.multiply(2);
                }).toThrow(InstanceError);
            });

            test("If type of the argument is mySet, function invokes and returns object", () => {
                const set = new mySet([1, 2, 3]);

                expect(set.multiply(new mySet([3, 4]))).toEqual({});
            });
        });

        describe("Function execution", () => {
            test("Must return a new Set with common elements of 2 Sets", () => {
                const set = new mySet([1, 2, 3]);
                const multiple = set.multiply(new mySet([1, 2]));

                expect([...multiple]).toEqual([1, 2]);
            });

            test("Must return new empty Set if passed Set is empty", () => {
                const set = new mySet([1, 2, 4]);
                const multiple = set.multiply(new mySet());

                expect([...multiple]).toEqual([]);
            });

            test("Must return new empty Set, if current Set is empty", () => {
                const set = new mySet();
                const multiple = set.multiply(new mySet([1, 2, 3]));

                expect([...multiple]).toEqual([]);
            });

            test("Must return new empty Set, if current Set and passed Set are empty", () => {
                const set = new mySet()
                const multiple = set.multiply(new mySet());

                expect([...multiple]).toEqual([]);
            });

            test("Must return new empty Set if there is no common elements in both Sets", () => {
                const set = new mySet([1, 2, 3]);
                const multiply = set.multiply(new mySet([4, 5]));

                expect([...multiply]).toEqual([])
            })
        })

        describe("Return value", () => {
            test("Return type of value should be instance of mySet", () => {
                const set = new mySet([1, 2, 3]);
                const plusSet = set.multiply(new mySet([1, 2]));

                expect(plusSet).toBeInstanceOf(mySet)
            })

            test("Return value should be new set", () => {
                const set = new mySet([1, 2, 3]);
                const plusSet = set.multiply(new mySet([1, 2]));

                expect(Object.is(set, plusSet)).toBeFalsy();
            })
        })
    });

    describe("Set.prototype.plus", () => {
        describe("Arguments", () => {
            test("Throw error if the argument is not instance of mySet", () => {
                const set = new mySet([1, 2, 3, 4]);

                expect(() => {
                    set.plus([10, 8]);
                }).toThrow(InstanceError);
            });

            test("If type of the argument is mySet, function invokes and returns object", () => {
                const set = new mySet([1, 2, 3]);

                expect(set.plus(new mySet([3, 4]))).toEqual({});
            });
        })

        describe("Function execution", () => {
            test("Should return new Set with all unique elements of current Set and passed Set", () => {
                const set = new mySet([1, 2, 3]);
                const addedSet = set.plus(new mySet([2, 3, 4]));

                expect([...addedSet]).toEqual([1, 2, 3, 4]);
            });

            test("Should return new Set with elements of current Set, if passed Set is empty", () => {
                const set = new mySet([1, 2, 3]);
                const addedSet = set.plus(new mySet());

                expect([...addedSet]).toEqual([1, 2, 3]);
            });

            test("Should return new Set with elements of passed if current Set is empty", () => {
                const set = new mySet();
                const addedSet = set.plus(new mySet([1, 2]));

                expect([...addedSet]).toEqual([1, 2]);
            });

            test("Should return empty Set if current Set and passed Set are empty", () => {
                const set = new mySet();
                const emptySet = set.plus(new mySet());

                expect([...emptySet]).toEqual([]);
            });
        })

        describe("Return value", () => {
            test("Return type of value should be instance of mySet", () => {
                const set = new mySet([1, 2]);
                const plusSet = set.plus(new mySet([1, 2]));

                expect(plusSet).toBeInstanceOf(mySet)
            })

            test("Return value should be new set", () => {
                const set = new mySet([1, 2]);
                const plusSet = set.plus(new mySet([1, 2]));

                expect(Object.is(set, plusSet)).toBeFalsy();
            })
        })
    });

    describe("Set.prototype.include", () => {
        describe("Arguments", () => {
            test("if argument is not instance of set throws Instance Error ", () => {
                const set = new mySet([1, 2, 3]);

                expect(() => {
                    set.include(10);
                }).toThrow(InstanceError);
            })

            test("if argument is instance of set function will be invoke and return true or false", () => {
                const set = new mySet([1, 2, 3]);

                expect(set.include(new mySet([1, 3]))).toBeTruthy();
                expect(set.include(new mySet([5, 6]))).toBeFalsy();
            })
        })

        describe("Function execution", () => {
            test("Should return true if all elements of passed Set exists in current Set", () => {
                const set = new mySet([1, 2, 3]);

                expect(set.include(new mySet([1, 2]))).toBeTruthy();
            });

            test("Should return true if passed Set is empty and current Set has got elements", () => {
                const set = new mySet([1, 10, 20]);

                expect(set.include(new mySet())).toBeTruthy();
            });

            test("Should return false if no elements of passed Set exists in current Set", () => {
                const set = new mySet([1, 2]);

                expect(set.include(new mySet([5, 6]))).toBeFalsy();
            });

            test("Should return false if current Set is empty and passed Set has elements", () => {
                const set = new mySet();

                expect(set.include(new mySet("Do As I Want"))).toBeFalsy();
            });

            test("Should return false if current Set and passed Set are empty", () => {
                const set = new mySet();

                expect(set.include(new mySet())).toBeFalsy();
            });
        });
    })

    describe("Set.prototype.minus", () => {
        describe("Arguments", () => {
            test("Throws InstanceError if value of the argument is not instance of mySet", () => {
                const set = new mySet([1, 2, 3, 4]);

                expect(() => {
                    set.minus({a: 5});
                }).toThrow(InstanceError);
            });

            test("If type of the argument is mySet, function invokes and returns object", () => {
                const set = new mySet([1, 2, 3]);

                expect(set.minus(new mySet([2, 3]))).toEqual({});
            });
        })

        describe("Function execution", () => {
            test("Should return a new Set with elements of the current Set, that doesn't exist in passed Set", () => {
                const set2 = new mySet("Mystr");
                const minusStr = set2.minus(new mySet("srt"));

                expect([...minusStr]).toEqual(["M", "y"]);
            });

            test("Should return new Set with elements of current set if passed Set is empty", () => {
                const set = new mySet([1, 2, 3]);
                const minus = set.minus(new mySet());

                expect([...minus]).toEqual([1, 2, 3]);
            });

            test("Should return empty Set if current Set is empty", () => {
                const set = new mySet();
                const minus = set.minus(new mySet([1, 2, 3]));

                expect([...minus]).toEqual([]);
            });

            test("Should return new empty Set if current Set and passed Set are empty", () => {
                const set = new mySet();
                const minus = set.minus(new mySet());

                expect([...minus]).toEqual([]);
            });
        });

        describe("Return value", () => {
            test("Return type of value should be instance of mySet", () => {
                const set = new mySet([1, 2, 3]);
                const plusSet = set.minus(new mySet([1, 2]));

                expect(plusSet).toBeInstanceOf(mySet)
            })

            test("Return value should be mySet", () => {
                const set = new mySet([1, 2, 3]);
                const plusSet = set.minus(new mySet([1, 2]));

                expect(Object.is(set, plusSet)).toBeFalsy();
            })
        })
    });

    describe("Set.prototype.forEach", () => {
        describe("Arguments", () => {
            describe("Callback", () => {
                test("If callback is not a function throw CallbackError", () => {
                    const set = new mySet([1, 2, 5]);

                    expect(() => {
                        set.forEach("kjjkmk")
                    }).toThrow(CallbackError);
                });

                test("Arguments of callback should be correct", () => {
                    const set = new mySet([10, 12, 19]);
                    const fn = jest.fn();

                    set.forEach(fn);

                    expect(fn.mock.calls[0][0]).toBe(10);
                    expect(fn.mock.calls[0][1]).toBe(set);
                    expect(fn.mock.calls[1][0]).toBe(12);
                    expect(fn.mock.calls[1][1]).toBe(set);
                    expect(fn.mock.calls[2][0]).toBe(19);
                    expect(fn.mock.calls[2][1]).toBe(set);
                });

                test("If argument is correct function will be invoked and return undefined", () => {
                    const set = new mySet([1, 2, 3, 10]);
                    const value = set.forEach(() => {
                    });

                    expect(value).toBe(undefined);
                });
            });

            describe("thisArgs", () => {
                test("If typeOf thisArgs is object invoke callback function with context", () => {
                    const set = new mySet([10, 12, 19]);
                    const contextObj = {value: 0};

                    function something(el) {
                        this.value += el
                    }

                    set.forEach(something, contextObj);

                    expect(contextObj.value).toEqual(41);
                });

                test("If thisArgs is not object throe ThisArgsError", () => {
                    const set = new mySet([10, 12, 19]);

                    expect(() => {
                        set.forEach(() => {
                        }, 2222)
                    }).toThrow(ThisArgsError)
                })
            })
        })

        describe("Function execution", () => {
            test("Should call proper number of times ", () => {
                const set = new mySet([1, 2, 3, 4]);
                const fn = jest.fn();

                set.forEach(fn);

                expect(fn).toBeCalledTimes(4);
            });

            test("Shouldn't mutate current Set", () => {
                const set = new mySet([12, 17, 10]);

                set.forEach((el) => el * 10);

                expect([...set]).toEqual([12, 17, 10]);
            });
        })
    });

    describe("Set.prototype.filter", () => {
        describe("Arguments", () => {
            describe("Callback", () => {
                test("If callback is not a function should throw CallbackError", () => {
                    const set = new mySet([1, 2, 3, 4]);

                    expect(() => {
                        set.filter("kjjkj")
                    }).toThrow(CallbackError);
                });

                test("If callback is function arguments of callback should be correct", () => {
                    const set1 = new mySet([10, 12, 19]);
                    const fn = jest.fn();

                    set1.filter(fn);

                    expect(fn.mock.calls[0][0]).toBe(10);
                    expect(fn.mock.calls[0][1]).toBe(set1);
                    expect(fn.mock.calls[1][0]).toBe(12);
                    expect(fn.mock.calls[1][1]).toBe(set1);
                    expect(fn.mock.calls[2][0]).toBe(19);
                    expect(fn.mock.calls[2][1]).toBe(set1);
                });

                test("If argument is correct, function will be invoked and return object", () => {
                    const set = new mySet([1, 2, 3]);
                    const value = set.filter((el) => el > 2);

                    expect(value).toEqual({});
                });
            });

            describe("thisArgs", () => {
                test("If thisArgs is object callback function will be invoked with thisArgs", () => {
                    const set = new mySet([1, 2, 3]);
                    const obj = {value: 1};

                    function something(el) {
                        return el === this.value;
                    }

                    const newSet = set.filter(something, obj);

                    expect([...newSet]).toEqual([1]);
                });

                test("If thisArgs is not object throw ThisArgsError", () => {
                    const set = new mySet([1, 2, 3]);

                    expect(() => {
                        set.filter(() => {
                        }, 2222)
                    }).toThrow(ThisArgsError)
                })
            });
        });

        describe("Function execution", () => {
            test("Should create new Set with element of current Set, that passed the check in callback function", () => {
                const set = new mySet([1, 2, 3]);
                const newSet = set.filter((el) => el >= 2);

                expect([...newSet]).toEqual([2, 3]);
            });

            test("Shouldn't create new Set without current Set mutation", () => {
                const set = new mySet([10, 1, 7]);
                const newSet = set.filter((el) => el < 10);

                expect([...newSet]).toEqual([1, 7]);
                expect([...set]).toEqual([10, 1, 7]);
            });
        })

        describe("Return value", () => {
            test("Return type of value should be instance of mySet", () => {
                const set = new mySet([1, 2, 3]);
                const newSet = set.filter((el) => el > 2);

                expect(newSet instanceof mySet).toBeTruthy();
            })

            test("Return value should be current mySet", () => {
                const set = new mySet([1, 2, 3]);
                const newSet = set.filter((el) => el > 2);

                expect(Object.is(set, newSet)).toBeFalsy();
            })
        })
    });
});

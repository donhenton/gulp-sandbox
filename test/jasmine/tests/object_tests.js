/* global expect, spyOn, NS */
//http://jasmine.github.io/2.0/introduction.html
describe("object_tests.js", function () {

    var myfunc = null;
    beforeEach(function () {
        myfunc = NS.myFunction;
        spyOn(myfunc, 'init');
    });

    afterEach(function () {
        myfunc.reset();
    });


    it("should populate stuff during initialization", function () {
        myfunc.init();
        //console.log(myfunc.toString()+" "+myfunc.stuff.length)
        expect(myfunc.stuff.length).toEqual(1);
        expect(myfunc.stuff[0]).toEqual('Testing');
    });

    it("should be able to initialize", function () {
        expect(myfunc.init).toBeDefined();
        myfunc.init();
        expect(myfunc.init).toHaveBeenCalled();

    });



    //ADDITIONAL TESTS TO WRITE FIRST:
    describe("appending strings", function () {
        it("should be able to append 2 strings", function () {
            expect(myfunc.append).toBeDefined();
        });
        it("should append 2 strings", function () {
            expect(myfunc.append('hello ', 'world')).toEqual('hello world');
        });
    });


    describe("splice tests", function () {

        var initArray = [1, 2, 3, 4];
        var result = initArray.splice(1, 1);
        it("[1,2,3,4] split 1", function () {
            expect(initArray).toEqual([1, 3, 4]);
        });

        var kArray = [{"key": "alpha", "value": 34}, {"key": "beta", "value": 79}];
        kArray.splice(0, 1);
        it("object split", function () {
            expect(kArray.length).toEqual(1);
            expect(kArray[0].key).toEqual("beta");
        });
    });

    describe("prototype tests", function () {

        var gamma = function ()
        {

        }

        it("functions have prototypes", function () {
            expect(typeof gamma.prototype).toEqual('object');

        });

        var Alpha = {};


        it("objects dont have prototypes", function () {
            expect(typeof Alpha.prototype).toEqual('undefined');

        });

    });





});


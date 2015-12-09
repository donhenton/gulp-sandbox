/* global expect, spyOn, NS */
//http://jasmine.github.io/2.2/introduction.html
describe("alpha_tests.js", function () {


    it('test init values', function () {

        var alpha1 = new alpha();

        expect(alpha1.getX()).toEqual(1);
        expect(alpha1.getY()).toEqual(2);
    });


    it('test mutators', function () {

        var alpha2 = new alpha();
        alpha2.setX(4);
        alpha2.setY(6);
        expect(alpha2.getX()).toEqual(4);
        expect(alpha2.getY()).toEqual(6);

        var alpha1 = new alpha();
        expect(alpha1.getX()).toEqual(1);
        expect(alpha1.getY()).toEqual(2);
    });


});


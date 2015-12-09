if (typeof NS === 'undefined') { NS = {}; }

NS.myFunction = {
    //empty stuff array, filled during initialization
      stuff: [],

    init: function init() {
        console.log("xxxxx "+this.toString());
        this.stuff.push('Testing');
    },
    reset: function reset() {
        this.stuff = [];
    },

    toString: function()
    {
        var out = "";
        for (var i=0;i<this.stuff.length;i++)
        {
            out = out +this.stuff[i]+",";
        }
        return out;
    },


    // CODE TO ADD AFTER ADDING NEW TESTS:
    append: function append(string1, string2) {
        return string1 + string2;
    }
};

NS.myFunction.init();
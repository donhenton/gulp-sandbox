# gulp-sandbox
gulp testing ground

This project is a playground for using sass gulp and browserify.

## Features

* gulp tasks placed in separate files and loaded with wrench and require
* sync clean of build areas
* karma based unit testing
* complete build with **NO** watchify watching
* complete build with watchify and live reload server
* production vs dev build by command line parameter
* dev build adds minmaps for browserify and does not uglify
* prod build removes minmaps and uglifies

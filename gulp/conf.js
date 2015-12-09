/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * set the env environment variable this can be passed into the command
 * for prod vs dev env
 * @type process.env.NODE_ENV|String
 */
exports.env = process.env.NODE_ENV;
if (!exports.env)
{
    exports.env = 'dev';
}

/**
 * where are javascript is located and what to do with browserify
 * @type type
 */
exports.jsSrc = {
    entries: ['./src/js/main.js'],
    debug: exports.env === 'dev',
    cache: {},
    noParse: ['./node_modules/jquery/dist/jquery.js'],
    packageCache: {},
    fullPaths: true
};
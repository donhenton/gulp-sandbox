
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

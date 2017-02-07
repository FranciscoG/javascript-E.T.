var browserify = require('browserify');
var path       = require('path');
var fs         = require('fs');
var exorcist   = require('exorcist');
var watchify   = require('watchify');

var entryFile  = path.join(__dirname, './src/vcs.js');
var bundleFile = path.join(__dirname, './dist/vcs.js');
var mapfile    = path.join(__dirname, './dist/vcs.js.map');

var task = process.argv[2];
if (!task) {
  task = "build"; // default task is build
}

/******************************************************************
 * Setup browserify with options
 */

var options = {
  debug : true,
  entries: [entryFile],
  cache : {},
  packageCache : {}
};

var b = browserify(options);

/******************************************************************
 * define our bundle funciton to be re-used
 */

 function bundle() {
   b.bundle()
     .pipe(exorcist(mapfile))
     .pipe(fs.createWriteStream(bundleFile, 'utf8'));
 }

/******************************************************************
 * start appropriate task
 */

if (task === "watch") {
  
  b.plugin(watchify, {
    // no options to pass as this time
  });

  b.on('update', function(ids){
    console.log(ids);
    bundle();
  });

  b.on('log', function (msg) {
    console.log(msg);
  });

  bundle();

} else {

  bundle();

}




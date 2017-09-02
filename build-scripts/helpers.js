var path = require('path');
var fs = require('fs');
var projectRootPath = path.resolve(__dirname, '../');
var webpack = require('webpack');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: 5 });

module.exports = {
  createHappyPlugin: createHappyPlugin,
  installVendorDLL: installVendorDLL,
  isValidDLLs: isValidDLLs
};

function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    enabled: process.env.HAPPY !== '0',
    cache: process.env.HAPPY_CACHE !== '0',
    verbose: process.env.HAPPY_VERBOSE === '1',
  });
}

function installVendorDLL(config, dllName) {
  var manifest = loadDLLManifest(path.join(projectRootPath, `build-scripts/dlls/${dllName}.json`));

  if (manifest) {
    console.info(`Webpack: will be using the ${dllName} DLL.`);

    config.plugins.push(new webpack.DllReferencePlugin({
      context: projectRootPath,
      manifest: manifest
    }));
  }
};

function loadDLLManifest(filePath) {
  try {
    return require(filePath);
  }
  catch (e) {
    process.env.WEBPACK_DLLS = '0';

    console.error(`========================================================================
  Environment Error
------------------------------------------------------------------------
You have requested to use webpack DLLs (env var WEBPACK_DLLS=1) but a
manifest could not be found. This likely means you have forgotten to
build the DLLs.
You can do that by running:
    npm run postinstall
The request to use DLLs for this build will be ignored.`);
  }

  return undefined;
}

function isValidDLLs(dllNames, assetsPath) {
  for (var dllName of [].concat(dllNames)) {
    try {
      var manifest = require(path.join(projectRootPath, `build-scripts/dlls/${dllName}.json`));
      var dll = fs.readFileSync(path.join(assetsPath, `dlls/dll__${dllName}.js`)).toString('utf-8');
      if (dll.indexOf(manifest.name) === -1) {
        console.warn(`Invalid dll: ${dllName}`, manifest);
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return true;
}

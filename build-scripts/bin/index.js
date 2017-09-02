const spawn = require('react-dev-utils/crossSpawn');
const args = process.argv.slice(2); // eslint-disable-line

const scriptIndex = args.findIndex((x) =>
  x === 'build' || x === 'eject' || x === 'start' || x === 'test');
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

const handleError = (result) => {
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.info(
        'The build failed because the process exited too early. ' +
            'This probably means the system ran out of memory or someone called ' +
            '`kill -9` on the process.'
      );
    } else if (result.signal === 'SIGTERM') {
      console.info(
        'The build failed because the process exited too early. ' +
            'Someone might have called `kill` or `killall`, or the system could ' +
            'be shutting down.'
      );
    }
  }
};

const spawnScript = (name) => spawn.sync(
  'node',
  nodeArgs.
    concat(require.resolve(`../scripts/${name}.js`)).
    concat(args.slice(scriptIndex + 1)),
  { stdio: 'inherit' }
);

const scriptsNameMap = {
  test: 'runTests',
  'test:unit': 'runUnitTests',
  'test:e2e': 'runE2ETests',
  build: 'build',
  lint: 'lint',
  'locales:po': 'localesPo',
  'locales:json': 'localesJson',
  'start:prod': 'startProd',
  'start:dev': 'startDev',
  start: 'startDev',
};

if (scriptsNameMap[script]) {
  const result = spawnScript(scriptsNameMap[script]);

  handleError(result);
} else {
  console.info(`Unknown script "${script}".`);
  console.info('Perhaps you need to update build-scripts?');
}

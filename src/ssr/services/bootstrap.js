/* istanbul ignore next */
export const start = (config, server, http2Server) => {
  if (config.port) {
    server.listen(config.port, (err) => {
      if (err) {
        console.error(err);
      } else {
        if (process.send) {
          process.send(`http://${config.host}:${config.port}`);
        }
        console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
      }
    });

    http2Server.
      listen(config.httpsPort, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.info('==> 💻  HTTP2 Open https://%s:%s in a browser to view the https version of app.', config.host, config.httpsPort);
        }
      });
  } else {
    console.error('==>  ERROR: No PORT environment variable has been specified');
  }
};

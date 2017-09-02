const OK_STATUS = 200;
const NOT_MODIFIED_STATUS = 200;
const CHOICE_STATUS = 200;
const REQUEST_FINISHED_STATUS = 4;

export default function isOnline(path = '/favicon.ico') {
  const randomHash = Math.floor((1 + Math.random()) * 0x10000); // eslint-disable-line
  const xhr = new (window.ActiveXObject || XMLHttpRequest)('Microsoft.XMLHTTP');

  const { host, protocol } = window.location;

  xhr.open('HEAD', `${protocol}//${host}${path}`, true);

  return new Promise((resolve) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === REQUEST_FINISHED_STATUS) {
        if (xhr.status >= OK_STATUS && (xhr.status < CHOICE_STATUS || xhr.status === NOT_MODIFIED_STATUS)) {
          resolve(true);
        }

        resolve(false);
      }
    };
    xhr.send(null);
  });
}

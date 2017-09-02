/* istanbul ignore next */
export default (dest, React) => {
  if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if (!dest || !dest.firstChild || !dest.firstChild.attributes ||
        !dest.firstChild.attributes['data-react-checksum']) {
      console.error('Server-side React render was discarded.' +
          'Make sure that your initial render does not contain any client-side code.');
    }
  }
};

import { stub } from 'sinon';
import ssrCheck from './../ssrCheck.dev';

describe('Check ssr warning', () => {
  it('should not warn', () => {
    stub(console, 'error');
    ssrCheck({ firstChild: { attributes: { 'data-react-checksum': 1 } } });
    expect(console.error.notCalled).toBeTruthy();
    console.error.restore();
  });

  it('should warn', () => {
    stub(console, 'error');
    ssrCheck({ firstChild: { attributes: {} } });
    expect(console.error.calledOnce).toBeTruthy();
    console.error.restore();
  });
});

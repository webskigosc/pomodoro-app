import React from 'react';
import Clock from '../../components/Clock';
import ReactDOM from 'react-dom';

let root = null;
describe('<Clock />', () => {
  describe('when given time left and total time in seconds', () => {
    beforeEach(() => {
      root = document.createElement('div');
      ReactDOM.render(
        <Clock timeLeftInSeconds={1500} totalTimeInSeconds={1500} />,
        root
      );
    });

    it('renders properly', () => {
      expect(root.childNodes[0].nodeName).toEqual('DIV');
      expect(root.childNodes[0].className).toMatch(/clock/);
      expect(root.childNodes[0].textContent).toMatch(/25:00/);
    });

    it('renders as div element', () => {
      expect(root.childNodes[0].nodeName).toEqual('DIV');
    });
    it('sets a clock className', () => {
      expect(root.childNodes[0].className).toMatch(/clock/);
    });
    it('renders time properly', () => {
      expect(root.childNodes[0].textContent).toMatch(/25:00/);
    });
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/Header';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<Header /> with no props', () => {
    const container = shallow(<Header />);
    it('should match the snapshot', () => {
      expect(container.html()).toMatchSnapshot();
      expect(container.find('img').prop('src')).toEqual('https://upload.wikimedia.org/wikipedia/commons/9/94/OFX_Logo.svg');
      expect(container.find('img').prop('alt')).toEqual('OFX');
      expect(container.find('img').prop('title')).toEqual('OFX');
      expect(container.find('img').prop('className')).toEqual('logo');
    })
})

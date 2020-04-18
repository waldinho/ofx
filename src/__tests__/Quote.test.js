import React from 'react';
import ReactDOM from 'react-dom';
import Quote from '../components/Quote';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Quote />, div);
  ReactDOM.unmountComponentAtNode(div);
});

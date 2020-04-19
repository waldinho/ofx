import React from 'react';
import ReactDOM from 'react-dom';
import Form from '../components/Form';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Form />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const handleSubmit = jest.fn().mockImplementation((cb) => () => cb({ test: 'test' }));
const wrapper = shallow(<Form form="test" handleSubmit={handleSubmit}   />);

const firstname = wrapper.find('input').at(0);
firstname.simulate('change', { target: { value: 'some text' } });

const surname = wrapper.find('input').at(1);
surname.simulate('change', { target: { value: 'some text' } });

const email = wrapper.find('input').at(2);
email.simulate('change', { target: { value: 'some text' } });

const phone = wrapper.find('input').at(3);
phone.simulate('change', { target: { value: 'some text' } });

const currencyFrom = wrapper.find('select').at(1);
currencyFrom.simulate('change', { target: { value: 'some text' } });

const currencyTo = wrapper.find('select').at(2);
currencyTo.simulate('change', { target: { value: 'some text' } });

const amount = wrapper.find('input').at(4);
amount.simulate('change', { target: { value: 'some text' } });

describe('<Form />', function() {
    it('Should have <label> with First name label title', function(){
        const component = shallow(<Form />);
        expect(component.find('label').at(0).text()).toEqual('First Name: *');
    });
    it('Should have <label> with Surname label title', function(){
        const component = shallow(<Form />);
        expect(component.find('label').at(1).text()).toEqual('Last Name: *');
    });
    it('Should have <label> with Email label title', function(){
        const component = shallow(<Form />);
        expect(component.find('label').at(2).text()).toEqual('Email: ');
    });
    it('Should have <label> with Mobile phone label title', function(){
        const component = shallow(<Form />);
        expect(component.find('label').at(3).text()).toEqual('Telephone / Mobile: ');
    });
    it('Should have <label> with From Currency label title', function(){
        const component = shallow(<Form />);
        expect(component.find('label').at(4).text()).toEqual('From Currency: *');
    });
    it('Should have <label> with To Currency label title', function(){
        const component = shallow(<Form />);
        expect(component.find('label').at(5).text()).toEqual('To Currency: *');
    });
    it('Should have <label> with Amount label title', function(){
        const component = shallow(<Form />);
        expect(component.find('label').at(6).text()).toEqual('Amount: *');
    });
})
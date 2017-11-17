import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import expect from 'expect';
import SignOut from '../../../components/Auth/SignOut.jsx';

configure({ adapter: new Adapter() });

describe('SignOut', () => {
  it('should be defined', () => {
    expect(SignOut).toBeDefined();
  });

  it('should render correctly', () => {
    const mockFunction = jest.fn();
    const enzymeWrapper = shallow(<SignOut signOut={mockFunction} />);
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should call mockFunction when it is clicked', () => {
    const mockFunction = jest.fn();
    const enzymeWrapper = shallow(<SignOut signOut={mockFunction} />);
    enzymeWrapper.simulate('click');
    expect(mockFunction).toHaveBeenCalled();
  });
});

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import expect from 'expect';
import SignIn from '../../../components/Auth/SignIn.jsx';

configure({ adapter: new Adapter() });

describe('SignIn', () => {
  it('should be defined', () => {
    expect(SignIn).toBeDefined();
  });

  // it('should render correctly', () => {
  //   const mockFunction = jest.fn();
  //   const enzymeWrapper = shallow(<SignIn signOut={mockFunction} />);
  //   expect(enzymeWrapper).toMatchSnapshot();
  // });

  // it('should call mockFunction when it is clicked', () => {
  //   const mockFunction = jest.fn();
  //   const enzymeWrapper = shallow(< signOut={mockFunction} />);
  //   enzymeWrapper.simulate('click');
  //   expect(mockFunction).toHaveBeenCalled();
  // });
});

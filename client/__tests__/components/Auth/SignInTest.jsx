import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import expect from 'expect';
import SignIn from '../../../components/Auth/SignIn.jsx';

configure({ adapter: new Adapter() });

describe('SignIn', () => {
  it('should be defined', () => {
    expect(SignIn).toBeDefined();
  });
});

import Home from './presentational/Home.jsx';
import SignUp from './presentational/SignUp.jsx';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/sign-up',
    component: SignUp
  }
];

export default routes;

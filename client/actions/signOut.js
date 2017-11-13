const signOut = () => {
  localStorage.clear();
  window.location('/');
};

export default signOut;

import React, { useContext } from 'react';
import ContextFileAdmin from '../context/ContextFileAdmin';

const Profiles = () => {
  const { adminName } = useContext(ContextFileAdmin);

  return <div>Hello, {adminName}</div>;
};

export default Profiles;

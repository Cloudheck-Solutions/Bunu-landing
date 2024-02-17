import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { currentProfile, currentRoles } from 'store/reducers/user';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = localStorage.getItem('user');
      dispatch(currentProfile({ profile: user }));
      const roles = localStorage.getItem('roles');
      dispatch(currentRoles({ roles: roles }));
      navigate('/admin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default MinimalLayout;

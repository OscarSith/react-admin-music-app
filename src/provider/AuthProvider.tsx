import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../interfaces/User';
import { Props } from '../interfaces/globals';

interface IUserContext {
  user: IUser;
  setLogin: (data: IUser) => void;
  logout: () => void;
}

const UserContext = createContext<IUserContext>({
  user: { access_token: '' },
  logout: () => {},
  setLogin: () => {},
});

/**
 * Manage the user context
 */
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  /**
   * It save the data (User) in the context and in
   * the localStorage then, it redirect to home
   * @param data User data
   */
  const setLogin = (data: IUser): void => {
    setUser(data);
    navigate('/', { replace: true });
  };

  /**
   * Set the user context to null and also
   * is removed from the localstorage
   * then, it redirect to /login
   */
  const logout = (): void => {
    setUser(null);
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      setLogin,
      logout,
    }),
    [user],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};

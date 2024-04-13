// En vez de any, debe ser la interface de lo que

import { useState } from 'react';
import { IUser } from '../interfaces/User';

// devuelve el servicio de crear autenticación
export const useLocalStorage = (
  keyname: string,
  defaultValue: IUser | null,
): [IUser, React.Dispatch<any>] => {
  const [storeValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyname);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyname, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: IUser): void => {
    try {
      window.localStorage.setItem(keyname, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };

  return [storeValue, setValue];
};

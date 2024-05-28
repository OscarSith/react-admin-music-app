// En vez de any, debe ser la interface de lo que

import { useState } from 'react';
import { IAuth } from '../interfaces/Auth';

// devuelve el servicio de crear autenticación
export const useLocalStorage = (
  keyname: string,
  defaultValue: IAuth | null,
): [IAuth, React.Dispatch<any>] => {
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

  const setValue = (newValue: IAuth): void => {
    try {
      window.localStorage.setItem(keyname, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };

  return [storeValue, setValue];
};

import { useState, useEffect } from "react";

const APP_KEY = "copyit-";
const useLocalStorage = (key, initialValue) => {
  const storagekey = APP_KEY + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(storagekey);
    if (jsonValue !== null) return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(storagekey, JSON.stringify(value));
  }, [value, storagekey]);

  return [value, setValue]
};

export default useLocalStorage;

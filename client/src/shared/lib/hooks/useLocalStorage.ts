export const useLocalStorage = () => {
  // get data
  const getLocal = <T>(name: string): T | undefined => {
    const data = localStorage.getItem(name);
    if (!data) return undefined;
    try {
      return JSON.parse(data);
    } catch {
      return data as T | undefined;
    }
  };

  // set data
  const setLocal = <T>(name: string, value: T) => {
    try {
      let data: string;

      if (typeof value === 'object' && value !== null) {
        data = JSON.stringify(value);
      } else {
        data = String(value);
      }

      localStorage.setItem(name, data);
    } catch (error) {
      console.warn(`Error saving  localStorage key "${name}"`, error);
    }
  };

  // remove data
  const removeLocal = (name: string) => {
    localStorage.removeItem(name);
  };
  return { getLocal, setLocal, removeLocal };
};

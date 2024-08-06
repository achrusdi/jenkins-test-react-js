const useLocalStorage = (key) => {

    const storedValue = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    } 

    const setValue = (value) => {
        try {
            window.localStorage.setItem(key, value);
        } catch (error) {
            console.error(error);
        }
    };

    const removeValue = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue, removeValue];

}

export default useLocalStorage;
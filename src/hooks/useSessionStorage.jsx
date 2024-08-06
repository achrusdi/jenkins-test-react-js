const useSessionStorage = (key) => {
    const storedValue = () => {
        try {
            const item = window.sessionStorage.getItem(key);
            return item;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    } 

    const setValue = (value) => {
        try {
            window.sessionStorage.setItem(key, value);
        } catch (error) {
            console.error(error);
        }
    };

    const removeValue = () => {
        try {
            window.sessionStorage.removeItem(key);
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue, removeValue];
}
 
export default useSessionStorage;
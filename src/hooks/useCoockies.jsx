import Cookies from 'js-cookie';

const useCoockies = (key) => {
    const storedValue = () => {
        try {
            const item = Cookies.get(key);
            return item;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    } 

    const setValue = (value) => {
        try {
            Cookies.set(key, value, { expires: 7 });
        } catch (error) {
            console.error(error);
        }
    };

    const removeValue = () => {
        try {
            Cookies.remove(key);
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue, removeValue];
}
 
export default useCoockies;
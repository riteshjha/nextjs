
const persist = {
    
    set:( key, value ) => {
        localStorage.setItem(key, value);
    },

    get:(key) => {
        return localStorage.getItem(key);
    },

    remove: async (key) => {
        localStorage.removeItem(key);
    }
}


export default persist;
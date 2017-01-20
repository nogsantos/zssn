/**
 * Tratamento para storages
 * 
 * @author Fabricio Nogueira 
 */
export class Storage {
    /**
     * 
     */
    constructor() {
        this._getStorage();
    }
    /**
     * Se houverem, retorna true
     */
    get(key: string): boolean {
        if (localStorage.getItem(key) !== null && sessionStorage.getItem(key) !== null) {
            if (localStorage.getItem(key) === sessionStorage.getItem(key)) {
                return true;
            }
        }
        return false;
    }
    /**
     * cadastra os storages
     */
    set(key: string, value: string): void {
        localStorage.setItem(key, value);
        sessionStorage.setItem(key, value);
    }
    /**
     * Remove os storages
     */
    remove(key: string): void {
        localStorage.clear();
        sessionStorage.removeItem(key);       
    }
    /**
     * Verifica se há suporte para storage
     */
    _getStorage(): void {
        if ('localStorage' in window && window.localStorage === null) {
            throw new Error('Local Storage is disabled or unavailable.');
        } else if ('sessionStorage' in window && window.sessionStorage === null) {
            throw new Error('Session Storage is disabled or unavailable.');
        }
    }
}

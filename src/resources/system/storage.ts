import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { MdToastService } from 'aurelia-materialize-bridge';
import env from './env';
/**
 * @description
 *  Storage conf centralizer 
 * @namespace 
 *  System
 * 
 * @author Fabricio Nogueira 
 */
@autoinject()
export class Storage {
    /**
     * CDI
     */
    constructor(
        private i18n: I18N,
        private toast: MdToastService
    ) {
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
     * Set the storages
     * 
     * @param String key The storage key
     * @param String value The Value
     */
    set(key: string, value: string): void {
        localStorage.setItem(key, value);
        sessionStorage.setItem(key, value);
    }
    /**
     * Removel the storage
     * 
     * @param String key the id of storage
     */
    remove(key: string): void {
        localStorage.clear();
        sessionStorage.removeItem(key);
    }
    /**
     * Just check if the storage it`s availible 
     */
    _getStorage(): void {
        if ('localStorage' in window && window.localStorage === null) {
            this.toast.show(this.i18n.tr(`storage.error`, { key: 'storage.local' }), env.conf.messages.error.duration);
        } else if ('sessionStorage' in window && window.sessionStorage === null) {
            this.toast.show(this.i18n.tr(`storage.error`, { key: 'storage.session' }), env.conf.messages.error.duration);
        }
    }
}

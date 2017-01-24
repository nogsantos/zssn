import { autoinject, bindable } from 'aurelia-framework';
import { Storage } from '../../resources/system/storage';
import { Router } from "aurelia-router";
import env from '../../resources/system/env';
import * as $ from 'jquery';
/**
 * @description
 *  Navigation Top 
 * @namespace 
 *  Template/Navigation
 * 
 * @author Fabricio Nogueira
 */
@autoinject()
export class NavigationTop {
    @bindable router;
    @bindable private autenticated: boolean;
    /**
     * CDI
     */
    constructor(
        private subrouter: Router,
        private storage: Storage
    ) { }
    /**
     * Check if has an active user
     */
    created() {
        this.checkAuth();
    }
    /**
     * Show auth form
     */
    authForm() {
        $('#auth-form').slideToggle();
    }
    /**
     * Check method
     */
    checkAuth() {
        this.autenticated = this.storage.get(env.conf.storage.name);
        if (this.autenticated) {
            this.subrouter.navigate("/");
        }
    }
    /**
     * Make the logout and update 
     */
    logout() {
        this.storage.remove(env.conf.storage.name);
        this.subrouter.navigate("/");
    }
}

import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
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
    private survivor = {
        name: null
    };
    @bindable router;
    private autenticated: boolean;
    /**
     * CDI
     */
    constructor(
        private subrouter: Router,
        private storage: Storage,
        private event: EventAggregator
    ) {
        this.event.subscribe('survivor_credentials', survivor => {
            this.autenticated = typeof survivor.id !== "undefined";
            this.survivor.name = survivor.name;
        });
    }
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
        this.autenticated = false;
        this.storage.remove(env.conf.storage.name);
        this.subrouter.navigate("/");
    }
}

import { autoinject, bindable } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { ResourceFactory } from '../../resources/system/resource-factory';
import { MdToastService } from 'aurelia-materialize-bridge';
import { Router } from "aurelia-router";
import { Storage } from '../../resources/system/storage';
import { Survivor } from './survivor';
import env from '../../resources/system/env';
import * as $ from 'jquery';
import * as moment from 'moment';
/**
 * @description
 *  Survivors Index
 * @namespace 
 *  V1/Survivor
 *
 * @author Fabricio Nogueira 
 */
@autoinject()
export class SurvivorList {
    private title: string;
    private list_help: string;
    private survivors_infected: Array<any>;
    private survivors_not_infected: Array<any>;
    private count_infected: number;
    private count_not_infected: number;
    private lb_update_location: string;
    private lb_delate_infection: string;
    private lb_trade_itens: string;
    private txt_search_help: string;
    private txt_bt_clean_help: string;
    private is_loading: boolean;
    private show_bt_clean: boolean;
    private survivor: Survivor;
    @bindable private query_not_infected: string;
    /**
     * Dependency injections
     */
    constructor(
        private i18n: I18N,
        private storage: Storage,
        private toast: MdToastService,
        private resource: ResourceFactory,
        private subrouter: Router
    ) { }
    /**
     * When view-model is activeted
     */
    activate(params, navigationInstruction) {
        if (navigationInstruction.id === "_survivor") {
            this.fetchAll();
        }
        this.lb_update_location = this.i18n.tr(`update_location`);
        this.lb_delate_infection = this.i18n.tr(`delate_infection`);
        this.lb_trade_itens = this.i18n.tr(`trade_itens`);
        this.txt_search_help = this.i18n.tr('survivor.input_search_help');
        this.txt_bt_clean_help = this.i18n.tr('survivor.bt_clean_help');
        this.list_help = this.i18n.tr('survivor.info');
        moment.locale('pt-br');
    }
    /**
     * The view also ben created
     */
    created(): void {
        this.title = this.i18n.tr(`survivor.list`);
    }
    /**
     * Fetch all data when the user came to all 
     * or when called by a button
     */
    fetchAll(): void {
        this.is_loading = true;
        this.resource.query(`${env.api.resources.survivor}.json`).then(response => {
            this.count_infected = 0;
            this.count_not_infected = 0;
            if (response.length > 0) {
                this.survivors_infected = [];
                this.survivors_not_infected = [];
                let arr_infected = [];
                let arr_not_infected = [];
                response.reverse().some((value, index, _ary) => {
                    if (value['infected?']) {
                        arr_infected.push(value);
                        this.count_infected++;
                    } else {
                        arr_not_infected.push(value);
                        this.count_not_infected++;
                    }
                    return index === 300; // just gettin last 300 insertions to reduce the dom manipulation
                });
                this.survivors_infected = arr_infected;
                this.survivors_not_infected = arr_not_infected;
                this.is_loading = false;
            }
        }).catch(error => {
            this.is_loading = false;
            console.log(error);
        });
    }    
    /**
     * Delate a survivor as infected
     */
    delateInfection(location: string): void {
        if (!this.storage.get(env.conf.storage.name)) {
            this.toast.show(this.i18n.tr('survivor.list_info.auth', { type: 'delate' }), env.conf.messages.warn.duration);
            return;
        }
        $("#global-loader").fadeIn("fast", () => {
            this.survivor = JSON.parse(sessionStorage.getItem(env.conf.storage.name));
            this.resource.send(env.api.resources.report, this.survivor.id, { infected: this.getIdFromLocation(location) }, true).then(response => {
                if (!response) {
                    this.toast.show(this.i18n.tr('survivor.list_info.delate.success'), env.conf.messages.success.duration);
                } else {
                    this.toast.show(this.i18n.tr('survivor.list_info.delate.already_have'), env.conf.messages.warn.duration);
                }
                $("#global-loader").fadeOut();                
            }).catch(error => {
                $("#global-loader").fadeOut();
                console.error(error);
            });
        });
    }
    /**
     * Trade
     */
    tradeItens(location: string): void {
        if (!this.storage.get(env.conf.storage.name)) {
            this.toast.show(this.i18n.tr('survivor.list_info.auth', { type: 'trade' }), env.conf.messages.warn.duration);
            return;
        }
        // storaging requested 
        this.storage.set('requested_survivor', JSON.stringify({id:this.getIdFromLocation(location)}));
        // redirecting to trade form
        this.subrouter.navigate("#/survivor/trade");
    }
    /**
     * From a location url, get the id
     */
    getIdFromLocation(location: string): string {
        let id = location.split('/');
        return id[id.length - 1];
    }
    /**
     * Search a not infected by name
     */
    searchNotInfectedByName(): void {
        $("#loading_query").fadeIn("fast", () => {
            $.each($('.ref_survivors_list'), function (i, val) {
                let item = $(val).find("td");
                let text = item.context.innerText.replace(/\s+/g, ' ').toLowerCase();
                if ($("#_search_by_name").val().trim() !== "") {
                    if (text.search($("#_search_by_name").val().toLowerCase()) > 0) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                    $("#loading_query").fadeOut();
                } else {
                    $(this).show();
                    $("#loading_query").fadeOut();
                }
            });
        });
    }
    /**
     * Show or hide the button on input field
     */
    inputCleanToggle(): void {
        this.show_bt_clean = (this.query_not_infected && this.query_not_infected.length > 0) ? true : false;
    }
    /**
     * Just reset de query
     */
    resetNotInfectedSearch(): void {
        this.query_not_infected = "";
        this.inputCleanToggle();
        this.searchNotInfectedByName();
    }
    /**
     * Show location on google maps
     */
    getLonLat(lonlat: string): string {
        try {
            if (lonlat && lonlat.length > 0) {
                let a = lonlat.substr(7, lonlat.length - 1);
                let b = a.substr(-a.length, a.length - 1).split(" ");
                let lon: string = b[1];
                let lat: string = b[0];
                return `<a href="http://maps.google.com/maps?z=20&t=m&q=loc:${lat}+${lon}" target="_blank">Visualizar</a>`;
            } else {
                return `<i>${this.i18n.tr('survivor.location_not_informed')}</i>`;
            }
        } catch (error) {
            return `<i>${this.i18n.tr('survivor.location_bad_format')}</i>`;
        }
    }
    /**
     * Format date to view
     */
    dateFormat(date: string): string {
        return moment(date).format('LLLL');
    }
}

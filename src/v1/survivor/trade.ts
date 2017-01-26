import { autoinject, bindable } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Router } from "aurelia-router";
import { ResourceFactory } from '../../resources/system/resource-factory';
import { MdToastService } from 'aurelia-materialize-bridge';
import { I18N } from 'aurelia-i18n';
import { Storage } from '../../resources/system/storage';
import { Survivor } from './survivor';
import env from '../../resources/system/env';
/**
 * @description
 *  Trade items
 * @namespace 
 *  v1/Survivor
 * 
 * @author Fabricio Nogueira
 */
@autoinject()
export class Trade {
    private title: string;
    private subtitle: string;
    private info: string;
    // requester
    private survivor_requester: Survivor;
    @bindable private total_offer: number;
    // required
    private survivor_requested: Survivor;
    @bindable private total_requested: number;
    private message = {
        title: null,
        style: null,
        body: null,
    };
    @bindable private offered_item = {
        Water: { disp: 0, point: 0, total_pontuation: 0, offered: 0, total: 0 },
        Food: { disp: 0, point: 0, total_pontuation: 0, offered: 0, total: 0 },
        Medication: { disp: 0, point: 0, total_pontuation: 0, offered: 0, total: 0 },
        Ammunition: { disp: 0, point: 0, total_pontuation: 0, offered: 0, total: 0 }
    };
    @bindable private claimed_item = {
        Water: { disp: 0, point: 0, total_pontuation: 0, claimed: 0, total: 0 },
        Food: { disp: 0, point: 0, total_pontuation: 0, claimed: 0, total: 0 },
        Medication: { disp: 0, point: 0, total_pontuation: 0, claimed: 0, total: 0 },
        Ammunition: { disp: 0, point: 0, total_pontuation: 0, claimed: 0, total: 0 }
    };
    /**
     * CDI
     */
    constructor(
        private resource: ResourceFactory,
        private toast: MdToastService,
        private i18n: I18N,
        private storage: Storage,
        private subrouter: Router,
        private signaler: BindingSignaler
    ) {
        if (!this.storage.get(env.conf.storage.name)) {
            this.subrouter.navigate("/");
        }
        if (!this.storage.get("requested_survivor")) {
            this.subrouter.navigate("#/survivor");
        }
    }
    /**
     * When bind
     */
    bind() {
        this.title = this.i18n.tr('trade_form.title');
        this.subtitle = this.i18n.tr('trade_form.subtitle');
        this.info = this.i18n.tr('trade_form.info');
        this.total_offer = 0;
        this.total_requested = 0;
        /*
         * Load from survivor in storage
         */
        this.survivor_requester = new Survivor();
        this.survivor_requester = JSON.parse(sessionStorage.getItem(env.conf.storage.name));
        this.fetchRequesterItems();
        /*
         * Load from survivor in storage
         */
        this.survivor_requested = new Survivor();
        this.survivor_requested = JSON.parse(sessionStorage.getItem('requested_survivor'));
        this.fetchRequestedSurvivor();
        this.fetchRequiredItems();

    }
    /**
     * Fetch requested survivor data
     */
    fetchRequestedSurvivor() {
        this.resource.query(env.api.resources.survivor, this.survivor_requested.id)
            .then(response => {
                if (!response.status) {
                    this.survivor_requested = response;
                }
            }).catch(error => {

            });
    }
    /**
     * Fetch item from whant to trade
     */
    fetchRequesterItems() {
        this.resource.query(`${env.api.resources.survivor}/${this.survivor_requester.id}/${env.api.resources.inventary}`)
            .then(response => {
                response.forEach(inv => {
                    if (inv.item.name === "Water") {
                        this.offered_item.Water.disp = inv.quantity;
                        this.offered_item.Water.point = inv.item.points;
                        this.offered_item.Water.total_pontuation = inv.quantity * inv.item.points;
                    }
                    if (inv.item.name === "Food") {
                        this.offered_item.Food.disp = inv.quantity;
                        this.offered_item.Food.point = inv.item.points;
                        this.offered_item.Food.total_pontuation = inv.quantity * inv.item.points;
                    }
                    if (inv.item.name === "Medication") {
                        this.offered_item.Medication.disp = inv.quantity;
                        this.offered_item.Medication.point = inv.item.points;
                        this.offered_item.Medication.total_pontuation = inv.quantity * inv.item.points;
                    }
                    if (inv.item.name === "Ammunition") {
                        this.offered_item.Ammunition.disp = inv.quantity;
                        this.offered_item.Ammunition.point = inv.item.points;
                        this.offered_item.Ammunition.total_pontuation = inv.quantity * inv.item.points;
                    }
                });
            }).catch(error => { });
    }
    /**
     * Fetch item to trade
     */
    fetchRequiredItems() {
        this.resource.query(`${env.api.resources.survivor}/${this.survivor_requested.id}/${env.api.resources.inventary}`)
            .then(response => {
                response.forEach(inv => {
                    if (inv.item.name === "Water") {
                        this.claimed_item.Water.disp = inv.quantity;
                        this.claimed_item.Water.point = inv.item.points;
                        this.claimed_item.Water.total_pontuation = inv.quantity * inv.item.points;
                    }
                    if (inv.item.name === "Food") {
                        this.claimed_item.Food.disp = inv.quantity;
                        this.claimed_item.Food.point = inv.item.points;
                        this.claimed_item.Food.total_pontuation = inv.quantity * inv.item.points;
                    }
                    if (inv.item.name === "Medication") {
                        this.claimed_item.Medication.disp = inv.quantity;
                        this.claimed_item.Medication.point = inv.item.points;
                        this.claimed_item.Medication.total_pontuation = inv.quantity * inv.item.points;
                    }
                    if (inv.item.name === "Ammunition") {
                        this.claimed_item.Ammunition.disp = inv.quantity;
                        this.claimed_item.Ammunition.point = inv.item.points;
                        this.claimed_item.Ammunition.total_pontuation = inv.quantity * inv.item.points;
                    }
                });
            }).catch(error => { });
    }
    /**
     * Recalc the total of offered items
     */
    quantityItemToOffer() {
        let water = (this.offered_item.Water.offered * this.offered_item.Water.point);
        let food = (this.offered_item.Food.offered * this.offered_item.Food.point);
        let medication = (this.offered_item.Medication.offered * this.offered_item.Medication.point);
        let ammunition = (this.offered_item.Ammunition.offered * this.offered_item.Ammunition.point);
        this.total_offer = water + food + medication + ammunition;
    }
    /**
     * Recalc the total of claimed items
     */
    quantityItemToRequest() {
        let water = (this.claimed_item.Water.claimed * this.claimed_item.Water.point);
        let food = (this.claimed_item.Food.claimed * this.claimed_item.Food.point);
        let medication = (this.claimed_item.Medication.claimed * this.claimed_item.Medication.point);
        let ammunition = (this.claimed_item.Ammunition.claimed * this.claimed_item.Ammunition.point);
        this.total_requested = water + food + medication + ammunition;
    }
    /**
     * Removing requested from storage
     */
    unbind() {
        this.storage.remove('requested_survivor');
    }
    /**
     * Send the request to trade items
     * 
     * @param string pick The list of items and quantities WANTED, in the format 'Water:10;Food:5'
     * @param string payment The list of items and quantities to PAY IN RETURN, in the format 'Water:5;Food:10'
     */
    sendRequestTrade() {
        if (this.total_offer < this.total_requested) {
            this.toast.show('Atenção, a pontuação oferecida é MENOR que a quantidade solicitada', env.conf.messages.warn.duration);
            return;
        } else if (this.total_offer > this.total_requested) {
            this.toast.show('Atenção, a pontuação oferecida é MAIOR que a quantidade solicitada', env.conf.messages.warn.duration);
            return;
        } else if (this.total_offer === 0 && this.total_requested === 0) {
            this.toast.show('Atenção, os valores não foram alterados', env.conf.messages.warn.duration);
            return;
        }
        let theTrade = {
            consumer: {
                name: this.survivor_requested.name,
                pick: this.formatPickToMakeATrade(),
                payment: this.formatPaymentToMakeATrade()
            }
        };
        this.resource.send(`properties/trade_item`, this.survivor_requested.id, theTrade, true).then(response => {
            if (response) {
                this.message.style = "green";
                this.message.title = this.i18n.tr('success.trade');
                this.message.body = [`<div class="flow-text">${this.i18n.tr('success.enjoy')}</div>`];                
            } else {
                this.message.style = "red";
                this.message.title = this.i18n.tr('error.respond');
                this.message.body = Object.keys(response).map(i => { return `${this.i18n.tr(`error.${i}`)}: ${this.i18n.tr(`error.${response[i]}`)}`; });
            }
        }).catch(error => {
            this.message.style = "red";
            this.message.title = this.i18n.tr('error.unknow');
            this.message.body = [error];
        });
    }
    /**
     * Will format the pick value
     */
    formatPickToMakeATrade(): string {
        let inventory_pattern = "";
        Object.keys(this.claimed_item).forEach(key => {
            inventory_pattern += '' + key + ':' + this.claimed_item[key].claimed + ';';
        });
        return inventory_pattern.replace(/;$/, "");
    }
    /**
     * Will format the pick value
     */
    formatPaymentToMakeATrade() {
        let inventory_pattern = "";
        Object.keys(this.offered_item).forEach(key => {
            inventory_pattern += '' + key + ':' + this.offered_item[key].offered + ';';
        });
        return inventory_pattern.replace(/;$/, "");
    }
}

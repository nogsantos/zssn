import { autoinject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { ResourceFactory } from '../../resources/system/resource-factory';
import { MdToastService } from 'aurelia-materialize-bridge';
import { I18N } from 'aurelia-i18n';
import { Storage } from '../../resources/system/storage';
import { Survivor } from './survivor';
import { Inventory } from './inventory';
import { Utilities } from './utilities';
import env from '../../resources/system/env';
/**
 * @description
 *   Survivor profile
 * @namespace 
 *  V1/survivor
 * 
 * @author Fabricio Nogueira
 */
@autoinject()
export class Profile {
    private title: string;
    private about_info: string;
    private survivor: Survivor;
    private inventory: Inventory;
    private loading_location: boolean;
    private loading_inventory: boolean;
    private loading_update: boolean;
    private location_address: string;
    private message = {
        title: null,
        style: null,
        body: null,
    };
    /**
     * CDI
     */
    constructor(
        private resource: ResourceFactory,
        private toast: MdToastService,
        private i18n: I18N,
        private storage: Storage,
        private subrouter: Router
    ) {
        if (!this.storage.get("survivor")) {
            this.subrouter.navigate("/");
        }
    }
    /**
     * Will load survivor attributes
     */
    created() {
        this.loading_location = false;
        this.loading_inventory = false;
        this.loading_update = false;
        this.survivor = new Survivor();
        this.survivor = JSON.parse(sessionStorage.getItem(env.conf.storage.name));
        this.loadInvetory();
    }
    /**
     * Will fill all survivor attributes
     */
    bind() {
        this.title = this.i18n.tr('survivor.welcome', { name: this.survivor.name });
        this.about_info = this.i18n.tr('about_info');
    }
    /**
     * Fetch inventory items
     */
    loadInvetory(): void {
        this.loading_inventory = true;
        this.resource.query(`${env.api.resources.survivor}/${this.survivor.id}/${env.api.resources.inventary}`)
            .then(response => {
                this.inventory = response;
                this.loading_inventory = false;
            }).catch(error => {
                this.loading_inventory = false;
            });
    }
    /**
     * Upate the survivor location
     */
    updateLocation(): void {        
        let objetcToSave = {
            name: this.survivor.name,
            age: this.survivor.age,
            gender: this.survivor.gender,
            lonlat: Utilities.locationPattern(this.survivor.lonlat)
        };
        this.resource.send(env.api.resources.survivor, this.survivor.id, objetcToSave).then(response => {
            if (response.id) {
                this.message.style = "green";
                this.message.title = this.i18n.tr('success.update');
                this.message.body = [`<div class="flow-text">${this.i18n.tr('success.survivor_id')}:<br>${response.id}</div>`];
            } else {
                this.message.style = "red";
                this.message.title = this.i18n.tr('error.respond');
                this.message.body = Object.keys(response).map(i => { return `${this.i18n.tr(`error.${i}`)}: ${this.i18n.tr(`error.${response[i]}`)}`; });
            }
            this.loading_update = false;
        }).catch(error => {
            this.loading_update = false;
            this.message.style = "red";
            this.message.title = this.i18n.tr('error.unknow');
            this.message.body = [error];
        });
    }
    /**
     * Format location
     */
    getLocation(): Array<string> {        
        let lonlat = Utilities.locationParse(this.survivor.lonlat);
        this.resource.query(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lonlat[1]},${lonlat[0]}&key=${env.api.key}`)
            .then(response => {
                if (response.status === "OK") {
                    this.location_address = response.results[0].formatted_address;
                }
                this.loading_location = false;
            }).catch(error => {
                this.loading_location = false;
            });
        return [
            lonlat[1],
            lonlat[0]
        ];
    }
}

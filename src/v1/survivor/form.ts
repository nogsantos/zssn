import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { ResourceFactory } from '../../resources/system/resource-factory';
import { MdToastService } from 'aurelia-materialize-bridge';
import { EventAggregator } from 'aurelia-event-aggregator';
import env from '../../resources/system/env';
/**
 * @description
 *  Survivors Form
 * @namespace 
 *  V1/Survivor
 * 
 * @author Fabricio Nogueira
 */
@autoinject()
export class Form {
    private title: string;
    private lb_water: string;
    private lb_food: string;
    private lb_medication: string;
    private lb_ammunition: string;
    private lb_total: string;
    private lb_gender_m: string;
    private lb_gender_f: string;
    private gender_style: string;
    private image: string;
    private is_loading: boolean;
    private message = {
        title: null,
        style: null,
        body: null,
    };
    private images = {
        0: 'radioactive',
        1: 'water-percent',
        2: 'yin-yang',
        3: 'keg',
        4: 'ghost',
    };
    private survivor = {
        name: null,
        age: null,
        gender: null,
        location: null
    };
    private inventory = {
        Water: null,
        Food: null,
        Medication: null,
        Ammunition: null
    };
    private inventory_items_point = {
        watter: 4,
        food: 3,
        medication: 2,
        ammunition: 1
    };
    /**
     * CDI
     */
    constructor(
        private i18n: I18N,
        private toast: MdToastService,
        private resource: ResourceFactory,
        private event: EventAggregator
    ) { }
    /**
     * The view also ben created
     */
    created(): void {
        this.title = this.i18n.tr(`survivor.new`);
        this.lb_water = `${this.i18n.tr('water')}  ${this.i18n.tr('item_point', { count: this.inventory_items_point.watter })}`;
        this.lb_food = `${this.i18n.tr('food')}  ${this.i18n.tr('item_point', { count: this.inventory_items_point.food })}`;
        this.lb_medication = `${this.i18n.tr('medication')}  ${this.i18n.tr('item_point', { count: this.inventory_items_point.medication })}`;
        this.lb_ammunition = `${this.i18n.tr('ammunition')}  ${this.i18n.tr('item_point', { count: this.inventory_items_point.ammunition })}`;
        this.lb_gender_f = `${this.i18n.tr('gender.F')}`;
        this.lb_gender_m = `${this.i18n.tr('gender.M')}`;
        this.lb_total = `${this.i18n.tr('total')}`;
        this.inventory.Water = 0;
        this.inventory.Food = 0;
        this.inventory.Medication = 0;
        this.inventory.Ammunition = 0;
        this.is_loading = true;
    }
    attached(){
        this.is_loading = false;
    }
    /**
     * Define de value of gender when user choice the gender
     */
    gendersChoice(choice: string): void {
        this.gender_style = choice === "F" ? 'pink' : 'blue';
        this.survivor.gender = choice;
        if (typeof this.image === "undefined") {
            this.startImagesAnimation();
        }
    }
    /**
     * Will try to persist the information
     */
    save() {
        this.is_loading = true;
        let objetcToSave = {
            name: this.survivor.name,
            age: this.survivor.age,
            gender: this.survivor.gender,
            lonlat: this.locationPattern(),
            items: this.itensPattern()
        };
        this.resource.send(env.api.resources.survivor, null, objetcToSave).then(response => {
            if (response.id) {
                this.message.style = "green";
                this.message.title = this.i18n.tr('success.add');
                this.message.body = [`<div class="flow-text">${this.i18n.tr('success.survivor_id')}:<br>${response.id}</div>`];
            } else {
                this.message.style = "red";
                this.message.title = this.i18n.tr('error.respond');
                this.message.body = Object.keys(response).map(i => { return `${this.i18n.tr(`error.${i}`)}: ${this.i18n.tr(`error.${response[i]}`)}`; });
            }
            this.is_loading = false;
        }).catch(error => {
            this.is_loading = false;
            this.message.style = "red";
            this.message.title = this.i18n.tr('error.unknow');
            this.message.body = [error];            
        });
    }
    /**
     * Make objetc items inventory to service pattern
     */
    itensPattern(): string {
        let inventory_pattern = "";
        Object.keys(this.inventory).forEach(key => {
            inventory_pattern += '' + key + ':' + this.inventory[key] + ';';
        });
        return inventory_pattern.replace(/;$/, "");
    }
    /**
     * Location pattern
     */
    locationPattern(): string {
        return (this.survivor.location !== null) ?
            `POINT (${this.survivor.location[1]} ${this.survivor.location[0]})` :
            `POINT (0 0)`;
    }
    /**
     * Prepare the form to add another survivor
     */
    cancel() {
        Object.keys(this.message).forEach(key => this.message[key] = null);
        Object.keys(this.survivor).forEach(key => {
            if (key !== "location") { // The location will not be empty
                this.survivor[key] = null;
            }
        });
        Object.keys(this.inventory).forEach(key => this.inventory[key] = 0);
    }
    /**
     * Just an animation, maybe it can be cool...
     */
    startImagesAnimation() {
        this.image = this.images[0];
        setInterval(() => {
            this.image = this.images[`${Math.floor((Math.random() * 4) + 1)}`];
        }, 6000);
    }
}

import { autoinject, bindable } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { ResourceFactory } from '../../resources/system/resource-factory';
/**
 * Survivors Form
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
    @bindable private location;
    @bindable private gender;
    @bindable private name;
    @bindable private age;
    @bindable private qtd_water: number;
    @bindable private qtd_food: number;
    @bindable private qtd_medication: number;
    @bindable private qtd_ammunition: number;
    @bindable private total_itens_points: number;
    private inventory_items_point = {
        watter: 4,
        food: 3,
        medication: 2,
        ammunition: 1
    };
    /**
     * 
     */
    constructor(
        private i18n: I18N,
        private resource: ResourceFactory
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
        this.total_itens_points = 0;
        this.qtd_water = 0;
        this.qtd_food = 0;
        this.qtd_medication = 0;
        this.qtd_ammunition = 0;
    }

    attached(){
        console.log(this);
    }
    /**
     * 
     */
    gendersChoice(choice: string): void {
        this.gender = choice;
    }
    /**
     * 
     */
    save() {

    }
    /**
     * 
     */
    cancel() {

    }
    /**
     * 
     */
    getCoordinates(cordinates){
        console.log(cordinates);
    }
}

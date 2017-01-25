import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { ResourceFactory } from '../../resources/system/resource-factory';
import { MdToastService } from 'aurelia-materialize-bridge';
import { Storage } from '../../resources/system/storage';
import env from '../../resources/system/env';
import * as d3 from 'd3';
import * as nv from 'nvd3';
/**
 * @description
 *  Index 
 * @namespace 
 *  V1/Index
 *  
 * @author Fabricio Nogueira
 */
@autoinject()
export class Index {
    private title: string;
    private height: number = 350;
    private width: number = 350;
    private _COLORS = {
        green: "#009688",
        green_light: "#b2dfdb",
        blue_grey: "#90A4AE",
        grey: "#e0e0e0",
    };
    // People
    private ref_average_people;
    private average_people_title: string;
    private average_people_load: boolean;
    private average_people: Array<any>;
    // Items
    private ref_average_items;
    private average_items_title: string;
    private average_items_load: boolean;
    private average_items: Array<any>;
    // Items points
    private ref_total_points;
    private total_points_title: string;
    private total_points_load: boolean;    
    private total_points_data: Array<any>;
    /**
     * CDI
     */
    constructor(
        private storage: Storage,
        private toast: MdToastService,
        private i18n: I18N,
        private resource: ResourceFactory
    ) { }
    /**
     * View Created
     */
    created() {
        this.title = this.i18n.tr(`wellcome`);
    }
    /**
     * Loading charts on bind
     */
    bind() {
        this.preparePeopleChart();
        this.prepareAverageItems();
        this.prepareTotalPoints();
    }
    /**
     * Prepare chart to view
     * 
     * @returns Void
     */
    preparePeopleChart(): void {
        this.average_people_load = true;
        this.average_people_title = this.i18n.tr('reports.average_of');
        this.average_people = [];
        this.getInfected(() => this.getNonInfected(() => this.makePeopleChart()));
    }
    /**
     * Getting infected info
     * 
     * @param Function callback Synchronous
     * @returns Void
     */
    getInfected(callback: Function): void {
        this.resource.query(`${env.api.address}report/infected.json`)
            .then(response => {
                this.average_people.push({
                    average: response.report.average_infected || 0,
                    key: this.i18n.tr(`reports.${response.report.description}`) || this.i18n.tr('reports.no_description'),
                    color: this._COLORS.blue_grey
                });
                callback();
            }).catch(error => {
                this.average_people.push({
                    average: 0,
                    key: this.i18n.tr('reports.no_description'),
                    color: this._COLORS.grey
                });
                callback();
            });
    }
    /**
     * Gettin non infected info
     * 
     * @param Function callback Synchronous
     * @returns Void 
     */
    getNonInfected(callback: Function): void {
        this.resource.query(`${env.api.address}report/non_infected.json`)
            .then(response => {
                this.average_people.push({
                    average: response.report.average_healthy || 0,
                    key: this.i18n.tr(`reports.${response.report.description}`) || this.i18n.tr('reports.no_description'),
                    color: this._COLORS.green
                });
                callback();
            }).catch(error => {
                this.average_people.push({
                    average: 0,
                    key: this.i18n.tr('reports.no_description'),
                    color: this._COLORS.grey
                });
                callback();
            });
    }
    /**
     * Making people chart
     * 
     * @returns void
     */
    makePeopleChart(): void {
        try {
            nv.addGraph(() => {
                var chart = nv.models.pieChart()
                    .x(d => { return d.key })
                    .y(d => { return d.average })
                    .width(this.width)
                    .height(this.height)
                    .showTooltipPercent(true);
                d3.select(this.ref_average_people)
                    .datum(this.average_people)
                    .transition()
                    .duration(1200)
                    .attr('width', this.width)
                    .attr('height', this.height)
                    .call(chart);
                this.average_people_load = false;
                return chart;
            });
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * Prepare chart to view
     * 
     * @returns Void
     */
    prepareAverageItems(): void {
        this.average_items_load = true;
        this.getAverageItems(() => this.makeAverageItems());
    }
    /**
     * Get average items info
     * 
     * @param Function callback Synchronous
     * @returns Void 
     */
    getAverageItems(callback: Function): void {
        this.resource.query(`${env.api.address}report/people_inventory.json`)
            .then(response => {
                this.average_items_title = this.i18n.tr(`reports.${response.report.description}`);
                this.average_items = [{
                    key: "average_items_quantity",
                    values: [
                        {
                            label: this.i18n.tr('reports.average_items_quantity_per_person') || this.i18n.tr('reports.no_description'),
                            value: response.report.average_items_quantity_per_person || 0,
                            color: this._COLORS.green
                        },
                        {
                            label: this.i18n.tr('reports.average_items_quantity_per_healthy_person') || this.i18n.tr('reports.no_description'),
                            value: response.report.average_items_quantity_per_healthy_person || 0,
                            color: this._COLORS.blue_grey
                        }
                    ]
                }];
                callback();
            }).catch(error => {
                this.average_items = [{
                    label: this.i18n.tr('reports.no_description'),
                    value: 0,
                    color: this._COLORS.grey
                }];
                callback();
            });
    }
    /**
     * Making Average items chart
     * 
     * @returns void 
     */
    makeAverageItems(): void {
        try {
            nv.addGraph(() => {
                let chart = nv.models.discreteBarChart()
                    .x((d) => { return d.label })
                    .y((d) => { return d.value })
                    .staggerLabels(true)
                    .showValues(true);
                d3.select(this.ref_average_items)
                    .datum(this.average_items)
                    .transition().duration(500)
                    .call(chart);
                nv.utils.windowResize(chart.update);
                this.average_items_load = false;
                return chart;
            });
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * Prepare chart to view
     * 
     * @returns Void
     */
    prepareTotalPoints(): void {
        this.total_points_load = true;
        this.getTotalPoints(total => this.makeTotalPoints(total));
    }
    /** 
     * Total points lost in items that belong to infected people
     *      
     * @param Function callback Synchronous
     * @returns Void 
     */
    getTotalPoints(callback): void {
        this.resource.query(`${env.api.address}report/infected_points.json`)
            .then(response => {
                this.total_points_title = this.i18n.tr(`reports.${response.report.description}`);
                this.total_points_data = [
                    { key: this.i18n.tr(`reports.lost_by_infected_people`), y: response.report.total_points_lost},
                    { key: "total", y: 0 }
                ];
                callback(response.report.total_points_lost);
            }).catch(error => {
                this.total_points_data = [
                    { key: this.i18n.tr(`reports.lost_by_infected_people`), y: 0 },
                    { key: this.i18n.tr(`reports.total_pontuation`), y: 0 }
                ];
                callback(0);
            });
    }
    /**
     * Making Average items chart
     * 
     * @todo This report need more informations
     * 
     * @param number total
     * @returns void 
     */
    makeTotalPoints(total: number): void {
        const dimension = [
            { inner: 0.65, outer: 0.95 },
            { inner: 0.6, outer: 1 }
        ];
        try {
            nv.addGraph(() => {
                var chart = nv.models.pieChart()
                    .x((d) => { return d.key })
                    .y((d) => { return d.y })
                    .donut(true)
                    .showLabels(false)
                    .color([this._COLORS.green_light, this._COLORS.green])
                    .width(this.width)
                    .height(this.height)
                    .growOnHover(false)
                    .arcsRadius(dimension)
                    .id('donut1'); // allow custom CSS for this one svg
                chart.title(`${total}`);
                d3.select(this.ref_total_points)
                    .datum(this.total_points_data)
                    .transition().duration(1200)
                    .attr('width', this.width)
                    .attr('height', this.height)
                    .call(chart);
                this.total_points_load = false;
                return chart;
            });
        } catch (error) {
            console.error(error);
        }
    }
}

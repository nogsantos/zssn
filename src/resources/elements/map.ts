import { autoinject, customElement, bindable } from 'aurelia-framework';
import { ResourceFactory } from '../system/resource-factory';
import { MdToastService } from 'aurelia-materialize-bridge';
import { I18N } from 'aurelia-i18n';
import env from '../system/env';
import * as OpenLayer from 'openlayers';
/**
 * @description
 *  Map as element
 * @namespace 
 *  Elements
 * 
 * @author Fabricio Nogueira
 */
@customElement('map')
@autoinject()
export class Map {
    private resource: ResourceFactory;
    private loading: boolean;
    private ref_map_view: Element;
    private map: OpenLayer.Map;
    private source: OpenLayer.source.Vector;
    private address: String;
    private parent: any;
    private map_help: string;
    @bindable coodinates: Array<any>;
    /**
     * CDI
     */
    constructor(
        private toast: MdToastService,
        public i18n: I18N
    ) {
        this.loading = true;
    }
    /**
     * Get parent attributs
     */
    bind(bindingContext) {
        this.parent = bindingContext;
        this.map_help = this.i18n.tr('map.help');
    }
    /**
     * When attached, create the map with current location
     */
    attached() {   
        this.source = new OpenLayer.source.Vector({ wrapX: false });
        const view = new OpenLayer.View({
            projection: 'EPSG:4326',
            center: [0, 0],
            zoom: 2
        });        
        /*
         */
        let raster = new OpenLayer.layer.Tile({
            source: new OpenLayer.source.OSM()
        });
        let vector = new OpenLayer.layer.Vector({
            source: this.source
        });
        /*
         * Initialize the map 
         */
        this.map = new OpenLayer.Map({
            layers: [raster, vector],
            target: this.ref_map_view,
            controls: OpenLayer.control.defaults({
                attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    collapsible: true
                })
            }),
            view: view,
            logo: this.getLogo()
        });
        /*
         * When set new position 
         */
        this.enableToSetNewPosition(m => {
            m.on('singleclick', evt => {
                this.coodinates = evt.coordinate;
                this.getAddress();
            });
        });
        /*
         * Track location
         */
        this.trackCurretLocation(view);        
    }
    /**        
     * Track the current location when attached 
     */
    trackCurretLocation(view: OpenLayer.View, when_attached?: boolean): void {
        const geolocation = new OpenLayer.Geolocation({
            projection: view.getProjection()
        });
        geolocation.setTracking(typeof when_attached !== "undefined" ? when_attached : true);        
        geolocation.on('change', () => { // Set the current location in coodinates param
            view.setZoom(10);
            view.setCenter(geolocation.getPosition());
            this.coodinates = JSON.parse(`[${geolocation.getPosition()}]`);
            this.getAddress();
        });
        geolocation.on('error', error => { // handle geolocation error.
            this.loading = false;
            let message = error.code === 1 ? this.i18n.tr(`map.error`) : error.message;
            this.toast.show(message, env.conf.messages.error.duration);
        });
        /*
         * Measuring the Acuracy 
         */
        const accuracyFeature = new OpenLayer.Feature();
        geolocation.on('change:accuracyGeometry', () => {
            accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
        });
        //To draw current location on map
        this.drawOnMap(geolocation, accuracyFeature);
    }
    /**
     * Draw method
     */
    drawOnMap(geolocation, accuracyFeature) {
        /*
         * Styling the draw 
         */
        let positionFeature = new OpenLayer.Feature();
        positionFeature.setStyle(new OpenLayer.style.Style({
            image: new OpenLayer.style.Circle({
                radius: 6,
                fill: new OpenLayer.style.Fill({
                    color: '#3399CC'
                }),
                stroke: new OpenLayer.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        }));
        /*
         * Fill the map 
         */
        geolocation.on('change:position', () => {
            let coordinates = geolocation.getPosition();
            positionFeature.setGeometry(coordinates ? new OpenLayer.geom.Point(coordinates) : null);
        });
        /*
         * Update the map
         */
        new OpenLayer.layer.Vector({
            map: this.map,
            source: new OpenLayer.source.Vector({
                features: [accuracyFeature, positionFeature]
            })
        });
    }
    /**
     * Enabling to draw a circle in map 
     */
    enableToSetNewPosition(callback: Function): void {
        let draw = new OpenLayer.interaction.Draw({
            source: this.source,
            type: /** @type {OpenLayer.geom.GeometryType} */ "Point"
        });
        this.map.addInteraction(draw);
        callback(this.map);
    }
    /*
     * Just putting my name on map!
     */
    getLogo(): HTMLAnchorElement {
        const logoElement = document.createElement('a');
        logoElement.href = 'http://fabricionogueira.site';
        logoElement.target = '_blank';
        const logoImage = document.createElement('span');
        logoImage.textContent = 'Fabricio Nogueira';
        logoElement.appendChild(logoImage);
        return logoElement;
    }
    /**
     * Load address by coodinates from google maps
     */
    getAddress() {
        this.address = "";
        this.resource = new ResourceFactory();        
        this.parent.survivor.lonlat = this.coodinates;
        this.resource.query(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.coodinates[1]},${this.coodinates[0]}&key=${env.api.key}`)
            .then(response => {
                if (response.status === "OK") {
                    this.address = response.results[0].formatted_address;
                }
                this.loading = false;
            }).catch(error => {
                this.loading = false;
            });
    }
}

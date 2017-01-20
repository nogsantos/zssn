import { inject, customAttribute, DOM, noView, bindable, bindingMode } from 'aurelia-framework';
import * as ol from 'openlayers';
/**
 * Map
 * 
 * @deprecated Or not, if you will use it as attribut, but, need some adjustments.
 * 
 * @author Fabricio Nogueira
 */
@customAttribute('map', bindingMode.twoWay)
@inject(DOM.Element)
@noView
export class Map {
    private element;
    private map;
    private view;
    private geolocation;
    private positionFeature;
    private accuracyFeature;
    private draw;
    private raster;
    private vector;
    private source;
    @bindable coodinates: any;
    /**
     * 
     */
    constructor(element) {
        this.element = element;
    }
    /**
     * 
     */
    created(){
        this.raster = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        this.source = new ol.source.Vector({ wrapX: false });

        this.vector = new ol.layer.Vector({
            source: this.source
        });

        this.geolocation = new ol.Geolocation();

        this.view = new ol.View({
            center: [0, 0],
            zoom: 2
        });

    }
    /**
     * 
     */
    attached() {
        let sef = this;
        this.map = new ol.Map({
            layers: [this.raster, this.vector],
            target: sef.element,
            controls: ol.control.defaults({
                attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    collapsible: false
                })
            }).extend([
                new ol.control.OverviewMap()
            ]),
            view: this.view
        });

        this.geolocation = new ol.Geolocation({
            projection: this.view.getProjection()
        });

        this.geolocation.setTracking(true);

        this.geolocation.on('change', () => {
            this.coodinates = JSON.parse(`[${this.geolocation.getPosition()}]`);
            console.log(JSON.parse(`[${this.geolocation.getPosition()}]`));
        });

        // handle geolocation error.
        this.geolocation.on('error', function (error) {
            console.log(error.message);
        });

        this.accuracyFeature = new ol.Feature();
        this.geolocation.on('change:accuracyGeometry', () => {
            this.accuracyFeature.setGeometry(this.geolocation.getAccuracyGeometry());
        });

        this.positionFeature = new ol.Feature();
        this.positionFeature.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#3399CC'
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        }));

        this.geolocation.on('change:position', () => {
            var coordinates = this.geolocation.getPosition();
            this.positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
        });

        new ol.layer.Vector({
            map: this.map,
            source: new ol.source.Vector({
                features: [this.accuracyFeature, this.positionFeature]
            })
        });

        this.draw = new ol.interaction.Draw({
            source: this.source,
            type: /** @type {ol.geom.GeometryType} */ "Circle"
        });
        this.map.addInteraction(this.draw);
    }    
}

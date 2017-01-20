import { inject, customElement, DOM, bindable } from 'aurelia-framework';
import * as OpenLayer from 'openlayers';
/**
 * Map as element
 * 
 * @author Fabricio Nogueira
 */
@customElement('map')
@inject(DOM.Element)
export class Map {
    private element: any;
    private ref_map_view: Element;
    private map: OpenLayer.Map;    
    private source: OpenLayer.source.Vector;
    @bindable coodinates: Array<any>;
    /**
     * CDI
     */
    constructor(element) {
        this.element = element;
        this.source = new OpenLayer.source.Vector({ wrapX: false });        
    }    
    /**
     * When attached, create the map with current location
     */
    attached() {
         const view = new OpenLayer.View({
            projection: 'EPSG:4326',
            center: [0, 0],
            zoom: 2
        });
        /*
         */
        // const raster = new OpenLayer.layer.Tile({
        //     source: new OpenLayer.source.OSM()
        // });
        // const vector = new OpenLayer.layer.Vector({
        //     source: this.source
        // });
        /*
         * Initialize the map 
         */
        this.map = new OpenLayer.Map({
            layers: [
                new OpenLayer.layer.Tile({
                    source: new OpenLayer.source.OSM()
                })
            ],
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
        });
        geolocation.on('error', (error) => { // handle geolocation error.         
            console.log(error.message);
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
            type: /** @type {OpenLayer.geom.GeometryType} */ "Circle"
        });
        this.map.addInteraction(draw);
        callback(this.map);
    }
    /*
     * Just puting my name on map!
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
}

import { bindable } from 'aurelia-framework';
import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
/**
 * @description
 *  Using Zombie as a helper 
 * @namespace 
 *  Template/Navigation
 * 
 * @author Fabricio Nogueira
 */
@autoinject()
export class NavigationZombie {
    @bindable router;
    private zombie_speech: string;    
    private lb_index: string;
    /**
     * CDI
     */
    constructor(
        private i18n: I18N
    ) { }
    /**
     * The view also ben created
     */
    created() {
        this.zombie_speech = this.i18n.tr(`zombie.speech.${0}`);        
        this.lb_index = this.i18n.tr('home');        
        this.zombieSpeechs();
    }
    /**
     * Making our friend zombie more polite
     */
    zombieSpeechs() {
        setInterval(() => {
            this.zombie_speech = this.i18n.tr(`zombie.speech.${Math.floor((Math.random() * 5) + 1)}`);
        }, 9000);
    }
}

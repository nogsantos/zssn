import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
/**
 * Zombie as a helper
 */
@autoinject()
export class NavigationZombie {
    private about: string;
    private about_info: string;
    private author: string;
    private web_address: string;
    private technologies: string;
    private zombie_speech: string;
    /**
     * Dependency injections
     */
    constructor(
        private i18n: I18N
    ) { }
    /**
     * The view also ben created
     */
    created(): void {
        this.about = this.i18n.tr('about');
        this.about_info = this.i18n.tr('about_info');
        this.author = this.i18n.tr('author');
        this.web_address = this.i18n.tr('web_address');
        this.technologies = this.i18n.tr('technologies');
        this.zombie_speech = this.i18n.tr(`zombie.speech.${0}`);
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

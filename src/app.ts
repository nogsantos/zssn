import { autoinject } from 'aurelia-framework';
import { NavigationInstruction, RouterConfiguration, AppRouter } from "aurelia-router";
import { I18N } from 'aurelia-i18n';
/**
 * @description
 *  App route 
 * @namespace 
 *  src
 * 
 * @author Fabricio Nogueira
 */
@autoinject()
export class App {
    private router: AppRouter;
    /**
     * CDI   
     */
    constructor(
        private i18n: I18N
    ) { }
    /**
     * Rotas
     */
    configureRouter(config: RouterConfiguration, router: AppRouter): void {
        config.title = this.i18n.tr("app_name");
        config.map({
            route: ['', 'home', 'index'],
            name: 'Index',
            moduleId: 'v1/index/index',
            nav: false,
            title: this.i18n.tr('home'),
            href: "#/",
            icon: 'home',
            id: "_home"
        });
        config.map({
            route: 'survivor',
            name: 'Survivor',
            moduleId: 'v1/survivor/index',
            nav: true,
            title: this.i18n.tr('survivor.nav'),
            href: "#/survivor",
            icon: 'accessibility',
            id: "_survivor"
        });        
        config.map({
            route: 'survivor/form',
            name: 'SurvivorForm',
            moduleId: 'v1/survivor/form',
            nav: true,
            title: this.i18n.tr('survivor.new'),
            href: "#/survivor/form",
            icon: 'add',
            id: "_survivor_form"
        });        
        config.map({
            route: 'about',
            name: 'About',
            moduleId: 'v1/about/index',
            nav: true,
            title: this.i18n.tr('about'),
            href: "#/about",
            icon: 'settings',
            id: "_about"
        });
        /*
         * Tratando as rotas desconhecidas
         */
        let navStrat = (instruction: NavigationInstruction) => {
            if (instruction.config === null) {
                return '404';
            }
            instruction.config.moduleId = instruction.fragment;
            instruction.config.href = instruction.fragment;
        };
        config.mapUnknownRoutes(navStrat);
        config.fallbackRoute('index');
        this.router = router;
    }

}

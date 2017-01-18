import { Aurelia, inject } from 'aurelia-framework';
import { NavigationInstruction, RouterConfiguration, AppRouter } from "aurelia-router";
/**
 * 
 */
export class App {
    public router: AppRouter;
    public message = 'Hello resistance members, we are alive!';
    /**
    * Aurelia: Importação do login para verificar se o usuário está autenticado.     
    * I18N: Tradução
    */
    constructor() { }
    /**
     * Rotas
     */
    configureRouter(config: RouterConfiguration, router: AppRouter): void {
        config.map({
            route: ['', 'index'],
            redirect: 'index'
        });
        config.map({
            route: ['home', 'dashboard'],
            name: 'index',
            moduleId: './v1/index/index',
            href: "#/",
            title: "Wellcome",
            icon: 'home',
            id: "_home"
        });
        config.map({
            route: ['people'],
            name: 'people',
            moduleId: './v1/people/index',
            href: "#/people",
            icon: 'people',
            id: "_people"
        });
        config.map({
            route: ['report'],
            name: 'report',
            moduleId: './v1/report/index',
            href: "#/report",
            icon: 'report',
            id: "_report"
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

        this.router = router;
    }

}

import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        './elements/map',
        './elements/three-dots',
        './elements/account/auth-form',
        './attributes/input-enter-keypress',
    ]);
}

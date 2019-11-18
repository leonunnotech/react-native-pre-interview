import RestClient from './api/RestClient';
import { settingsLOCAL } from './api/constants';

class GeneralFoundation {
    constructor() {
        const settings = settingsLOCAL
        this.demoFoundation = new RestClient(settings.demoFoundationApi);
    }
}

export default GeneralFoundation;
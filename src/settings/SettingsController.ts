import { Controller } from '../common/Controller';
import { Settings } from '../common/graphql_types';
import { QueryService } from '../database/QueryService';

const settingsQueryService = new QueryService(['_id', 'cloutCommentsMultiplier']);

class SettingsController extends Controller<Settings> {
    constructor() {
        super();
        this.setQueryService(settingsQueryService);
    }

    getSettings = (...params : [any, any, any, any]) =>
        this.getDocumentsByFilter(...params);

};

const settingsController = new SettingsController();

export { settingsController };

import { Model } from 'mongoose';
import { PropertyFilterComparator, PropertyFilterInput, PropertyFilterType } from "./graphql_types";
import { DocQueryPromise } from "./types";


export class Controller<DocType> {

    model: any;
    queryService: any;
    setModel = (model: any) => {
        this.model = model;
    }

    setQueryService = (queryService: any) => {
        this.queryService = queryService
    }

    tryQueryAsync = async (f: Function) => {
        try {
            return await f();
        }
        catch (e) {
            console.log(`Query error: ${e}`);
        }
    }

    getDocumentsByFilter = async (parent: any, args: { input: PropertyFilterInput },
            context: any, info: any, model: Model<any> = this.model, modelOverride?: Object): DocQueryPromise<DocType[]> =>
        this.tryQueryAsync(() => this.queryService.applyQueryFromPropertyFilters(model, args.input, modelOverride));

    getDocumentsByFilterNoLimit = async (parent: any, args: { input: PropertyFilterInput }, context: any, info: any, model: Model<any> = this.model)
        : DocQueryPromise<DocType[]> => this.tryQueryAsync(() => this.queryService.getAllDocumentsFromModel(model, args.input));

    getDocumentsByFilterInput = async (input: PropertyFilterInput, modelOverride?: Object, model: Model<any> = this.model): DocQueryPromise<DocType[]> =>
        this.tryQueryAsync(() => this.queryService.applyQueryFromPropertyFilters(model, input, modelOverride));

    genGetDocumentsByForeignKey = (foreignKeyName: string, model: Model<any> = this.model) : Function =>
        async (parent: any, args: { input: PropertyFilterInput }, context: any, info: any): DocQueryPromise<DocType[]> =>
            this.tryQueryAsync(() => this.queryService.applyQueryFromPropertyFilters(model, {
                                                ...args.input, 
                                                filters: [{
                                                    type: PropertyFilterType.Id,
                                                    comparator: PropertyFilterComparator.Is,
                                                    property: foreignKeyName,
                                                    term: parent._id }].concat(args?.input?.filters ?? []) }));

    genGetAllDocumentsByForeignKey = (foreignKeyName: string, model: Model<any> = this.model) : Function =>
        async (parent: any, args: { input: PropertyFilterInput }, context: any, info: any): DocQueryPromise<DocType[]> =>
            this.tryQueryAsync(() => this.queryService.getAllDocumentsFromModel(model, {
                                                ...args.input, 
                                                filters: [{
                                                    type: PropertyFilterType.Id,
                                                    comparator: PropertyFilterComparator.Is,
                                                    property: foreignKeyName,
                                                    term: parent._id }].concat(args?.input?.filters ?? []) }));

    genGetDocumentsByForeignKeyArray = (foreignKeyName: string, model: Model<any> = this.model) : Function =>
        async (parent: any, args: { input: PropertyFilterInput }, context: any, info: any): DocQueryPromise<DocType[]> =>
            this.tryQueryAsync(() => this.queryService.applyQueryFromPropertyFilters(model, {  
                                                ...args.input,
                                                filters: args.input.filters.concat([
                                                {type: PropertyFilterType.Id,
                                                 comparator: PropertyFilterComparator.In,
                                                 property: foreignKeyName,
                                                 term: parent._id }])}));


    genGetDocumentsByLocalKey = (localKeyName: string, model: Model<any> = this.model) : Function =>
        async (parent: any, args: { input: PropertyFilterInput }, context: any, info: any): DocQueryPromise<DocType> =>
            this.tryQueryAsync(() => this.queryService.applyQueryFromPropertyFilters(model, {  
                                                ...args.input, 
                                                filters: [{
                                                    type: PropertyFilterType.Id,
                                                    comparator: PropertyFilterComparator.Is,
                                                    property: "_id",
                                                    term: parent[localKeyName] }].concat(args?.input?.filters ?? []) 
                                                }));

    genGetDocumentsByLocalKeyArray = (localKeyName: string) : Function =>
        async (parent: any, args: { input: PropertyFilterInput },
            context: any, info: any, model: Model<any> = this.model): DocQueryPromise<DocType[]> =>
            this.tryQueryAsync(() => this.queryService.applyQueryFromPropertyFilters(this.model, {  
                                                ...args.input, 
                                                filters: args.input.filters.concat([
                                                {type: PropertyFilterType.List,
                                                 comparator: PropertyFilterComparator.In,
                                                 property: "_id",
                                                 term: parent[localKeyName] }])}));


    updateDocument = <UpdateDocT>(parent: any, args: { input: {_id: string, document: UpdateDocT} }, context: any, info: any): DocQueryPromise<DocType> =>
        this.tryQueryAsync(() => this.model.updateOne({ _id: args.input._id }, args.input.document));

    insertDocument = <InsertDocT>(parent: any, args: { input: {document: InsertDocT} }, context: any, info: any): DocQueryPromise<DocType> =>
        this.tryQueryAsync(() => this.model.insert(args.input.document));


}

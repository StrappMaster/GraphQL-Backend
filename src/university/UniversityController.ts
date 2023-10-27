import { Maybe } from 'graphql-tools';
import { Model } from 'mongoose';
import {
    University, PropertyFilterComparator, PropertyFilterInput, PropertyFilterType,
} from '../common/graphql_types';
import { QueryService } from '../database/QueryService';
import { Controller } from '../common/Controller';

const universityQueryService = new QueryService(['_id', 'university', 'university.domains', 'university.name', 'university.shortname', 'createdAt', 'updatedAt', 'isDeleted', 'isBlocked', 'universitySpecificFeedId', 'collegeFeedId']);

class UniversityController extends Controller<University> {

    constructor() {
        super();
        this.setQueryService(universityQueryService);
    }

    getUniversities = (...params : [any, any, any, any]) => this.getDocumentsByFilter(...params);

    getUniversityByName = (parent: any, args: any, context: any, info: any) =>
        this.getDocumentsByFilterInput({
            ...args.input,
            filters: [{
                type: PropertyFilterType.Id,
                property: 'university.name',
                comparator: PropertyFilterComparator.Is,
                term: args.input.name,
            }],
        }).then((res: Maybe<University[]>) => res ? res[0] : null);

    getUniversityByDomain = (parent: any, args: any, context: any, info: any) =>
        this.getDocumentsByFilterInput({
            ...args.input,
            filters: [{
                type: PropertyFilterType.Id,
                property: 'university.domains',
                comparator: PropertyFilterComparator.In,
                term: args.input.name,
            }],
        }).then((res: Maybe<University[]>) => (res) ? res[0] : null);

    getUniversityFromUser = (parent: any, args: any, context: any, info: any) =>
        this.getUniversityByDomain(parent, { input: { name: (parent.university.domain ?? "umich.edu") }}, context, info);

    getUniversityFromPost = (...params : [any, any, any, any]) => this.genGetDocumentsByLocalKey('universityId')(...params)
        .then((res: Maybe<University[]>) => (res) ? res[0] : null);

}

const universityController = new UniversityController();

export { universityController };

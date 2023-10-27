import { FilterQuery, Model } from 'mongoose';
import { PropertyFilter, PropertyFilterComparator, PropertyFilterInput, SortType } from '../common/graphql_types';
import { Maybe } from '../common/types';

const MAX_QUERY_LIMIT = 25;

const resolveFilterTerm = (filter: PropertyFilter) : any => {
    let term = null;
    try {
        if (filter.type == 'STRING') {
            term = filter.term;
        }
        else if (filter.type == 'NUMBER') {
            term = parseInt(filter.term);
        }
        else if (filter.type == 'FLOAT') {
            term = parseFloat(filter.term);
        }
        else if (filter.type === 'ID') {
            //term = new ObjectId(filter.term);
            term = filter.term;
        }
        else if (filter.type === 'LIST') {
            //term = new Array(filter.term);
            term = filter.term;
        }
        else if (filter.type == 'BOOL') {
            term = (filter.term == 'true');
        }
        else {
            term = JSON.parse(filter.term);
        }
    }
    catch {
        throw 'Could not parse JSON query term';
    }
    return term;
}

const applyComparatorQuery = (query : any, comp : any, term : any) : FilterQuery<any> => {
    if (comp == PropertyFilterComparator.Is)
        return query.equals(term);
    else if (comp == PropertyFilterComparator.IsNot)
        return query.ne(term);
    else if (comp == PropertyFilterComparator.GreaterThan)
        return query.ge(term);
    else if (comp == PropertyFilterComparator.GreaterThanOrEqual)
        return query.gte(term);
    else if (comp == PropertyFilterComparator.LessThan)
        return query.lt(term);
    else if (comp == PropertyFilterComparator.LessThanOrEqual)
        return query.lte(term);
    else if (comp == PropertyFilterComparator.Has)
        return query.elemMatch({ term });
    else if (comp == PropertyFilterComparator.NotHas)
        return query.not.elemMatch({ term });
    else if (comp == PropertyFilterComparator.In)
        return query.in(term);
    else if (comp == PropertyFilterComparator.NotIn)
        return query.nin(term);
    throw `QueryService: Invalid Comparator ${comp}`;
}

const resolveFilterComparator = (comp : any) => {
    if (comp == PropertyFilterComparator.Is)
        return "$eq";
    else if (comp == PropertyFilterComparator.In)
        return "$in";
    else if (comp == PropertyFilterComparator.GreaterThan)
        return "$ge";
    else if (comp == PropertyFilterComparator.GreaterThanOrEqual)
        return "$gte";
    else if (comp == PropertyFilterComparator.LessThan)
        return "$lt";
    else if (comp == PropertyFilterComparator.LessThanOrEqual)
        return "$lte";
    throw `QueryService: Invalid Comparator ${comp}`;
}

class QueryService {

    allowedFields: String[];
    constructor(allowedFields: String[]) {
        this.allowedFields = allowedFields
    }

    applyQueryFromPropertyFilters = <DocType>(model: Model<DocType>, propertyFilterInput: PropertyFilterInput, modelOverride?: Object, queryOverride?: String) : Object => {
        const propertyFilters : PropertyFilter[] = propertyFilterInput.filters ?? [];
        const sortType : Maybe<SortType> = propertyFilterInput.sort ?? undefined;
        const queryLimit : Number = (propertyFilterInput.limit && propertyFilterInput.limit <= MAX_QUERY_LIMIT)
                                        ? propertyFilterInput.limit : MAX_QUERY_LIMIT;
        const skipAmount : number = propertyFilterInput.skip ?? 0;
        //if (!propertyFilters || propertyFilters.length < 1) throw 'No property filter given'; 
        // check that all terms are allowed to be queried
        propertyFilters.forEach(filter => {
            if (!(this.allowedFields.includes(filter.property))) {
                throw(`QueryService: Not allowed to query for field ${filter.property}`);
            }
        })

        const queryArray : FilterQuery<any>[] = propertyFilters.map(filter => ({
            [filter.property]: {
                [resolveFilterComparator(filter.comparator)]: resolveFilterTerm(filter)
            }
        }))

        const findCondition = (modelOverride ? modelOverride : {});
        const queryType = (queryOverride == 'count') ? model.find().count() : model.find();
        const findQuery = (queryArray.length > 0) ?
                            queryType.where(findCondition).and(queryArray) : queryType.where(findCondition);

        const sortQuery = sortType ? { [sortType.property]: sortType.order } : {};

        return findQuery.sort(sortQuery).limit(queryLimit as number).skip(skipAmount);
    }

    getAllDocumentsFromModel = <DocType>(model: Model<DocType>, propertyFilters: PropertyFilterInput) => {
        //const skipAmount : number = propertyFilters.skip ?? 0;
        const queryArray : FilterQuery<any>[] = (propertyFilters.filters ?? []).map((filter: any) => ({
            [filter.property]: {
                [resolveFilterComparator(filter.comparator)]: resolveFilterTerm(filter)
            }
        }));
        const queryType = model.find({}).limit(0).skip(0);
        const findQuery = (queryArray.length > 0) ?
                            queryType.where({}).and(queryArray) : queryType;
        return findQuery.sort({ createdAt: -1 });
    }

}
export { QueryService };

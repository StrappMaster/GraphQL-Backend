import { PropertyFilterType, PropertyFilterComparator } from './graphql_types';

const sumLikesOverDocuments = (documents: any[]) =>
    documents.reduce((acc, curr) => acc + curr.likes.length, 0);

const sumDislikesOverDocuments = (documents: any[]) =>
    documents.reduce((acc, curr) => acc + curr.dislikes.length, 0);

const sumCommentsOverDocuments = (documents: any[]) =>
    documents.reduce((acc, curr) => acc + curr.comments.length, 0);

const sumUniquePostersOverDocuments = (documents: any[]) =>
    documents.reduce((acc, curr) => acc.add(curr.userId), new Set()).size;

const sumUniqueCommentersOverDocuments = (documents: any[]) =>
    documents.reduce((acc, curr) => {
        curr.comments.forEach((com : any) => acc.add(com.userId));
        return acc;
    }, new Set()).size;

const genDateRangeFilters = (start_date: any, end_date?: any) => {
    return [
        {
            property: "createdAt",
            type: PropertyFilterType.String,
            comparator: PropertyFilterComparator.GreaterThanOrEqual,
            term: start_date
        },
        {
            property: "createdAt",
            type: PropertyFilterType.String,
            comparator: PropertyFilterComparator.LessThanOrEqual,
            term: (end_date ? end_date : ((Date.now()) as Number).toString())
        }
    ];
}

const MetricService = {
    sumLikesOverDocuments,
    sumDislikesOverDocuments,
    sumCommentsOverDocuments,
    sumUniquePostersOverDocuments,
    sumUniqueCommentersOverDocuments,
    genDateRangeFilters
}

export default MetricService;

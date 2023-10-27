import { universityController } from './UniversityController';

const UniversityDomain = {
    resolvers: {
        Query: {
            getUniversities: universityController.getUniversities,
            getUniversityByName: universityController.getUniversityByName,
            getUniversityByDomain: universityController.getUniversityByDomain,
        },
        User: {
            getUniversity: universityController.getUniversityFromUser,
        },
    },
};

export default UniversityDomain;

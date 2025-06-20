import { MessagePatterns } from 'src/common/constants/message-pattern';

export const MESSAGE_PATTERN = {
    UNIVERSITY_SEARCH: {
        CREATE: MessagePatterns.UniversitySearch.V1.CREATE,
        GET_ALL: MessagePatterns.UniversitySearch.V1.GET_ALL,
        GET_ONE: MessagePatterns.UniversitySearch.V1.GET_ONE,
        UPDATE: MessagePatterns.UniversitySearch.V1.UPDATE,
        DELETE: MessagePatterns.UniversitySearch.V1.DELETE,
        FILTER: MessagePatterns.UniversitySearch.V1.FILTER,
    },
};

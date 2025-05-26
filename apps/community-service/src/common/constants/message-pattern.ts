export const MessagePatterns = {
    Story: {
        V1: {
            GET_ALL: 'v1.story.find.all',
            CREATE: 'v1.story.create',
            CREATE_WITH_FILE: 'v1.story.create.with.file',
            FIND_ONE: 'v1.story.find.one',
            UPDATE: 'v1.story.update',
            UPDATE_WITH_FILE: 'v1.story.update.with.file',
            DELETE: 'v1.story.delete',
            // Story items operations
            CREATE_ITEM: 'v1.story.item.create',
            CREATE_ITEM_WITH_FILE: 'v1.story.item.create.with.file',
            FIND_ONE_ITEM: 'v1.story.item.find.one',
            UPDATE_ITEM: 'v1.story.item.update',
            UPDATE_ITEM_WITH_FILE: 'v1.story.item.update.with.file',
            DELETE_ITEM: 'v1.story.item.delete',
        },
    },
    University: {
        V1: {
            GET_ALL: 'v1.university.find.all',
            CREATE: 'v1.university.create',
            FIND_ONE: 'v1.university.find.one',
            UPDATE: 'v1.university.update',
            DELETE: 'v1.university.delete',
            ADD_PROGRAM: 'v1.university.add.program',
            UPDATE_PROGRAM: 'v1.university.update.program',
            DELETE_PROGRAM: 'v1.university.delete.program',
        },
    },
    Mobile: {
        V1: {
            GET_ALL_STORIES: 'v1.mobile.story.find.all',
            GET_STORY_WITH_ITEMS: 'v1.mobile.story.find.one',
            TRACK_STORY_VIEW: 'v1.mobile.story.track.view',
            TRACK_STORY_ITEMS: 'v1.mobile.story.track.items',
            TRACK_STORY_BUTTON: 'v1.mobile.story.track.button',
            // Ielts exam operations
            GET_ALL_IELTS_EXAM_DAYS: 'v1.mobile.ieltsExam.find.all',
            REGISTER_FOR_EXAM: 'v1.mobile.ieltsExam.register',
            GET_EXAM_REGISTRATION: 'v1.mobile.ieltsExam.get.registration',
            GET_ONE_EXAM: 'v1.mobile.ieltsExam.find.one',
            // University operations
            CREATE_UNIVERSITY_APPLY: 'v1.mobile.university.create.apply',
            GET_ALL_UNIVERSITIES: 'v1.mobile.university.find.all',
            GET_ONE_UNIVERSITY: 'v1.mobile.university.find.one',
            GET_MY_APPLIES: 'v1.mobile.university.get.my.applies',
            GET_ONE_MY_APPLY: 'v1.mobile.university.get.one.apply',
        },
    },
    Auth: {
        V1: {
            LOGIN: 'v1.auth.login',
            REGISTER: 'v1.auth.register',
            VERIFY: 'v1.auth.verify',
        },
    },
    Survey: {
        V1: {
            CREATE: 'v1.survey.create',
            GET_ALL: 'v1.survey.get.all',
            GET_ONE: 'v1.survey.get.one',
            UPDATE: 'v1.survey.update',
            DELETE: 'v1.survey.delete',
        },
    },
    IeltsExam: {
        V1: {
            GET_ALL: 'v1.ieltsExam.find.all',
            CREATE: 'v1.ieltsExam.create',
            FIND_ONE: 'v1.ieltsExam.find.one',
            UPDATE: 'v1.ieltsExam.update',
            DELETE: 'v1.ieltsExam.delete',
        },
    },
};

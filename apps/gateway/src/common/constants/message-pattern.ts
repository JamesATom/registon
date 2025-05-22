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

            CREATE_ITEM: 'v1.story.item.create',
            CREATE_ITEM_WITH_FILE: 'v1.story.item.create.with.file',
            FIND_ONE_ITEM: 'v1.story.item.find.one',
            UPDATE_ITEM: 'v1.story.item.update',
            UPDATE_ITEM_WITH_FILE: 'v1.story.item.update.with.file',
            DELETE_ITEM: 'v1.story.item.delete',
            //
        },
    },
    Mobile: {
        V1: {
            GET_ALL_STORIES: 'v1.mobile.story.find.all',
            GET_STORY_WITH_ITEMS: 'v1.mobile.story.find.one',
            TRACK_STORY_VIEW: 'v1.mobile.story.track.view',
            TRACK_STORY_ITEMS: 'v1.mobile.story.track.items',
            TRACK_STORY_BUTTON: 'v1.mobile.story.track.button',
            //
            GET_ALL_IELTS_EXAM_DAYS: 'v1.mobile.ieltsExam.find.all',
            REGISTER_FOR_EXAM: 'v1.mobile.ieltsExam.register',
            GET_ONE_EXAM: 'v1.mobile.ieltsExam.find.one',
            GET_REGISTRATED_EXAMS: 'v1.mobile.ieltsExam.get.registration',
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

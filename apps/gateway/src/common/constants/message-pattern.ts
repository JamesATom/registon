export const MessagePatterns = {
    Story: {
        V1: {
            GET_ALL: 'v1.story.find.all',
            FIND_ONE: 'v1.story.find.one',
            CREATE: 'v1.story.create',
            UPDATE: 'v1.story.update',
            DELETE: 'v1.story.delete',
            // Story items operations
            CREATE_ITEM: 'v1.story.item.create',
            FIND_ONE_ITEM: 'v1.story.item.find.one',
            UPDATE_ITEM: 'v1.story.item.update',
            DELETE_ITEM: 'v1.story.item.delete',
        },
    },
    Mobile: {
        V1: {
            GET_ALL_STORIES: 'mobile.v1.get.all.stories',
            GET_STORY_WITH_ITEMS: 'mobile.v1.get.story.with.items',
        },
    },
    Auth: {
        V1: {
            LOGIN: 'v1.auth.login',
            REGISTER: 'v1.auth.register',
            VERIFY: 'v1.auth.verify',
        },
    },
};

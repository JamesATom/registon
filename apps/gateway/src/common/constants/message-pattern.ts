export const MessagePatterns = {
    Story: {
        V1: {
            GET_ALL: 'v1.story.find.all',
            FIND_ONE: 'v1.story.find.one',
            CREATE: 'v1.story.create',
            CREATE_WITH_FILE: 'v1.story.create.with.file',
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

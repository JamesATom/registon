export const MessagePatterns = {
    Story: {
        V1: {
            GET_ALL: 'v1.story.get.all',
            CREATE: 'v1.story.create',
            CREATE_WITH_FILE: 'v1.story.create.with.file',
            GET_ONE: 'v1.story.get.one',
            UPDATE: 'v1.story.update',
            UPDATE_WITH_FILE: 'v1.story.update.with.file',
            DELETE: 'v1.story.delete',
            CREATE_ITEM: 'v1.story.item.create',
            CREATE_ITEM_WITH_FILE: 'v1.story.item.create.with.file',
            GET_ONE_ITEM: 'v1.story.item.get.one',
            UPDATE_ITEM: 'v1.story.item.update',
            UPDATE_ITEM_WITH_FILE: 'v1.story.item.update.with.file',
            DELETE_ITEM: 'v1.story.item.delete',
        },
    },
    University: {
        V1: {
            GET_ALL: 'v1.university.get.all',
            CREATE: 'v1.university.create',
            GET_ONE: 'v1.university.get.one',
            UPDATE: 'v1.university.update',
            DELETE: 'v1.university.delete',
            ADD_PROGRAM: 'v1.university.add.program',
            UPDATE_PROGRAM: 'v1.university.update.program',
            DELETE_PROGRAM: 'v1.university.delete.program',
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
            SUBMIT: 'v1.survey.submit',
        },
    },
    Event: {
        V1: {
            CREATE: 'v1.event.create',
            GET_ALL: 'v1.event.get.all',
            GET_ONE: 'v1.event.get.one',
            UPDATE: 'v1.event.update',
            DELETE: 'v1.event.delete',
        },
    },
    IeltsRegister: {
        V1: {
            GET_ALL: 'v1.ieltsExam.get.all',
            CREATE: 'v1.ieltsExam.create',
            GET_ONE: 'v1.ieltsExam.get.one',
            UPDATE: 'v1.ieltsExam.update',
            DELETE: 'v1.ieltsExam.delete',
            REGISTER_FOR_EXAM: 'registerForIeltsExam',
        },
    },
    MockRegister: {
        V1: {
            GET_ALL: 'v1.mockRegistration.get.all',
            CREATE: 'v1.mockRegistration.create',
            GET_ONE: 'v1.mockRegistration.get.one',
            UPDATE: 'v1.mockRegistration.update',
            DELETE: 'v1.mockRegistration.delete',
            REGISTER_STUDENT: 'registerStudentForMock',
            UNREGISTER_STUDENT: 'unregisterStudentFromMock',
        },
    },
    City: {
        V1: {
            GET_ALL: 'v1.city.get.all',
        },
    },
    Branch: {
        V1: {
            GET_ALL: 'v1.branch.get.all',
            GET_BY_CITY: 'v1.branch.get.by.city',
        },
    }
};

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
            CREATE: 'v1.city.create',
            GET_ALL: 'v1.city.get.all',
            GET_ONE: 'v1.city.get.one',
            UPDATE: 'v1.city.update',
            DELETE: 'v1.city.delete',
        },
    },
    Branch: {
        V1: {
            GET_ALL: 'v1.branch.get.all',
            GET_BY_CITY: 'v1.branch.get.by.city',
        },
    },
    JobHunting: {
        V1: {
            GET_ALL: 'v1.jobHunting.get.all',
            CREATE: 'v1.jobHunting.create',
            GET_ONE: 'v1.jobHunting.get.one',
            UPDATE: 'v1.jobHunting.update',
            DELETE: 'v1.jobHunting.delete',
            FILTER: 'v1.jobHunting.filter',
        },
    },
    Company: {
        V1: {
            GET_ALL: 'v1.company.get.all',
            CREATE: 'v1.company.create',
            GET_ONE: 'v1.company.get.one',
            UPDATE: 'v1.company.update',
            DELETE: 'v1.company.delete',
        },
    },
    CV: {
        V1: {
            GET_ALL: 'v1.cv.get.all',
            CREATE: 'v1.cv.create',
            GET_ONE: 'v1.cv.get.one',
            UPDATE: 'v1.cv.update',
            DELETE: 'v1.cv.delete',
            ADD_SKILL: 'v1.cv.add.skill',
            REMOVE_SKILL: 'v1.cv.remove.skill',
            ADD_TOOL: 'v1.cv.add.tool',
            REMOVE_TOOL: 'v1.cv.remove.tool',
        },
    },
    Skill: {
        V1: {
            GET_ALL: 'v1.skill.get.all',
            CREATE: 'v1.skill.create',
            GET_ONE: 'v1.skill.get.one',
        },
    },
    Tool: {
        V1: {
            GET_ALL: 'v1.tool.get.all',
            CREATE: 'v1.tool.create',
            GET_ONE: 'v1.tool.get.one',
        },
    },
    Certificate: {
        V1: {
            GET_ALL: 'v1.certificate.get.all',
            CREATE: 'v1.certificate.create',
            GET_ONE: 'v1.certificate.get.one',
        },
    },
    UniversitySearch: {
        V1: {
            GET_ALL: 'v1.universitySearch.get.all',
            CREATE: 'v1.universitySearch.create',
            GET_ONE: 'v1.universitySearch.get.one',
            UPDATE: 'v1.universitySearch.update',
            DELETE: 'v1.universitySearch.delete',
            FILTER: 'v1.universitySearch.filter',
        },
    },
};

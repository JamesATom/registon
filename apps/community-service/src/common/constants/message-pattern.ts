export const MessagePatterns = {
    UniversitySearch: {
        V1: {
            University: {
                CREATE: 'v1.university-search.university.create',
                GET_ALL: 'v1.university-search.university.get.all',
                GET_ONE: 'v1.university-search.university.get.one',
                UPDATE: 'v1.university-search.university.update',
                DELETE: 'v1.university-search.university.delete',
            },
            Faculty: {
                CREATE: 'v1.university-search.faculty.create',
                GET_ALL: 'v1.university-search.faculty.get.all',
                GET_ALL_BY_UNIVERSITY: 'v1.university-search.faculty.get.all.by.university',
                GET_ONE: 'v1.university-search.faculty.get.one',
                UPDATE: 'v1.university-search.faculty.update',
                DELETE: 'v1.university-search.faculty.delete',
            },
            Program: {
                CREATE: 'v1.university-search.program.create',
                GET_ALL: 'v1.university-search.program.get.all',
                GET_ALL_BY_UNIVERSITY: 'v1.university-search.program.get.all.by.university',
                GET_ALL_BY_FACULTY: 'v1.university-search.program.get.all.by.faculty',
                GET_ONE: 'v1.university-search.program.get.one',
                UPDATE: 'v1.university-search.program.update',
                DELETE: 'v1.university-search.program.delete',
            },
            CertificateRequirement: {
                CREATE: 'v1.university-search.certificate-requirement.create',
                GET_ALL: 'v1.university-search.certificate-requirement.get.all',
                GET_ONE: 'v1.university-search.certificate-requirement.get.one',
                UPDATE: 'v1.university-search.certificate-requirement.update',
                DELETE: 'v1.university-search.certificate-requirement.delete',
            },
        },
    },
    Story: {
        V1: {
            CREATE: 'v1.story.create',
            GET_ALL: 'v1.story.get.all',
            GET_ONE: 'v1.story.get.one',
            UPDATE: 'v1.story.update',
            DELETE: 'v1.story.delete',
        },
    },
    Faq: {
        V1: {
            CREATE: 'v1.faq.create',
            GET_ALL: 'v1.faq.get.all',
            GET_ONE: 'v1.faq.get.one',
            UPDATE: 'v1.faq.update',
            DELETE: 'v1.faq.delete',
        },
    },
    FaqCategory: {
        V1: {
            CREATE: 'v1.faq.category.create',
            GET_ALL: 'v1.faq.category.get.all',
            GET_ONE: 'v1.faq.category.get.one',
            UPDATE: 'v1.faq.category.update',
            DELETE: 'v1.faq.category.delete',
        },
    },
    News: {
        V1: {
            CREATE: 'v1.news.create',
            GET_ALL: 'v1.news.get.all',
            GET_ONE: 'v1.news.get.one',
            UPDATE: 'v1.news.update',
            DELETE: 'v1.news.delete',
        },
    },
    NewsCategory: {
        V1: {
            CREATE: 'v1.news.category.create',
            GET_ALL: 'v1.news.category.get.all',
            GET_ONE: 'v1.news.category.get.one',
            UPDATE: 'v1.news.category.update',
            DELETE: 'v1.news.category.delete',
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
            REGISTER_STUDENT: 'registerStudentForEvent',
            UNREGISTER_STUDENT: 'unregisterStudentFromEvent',
        },
    },
    Course: {
        V1: {
            CREATE: 'v1.course.create',
            GET_ALL: 'v1.course.get.all',
            GET_ONE: 'v1.course.get.one',
            UPDATE: 'v1.course.update',
            DELETE: 'v1.course.delete',
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
            GET_WITH_JOBS: 'v1.company.get.with.jobs',
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
    Shop: {
        V1: {
            Category: {
                CREATE: 'v1.shop.category.create',
                GET_ALL: 'v1.shop.category.get.all',
                GET_ONE: 'v1.shop.category.get.one',
                UPDATE: 'v1.shop.category.update',
                DELETE: 'v1.shop.category.delete',
            },
            Product: {
                CREATE: 'v1.shop.product.create',
                GET_ALL: 'v1.shop.product.get.all',
                GET_ONE: 'v1.shop.product.get.one',
                GET_BY_CATEGORY: 'v1.shop.product.get.by.category',
                UPDATE: 'v1.shop.product.update',
                DELETE: 'v1.shop.product.delete',
            },
            Order: {
                CREATE: 'v1.shop.order.create',
                GET_ALL: 'v1.shop.order.get.all',
                GET_ONE: 'v1.shop.order.get.one',
                GET_BY_STUDENT: 'v1.shop.order.get.by.student',
                UPDATE: 'v1.shop.order.update',
                DELETE: 'v1.shop.order.delete',
                UPDATE_STATUS: 'v1.shop.order.update.status',
            },
        },
    },
};

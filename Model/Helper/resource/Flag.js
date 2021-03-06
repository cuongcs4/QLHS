const flagClass = {
  DB: { UPDATE: 1, NEW: 2 },
  TYPE_USER: {
    STUDENT: 1,
    TEACHER: 2,
    HOMEROOM_TEACHER: 3,
    EMPLOYEE_TRAINING_DEPARTMENT: 4,
    ADMIN: 5,
  },
  STATUS_USER: {
    ENABLE: 1,
    DISABLE: 0,
  },
  STATUS: {
    ENABLE: 1,
    DISABLE: 0,
  },
  SCORE: {
    TYPE_1: 1,
    TYPE_2: 2,
    TYPE_3: 3,
    TYPE_4: 4,
    TYPE_5: 5,
  },
  CONDUCT: {
    TYPE_1: 1,
    TYPE_2: 2,
    TYPE_3: 3,
    TYPE_4: 4,
  },
  GENDER: {
    MALE: 1,
    FEMALE: 0,
  },
  DAY_IN_WEEK: {
    MON: 2,
    TUE: 3,
    WEB: 4,
    THU: 5,
    FRI: 6
  }
};

module.exports = flagClass;

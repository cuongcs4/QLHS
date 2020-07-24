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
};

module.exports = flagClass;

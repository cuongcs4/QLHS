//Sơ đồ lớp của TypeEmployee

const TypeEmployee = class {
  constructor(typeID, typeName) {
    this.typeID = typeID || null;
    this.typeName = typeName || null;
  }

  getTypeID() {}
  getTypeName() {}

  static find() {}

  static save() {}
};

module.exports = TypeEmployee;

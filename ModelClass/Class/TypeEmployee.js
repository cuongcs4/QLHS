//Sơ đồ lớp của TypeEmployee

const TypeEmployee = class {
  constructor(typeID, typeName) {
    this.typeID = typeID || null;
    this.typeName = typeName || null;
  }

  getTypeID() {
    return this.typeID;
  }
  getTypeName() {
    return this.typeName;
  }

  static find() {}

  static save() {}
};

module.exports = TypeEmployee;

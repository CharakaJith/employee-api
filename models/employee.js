'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employee.belongsTo(models.Admin, { foreignKey: 'empAdminId', as: 'admin' });
    }
  }
  Employee.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    empNo: { 
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    empName: { 
      type: DataTypes.STRING(100),
      allowNull: false
    },
    empAddressLine1: { 
      type: DataTypes.STRING(100),
      allowNull: false
    },
    empAddressLine2: { 
      type: DataTypes.STRING(100) 
    },
    empAddressLine3: { 
      type: DataTypes.STRING(100) 
    },
    empDateOfJoin: { 
      type: DataTypes.DATE,
      allowNull: false
    },
    empStatus: { 
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    empImage: { 
      type: DataTypes.TEXT,
      allowNull: false
    },
    empAdminId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employee'
  });
  return Employee;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define('Branch', {
    name: DataTypes.STRING,
    company_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  Branch.associate = function(models) {
    Branch.belongsTo(models.Company, {
    	foreignKey: 'company_id'
    });
  };
  return Branch;
};

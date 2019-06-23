'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  Company.associate = function(models) {
    Company.hasMany(models.Branch, {
    	foreignKey: 'company_id',
    	as: 'branches',
    });
  };
  return Company;
};

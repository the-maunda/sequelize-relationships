'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    // User relationship Definition.
    Role.belongsToMany(models.User, {
    	through: 'UserRole',
    	as: 'roles',
    	foreignKey: 'user_id',
    });
  };
  return Role;
};

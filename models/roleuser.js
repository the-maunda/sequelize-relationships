'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoleUser = sequelize.define('RoleUser', {
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {});
  RoleUser.associate = function(models) {
    // associations can be defined here
  };
  return RoleUser;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  
  //relationsships
  User.associate = function(models) {
  
   // PRofile relationship definition.	
    User.hasOne(models.Profile, {
    	foreignKey: 'user_id',
    	as: 'profile'
    });
    
    // Roles relationdship.
    User.belongsToMany(models.Role, {
    	through: 'UserRole',
    	as: 'roles',
    	foreignKey: 'user_id'
    });
  };
  return User;
};

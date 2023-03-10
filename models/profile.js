'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */


    get pronounName() {
      if (this.gender.toLowerCase() === "male") return `Mr. ${this.fullName}`
      if (this.gender.toLowerCase() === "female") return `Mrs. ${this.fullName}`
    }

    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }
  }
  Profile.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "full name is required"
        },
        notNull: {
          msg: "full name is required"
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "gender is required"
        },
        notNull: {
          msg: "gender is required"
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "phone is required"
        },
        notNull: {
          msg: "phone is required"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};
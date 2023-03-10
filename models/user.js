'use strict';
const {bcrypt} = require("../helpers");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.Course, { foreignKey: 'TeacherId', as: "TeacherCourses" });

      User.belongsToMany(models.Course, { foreignKey: 'StudentId', as: "StudentCourses", through: models.StudentCourse });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "email is required"
        },
        notNull: {
          msg: "email is required"
        },
        isEmail: {
          msg: "email is not valid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password is required"
        },
        notNull: {
          msg: "password is required"
        },
        isStrongPassword(value) {
          if (value.length < 8) {
            throw new Error("password must be 8 chars minimum")
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "role is required"
        },
        notNull: {
          msg: "role is required"
        },
        isValid(value) {
          if (value.toLowerCase() !== "student" && value.toLowerCase() !== "teacher") {
            throw new Error("role is not available")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  })
  
  return User;
};
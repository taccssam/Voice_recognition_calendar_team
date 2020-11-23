module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    //Mysal 에는 users 테이블 생성
    "User",
    {
      // id가 기본으로 들어있음
      email: {
        type: DataTypes.STRING(30), //STRING , TEXT ,  BOOLEAN , INTEGER , FLOAT , DATETIME
        allowNull: false, // 필수
        unique: true, //중복여부
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post); // User 와 Post 간의 1:다 관계
    db.User.hasMany(db.Goal);
  };
  return User;
};

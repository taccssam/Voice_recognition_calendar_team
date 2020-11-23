module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define(
    //Mysql 에는 posts 테이블 생성
    "Goal",
    {
      // id가 기본으로 들어있음
      goalTitle: {
        type: DataTypes.STRING,
        allowNull: false, //NOT NULL
      },
      startLine: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endLine: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      checkTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      checkDone: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글
    }
  );
  //관계들을 작성
  Goal.associate = (db) => {
    db.Goal.belongsTo(db.User);
  };
  return Goal;
};

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    //Mysal 에는 posts 테이블 생성
    "Post",
    {
      // id가 기본으로 들어있음
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      checked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글
    }
  );
  //관계들을 작성
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
  };
  return Post;
};

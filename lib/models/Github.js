module.exports = class GithubUser {
  id;
  username;
  email;
  avatar;

  constructor(rows) {
    this.id = rows.id;
    this.username = rows.username;
    this.email = rows.email;
    this.avatar = rows.avatar;
  }
};

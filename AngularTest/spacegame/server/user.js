class User {
  constructor(username, password, salt, token) {
    this.username = username;
    this.password = password;
    this.salt = salt;
    this.token = token;
  }
}

module.exports.User = User;

export class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
  }
  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.job = this._job.textContent;
    return userInfo;
  }
  setUserInfo(userName, userJob) {
    this._name.textContent = userName;
    this._job.textContent = userJob;
  }
}

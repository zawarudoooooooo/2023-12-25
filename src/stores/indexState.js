// import { defineStore } from "pinia";

// export default defineStore("indexState", {
//   // data
//   state: () => ({
//     foundUserInfo: JSON.parse(sessionStorage.getItem("foundUserInfo")) || null,
//   }),
//   // computed
//   getters: {},
//   // methods
//   actions: {
//     // 更新用户信息的 action
//     updateUserInfo(userInfo) {
//       this.foundUserInfo = userInfo;
//       sessionStorage.setItem("foundUserInfo", JSON.stringify(userInfo));
//     },
//     // 清除用户信息的 action
//     clearUserInfo() {
//       this.foundUserInfo = null;
//       sessionStorage.removeItem("foundUserInfo");
//     },
//   },
// });

// indexState.js
import { defineStore } from "pinia";

export default defineStore("indexState", {
  state: () => ({
    foundUserInfo: JSON.parse(sessionStorage.getItem("foundUserInfo")) || null,
  }),
  actions: {
    updateUserInfo(userInfo) {
      this.foundUserInfo = userInfo;
      sessionStorage.setItem("foundUserInfo", JSON.stringify(userInfo));
      this.$patch({ foundUserInfo: userInfo }); // 添加这行代码
    },
    clearUserInfo() {
      this.foundUserInfo = null;
      sessionStorage.removeItem("foundUserInfo");
    },
  },
});

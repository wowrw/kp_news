import { login, isLogin } from "@/api/user.js";
import { setToken, setUserInfo, removeToken, removeUserInfo } from "@/utils/auth.js";
const state = {
  user: {},
  isLogin: false,
};

const getters = {
  user: (state) => state.user,
  isLogin: (state) => state.isLogin,
};


const mutations = {
  logout(state) {
    state.isLogin = false;
    state.user = {};
    removeToken();
    removeUserInfo();
  },

  setUser(state, user) { //user={id,name}    
    state.user = user;
  },

  setIsLogin(state, isLogin) {
    state.isLogin = isLogin;
  },
};

const actions = {
  async login(context, user) {
    let result = await login(user);
    if (result.code === "0") {   //"0"
      let id = result.data.id;
      let name = result.data.nickname;
      let headImg = result.data.headImg;

      let token = result.msg;
      let user = { id, name, headImg };

      context.commit("setUser", user);
      context.commit("setIsLogin", true);

      setToken(token); // setToken(result.msg);
      setUserInfo(user);
    }
    return result;
  },

  async islogin(context) {
    let result = await isLogin();
    console.log(result);
    if (result.code === "0") {
      let id = result.data.id;
      let name = result.data.username;
      let headImg = result.data.headImg;
      let token = result.msg;
      let user = { id, name, headImg };

      context.commit("setUser", user);

      context.commit("setIsLogin", true);

      setToken(token); // setToken(result.msg);
      setUserInfo(user);

    }
    return result;
  },

  logout(context) {
    context.commit("logout");
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

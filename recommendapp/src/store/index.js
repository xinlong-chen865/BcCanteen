import Vue from 'vue'
import Vuex from 'vuex'
import canteen from './canteen'
import { GetChooseUserProfile } from '../api/main';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).id || '',
    isShowNewUserProfile: false,
  },
  mutations: {
    update(state, payload) {
      Object.assign(state, payload);
    },
  },
  actions: {
    // 如果是新用户，打出弹窗
    async handleUserProfile(context, playload) {
      if (context.state.userId) {
        try {
          const { data } = await GetChooseUserProfile({ userId: context.state.userId});
          if (data.data.isChoose) {
            context.commit('update', { isShowNewUserProfile: false });
          } else {
            context.commit('update', { isShowNewUserProfile: true });
          }
        } catch (error) {
          context.commit('update', { isShowNewUserProfile: false });
        }
      }
    }
  },
  modules: {
	  canteen
  }
})

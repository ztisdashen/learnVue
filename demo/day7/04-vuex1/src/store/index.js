import Vue from "vue";
import Vuex from 'vuex'
import {INCREMENT} from "../mutation-types";

const moduleA = {
  state: {
    name: "kobe"
  },
  mutations: {
    updateAName(state, payload) {
      state.name = payload
    }
  }, getters: {
    fullName(state) {
      return state.name + " king"
    }, fullName2(state, getter) {
      return getter.fullName + " ha ha"
    }, fullName3(state, getter, rootState) {
      return getter.fullName2 + rootState.info.name
    }
  },
  modules: {},
  actions: {
    aUpdate(context){
      console.log(context)
      setTimeout(()=>{
        context.commit('updateAName','异步')
      },1000)

    }
  }
};
// 安装vuex
Vue.use(Vuex);
// 创建Vuex对象
const store = new Vuex.Store({
  state: {
    counter: 1000,
    stus: [
      {name: 'A', age: 20},
      {name: 'B', age: 27},
      {name: 'C', age: 23},
    ], info: {name: "ztisdashen", age: 18}
  },
  mutations: {
    // 方法 存在默认参数state
    [INCREMENT](state) {
      state.counter++;
    }, decrement(state) {
      state.counter--;
    }, addCount(state, payload) {
      state.counter += payload.count
    }, updateInfo(state) {
      //state.info['address'] = "LA"; // 不是响应性的
      // Vue.set(state.info,'address','LA')  // 响应性的
      Vue.delete(state.info, "age")
    }
  },
  actions: {
    aUpdateInfo(context, payload) {
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('updateInfo');
          payload.success();
          payload.msg
          resolve("promise")
        }, 1000)
      })
      // setTimeout(()=>{
      //   context.commit('updateInfo');
      //   payload.success();
      //   payload.msg
      // },1000)
    }
  },
  getters: {
    dollar(state) {
      return state.counter + "$"
    }, more20stu(state) {
      return state.stus.filter(s => s.age > 20)
    }, more20StuLength(state, getters) {
      return getters.more20stu.length
    }, moreMyAge(state) {
      return function (age) {
        return state.stus.filter(s => s.age >= age)
      }
    }
  },
  modules: {
    moduleA: moduleA
  }
});

export default store

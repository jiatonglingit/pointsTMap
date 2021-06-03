import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: {},
    choiceTem: 'board1',
    isChoice: false, // 选择模板
    isBtn1: true, // 默认按钮
    tableList: [
      
    ], // 布局
    Addshow: {
      isShow: false,
      num: 0,
      type: 1,
      sequ: null
    }, // 统计添加数据
    changeAll: false,
    // 修改第几个组件
    amend: null,
    // 看板配置
    saveBoard: {
      id: '',
      name: '',
      type: '',
      layoutType: 0
    },
    mapList: []
  },
  mutations: {
    changeData (state, data) {
      state.data = data
    },
    changeTem (state, choiceTem) {
      state.choiceTem = choiceTem
    },
    changeChoice (state, isChoice) {
      state.isChoice = isChoice
    },
    changeBtn1 (state, isBtn1) {
      state.isBtn1 = isBtn1
    },
    changeTable (state, tableList) {
      state.tableList = tableList
    },
    changeAdd (state, Addshow) {
      state.Addshow = Addshow
    },
    changeAllDia (state, changeAll) {
      state.changeAll = changeAll
    },
    changeAmend (state, amend) {
      state.amend = amend
    },
    changeSave (state, saveBoard) {
      state.saveBoard = saveBoard
    },
    changeMap (state, mapList) {
      state.mapList = mapList
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    changeOne () {

    }
  }
})

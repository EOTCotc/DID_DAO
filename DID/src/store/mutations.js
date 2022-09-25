export default {
  changeStepNum: (state, stepNum) => { //注销账号的步骤
    state.stepNum = stepNum
  },
  changeBackNum: (state, backNum) => {//注销账号路由返回的级数
    state.backNum = backNum
  },
}
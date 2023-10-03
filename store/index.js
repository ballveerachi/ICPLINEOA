export const state = () =>({
  dialog:{
    isShow: false,
    title: '',
    message: ''
  },
  line:{
    pictureUrl: null,
    displayName: null,
    userId: null,
  },
  register: {
    user_id:'',
    full_name:'',
    firstname:'',
    lastname:'',
    emil: '',
    phone: '',
    birthday:new Date().toISOString().substr(0, 10),
        // member_id: '',
        // full_name: '',
        // email: '',
        // password: '',
        // status:'',
    // gender: 1
  },
    employee:{
      id:'',


    },
    member:{
      member_id:'',
    },
})

export const getters = {
  getRegister(state){
    return state.register
  },
  getDialog(state){
    return state.dialog
  },
  getLine(state){
    return state.line
  },
  getLineId(state){
    return state.line
  },
  myAuthenticate(state){
      return state.authenticate
  },
  getMember(state){
    return state.member
  },
  myName(state){
    return state.full_name
  },

}

export const mutations = {
  SET_REGISTER(state, data){
    state.register = {
      ...state.register,
      ...data
     }
    },
  SET_DIALOG(state, data){
    state.dialog ={
      ...state.dialog,
      ...data
      }
    },
    SET_LINE(state, data){
      state.line ={
        ...state.line,
        ...data
        }
    },
      SET_LINEID(state, data){
        state.line ={
          ...state.line,
          ...data
          }
    },
        setMember(state, data){
          state.member_id ={
            ...state.member,
            ...data
            }
      },
    }

export const actions = {
  setRegister({ commit},data){
    commit('SET_REGISTER',data)
  },
  setDialog({ commit},data){
    commit('SET_DIALOG',data)
  },
  setLine({ commit},data){
    commit('SET_LINE',data)
  },
  setLineId({ commit},data){
    commit('SET_LINEID',data)
  },
}

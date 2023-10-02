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
    id:'',
    member_id:'',
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
  myMember_id(state){
    return state.id
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
        setMyMember_id(state, data){
          state.id ={
            ...state.id,
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

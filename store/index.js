export const state = () =>({
  authenticate: false,
  member_id:"65454",
  full_name:"ดีครับ",
  status:"",

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
    return state.member_id
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
      setMyAuthenticate(state, authenticate){
        state.authenticate = authenticate
      },
      setMyMember_id(state, member_id){
        state.member_id = member_id
      },
      setMyName(state, full_name){
        state.full_name = full_name
      },
      setMyStatus(state, status){
        state.status = status
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

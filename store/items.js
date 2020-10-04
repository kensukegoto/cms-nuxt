export const state = () => {
  return {
    items: []
  }
}

export const getters = {
  articles: state => {
    return state.items
  }
}

export const actions = {
  setItems(vuexContext,items){
    vuexContext.commit("setItems",items)
  },
  updateItems(vuexContext,items){
    console.log(items)
    vuexContext.commit("setItems",items)
  }
}

export const mutations = {
  setItems(state,items){
    state.items = items
  }
}
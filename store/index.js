export const actions = {
  nuxtServerInit(vuexContext,context){

    return context.app.$axios
      .$get("/data/list.json")
      .then(items => {
        console.log(items)
        vuexContext.commit("items/setItems",items)
      })
      .catch(e => {
        context.error(e)
      })

  }, // nuxtServerInit
}
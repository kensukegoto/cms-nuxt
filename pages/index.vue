<template>
  <ul>
    <li 
      v-for="(item,key) of list"
      :key="key"
    >
      <nuxt-link :to="item.filename">{{ item.filename }}</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  asyncData(context) {

    return context.app.$axios
      .$get("/data/list.json")
      .then(res => {
        console.log(res)
        return {
          list: res
        }
      })
  }
}
</script>

<style lang="scss" scoped>
ul{
  display: flex;
}
li {
  width: calc(50% - 8px);
  height: 100px;
  background: lightcyan;
  margin-right: 16px;
  cursor: pointer;
  &:hover{
    background: cyan;
  }
  &:nth-child(2n){
    margin-right: 0;
  }

  a{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
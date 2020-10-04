<template>
  <div>
    <nuxt-link to="new" class="btnLink">新規記事作成</nuxt-link>
    <ul>
      <li 
        v-for="(item,key) of list"
        :key="key"
      >
        <nuxt-link :to="item.filename">{{ item.filename }}</nuxt-link>
      </li>
    </ul>
  </div>
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
  flex-wrap: wrap;
}
li {
  margin-top: 16px;
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

.btnLink{
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  opacity: .9;
  &:hover{
    opacity: 1;
  }
}

</style>
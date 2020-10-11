<template>
  <div class="toolbox">
    <a @click="doDelete()">削除</a>
  </div>
</template>

<script>
export default {
  methods:{
    doDelete(){
      this.$emit("doDelete");
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbox {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-left: none;
}
</style>
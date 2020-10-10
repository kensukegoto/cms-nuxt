<template>
  <ul class="header">
    <li>
      <p>タイトル</p>
      <p>
        <input 
          class="input" 
          type="text"
          @input="e => {doUpdate(e.target.value,'titile')}"
        ></p>
    </li>
    <li>
      <p>ディスクリプション</p>
      <p>
        <textarea 
          class="input"
          @input="e => {doUpdate(e.target.value,'description')}"
        ></textarea></p>
    </li>
  </ul>
</template>

<script>
export default {
  methods:{
    doUpdate(e,type){
      this.$emit("doUpdate",e,type)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  border: 1px solid #ccc;
}
</style>
<template>
  <div class="wrapper">
    <div class="handle"></div>
    <div class="editor">
      <div
        class="radio__box">
        <input 
          type="radio" 
          value="h2"
          @change="e => {changeRadio(e)}"
          :checked="item.type==='h2'">中
        <input 
          type="radio" 
          value="h3" 
          @change="e => {changeRadio(e)}"
          :checked="item.type==='h3'">小
      </div>
      <input 
        type="text"
        :class="item.type"
        :value="item.content"
        @input="e => {doUpdate(e.target.value)}"
      />
    </div>
    <ToolBox class="toolbox" @doDelete="doDelete" />
  </div> 
</template>

<script>
export default {
  props: [ "item" ],
  methods:{
    changeRadio(e){
      this.$emit("changeRadio",e.target.value);
    },
    doUpdate(e){
      this.$emit("doUpdate",e);
    },
    doDelete(){
      this.$emit("doDelete");
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  .handle{
    cursor: move;
    width: 32px;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .editor{
    width: calc(100% - 32px - 60px);
  }
  .toolbox {
    width: 60px;
  }
}

input[type="text"]{
  width: 100%;
  border: 1px solid #ccc;
  outline: none;
  padding: 16px;
  font-size: 24px;
  font-weight: bold;
}
input[type="text"].h3{
  font-size: 18px;
}
.radio__box {
  width: 100%;
  border: 1px solid #ccc;
  border-bottom: none;
  outline: none;
  padding: 8px 16px;
}
</style>
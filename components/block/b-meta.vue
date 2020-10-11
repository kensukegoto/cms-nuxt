<template>
  <ul class="header">
    <li>
      <p>タイトル</p>
      <p>
        <input 
          class="input" 
          type="text"
          :value="title || ''"
          @input="e => {doUpdate(e.target.value,'title')}"
        ></p>
    </li>
    <li>
      <p>ディスクリプション</p>
      <p>
        <textarea 
          class="input"
          :value="description || ''"
          @input="e => {doUpdate(e.target.value,'description')}"
        ></textarea></p>
    </li>
    <li>
      <p>サムネイル</p>
      <mImageArea
      type="thumbnail"
      :item="ogImage" 
      @doUpdateImage="e => {doUpdate(e,'ogImage')}"
      />
    </li>
  </ul>
</template>

<script>
import mImageArea from "~/components/module/m-imageArea"
export default {
  components:{
    mImageArea
  },
  props: ["title","description","ogImage"],
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
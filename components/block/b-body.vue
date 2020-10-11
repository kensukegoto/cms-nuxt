<template>
  <draggable 
    class="editor__body" 
    tag="ul" 
    ghost-class="draged"
    :list="data"
    :options="{handle: '.handle'}"
  >
    <li
      class="sec"
      v-for="(item,key) of data"
      :key="key"
    >
      <div class="sec__inner">
        <mTextArea
          v-if="item.type === 'text'"
          :content="item.content"
          @doUpdate="e => doUpdate(e,key)"
          @doDelete="() => doDelete(key)"
        />
        <mTitleArea
          v-if="/h2|h3/.test(item.type)"
          :item="item"
          @doUpdate="e => doUpdate(e,key)"
          @changeRadio="e => changeRadio(e,key)"
          @doDelete="() => doDelete(key)"
        />
        <mImageArea
          v-if="/img/.test(item.type)"
          :item="item"
          @doUpdateImage="e => doUpdateImage(e,key)"
          @doDelete="() => doDelete(key)"
        />

      </div>
    </li>
  </draggable>
</template>

<script>
import mImageArea from "~/components/module/m-imageArea"
import mTitleArea from "~/components/module/m-titleArea"
import mTextArea from "~/components/module/m-textArea"
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
    mImageArea,
    mTitleArea,
    mTextArea
  },
  props: ["data"],
  methods: {
    doUpdate(e,key){
      this.$emit("doUpdate",e,key);
    },
    doDelete(key){
      this.$emit("doDelete",key);
    },
    changeRadio(e,key){
      this.$emit("changeRadio",e,key)
    },
    doUpdateImage(e,key){
      this.$emit("doUpdateImage",e,key);
    }
  }
}
</script>

<style lang="scss" scoped>
.sec{
  margin-top: 2em;
}
.draged{
  opacity: .5;
}
</style>
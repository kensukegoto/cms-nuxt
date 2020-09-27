<template>
  <div id="app">
    <draggable class="editor__body" tag="ul" ghost-class="draged" :list="data">
      <li
        class="sec"
        v-for="(item,key) of data"
        :key="key"
      >
        <div class="sec__inner">
          <TextArea 
            v-if="item.type === 'text'"
            :content="item.content"
            @doUpdate="e => {doUpdate(e,key)}"
          />
          <TitleArea 
            v-if="/h2|h3/.test(item.type)"
            :item="item"
            @doUpdate="e => {doUpdate(e,key)}"
            @changeRadio="e => {changeRadio(e,key)}"
          />
          <ImageArea 
            v-if="/img/.test(item.type)"
            :item="item"
            @doUpdateImage="e => {doUpdateImage(e,key)}"
          />

        </div>
      </li>
    </draggable>
    <section id="tools" class="b-tools">
      <ul class="m-tools">
        <li class="item"><a class="btn btn--add-title" @click="addTitle">タイトル追加</a></li>
        <li class="item"><a class="btn btn--add-text" @click="addText">テキスト追加</a></li>
        <li class="item"><a class="btn btn--add-image" @click="addImage">画像追加</a></li>
        <li class="item"><a class="btn btn--save" @click="doSave">保存</a></li>
      </ul>
    </section>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import doSave from "~/assets/js/doSave";
import initData from "~/assets/js/initData"
import myData from "~/assets/js/data"
export default {

  components:{
    draggable
  },

  data: () => {

    const data = initData(myData);

    return {
      data
    }

  },
  methods:{
    doUpdate(value,index){
      this.data[index].content = value
    },
    doSave(){
      const data = doSave(this.data);
      console.log(data);

    },
    doUpdateImage(e,index){
      this.data[index].content = e.base64;
      // this.list[index].updated = e.file;
    },
    addText(){
      this.data = [...this.data,{ type: "text", content: "", update: "" }]
    },
    addTitle(){
      this.data = [...this.data,{ type: "h2", content: "", update: "" }]
    },
    addImage(){
      this.data = [...this.data,{ type: "img", content: "", update: "" }]
    },
    changeRadio(value,index){
      this.data[index].type = value
    }
  }
}
</script>

<style scoped>
.sec{
  margin-top: 2em;
}
.draged{
  opacity: .5;
}
</style>
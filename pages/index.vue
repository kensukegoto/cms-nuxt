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
        </div>
      </li>
    </draggable>
    <section id="tools" class="b-tools">
      <ul class="m-tools">
        <li class="item"><a class="btn btn--add-title" @click="addTitle">タイトル追加</a></li>
        <li class="item"><a class="btn btn--add-text" @click="addText">テキスト追加</a></li>
        <li class="item"><a class="btn btn--save" @click="doSave">保存</a></li>
      </ul>
    </section>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import doSave from "~/assets/js/doSave";
import initData from "~/assets/js/initData"
export default {

  components:{
    draggable
  },

  data: () => {

    const data = initData([
      {"block":0,"tag":"p","class":"","content":"中東における、金融や物流の中心地ドバイ。"},
      {"block":0,"tag":"p","class":"bgBlue","content":"上東における、金融や物流の中心地ドバイ。"},
      {"block":1,"tag":"h2","class":"","content":"「外国頼み」からの脱却 イスラエルがカギ握る？"},
    ]);

    return {
      data
    }

  },
  methods:{
    doUpdate(value,index){
      this.data[index].update = value
    },
    doSave(){
      const data = doSave(this.data);
      console.log(data);

    },
    addText(){
      this.data = [...this.data,{ type: "text", content: "", update: "" }]
    },
    addTitle(){
      this.data = [...this.data,{ type: "h2", content: "", update: "" }]
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
<template>
  <div id="app">
    <nuxt-link to="./" class="btnLink">一覧へ戻る</nuxt-link>
    <EditorHeader
      :title="title"
      :description="description"
      :ogImage="ogImage"
      @doUpdate="(e,type)=> {doUpdateMeta(e,type)}"
    />
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
          <TextArea 
            v-if="item.type === 'text'"
            :content="item.content"
            @doUpdate="e => {doUpdate(e,key)}"
            @doDelete="() => {doDelete(key)}"
          />
          <TitleArea 
            v-if="/h2|h3/.test(item.type)"
            :item="item"
            @doUpdate="e => {doUpdate(e,key)}"
            @changeRadio="e => {changeRadio(e,key)}"
            @doDelete="() => {doDelete(key)}"
          />
          <ImageArea 
            v-if="/img/.test(item.type)"
            :item="item"
            @doUpdateImage="e => {doUpdateImage(e,key)}"
            @doDelete="() => {doDelete(key)}"
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
    return {
      title: "",
      description: "",
      ogImage: {content:null,file:null},
      data: []
    }

  },
  methods:{
    doDelete(index){
      this.data.splice(index,1);
    },
    doUpdateMeta(value,key){

      if(key !== "ogImage"){
        this[key] = value;
        return;
      } 

      this[key].content =  value.base64;;
      this[key].file = value.file;
      
      // this.data[index].content = value
    },
    doUpdate(value,index){
      this.data[index].content = value
    },
    doUpdateCaption(value,index){
      this.data[index].content2 = value
    },
    async doSave(){

      const data = doSave({
        title: this.title,
        description: this.description,
        ogImage: this.ogImage,
        data: this.data,
        page : ""
      });

      for (let d of data.entries()) {
        console.log(`${d[0]}: ${d[1]}`);
      }
      
      const config = {　headers: {'content-type': 'multipart/form-data'}}
      const res = await this.$axios.$post("/update",data,config)
      this.data = initData(res.body.item.data);
      this.$store.dispatch("items/updateItems",res.body.list)
        .then(()=>{
          this.$router.push("./");
        })

    },
    doUpdateImage(e,index){
      this.data[index].content = e.base64;
      this.data[index].file = e.file;
    },
    addText(){
      this.data = [...this.data,{ type: "text", content: "", content2: "" }]
    },
    addTitle(){
      this.data = [...this.data,{ type: "h2", content: "", content2: "" }]
    },
    addImage(){
      this.data = [...this.data,{ type: "img", content: "", content2: "" }]
    },
    changeRadio(value,index){
      this.data[index].type = value
    }
  },
}
</script>

<style lang="scss" scoped>
.sec{
  margin-top: 2em;
}
.draged{
  opacity: .5;
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
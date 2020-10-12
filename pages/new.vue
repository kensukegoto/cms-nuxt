<template>
  <div id="app">
    <nuxt-link to="./" class="btnLink">一覧へ戻る</nuxt-link>

    <bMeta 
      :title="title"
      :description="description"
      :ogImage="ogImage"
      @doUpdate="(e,type)=> {doUpdateMeta(e,type)}"
    />

    <bBody 
      :data="data"
      @doUpdate="(e,key) => doUpdate(e,key)"
      @doUpdateImage="(e,key) => doUpdateImage(e,key)"
      @changeRadio="(e,key) => changeRadio(e,key)"
      @doDelete="key => doDelete(key)"
    />

    <bTools
      id="tools" 
      class="b-tools"
      @addTitle="addTitle"
      @addText="addText"
      @addImage="addImage"
      @doSave="doSave"
    />

  </div>

</template>

<script>
import bMeta from "~/components/block/b-meta"
import bTools from "~/components/block/b-tools"
import bBody from "~/components/block/b-body"
import doSave from "~/assets/js/doSave";
import initData from "~/assets/js/initData"
import myData from "~/assets/js/data"
export default {

  components:{
    bMeta,
    bTools,
    bBody
  },

  data: () => {
    return {
      title: "",
      description: "",
      ogImage: {content: "",file: null},
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
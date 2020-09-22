<template>
  <div id="app">
    <TextArea 
      v-for="(item,key) of data"
      :key="key"
      :content="item.content"
      :tag="item.tag"
      :className="item.class"
      @doUpdate="e => {doUpdate(e,key)}"
    />
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      data : [
        {"block":1,"tag":"p","class":"","content":"中東における、金融や物流の中心地ドバイ。"}
      ]
    }
  },
  methods:{
    doUpdate(e,index){
      console.log(e);
    } 
  }
}
</script>

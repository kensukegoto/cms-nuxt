<template>
  <div id="app">
    <nuxt-link to="./" class="btnLink">一覧へ戻る</nuxt-link>

    <bMeta 
      :title="title"
      :description="description"
      :ogImage="ogImage"
      @doUpdate="(val,type)=> call('doUpdateMeta',{val,type})"
    />

    <bBody 
      :data="data"
      @doUpdate="(val,key) => call('doUpdate',{val,key})"
      @doUpdateCaption="(val,key) => call('doUpdateCaption',{val,key})"
      @doUpdateImage="(val,key) => call('doUpdateImage',{val,key})"
      @changeRadio="(val,key) => call('changeRadio',{val,key})"
      @doDelete="key => call('doDelete',{key})"
    />

    <bTools
      id="tools" 
      class="b-tools"
      @addTitle="() => call('addTitle')"
      @addText="() => call('addText')"
      @addImage="() => call('addImage')"
      @doSave="() => call('doSave')"
    />
    
  </div>
</template>

<script>
import bMeta from "~/components/block/b-meta"
import bTools from "~/components/block/b-tools"
import bBody from "~/components/block/b-body"
import initData from "~/assets/js/initData"
import execute from "~/assets/js/methods";

export default {

  components:{
    bMeta,
    bTools,
    bBody
  },
  asyncData(context){
    const id = context.params.id;
    return context.app.$axios.$get(`/data/${id}.json`)
      .then(res => {
        return {
          filename: id,
          title: res.title,
          ogImage: {content: res.ogImage, file : null},
          description: res.description,
          data: initData(res.data)
        }
      })

  },
  methods:{
    call(method,arg){
      const page = this.filename;
      execute(method,arg,this,page)
    },
  }
}
</script>

<style lang="scss" scoped>
.sec{
  margin-top: 2em;
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
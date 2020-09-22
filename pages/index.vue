<template>
  <div id="app">
    <TextArea 
      v-for="(item,key) of data"
      :key="key"
      :content="item.content"
      @doUpdate="e => {doUpdate(e,key)}"
    />
    <section id="tools" class="b-tools">
      <ul class="m-tools">
        <li class="item"><a class="btn btn--add-title">タイトル追加</a></li>
        <li class="item"><a class="btn btn--add-text">テキスト追加</a></li>
        <li class="item"><a class="btn btn--save" @click="doSave">保存</a></li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {

  data: () => {

    const data = shapeData([
      {"block":0,"tag":"p","class":"","content":"中東における、金融や物流の中心地ドバイ。"},
      {"block":0,"tag":"p","class":"bgBlue","content":"上東における、金融や物流の中心地ドバイ。"},
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
      console.log(this.data);
    }
  }
}

function shapeData(data){

  let blocks = data.reduce((list,item,index)=> {
    if(item.tag === "p"){
      list[item.block] = !list[item.block] ? [] : list[item.block];
      list[item.block].push(item);
    } else {
      list[item.block] = item;
    }
    return list;
  },[]);

  blocks = blocks.reduce((list,block) => {
    let value = "";
    if(Array.isArray(block)){
      if(block){
        block.forEach(item => {
          value += `<${item.tag} class="${item.class}">${item.content}</${item.tag}>`;
        });
      }
    }

    list.push({ content: value, update: ""});
    return list;
  },[])

  return blocks;

}
</script>

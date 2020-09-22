<template>
  <div id="app">
    <section
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
        <template v-if="/h2|h3/.test(item.type)" >
          <div
            class="radio__box">
            <input 
              type="radio" 
              :name="`radio__${key}`" 
              value="h2"
              @change="e => {changeRadio(e,key)}"
              :checked="item.type==='h2'">中
            <input 
              type="radio" 
              :name="`radio__${key}`" 
              value="h3" 
              @change="e => {changeRadio(e,key)}"
              :checked="item.type==='h3'">小
          </div>
          <input 
            type="text"
            :class="item.type"
            :value="item.content"
            @input="e => {doUpdate(e.target.value,key)}"
          />
        </template>
      </div>
    </section>
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
export default {

  data: () => {

    const data = shapeData([
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

      const savedData = this.data
        .filter(item => {
          return item.update.trim() !== "";
        })
        .reduce((acc,content,block) => {

          const nodes = createHTML(content.update);

          if(nodes.length !== 0 ) {
            [...nodes].forEach(item => {
              acc.push({
                block,
                tag: item.tagName.toLowerCase(),
                class: item.className,
                content: item.innerHTML,
                // encode: escape(item.innerHTML)
              })
            })

            return acc;
          }

          acc.push({
            block,
            tag: content.type.toLowerCase(),
            class: "",
            content: content.update,
            // encode: escape(item.innerHTML)
          })

          return acc;


        },[]);

        console.log(savedData);

    },
    addText(){
      this.data = [...this.data,{ type: "text", content: "", update: "" }]
    },
    addTitle(){
      this.data = [...this.data,{ type: "h2", content: "", update: "" }]
    },
    changeRadio(e,index){
      this.data[index].type = e.target.value,index
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
    let type = "";

    if(Array.isArray(block)){
      if(block){
        type = "text";
        block.forEach(item => {
          value += `<${item.tag} class="${item.class}">${item.content}</${item.tag}>`;
        });
      }

    } else if (/h2|h3/.test(block.tag)){
      type = block.tag;
      value += `${block.content}`;
    }

    list.push({ type, content: value, update: value });
    return list;

  },[])

  return blocks;

}

function createHTML(str){
  const tempEl = document.createElement('div');
  tempEl.innerHTML = str;
  return tempEl.querySelectorAll(":scope > *");
}

</script>

<style scoped>
.sec{
  margin-top: 2em;
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
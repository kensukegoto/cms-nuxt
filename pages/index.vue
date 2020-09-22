<template>
  <div id="app">
    <TextArea 
      v-for="(item,key) of data"
      :key="key"
      :content="item"
      @doUpdate="e => {doUpdate(e,key)}"
    />
  </div>
</template>

<script>
export default {

  data: () => {

    const data = [
      {"block":0,"tag":"p","class":"","content":"中東における、金融や物流の中心地ドバイ。"},
      {"block":0,"tag":"p","class":"bgBlue","content":"上東における、金融や物流の中心地ドバイ。"},
    ];

    let items = data.reduce((list,item,index)=> {
      if(item.tag === "p"){
        list[item.block] = !list[item.block] ? [] : list[item.block];
        list[item.block].push(item);
      } else {
        list[item.block] = item;
      }
      return list
    },[]);

    const items2 = items.reduce((list,item) => {
      let value = "";
      if(Array.isArray(item)){
        if(item){
          item.forEach(p => {
            value += `<${p.tag} class="${p.class}">${p.content}</${p.tag}>`;
          });
        }
      }

      list.push(value);

      return list;
    },[])

    return {
      data : items2
    }
  },
  methods:{
    doUpdate(e,index){
      console.log(e);
    } 
  }
}
</script>

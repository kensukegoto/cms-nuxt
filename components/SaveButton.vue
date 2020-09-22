<template>
  <a class="btn btn--save" @click="doSave">保存</a>
</template>

<script>
export default {
  methods:{
    doSave(){
      this.$emit("doSave")
    }
  }
}
</script>
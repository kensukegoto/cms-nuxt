<template>
  <section id="tools" class="b-tools">
    <ul class="m-tools">
      <li class="item"><a class="btn btn--add-title" @click="e => this.$emit('addTitle')">タイトル追加</a></li>
      <li class="item"><a class="btn btn--add-text" @click="e => this.$emit('addText')">テキスト追加</a></li>
      <li class="item"><a class="btn btn--add-image" @click="e => this.$emit('addImage')">画像追加</a></li>
      <li class="item"><a class="btn btn--save" @click="e => this.$emit('doSave')">保存</a></li>
    </ul>
  </section>
</template>
<template>
  <div class="addDiscuss">
    <div class="w">
      <quill-editor
        v-model="newdiscuss"
        ref="myQuillEditor"
      >
      </quill-editor>
        <el-button type="success" @click="createDiscuss">提交评论</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newdiscuss:"",
    };
  },
  methods:{
    createDiscuss(){
      this.$emit("save",this.newdiscuss)
    }
  }
};
</script>
<style lang="scss">
.addDiscuss {
  width: 100%;
  padding: 5rem auto;
}
</style>
<template>
    <div class="editor">
        <div class="plugins-tips">
          Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
          访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
        </div>
        <quill-editor class="vue-editor" ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
      </div>
</template>

<script type="text/ecmascript-6">
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import { quillEditor } from 'vue-quill-editor';
  export default {
    name: 'editor',
    data: function () {
      return {
        content: '',
        editorOption: {
          placeholder: 'Hello World'
        }
      }
    },
    components: {
      quillEditor
    },
    methods: {
      onEditorChange({ editor, html, text }) {
        this.content = html;
      },
      submit(){
        console.log(this.content);
        this.$message.success('提交成功！');
      }
    }
  }
</script>
<style scoped>
.editor{
  border: 1px solid #ddd;
  border-radius: 5px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
 .editor-btn{
    margin-top: 50px;
  }
.plugins-tips{
  background: #eef1f6;
  padding: 20px 10px;
  margin-bottom: 20px;
}
  .vue-editor{
    height: 70% !important;
  }
</style>


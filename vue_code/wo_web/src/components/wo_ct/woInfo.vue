<template>
  <div class="createWo">
    <div class="w">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="工单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属项目">
          <el-select v-model="form.project.project_id" placeholder="请选择项目">
            <el-option label="项目1" value="1"></el-option>
            <el-option label="项目2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分配">
          <el-select
            v-model="form.coder_ids"
            multiple
            filterable
            placeholder="请选择coder"
          >
            <el-option
              v-for="item in options"
              :key="item.coder_id"
              :label="item.coder_name"
              :value="item.coder_id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="预计时间">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="完成时间">
        </el-form-item>
        <el-form-item>
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @focus="onEditorFocus($event)"
            @blur="onEditorBlur($event)"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newcreateWo">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <!-- <div class="d"></div> -->
</template>

<script>
import { newWo } from "@/api/wo";
export default {
  mounted() {
    this.editor = this.$refs.myQuillEditor.quill;
  },
  components: {},
  data() {
    return {
      content: null,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"]
          ]
        }
      },
      form: {
        name: "",
        project: {
          project_id: null,
          project_name: ""
        },
        coder_ids: [],
        date: "",

        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      options: [
        {
          coder_id: 1,
          coder_name: "黄金糕"
        },
        {
          coder_id: 2,
          coder_name: "双皮奶"
        },
        {
          coder_id: 3,
          coder_name: "蚵仔煎"
        },
        {
          coder_id: 4,
          coder_name: "龙须面"
        },
        {
          coder_id: 5,
          coder_name: "北京烤鸭"
        }
      ],
      value: ""
    };
  },

  beforeDestroy() {
    this.editor = null;
    delete this.editor;
  },
  methods: {
    // 准备富文本编辑器
    onEditorReady(editor) {},
    // 富文本编辑器 失去焦点事件
    onEditorBlur(editor) {},
    // 富文本编辑器 获得焦点事件
    onEditorFocus(editor) {},
    // 富文本编辑器 内容改变事件
    onEditorChange(editor) {},
    //新建表单
    newcreateWo() {
      console.log("submit!");
      let data = {
        title: this.form.name,
        creator_id: JSON.parse(sessionStorage.getItem("me")).id,
        detail: this.content,
        project_id: this.form.project.project_id,
        distributPeople: this.form.coder_ids
      };
      newWo(data)
        .then(res => {
          console.log(res);
          this.$notify.error({
            title: "操作成功",
            message: "新的工单已经完成创建"
          });
        })
        .catch(err => {
          console.log(err);
          this.$notify.error({
            title: "操作失败",
            message: "请重新操作或者联系管理员"
          });
        });
    }
  }
};
</script>

<style lang="scss">
.w {
  width: 80rem;
  margin: 2rem auto;
}
</style>
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
              v-for="item in coders"
              :key="item.id + 'coder'"
              :label="item.admin_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="预计完成时间">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
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
          <el-button type="primary" @click="newcreateWo">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <!-- <div class="d"></div> -->
</template>

<script>
import { newWo } from "@/api/wo";
import { getUserList } from "@/api/users";
export default {
  created() {
    this.getAllUser();
  },
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
      coders: [],
      value: ""
    };
  },

  beforeDestroy() {
    this.editor = null;
    delete this.editor;
  },
  methods: {
    //获取用户列表
    getAllUser() {
      getUserList()
        .then(res => {
          this.coders = res.data;
        })
        .catch(err => {
          this.$message.error("获取用户列表失败");
        });
    },
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
          this.$message({
            message: "操作成功，工单完成创建",
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
          this.$message.error("操作失败，工单创建失败");
        });
    }
  }
};
</script>

<style lang="scss">
.createWo {
  .w {
    width: 80rem;
    margin: 2rem auto;
  }
}
</style>
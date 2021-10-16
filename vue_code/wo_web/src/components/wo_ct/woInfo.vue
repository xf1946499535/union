<template>
  <div class="woInfo">
    <div class="w">
      <el-form
        ref="form"
        :model="woDetail"
        label-width="100px"
        v-loading="woInfo_loading"
      >
        <el-form-item label="当前状态">
          <el-steps
            :space="200"
            :active="woDetail.status"
            finish-status="success"
          >
            <el-step
              v-for="(item, index) in status_title"
              :key="'status' + index"
              :title="item"
            ></el-step>
          </el-steps>
        </el-form-item>
        <el-form-item label="表单处理" v-if="woDetail.status < 5">
          <el-button @click="handleWo(true)">{{
            status_submit_title[woDetail.status]
          }}</el-button>
          <el-button v-if="woDetail.status == 3" @click="handleWo(false)"
            >重新处理</el-button
          >
          <el-button v-if="woDetail.status == 4" @click="handleWo(false)">{{
            status_submit_title[woDetail.status + 1]
          }}</el-button>
        </el-form-item>
        <el-form-item label="工单名称">
          <el-input v-model="woDetail.title"></el-input>
        </el-form-item>
        <el-form-item label="所属项目">
          <el-select v-model="woDetail.project_id" placeholder="请选择项目">
            <el-option
              v-for="(item, index) in project_ops"
              :key="'pro' + index"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前处理人">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="isDistribute = !isDistribute"
          ></el-button>
          <span
            v-for="(item, index) in woDetail.handlers"
            :key="'hander' + index"
            ><span>{{ "    " }}</span>
            <el-link type="info">{{ item.handler_name }}</el-link>
          </span>
        </el-form-item>
        <el-form-item label="重新分配" v-if="isDistribute">
          <el-select
            v-model="NewHandlers_ids"
            multiple
            filterable
            placeholder="请选择coder"
          >
            <el-option
              v-for="item in hander_options"
              :key="item.coder_id"
              :label="item.admin_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预计时间">
          <el-date-picker
            v-model="woDetail.estimate_time"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="完成时间">{{
          woDetail.over_time ? woDetail.over_time : "暂未完成"
        }}</el-form-item>
        <el-form-item>
          <quill-editor
            v-model="woDetail.detail"
            ref="myQuillEditor"
            :options="editorOption"
            @focus="onEditorFocus($event)"
            @blur="onEditorBlur($event)"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateWo">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { updateWo, woStep, woList } from "@/api/wo";
import { getUserList } from "@/api/users";
import { allProject } from "@/api/project";
export default {
  components: {
    addDiscuss: () => import("@/components/addDiscuss")
  },
  props: ["wo_id"],

  created() {
    this.woInfo();
    this.getHandlers();
    this.getProjectList();
  },
  mounted() {
    this.editor = this.$refs.myQuillEditor.quill;
  },
  updated(){
    this.woInfo();
  },
  components: {},
  data() {
    return {
      editor: "",
      woDetail: {}, //工单详情
      NewHandlers_ids: [], //重新分配后的处理人id数组
      //status对照 0:未分配  1:待处理  2:正在处理 3:待验证 4:正在验证 5:已完成
      status_title: [
        "未分配",
        "待处理",
        "正在处理",
        "待验证",
        "正在验证",
        "已完成"
      ],
      status_submit_title: [
        "分配",
        "开始处理",
        "提交处理",
        "开始验证",
        "验证通过",
        "验证不通过"
      ],
      isDistribute: false,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"]
          ]
        }
      },
      hander_options: [],
      value: "",
      project_ops: [],
      woInfo_loading: false
    };
  },

  beforeDestroy() {
    this.editor = null;
    delete this.editor;
  },
  methods: {
    //获取项目详情
    woInfo() {
      woList({ id: this.wo_id }).then(res => {
        this.woDetail = res.data[0];
        //  console.log(this.woDetail.project_info.id);
        //  console.log(this.woDetail);
        this.woDetail.handlers.forEach((item, index) => {
          this.NewHandlers_ids[index] = item.handler_id;
        });
      });
    },
    //获取项目列表
    getProjectList() {
      allProject({})
        .then(res => {
          this.project_ops = res.data;
        })
        .catch(err => {
          this.$message.error("获取项目列表失败");
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
    //保存当前表单
    updateWo() {
      if (
        this.NewHandlers_ids.indexOf(
          JSON.parse(sessionStorage.getItem("me")).id
        ) < 0 &&
        JSON.parse(sessionStorage.getItem("me")).id != this.woDetail.creator_id
      ) {
        this.$message.error("您无权更改此工单");
        return false;
      }
      let data = {
        id: this.woDetail.id,
        title: this.woDetail.title,
        detail: this.woDetail.detail,
        distributPeople: this.NewHandlers_ids,
        handler_id: JSON.parse(sessionStorage.getItem("me")).id
      };
      this.woInfo_loading = true;
      updateWo(data)
        .then(res => {
          this.$message({
            message: "更新成功",
            type: "success"
          });
          setTimeout(() => {
            this.woInfo();
            this.woInfo_loading = false;
          }, 500);
        })
        .catch(err => {
          this.$message.error("更新失败");
        });
    },
    //获取用户列表
    getHandlers() {
      getUserList()
        .then(res => {
          this.hander_options = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //表单处理
    handleWo(flag) {
      this.woInfo_loading = true;
      switch (this.woDetail.status) {
        case 0:
          if ((this.woDetail.handlers_ids.length = 0)) {
            this.$message.error("请添加处理人");
            return false;
          }
          break;
        default:
          break;
      }
      const data = {
        id: this.woDetail.id,
        admin_id: JSON.parse(sessionStorage.getItem("me")).id,
        status: this.woDetail.status,
        flag: flag
      };

      woStep(data)
        .then(res => {
          setTimeout(() => {
            this.woDetail.status = res.data.code;
            this.woInfo_loading = false;
          }, 500);
        })
        .catch(err => {
          this.$message.error("处理失败");
        });
    }
  }
};
</script>

<style lang="scss">
.woInfo {
  .w {
    width: 80rem;
    margin: 2rem auto;
  }
}
</style>
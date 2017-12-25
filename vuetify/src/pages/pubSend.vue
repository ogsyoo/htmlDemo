<template>
    <v-layout>
      <div class="cig-content">
         <!--面包屑导航-->
            <v-breadcrumbs divider=">">
                <v-breadcrumbs-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.text" :disabled="breadcrumb.disabled" :href="breadcrumb.href">{{ breadcrumb.text }}</v-breadcrumbs-item>
            </v-breadcrumbs>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field label="Producer ID" v-model="producerId" :rules="producerIdRules" :counter="30" required></v-text-field>
              <v-text-field label="topic" v-model="topic" :rules="nameRules" :counter="30" required></v-text-field>
              <!-- <v-text-field label="Key" v-model="key" :rules="nameRules" :counter="30" required></v-text-field> -->
              <v-text-field label="Tag" v-model="tag" :rules="nameRules" :counter="30" required></v-text-field>
              <v-text-field label="备注" v-model="remarks"></v-text-field>
              <v-btn @click="clear">重置</v-btn>
              <v-btn @click="submit" class="primary">确定</v-btn>
            </v-form>
      </div>
      <!-- 弹框 -->
      <div>
        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">提示</v-card-title>
                <v-card-text align="center">{{returnMsg}}</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </div>
    </v-layout>
</template>

<script>
import config from "../index/components/config";
import store from "../index/store";
export default {
  data: () => ({
    editor: "zhoulimin@spacesystech.com",
    // 面包屑导航
    breadcrumbs: [
      {
        text: "发布管理",
        disabled: false,
        href: "./Index.html#/publish"
      },
      {
        text: "发布",
        disabled: true
      }
    ],
    // 表单
    producerId: "",
    key: "",
    tag: "",
    topic: "",
    valid: false,
    nameRules: [v => !!v || "必填项", v => v.length <= 30 || "长度不超过30"],
    remarks: "",
    producerIdRules: [
      v => !!v || "必填项",
      v => /(^PID_.*?$)/.test(v) || "Producer ID 必须以PID_开头命名"
    ],
    dialog: false,
    returnMsg: ""
  }),
  computed: {},
  mounted: function() {},
  watch: {},
  methods: {
    // 页面重定向
    rediret() {
      this.dialog = true;
      setTimeout(() => {
        this.dialog = false;
        window.location.assign("#/publish");
      }, 1000);
    },
    submit() {
      if (
        this.producerId &&
        this.topic &&
        this.tag &&
        /(^PID_.*?$)/.test(this.producerId)
      ) {
        var url = config.cigRestUrl + "/rest/tablesAccess/publish";
        store.progress.commit("start", url);
        this.$http
          .post(url, [
            {
              PRODUCERID: this.producerId,
              TOCPIC_ID: this.topic,
              TAG: this.tag,
              REMARK: this.remarks
            }
          ])
          .then(response => {
            store.progress.commit("finish", url);
            if (response.data.success > 0) {
              this.returnMsg = "发布成功";
            } else {
              this.returnMsg = "发布失败";
            }
            this.rediret();
          })
          .catch(response => {
            store.progress.commit("fail", url);
            this.returnMsg = "发布失败";
            this.rediret();
          });
      }
    },
    clear() {
      (this.producerId = ""),
        (this.topic = ""),
        (this.key = ""),
        (this.tag = ""),
        (this.remarks = "");
    }
  }
};
</script>
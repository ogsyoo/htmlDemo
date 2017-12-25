<template>
    <v-layout>
        <div class="cig-content">
            <!--面包屑导航-->
            <v-breadcrumbs divider=">">
                <v-breadcrumbs-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.text" :disabled="breadcrumb.disabled" :href="breadcrumb.href">{{ breadcrumb.text }}</v-breadcrumbs-item>
            </v-breadcrumbs>
            <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field v-model="topic" disabled></v-text-field>
                <v-text-field label="Producer ID" v-model="producerId" :rules="producerIdRules" required></v-text-field>
                <v-spacer></v-spacer>
                <v-btn @click="clear">重置</v-btn>
                <v-btn @click="submit" class="primary">确定</v-btn>
            </v-form>
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
        </div>
    </v-layout>
</template>
<script>
import config from "../index/components/config";
import store from "../index/store";

//获取url中的参数
function getUrlParam(name) {
  var after = window.location.hash.split("?")[1];
  if (after) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = after.match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else {
      return null;
    }
  }
}

export default {
  data: function() {
    return {
      editor: "zhoulimin@spacesystech.com",
      // 面包屑导航
      breadcrumbs: [
        {
          text: "topic管理",
          disabled: false,
          href: "#/topic"
        },
        {
          text: "申请发布",
          disabled: true
        }
      ],
      // 表单
      valid: false,
      topic: "",
      producerId: "",
      producerIdRules: [
        v => !!v || "必填项",
        v => /(^PID_)/.test(v) || "Producer ID 必须以PID_开头命名"
      ],
      dialog: false,
      returnMsg: ""
    };
  },
  mounted: function() {
    // 加载信息
    this.topicMessage();
  },
  watch: {},
  methods: {
    rediret() {
      this.dialog = true;
      setTimeout(() => {
        this.dialog = false;
        window.location.href = "#/publish";
      }, 1000);
    },
    topicMessage: function() {
      this.topic = getUrlParam("name");
    },
    submit() {
      var url = config.cigRestUrl + "/rest/tablesAccess/publish";
      store.progress.commit("start", url);
      this.$http
        .post(url, [
          {
            PRODUCERID: this.producerId
          }
        ])
        .then(response => {
          store.progress.commit("finish", url);
          if (response.data.success > 0) {
            this.returnMsg = "申请发布成功";
          } else {
            this.returnMsg = "申请发布失败";
          }
          this.rediret();
        })
        .catch(function(response) {
          store.progress.commit("fail");
          this.returnMsg = "申请发布失败";
          this.rediret();
        });
    },
    clear() {
      this.producerId = "";
    }
  }
};
</script>

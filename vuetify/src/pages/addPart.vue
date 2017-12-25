<template>
    <v-layout>
        <div class="cig-content">
            <!--面包屑导航-->
            <v-breadcrumbs divider=">">
                <v-breadcrumbs-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.text" :disabled="breadcrumb.disabled" :href="breadcrumb.href">{{ breadcrumb.text }}</v-breadcrumbs-item>
            </v-breadcrumbs>
            <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field label="分组名称" v-model="name" :rules="nameRules" :counter="30" required></v-text-field>
                <v-spacer></v-spacer>
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
  data: function() {
    return {
      sheet: false,
      tiles: [
        { img: "keep.png", title: "Keep" },
        { img: "inbox.png", title: "Inbox" },
        { img: "hangouts.png", title: "Hangouts" },
        { img: "messenger.png", title: "Messenger" },
        { img: "google.png", title: "Google+" }
      ],

      editor: "zhoulimin@spacesystech.com",
      // 面包屑导航
      breadcrumbs: [
        {
          text: "分区管理",
          disabled: false,
          href: "#/partition"
        },
        {
          text: "新增",
          disabled: true
        }
      ],
      // 表单
      valid: false,
      name: "",
      nameRules: [v => !!v || "必填项", v => v.length <= 30 || "长度不超过30"],
      dialog: false,
      returnMsg: ""
    };
  },
  mounted: function() {
    // 加载信息
    this.name = this.$route.query.name;
    if (this.$route.query.type == 1) this.breadcrumbs[1].text = "修改";
  },
  watch: {},
  methods: {
    rediret() {
      this.dialog = true;
      setTimeout(() => {
        this.dialog = false;
        window.location.assign("#/partition");
      }, 1000);
    },
    submit() {
      let url = config.cigRestUrl + "/rest/tablesAccess/partition";
      //修改
      if (this.$route.query.type == 1 && this.name) {
        store.progress.commit("start", url);
        this.$http
          .put(url, [
            {
              ID: this.$route.query.id,
              PARTITION: this.name
            }
          ])
          .then(response => {
            store.progress.commit("finish", url);
            if (response.data.success > 0) {
              this.returnMsg = "修改成功";
            } else {
              this.returnMsg = "修改失败";
            }
            this.rediret();
          })
          .catch(response => {
            store.progress.commit("fail", url);
            this.returnMsg = "添加失败";
            this.rediret();
          });
      } else {
        //新增
        if (this.name) {
          store.progress.commit("start", url);
          this.$http
            .post(url, [{ PARTITION: this.name }])
            .then(response => {
              store.progress.commit("finish", url);
              if (response.data.success > 0) {
                this.returnMsg = "添加成功";
              } else {
                this.returnMsg = "添加失败";
              }
              this.rediret();
            })
            .catch(response => {
              store.progress.commit("fail", url);
              this.returnMsg = "添加失败";
              this.rediret();
            });
        }
      }
    },
    clear() {
      this.name = "";
    }
  }
};
</script>

<template>
  <v-layout>
    <div class="cig-content">
      <!--面包屑导航-->
      <v-breadcrumbs divider=">">
        <v-breadcrumbs-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.text" :disabled="breadcrumb.disabled" :href="breadcrumb.href">{{ breadcrumb.text }}</v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field label="IP 名称" v-model="ip" :rules="nameRules" required></v-text-field>
        <v-select label="所属分组" v-model="groupName" :items="pitmes" item-text="groupitmesName" item-value="groupitmesId" :rules="[v => !!v || '必填项']" required></v-select>
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
      editor: "zhoulimin@spacesystech.com",
      // 面包屑导航
      breadcrumbs: [
        {
          text: "客户端管理",
          disabled: false,
          href: "#/client"
        },
        {
          text: "新增",
          disabled: true
        }
      ],
      // 表单
      valid: false,
      ip: "",
      groupName: "",
      groupitems: [],
      pitmes: [],
      nameRules: [v => !!v || "必填项"],
      dialog: false,
      returnMsg: ""
    };
  },
  mounted: function() {
    // 加载信息
    if (this.$route.query.type == 1) {
      this.id = this.$route.query.id;
      this.ip = this.$route.query.ip;
      this.groupName = this.$route.query.groupName;
      this.breadcrumbs[1].text = "修改";
    }
    // 加载分组
    this.getClient();
  },
  watch: {},
  methods: {
    rediret() {
      this.dialog = true;
      setTimeout(() => {
        this.dialog = false;
        window.location.href = "#/client";
      }, 1000);
    },
    getClient: function() {
      var url = config.cigbackendUrl + "/messageList/getGroup";
      store.progress.commit("start", url);
      this.$http
        .get(url)
        .then(response => {
          this.$set(this, "groupitems", response.data.data.rows);
          for (var i = 0; i < this.groupitems.length; i++) {
            var par = {
              groupitmesName: this.groupitems[i].groupName,
              groupitmesId: this.groupitems[i].id
            };
            this.pitmes.push(par);
          }
          store.progress.commit("finish", url);
        })
        .catch(function(response) {
          console.log(response);
          store.progress.commit("fail");
        });
    },
    submit() {
      if (this.ip && this.groupName) {
        // 新增
        if (this.$route.query.type == 0) {
          var url = config.cigRestUrl + "/rest/tablesAccess/client";
          store.progress.commit("start", url);
          this.$http
            .post(url, [
              {
                IP: this.ip,
                G_ID: this.groupName
              }
            ])
            .then(response => {
              store.progress.commit("finish", url);
              if (response.data.success > 0) {
                this.returnMsg = "添加成功";
              } else {
                this.returnMsg = "添加失败";
              }
              this.rediret();
            })
            .catch(function(response) {
              store.progress.commit("fail");
              this.returnMsg = "添加失败";
              this.rediret();
            });
        } else {
          // 修改
          var url = config.cigRestUrl + "/rest/tablesAccess/client";
          store.progress.commit("start", url);
          this.$http
            .put(url, [
              {
                ID: this.id,
                IP: this.ip,
                G_ID: this.groupName
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
            .catch(function(response) {
              store.progress.commit("fail");
              this.returnMsg = "添加失败";
              this.rediret();
            });
        }
      }
    },
    clear() {
      this.ip = "";
      this.groupName = "";
    }
  }
};
</script>

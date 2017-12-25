<template>
  <v-layout>
    <div class="cig-content">
      <!--面包屑导航-->
      <v-breadcrumbs divider=">">
        <v-breadcrumbs-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.text" :disabled="breadcrumb.disabled" :href="breadcrumb.href">{{ breadcrumb.text }}</v-breadcrumbs-item>
      </v-breadcrumbs>
      <!--表格-->
      <v-card>
        <v-card-title>
          <v-text-field append-icon="search" label="搜索" single-line hide-details v-model="search" style="padding-left:0;margin-left:10px;"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="addTopic">新增</v-btn>
        </v-card-title>
        <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search">
          <template slot='items' slot-scope='props'>
            <td class='text-xs-center' style="color:#000 !important;">{{ props.item.name }}</td>
            <td class='text-xs-center'>{{ props.item.type}}</td>
            <td class='text-xs-center'>{{ props.item.partition}}</td>
            <td class='text-xs-center'>{{ props.item.serviceStatus}}</td>
            <td class='text-xs-center'>{{ props.item.permission}}</td>
            <td class='text-xs-center'>{{ props.item.createdate}}</td>
            <td class='text-xs-center'>
              <div>
                <a @click="topicPublish(props.item.name)">申请发布</a>&nbsp;&nbsp;&nbsp;
                <a @click="topicSubscribe(props.item.name)">申请订阅</a>
                <!--删除弹窗-->
                <v-dialog v-model="dialog" persistent max-width="700px">
                  <a @click="removeDialog(props.item.id)" slot="activator">&nbsp;&nbsp;&nbsp;删除</a>
                  <v-card>
                    <v-card-title>
                      <span class="headline">提示</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          信息删除后将不再在列表中显示，是否确定删除
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat @click.native="dialog = false">关闭</v-btn>
                      <v-btn class="primary" @click="remove">确定</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </v-card>
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
      dialog: false,
      // 面包屑导航
      breadcrumbs: [
        {
          text: "topic管理",
          disabled: true
        }
      ],
      // 表格
      tmp: "",
      search: "",
      headers: [
        { text: "topic", value: "name", align: "center", color: "dark", sortable: false },
        { text: "类型", value: "type", align: "center", sortable: false },
        { text: "分区", value: "partition ", align: "center", sortable: false },
        { text: "服务状态", value: "serviceStatus", align: "center", sortable: false },
        { text: "权限", value: "permission", align: "center", sortable: false },
        { text: "创建时间", value: "createdate", align: "center", sortable: false },
        { text: "操作", align: "center", sortable: false }
      ],
      items: [],
      // 删除弹窗
      removevaule: ""
    };
  },
  mounted: function() {
    // 加载信息
    this.init();
  },
  watch: {},
  methods: {
    init: function() {
      var url = config.cigbackendUrl + "/messageList/getTopic";
      store.progress.commit('start', url);
      this.$http.get(url)
        .then((response) => {
          this.$set(this, "items", response.data.data.rows);
          store.progress.commit('finish', url);
        })
        .catch(function(response) {
          console.log(response);
          store.progress.commit("fail");
        });
    },
    // 点击发布
    addTopic: function() {
      window.location.href = "#/addTopic";
    },
    // 点击申请发布
    topicPublish: function(name) {
      window.location.href = "#/topicPublish?name=" + name
    },
    // 点击申请订阅
    topicSubscribe: function(name) {
      window.location.href = "#/topicSubscribe?name=" + name
    },
    removeDialog: function(id) {
      this.removevaule = id;
    },
    // 删除
    remove: function() {
      var url = config.cigRestUrl + "/rest/tablesAccess/topic/" + this.removevaule;
      store.progress.commit('start', url);
      this.$http.delete(url)
        .then((response) => {
          // 关闭弹窗
          this.dialog=false;
          store.progress.commit('finish', url);
          this.init();
        })
        .catch(function(response) {
          console.log(response);
          store.progress.commit('fail');
        })
    },
  }
};
</script>

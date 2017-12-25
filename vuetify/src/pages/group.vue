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
          <v-btn class="primary" @click="add">新增</v-btn>
        </v-card-title>
        <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search">
          <template slot='items' slot-scope='props'>
            <td class='text-xs-center' style="color:#000 !important;">{{ props.item.groupName }}</td>
            <td class='text-xs-center'>
              <div>
                <a @click="update(props.item.groupName,props.item.id)">修改</a>&nbsp;&nbsp;&nbsp;
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
import store from '../index/store'

export default {
  components: {},
  data: function() {
    return {
      editor: "zhoulimin@spacesystech.com",
      // 面包屑导航
      breadcrumbs: [
        {
          text: "客户端分组",
          disabled: true
        }
      ],
      // 表格
      tmp: "",
      search: "",
      headers: [
        {
          text: "分组名称",
          value: "groupName",
          align: "center",
          sortable: false,
          color: "dark"
        },
        {
          text: "操作",
          value: "operate",
          align: "center",
          sortable: false
        }
      ],
      items: [],
      groupName: "",
      // 删除弹窗
      removevaule: '',
      dialog: false
    };
  },
  mounted: function() {
    // 加载信息
    this.init();
  },
  methods: {
    init: function() {
      var url = config.cigbackendUrl + "/messageList/getGroup";
      store.progress.commit('start', url);
      this.$http.get(url)
        .then((response) => {
          this.$set(this, "items", response.data.data.rows);
          store.progress.commit('finish', url);
        })
        .catch(function(response) {
          console.log(response);
          store.progress.commit('fail');
        })
    },
    // 新增
    add: function() {
      window.location.href = "#/addGroup?type=0";
    },
    // 修改
    update: function(sendName,id) {
      this.$router.push({
        path: "/addGroup",
        query: {
          groupName: sendName,
          id: id,
          type: 1
        }
      });
    },
    removeDialog: function(id) {
      this.removevaule = id;
    },
    // 删除
    remove: function() {
      var url = config.cigRestUrl + "/rest/tablesAccess/group/" + this.removevaule;
      store.progress.commit('start', url);
      this.$http.delete(url)
        .then((response) => {
          // 关闭弹窗
          this.dialog = false;
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

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
          <v-btn class="primary" @click="pubSend">发布</v-btn>
        </v-card-title>
        <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search" >
        <template slot='items' slot-scope='props'>
          <td class='text-xs-center' style="color:#000 !important;">{{ props.item.producerid }}</td>
          <td class='text-xs-center'>{{ props.item.tocpicId}}</td>
          <td class='text-xs-center'>{{ props.item.state}}</td>
          <td class='text-xs-center'>{{ props.item.createdate}}</td>
            <td class='text-xs-center'>
              <div>
                <a @click="pubSend">发送</a>&nbsp;&nbsp;&nbsp;
                 <!--删除弹窗-->
                  <v-dialog v-model="dialog" persistent max-width="700px">
                    <a @click="removev(props.item.id)" slot="activator">&nbsp;&nbsp;&nbsp;删除</a>
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
  components: {},
  data: function() {
    return {
      editor: "zhoulimin@spacesystech.com",
      dialog: false,
      // 面包屑导航
      breadcrumbs: [
        {
          text: "发布管理",
          disabled: true
        }
      ],
      // 表格
      tmp: "",
      search: "",
      headers: [
        {
          text: "ProducerId",
          value: "producerId",
          align: "center",
          sortable: false,
          color: "dark"
        },
        { text: "topic", value: "topic", align: "center", sortable: false },
        { text: "服务状态", value: "service", align: "center", sortable: false },
        { text: "创建时间", value: "time", align: "center", sortable: false },
        { text: "操作", value: "caozuo", align: "center", sortable: false }
      ],
      items: []
    };
  },
  mounted: function() {
    //加载
    this.init();
  },
  watch: {},
  methods: {
    init: function() {
      var url = config.cigbackendUrl + "/messageList/getPublish";
      store.progress.commit("start", url);
      this.$http
        .get(url)
        .then(response => {
          this.$set(this, "items", response.data.data.rows);
          store.progress.commit("finish", url);
        })
        .catch(function(response) {
          console.log(response);
          store.progress.commit("fail");
        });
    },

    // 点击发布
    pubSend: function() {
      window.location.href = "#/pubSend";
    },
    removev: function(id) {
      this.removevaule = id;
    },
    //删除
    remove: function() {
      var url = config.cigRestUrl+"/rest/tables/publish/" + this.removevaule;
      store.progress.commit("start", url);
      this.$http
        .delete(url)
        .then(response => {
          this.dialog = false;
          this.init();
          store.progress.commit("finish", url);
        })
        .catch(function(response) {
          console.log(response);
          store.progress.commit("fail", url);
        });
    }
  }
};
</script>

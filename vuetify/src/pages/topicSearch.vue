<template>
  <v-layout>
    <div class="cig-content">
      <!--面包屑导航-->
      <v-breadcrumbs divider=">">
        <v-breadcrumbs-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.text" :disabled="breadcrumb.disabled" :href="breadcrumb.href">{{ breadcrumb.text }}</v-breadcrumbs-item>
      </v-breadcrumbs>
      <!--表格-->
      <v-card>
         <!--日期搜索-->
        <v-layout row wrap>
          <v-flex xs5 sm5>
            <v-menu lazy :close-on-content-click="false" v-model="startMenu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
              <v-text-field slot="activator" label="开始日期" v-model="startDate" prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="startDate" no-title scrollable actions>
                <template slot-scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat class="primary" @click="cancel">Cancel</v-btn>
                    <v-btn flat class="primary" @click="save">OK</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs5 sm5>
            <v-menu lazy :close-on-content-click="false" v-model="endMenu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
              <v-text-field slot="activator" label="结束日期" v-model="endDate" prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="endDate" no-title scrollable actions>
                <template slot-scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat class="primary" @click="cancel">Cancel</v-btn>
                    <v-btn flat class="primary" @click="save">OK</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-spacer></v-spacer>
        <v-btn class="primary" @click="keysearch">搜索</v-btn>
        </v-layout>
        <!-- 表格 -->
        <v-card-title>
          <v-text-field append-icon="search" label="搜索" single-line hide-details v-model="search" style="padding-left:0;margin-left:10px;"></v-text-field>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search" >
          <template slot='items' slot-scope='props'>
            <td class='text-xs-center' style="color:#000 !important;">{{ props.item.messageid}}</td>
            <td class='text-xs-center'>{{ props.item.tag}}</td>
            <td class='text-xs-center'>{{ props.item.storetime}}</td>
            <td class='text-xs-center'>
              <div>
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
  components: {
    // 'cig-select': selectpicker,
  },
  data: function() {
    return {
      editor: "zhoulimin@spacesystech.com",
      dialog: false,
      // 面包屑导航
      breadcrumbs: [
        {
          text: "topic查询",
          disabled: true
        }
      ],
      // 日期
      startDate: null,
      endDate: null,
      startMenu: false,
      endMenu: false,
      // 表格
      tmp: "",
      search: "",
      headers: [
        {
          text: "Message ID",
          value: "messageId",
          align: "center",
          sortable: false,
          color: "dark"
        },
        { text: "Tag", value: "tag", align: "center", sortable: false },
        {
          text: "StoreTime",
          value: "storeTime",
          align: "center",
          sortable: false
        },
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
      var url = config.cigbackendUrl + "/messageList/getMessage";
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
    keysearch: function() {
      var url = config.cigbackendUrl + "/messageList/getMessage";
      store.progress.commit("start", url);
      var param = {
        startDate: this.startDate,
        endDate: this.endDate
      };
      this.$http
        .get(url, { params: param })
        .then(response => {
          this.$set(this, "items", response.data.data.rows);
          store.progress.commit("finish", url);
        })
        .catch(function(response) {
          console.log(response);
          store.progress.commit("fail");
        });
    },
    removev: function(id) {
      this.removevaule = id;
    },
    //删除
    remove: function() {
      console.log(123);
      var url =
        config.cigRestUrl + "/rest/tables/message/" + this.removevaule;
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

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
        </v-card-title>
        <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search" >
          <template slot='items' slot-scope='props'>
            <td class='text-xs-center' style="color:#000 !important;">{{ props.item.topicnode }}</td>
            <td class='text-xs-center'>{{ props.item.state }}</td>
            <td class='text-xs-center'>{{ props.item.updatedate }}</td>
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
          text: "集群管理",
          disabled: true
        }
      ],
      // 表格
      tmp: "",
      search: "",
      headers: [
        {
          text: "topic节点",
          value: "topicNode",
          align: "center",
          sortable: false,
          color: "dark"
        },
        {
          text: "状态",
          value: "state",
          align: "center",
          sortable: false
        },
        {
          text: "更新时间",
          value: "updateTime",
          align: "center",
          sortable: false
        }
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
      var url = config.cigbackendUrl + "/messageList/getCluster";
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
    }
  }
};
</script>

<template>
    <!--弹出菜单-->
    <div id="menu" v-cloak :class="{'full-page-menu':true,'show':showMenu}">
        <header>
            <nav class="navbar navbar-inverse">
                <div class="header-container">
                    <ul class="navUl">
                        <li class="logoLi">
                            <b class="cigLogo"></b>
                            <a href="/cigWeb/afterLogin.html">CIG城乡一体化信息栅格平台</a>
                        </li>
                        <li class="menuLi">
                            <a href="javascript:;" @click="menuHide">菜单
                                <b class="muneClose"></b>
                            </a>
                        </li>
                        <!--<li class="loginBtn" v-if="indexhtml=='index.html'">
                            <a href="/cigWeb/afterLogin.html" class="loginBg">
                                <b class="loginImg"></b>
                            </a>
                        </li>-->
                        <li class="loginBtn">{{userName}}&nbsp;,&nbsp;您好！&nbsp;
                            <a class="line-tui" href="/proxymanager/smal/logout?ReturnUrl=/cigWeb/index.html">退出</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <div class="section">
            <div class="menu-container">
                <div class="row systemkuang">
                    <div class="col-md-5">
                        <b class="line"></b>
                    </div >
                    <div class="col-md-2">
                        <span class="systemName">五大系统</span>
                    </div>
                    <div class="col-md-5">
                        <b class="line"></b>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-2" v-for="(value,index) in userMuenNameFive" v-if="index >= 0 && index<=4" :key="index">
                        <span class="serviceANew">
                            <a :href="value.direction">
                                <i class="serviceImg" :class="[fivePImg[index]]"></i>
                                <span class="fiveSpan">{{value.moduleName}}</span>
                            </a>
                        </span>
                    </div>
                    <div class="col-md-1"> </div>
                </div>

                <div class="row systemkuang" v-if="userMuenNameTen.length>0">
                    <div class="col-md-5">
                        <b class="line"></b>
                    </div>
                    <div class="col-md-2">
                        <span class="systemName">十大平台</span>
                    </div>
                    <div class="col-md-5">
                        <b class="line"></b>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-2" v-for="(value,index) in userMuenNameTen" v-if="index >= 0 && index<=4" :key="index">
                        <span class="serviceANew">
                            <a :href="value.Url">
                                <i class="tenPImg" :class="[tenPImg[index]]"></i>
                                <span class="tenSpan">{{value.Name}}</span>
                            </a>
                        </span>
                    </div>
                    <div class="col-md-1"></div>
                </div>
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-2" v-for="(value,index) in userMuenNameTen" v-if="index >= 5 && index<=9" :key="index">
                        <span class="serviceANew">
                            <a :href="value.Url">
                                <i class="tenPImg" :class="[tenPImg[index]]"></i>
                                <span class="tenSpan">{{value.Name}}</span>
                            </a>
                        </span>
                    </div>
                    <div class="col-md-1"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import config from '../index/components/config'
import store from '../index/store'

export default {
    props: {
        showprop: {
            type: Boolean,
            default: false
        },
    },
    data: function() {
        return {
            "editor": "shucheng@spacesystech.com",
            showMenu: false,
            userName: null,
            indexhtml: null,
            userMuenNameFive: [],
            userMuenNameTen: [],
            fivePImg: ['servicePeople', 'servicebig', 'serviceyun', 'servicegezi', 'servicexinfeng'],
            tenPImg: ['ten01', 'ten02', 'ten03', 'ten04', 'ten05', 'ten06', 'ten07', 'ten08', 'ten09', 'ten10'],

        }
    },
    watch: {
        showprop(val, oldVal) {
            if (this.showprop) {
                this.showMenu = true
            } else {
                this.showMenu = false;
            }

        },

    },
    mounted: function() {
        // 加载用户名用户ID
        this.getUserName();
        // 截取URL
        this.getpathname();
        // 请求用户菜单 不登录读取5大系统
        this.getUserMenuFive();
        // 请求用户菜单 登录后读取10大平台
        this.getUserMenu();


    },
    methods: {
        menuHide: function() {
            this.showMenu = false;
            // 双向绑定   把子组件的信息传递给父组件用$emit('update:改变的属性，改变的值)
            this.$emit('update:showprop', false)

        },
        getUserName: function() {
            var url = config.cigbackendUrl + "/system/getCurUser";
            store.progress.commit('start', url);
            this.$http.get(url)
                .then((response) => {
                    this.$set(this, "userName", response.data.data.userName);
                    this.$set(this, "userId", response.data.data.userId);
                    store.progress.commit('finish', url);
                })
                .catch(function(response) {
                    console.log(response);
                    store.progress.commit('fail');
                })
        },
        // 五大系统
        getUserMenuFive: function() {
            var url = config.backendurl + "/system/getFiveSystem?teamName=CIG&tag=NOLONIN";
            store.progress.commit('start', url);
            this.$http.get(url)
                .then((response) => {
                    this.$set(this, "userMuenNameFive", response.data.data);
                    store.progress.commit('finish', url);
                })
                .catch(function(response) {
                    console.log(response);
                    store.progress.commit('fail');
                })
        },
        // 十大平台
        getUserMenu: function() {
            var url = config.backendurl + "/system/getUserMenu?teamname=CIG";
            store.progress.commit('start', url);
            this.$http.get(url)
                .then((response) => {

                    if (response.data.data[0].Children.length == 2) {
                        this.$set(this, "userMuenNameTen", response.data.data[0].Children[1].Children);
                    };
                    store.progress.commit('finish', url);
                })
                .catch(function(response) {
                    console.log(response);
                    store.progress.commit('fail');
                })
        },




        // getUserMenu: function() {
        //     $.ajax({
        //         type: "get",
        //         url: config.backendurl + "/system/getUserMenu?teamname=CIG",
        //         success: this.getUserMenuSuccess.bind(this)
        //     })
        // },
        // getUserMenuSuccess: function(res) {
        //     if (res.success) {
        //         if (res.data[0].Children.length == 2) {
        //             this.$set(this, "userMuenNameTen", res.data[0].Children[1].Children);
        //         };
        //     }
        // },

        // getUserMenuFive: function() {
        //     $.ajax({
        //         type: "get",
        //         url: config.backendurl + "/system/getFiveSystem?teamName=CIG&tag=NOLONIN",
        //         success: this.getUserMenuFiveSuccess.bind(this)
        //     })
        // },

        // getUserMenuFiveSuccess: function(res) {
        //     if (res.data.length > 0) {
        //         this.$set(this, "userMuenNameFive", res.data);
        //     };
        // },




        getpathname: function() {
            var pathnane = window.location.pathname;
            var indexhtml = pathnane.substr(pathnane.length - 10);
            this.$set(this, "indexhtml", indexhtml);

        },
    },

}
</script>


Vue.component('pager', {
    template: "<div class =\"crmpage fenye_pub_cont\"><span>共<strong>{{allcount}}</strong>条</span>&nbsp; &nbsp; <span><strong>{{pagesize}}</strong>条/页</span>&nbsp;&nbsp;<span>第<strong>{{curpage}}/{{PageCount}}</strong>页</span>&nbsp; &nbsp;<a id=\"firstpage\" class =\"pagelast\" v-if=\"curpage>1\" v-on:click=\"GetList(1)\">首页</a>&nbsp;<a class=\"pagelast\" v-if=\"curpage>1\" v-on:click=\"GetList(curpage-1)\">上一页</a>&nbsp;<a name=\"redictpage\" v-for=\"item in Pages\" v-on:click=\"GetList(item.pindex)\"><span class =\"pageNow\" v-if=\"curpage==item.pindex\"><strong>{{item.pindex}}</strong></span><span v-else>{{item.pindex}}</span></a>&nbsp;<a class =\"pagenext\" v-if=\"curpage<PageCount\" v-on:click=\"GetList(parseInt(curpage)+1)\">下一页</a><a id=\"lastpage\" maxpa=\"197\" class =\"pagelast\" v-if=\"curpage<PageCount\" v-on:click=\"GetList(PageCount)\">尾页</a>&nbsp;<span><strong>第</strong></span>&nbsp;<input class=\"oinput01\" style=\"width:30px;height:20px\" ref=\"goto\"><span><strong>页</strong></span>&nbsp;<a v-on:click=\"GetList($refs.goto.value)\">跳转</a></div>",


    data() {
        return {
            curpage: 1
        }
    },
    methods: {
        GetList(pindex) {
           
            if (isNaN(parseInt(pindex))) {
                this.$message({
                    message: '页数不正确',
                    duration: 2000
                });
            }
            else if (parseInt(pindex) > this.PageCount || parseInt(pindex) < 1) {
                this.$message({
                    message: '页数不正确',
                    duration: 2000
                });
            }

            else {
                this.curpage = parseInt(pindex);
                this.$emit('pindex', pindex);
            }

        }
    },
    props: ['pagesize', 'allcount', 'showcount'],
    computed: {
        Pages: function () {
            var plist = [];
            var temp = parseInt((this.showcount / 2).toString());
            if (temp >= this.curpage) {
                if (this.PageCount < this.showcount) {
                    for (var i = 1; i <= this.PageCount; i++) {
                        plist.push({ 'pindex': i });
                    }
                }
                else {
                    for (var i = 1; i <= this.showcount; i++) {
                        plist.push({ 'pindex': i });
                    }
                }
            }
            else {
                if (this.curpage > this.PageCount - temp) {
                    if (this.PageCount >= this.showcount) {
                        for (var i = this.PageCount - this.showcount + 1; i <= this.PageCount; i++) {
                            plist.push({ 'pindex': i });
                        }
                    }
                    else {
                        for (var i = 1; i <= this.model.attributes.PageCount; i++) {
                            plist.push({ 'pindex': i });
                        }
                    }
                }
                else {
                    for (var i = this.curpage - temp; i <= this.curpage + temp; i++) {
                        plist.push({ 'pindex': i });
                    }
                }
            }
            return plist;
        },
        PageCount: function () {
            if (this.allcount % this.pagesize == 0) {
                return parseInt((this.allcount / this.pagesize).toString());
            }
            else {
                return parseInt((this.allcount / this.pagesize).toString()) + 1;
            }
        }
    }
});



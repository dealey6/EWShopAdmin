<template>
  <div class="content px-4">
    <div class="mt-4 bg-white">
      <div>
        <n-card class="xt"
            style="border: 1px solid #bed0ea"
            title="系统信息"
            :bordered="true"
            :segmented="{
                content: true,
                footer: 'soft'
            }"
            header-style="background-color:#f9fbfe;padding:10px;border-bottom:1px solid #bed0ea"
        >
          <p v-for="item in Systems" :key="item.id">{{item.title}}：<a :href="item.url">{{item.value}}</a></p>
        </n-card>
      </div>
    </div>
  </div>
  <div class="flex">
    <div style="width: 48%" class="mt-4 bg-white ml-5">
      <n-card
          style="border: 1px solid #bed0ea"
          title="商品信息"
          :segmented="{
              content: true,
              footer: 'soft',
          }"
          header-style="background-color:#f9fbfe;padding:10px;border-bottom:1px solid #bed0ea"
          content-style="padding:5px 20px"
      >
        <div  class="goods">
          <div>
            <div>上架商品</div><div><span>{{goods_info.on_nums}}</span>件</div>
          </div>
          <div>
            <div>下架商品</div><div><span>{{goods_info.un_nums}}</span>件</div>
          </div>
          <div>
            <div>缺货商品</div><div><span>{{goods_info.stock_null}}</span>件</div>
          </div>
          <div>
            <div>推荐商品</div><div><span>{{goods_info.recommend_nums}}</span>件</div>
          </div>
        </div>
      </n-card>
    </div>
    <div style="width: 48%" class="mt-4 bg-white ml-5">
      <n-card
          style="border: 1px solid #bed0ea"
          title="访客统计"
          :segmented="{
            content: true,
            footer: 'soft',
          }"
          header-style="background-color:#f9fbfe;padding:10px;border-bottom:1px solid #bed0ea"
          content-style="padding:5px 20px"
      >
        <div  class="goods">
          <div>
            <div>今日访客</div><div><span>{{users_info.today_nums}}</span>人</div>
          </div>
          <div>
            <div>昨日访客</div><div><span>{{users_info.yesterday_nums}}</span>人</div>
          </div>
          <div>
            <div>累计访客</div><div><span>{{users_info.total_nums}}</span>人</div>
          </div>
          <div>
            <div>累计注册</div><div><span>{{users_info.reg_nums}}</span>人</div>
          </div>
        </div>
      </n-card>

    </div>
  </div>
  <div class="content px-4">
    <div class="mt-4 bg-white">
      <div>
        <n-card class="xt"
                style="border: 1px solid #bed0ea"
                title="交易数据"
                :bordered="true"
                :segmented="{
                content: true,
                footer: 'soft'
            }"
                header-style="background-color:#f9fbfe;padding:10px;border-bottom:1px solid #bed0ea"
        >
          <n-table  :single-line="false" style="text-align: center">
            <thead>
            <tr>
              <th></th>
              <th>订单总数</th>
              <th>订单总额</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>今日订单</td>
              <td>{{order_info.today.nums}}个</td>
              <td>￥{{order_info.today.total_price}}</td>
            </tr>
            <tr>
              <td>昨日订单</td>
              <td>{{order_info.yesterday.nums}}个</td>
              <td>￥{{order_info.yesterday.total_price}}</td>
            </tr>
            <tr>
              <td>全部订单</td>
              <td>{{order_info.total.nums}}个</td>
              <td>￥{{order_info.total.total_price}}</td>
            </tr>
            </tbody>
          </n-table>
        </n-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {stats} from "@/api/stat";
const goods_info:any = ref({});
const users_info:any = ref({});
const order_info:any = ref({
	today:{},
	yesterday:{},
	total:{},
});
onMounted(()=>{
	getNum({});
});
const getNum:any = (params) =>{
	stats(params).then((res:any) => {
		goods_info.value = res.goods_info;
		users_info.value = res.users_info;
		order_info.value = res.order_info;
	});
};
const Systems = [
	{id:1,title:"软件版本",value:"EWShop1.0教学版",url:"https://www.eduwork.cn/"},
	{id:2,title:"开发团队",value:"学习猿地",url:"https://www.lmonkey.com/"},
	{id:3,title:"邮箱",value:"ewshop@eduwork.cn",url: "#"},
	{id:4,title:"微信",value:"gaoluofeng",url:"#"},
];

</script>

<style scoped >

.n-card__content{
  padding-top: 5px;
}
.n-card__content>p>a{
  text-decoration: underline;
}
.n-card__content>p>a:hover{
  color: orangered;
}
.n-card__content>p:first-child>a{
  color:green;
  text-decoration: none;
}
.n-card__content>p:first-child:after{
  content: '（证书编号：无）';
  color: orangered;
  text-decoration: none;
}
.goods > div:not(:last-child){
  border-bottom: 1px dashed #ccc;
}
.goods > div{
  display: flex;
  justify-content:space-between ;
}
.goods > div {
  height: 50px;
  line-height: 50px;
}
.goods > div > div span, tbody > tr > td:nth-child(2){
  color: green;
  font-weight: bold
}
tbody > tr > td:nth-child(3){
  color: red;
  font-weight: bold
}
.n-card > .n-card-header{
  padding: 10px;
}
thead th {
  background-color: #DEECF4
}

</style>
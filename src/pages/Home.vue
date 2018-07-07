<template>
<div class="container">
	<div class="header">
		今日头条
	</div>
	<div class="nav_ouside">
		<ul class="nav">
			<li v-for="(item,index) in navbar">
				<router-link :to="{path:item.url,query:{type:item.type}}">{{item.text}}</router-link>
			</li>
		</ul>
	</div>
	<div class="news_content">
		<router-link v-for="(val,index) in listCon" :to="{name:'newsdetail',params:{
				id:val.tag_id,
				title:val_title,
				media_info:val.media_info,
	            media_name:val.media_name,
	            datetime:val.datetime,
	            abstract:val.abstract,
	            image_list:val.image_list,
	            repin_count:val.repin_count,
	            comment_count:val.comment_count,
	            keywords:val.keywords
			}}" class="newsDetail" :key="index">
			<p class="title">{{val.title}}</p>
			<div class="bottomInfo">
				<span class="writer">{{val.media_name}}</span>
				<span class="comment">评论&nbsp;{{val.comment_count}}</span>
				<span class="time">a few seconds ago</span>
			</div>
		</router-link>
		
	</div>
</div>
	
</template>

<script>
import * as type from '../store/mutation-type.js'
import {mapActions,mapState,mapGetters} from 'vuex'
import axios from 'axios'
export default{
	name:'Home',
	data(){
		return {
			navbar:[
				{
					text:'推荐',
					url:'/home/all',
					type:'_all_'
				},

				{
					text:'热点',
					url:'/home/hot',
					type:'news_hot'
				},
				{
					text:'社会',
					url:'/home/society',
					type:'news_society'
				},
				{
					text:'娱乐',
					url:'/home/entertainment',
					type:'news_entertainment'
				},
				{
					text:'科技',
					url:'/home/tech',
					type:'news_tech'
				},
				{
					text:'汽车',
					url:'/home/car',
					type:'news_car'
				},
				{
					text:'体育',
					url:'/home/sports',
					type:'news_sports'
				},
				{
					text:'财经',
					url:'/home/sports',
					type:'news_sports'
				},
				{
					text:'军事',
					url:'/home/sports',
					type:'news_sports'
				},
				{
					text:'国际',
					url:'/home/sports',
					type:'news_sports'
				},
				{
					text:'时尚',
					url:'/home/sports',
					type:'news_sports'
				}
			],
			first:window.location.search.substring(6)
		}
	},
	computed:{
		...mapGetters(['newsList','list']),
		listCon:function(){
			if(this.$route.query.type){
				return this.list[this.$route.query.type]
			}else{
				return this.list[this.first]
			}
		}	
	},
	/*beforeRouteUpdate(to,from,next){
		this.$store.commit(type.PULLOWNBTN,false);
		next();
	},*/
	methods:{
		...mapActions(['getNews'])

	},
	mounted(){
		this.getNews({
			kind:this.first,
			flag:this.routerChange
		});
		this.loading=true;
		const _this=this
	},
	watch: {
        '$route': function() {
            this.getNews({
                kind: this.$route.query.type,
                flag: this.routerChange
            });
            if (this.routerChange) {
                this.$store.commit(type.CHANGE_LOADING_STATE, true)
            } else {
                this.$store.commit(type.CHANGE_LOADING_STATE, false)
            }
            this.first = window.location.search.substring(6);
            this.$store.commit(type.ROUTERCHANGE, true);
            // this.$store.commit(type.PULLDOWNBTN, false);
        },
    },
    filters: {
        date: function(input) {
            if (!input) {
                return ''
            }
            var time = moment(input).startOf('minute').fromNow();
            // var reg = /(([1-9][0-9]{0,1})\s)minutes ago/.exec(time);
            return time;
        }
    },
    created(){
        console.log(this.first)
    },

}
</script>

<style scoped>
.container{
	width: 100%;
}
.header{
	height: 45px;
	background: #f00;
	text-align: center;
	line-height: 45px;
	color: #fff;
	font-size: 20px;
}
.nav_ouside{
	width: 100%;
   	overflow-x: auto;
    white-space: nowrap;
    
	background:#f4f5f6;
}
.nav_ouside::-webkit-scrollbar{ 
display: none; 
}
.nav{
	width: 550px;
	height: 40px;
	line-height: 40px;
    text-align: center;
    font-family: '微软雅黑';
    z-index: 999;
    margin: auto;
}
.nav li{
	float: left;
	font-size: 16px;
	width: 50px;
	text-align: center;
	display: inline-block;
}
.news_content{
	padding:0 10px;
}
.newsDetail{
	color: #000;
	padding-top:10px;
	padding-bottom: 5px;
	display: block;
	border-bottom: 1px solid #ccc;
}
.title{
	font-weight: bold;
	
	font-size: 16px;
}
.bottomInfo{
	margin-top:15px;
}
.comment{
	margin-left:10px;
}
.time{
	float: right;
}
</style>

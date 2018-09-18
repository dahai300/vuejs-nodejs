<template>
	<div class="products-wrapper overflowauto">
		<div>
			<el-button type="primary" @click="add">增加</el-button>
		</div>
		<br>
		<div v-if="products.length==0">
			<p class="nodata-box">暂无数据</p>
		</div>
		<div v-if="products.length>0">
			<table>
				<thead>
					<tr>
						<th>TITLE</th>
						<th>IMAGE</th>
						<th>DATE</th>
						<th width="50%">CONTENT</th>
						<th width="120"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in products" :key="item._id">
						<td>{{item.title}}</td>
						<td><img :src="imageUrl+item.image" alt="" height="80" >   </td>
						<td>{{item.publishDate|formatDate}}</td>
						<td v-html="item.content"></td>
						<td>
							<span class="del-edit" @click="edit(item)"><i class="el-icon-edit-outline"></i>编辑</span>
							<span class="del-edit" @click="del(item._id)"><i class="el-icon-delete"></i>删除</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import { VueEditor } from 'vue2-editor'
	import {SERVER_API_URL} from '@/basecomponents/var'
	import api from '@/basecomponents/api'
	export default{
		created(){
			this.getProducts()
		},
		data(){
			return{
				products:[],
				imageUrl:SERVER_API_URL+'/uploads/'
			}
		},
		methods:{
			add(){
				this.$router.push('/addproduct')
			},
			getProducts(){
				var url=`${SERVER_API_URL}/admin/product/`;
				axios.get(url).then((res)=>{
					console.log(res);
					this.products=res.data.data;
				});
			},
			edit(){

			},
			del(){
				
			},
			handleCropImage(name){
				let nameArr=name.split(".");
				let nameArrLen=nameArr.length;
				let extName=nameArr[nameArrLen-1];
				let width=400;
				return `${name}_${width}.${extName}`;
			}
		},
		filters:{
			formatDate(value){
				function padding(n){
					return n<10?'0'+n:n;
				}
				if(!value){
					return ''
				}
				var dateValue=new Date(value);
				return dateValue.getFullYear()+"-"+padding(parseInt(dateValue.getMonth())+1)+"-"+padding(dateValue.getDate())+" "+padding(dateValue.getHours())+":"+padding(dateValue.getMinutes())+":"+padding(dateValue.getSeconds());
			}
		},
		components:{
			VueEditor
		}
	}
</script>
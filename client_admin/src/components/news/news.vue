<template>
	<div class="news-wrapper overflowauto">
		<div>
			<el-button type="primary" @click="add">增加</el-button>
		</div>
		<br />
		<div v-if="news.length>0">
			<table>
				<thead>
					<tr>
						<th>TITLE</th>
						<th>DATE</th>
						<th width="50%">CONTENT</th>
						<th width="120"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in news" :key="item._id">
						<td>{{item.title}}</td>
						<td>{{item.publishDate|formatDate}}</td>
						<td v-html="item.content"></td>
						<td>
							<span class="del-edit" @click="edit(item)"><i class="el-icon-edit-outline"></i>编辑</span>
							<span class="del-edit" @click="del(item._id)"><i class="el-icon-delete"></i>删除</span>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="page">
				<span class="cpage prev" @click="prevPage">上一页</span><span class="cpage next" @click="nextPage">下一页</span><span>{{page}} / {{totalPage}}</span>
			</div>
		</div>
		<div v-else class="nodata-box">
			暂无数据
		</div>

		<el-dialog title="EDIT" :visible.sync="dialogFormVisible">
			<el-form :model="editForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<input type="hidden" v-model="editId" name="">
			  <el-form-item label="标题" prop="title">
			    <el-input v-model="editForm.title"></el-input>
			  </el-form-item>
			  <el-form-item label="来源" prop="from">
			    <el-input v-model="editForm.from"></el-input>
			  </el-form-item>
			  <el-form-item label="发布日期" prop="publishDate">
			    <el-date-picker
			      v-model="editForm.publishDate"
			      type="date"
			      format="yyyy-MM-dd HH:mm:ss"
			      placeholder="选择日期">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item label="内容" prop="desc" style="height:260px; overflow-y: auto">
			    <vue-editor id="myvueditor" v-model="editForm.content"></vue-editor>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="update()">更新</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>

	</div>
</template>
<script>
	import axios from 'axios'
	import { VueEditor } from 'vue2-editor'
	import {SERVER_API_URL} from '@/basecomponents/var'
	import api from '@/basecomponents/api'

	export default{
		created(){
			this.getNews();
			this.$on('updateDeleteNews',()=>{
				this.getNews(1);
			});
			this.$on('updateEditNews',()=>{
				this.getNews(1);
			});
		},
		data(){
			return{
				news:[],
				dialogFormVisible: false,
				editId:'',
				page:1,
				currentPage:1,
				totalPage:1,
				editForm:{
					title:'',
					from:'',
					publishDate:new Date(),
					content: '' 
				},
				rules: {
		          title: [
		            { required: true, message: '请输入标题', trigger: 'blur' }
		          ],
		          publishDate: [
		            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
		          ],
		          content: [
		            { required: true, message: '请输入内容', trigger: 'blur' }
		          ]
		        }
			}
		},
		methods:{
			getNews(){
				var _this=this;
				var page=parseInt(_this.page);
				var url=`${SERVER_API_URL}/admin/news/page/${page}`;
				
				axios.get(url).then((res)=>{
					console.log(res)
					//_this.news=res.data
					if(res.data.code===1){
						_this.news=res.data.data;
						_this.totalPage=res.data.pages;
					}
				});

				//refresh post token
				api.tokenRequest().then((res)=>{
					_this.$store.commit('REFRESH_TOKEN',{
						token:res.data.token
					})
				});
			},
			add(){
				this.$router.push('/addnews');
			},
			edit(item){
				this.dialogFormVisible=true;
				this.editId=item._id;
				this.editForm.title=item.title;
				this.editForm.from=item.from;
				this.editForm.publishDate=api.formatDate(item.publishDate);
				this.editForm.content=item.content;			
			},
			update(){
				var id=this.editId;
				var url=`${SERVER_API_URL}/admin/news/${id}`;
				var _this=this;
				console.log(_this.editForm)
				axios.patch(url,_this.editForm).then((res)=>{
					if(res.data.code===1){
						_this.$emit("updateEditNews")
						_this.$message({
					          message: '操作成功',
					          type: 'success'
					    });
					    _this.dialogFormVisible=false;
					}else{
						this.$message.error('操作失败');
						return;
					}
				});
				//refresh post token
				api.tokenRequest().then((res)=>{
					_this.$store.commit('REFRESH_TOKEN',{
						token:res.data.token
					})
				});
			},
			del(id){
				var url=`${SERVER_API_URL}/admin/news/${id}`;
				var _this=this;
				axios.delete(url).then((res)=>{
					console.log(res);
					if(res.data.code===1){
						_this.$emit("updateDeleteNews");
						_this.$message({
					          message: '操作成功',
					          type: 'success'
					    });
					}
				});
				//refresh post token
				api.tokenRequest().then((res)=>{
					_this.$store.commit('REFRESH_TOKEN',{
						token:res.data.token
					})
				});
			},
			prevPage(){
				if(this.page>1){
					this.page--;
					this.getNews();
				}
				
			},
			nextPage(){
				if(this.page<this.totalPage){
					this.page++;
					this.getNews();
				}
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
<style scoped lang="stylus">
	#myvueditor{
		height:240px;
		overflow-y: auto
	}
	.page{
		margin-top:16px;
		.cpage{
			padding:0 12px;
			height:30px;
			line-height:30px;
			font-size:12px;
			box-sizing:border-box;
			display:inline-block;
			margin-right:12px;
			border:1px solid #ddd;
			cursor:pointer;
		}
		.num{
			height:30px;
			line-height:30px;
			
		}
	}
</style>
<template>
	<div class="products-wrapper overflowauto">
		<div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="标题" prop="title">
			    <el-input v-model="ruleForm.title"></el-input>
			  </el-form-item>
			  <el-form-item label="图片">
			    <input type="file"  accept="image/*" @change="uploadImage">
				
			  </el-form-item>
			  <el-form-item label="发布日期" prop="publishdate">
			    <el-date-picker
			      v-model="ruleForm.publishdate"
			      type="date"
			      format="yyyy-MM-dd HH:mm:ss"
			      placeholder="选择日期">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item label="内容" prop="desc" style="height:260px; overflow-y: auto">
			    <vue-editor id="myvueditor" v-model="ruleForm.content"></vue-editor>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">增加</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import { VueEditor } from 'vue2-editor'
	import axios from 'axios'
	import {SERVER_API_URL} from '@/basecomponents/var'
	import api from '@/basecomponents/api'
	
	export default{
		data(){
			return{
				uploadUrl:SERVER_API_URL+'/admin/uploadproduct',
				selectedImage:null,
				ruleForm:{
					title:'',
					publishdate:new Date(),
					content: '' 
				},
				rules: {
		          title: [
		            { required: true, message: '请输入标题', trigger: 'blur' }
		          ],
		          publishdate: [
		            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
		          ],
		          content: [
		            { required: true, message: '请输入内容', trigger: 'blur' }
		          ]
		        }
			}
		},
		methods:{
			uploadImage(event){
				//console.log(event);
				this.selectedImage=event.target.files[0];
				//console.log(this.selectedImage)
			},
			submitForm(formName){
				var url=`${SERVER_API_URL}/admin/product`;
				let allowTypes=["image/jpeg","image/png"];
				let maxSize=1000000;
				if(!this.selectedImage){
					this.$message.error('请选择图片');
					return;
				}
				if(!allowTypes.includes(this.selectedImage.type) || this.selectedImage.size>maxSize){
					this.$message.error('只支持jpg,png，大小不超过100k图片');
					return;
				}

				var _this=this;
				_this.$refs[formName].validate((valid)=>{
					if(valid){


						var formData=new FormData();
						formData.append('image',this.selectedImage);
						formData.append('title',this.ruleForm.title);
						formData.append('publishDate',this.ruleForm.publishdate);
						formData.append('content',this.ruleForm.content)
						let config = {
					      header : {
					        'Content-Type': 'multipart/form-data'
					      }
					    }
					    
						axios.post(url,formData,config).then((res)=>{
							//console.log(res);
							if(res.data.code===1){
								_this.$message({
						          message: '操作成功',
						          type: 'success'
						        });

						       _this.ruleForm={
						       	title:'',
								publishdate:new Date(),
								content: '' 
						       }	
							}
						});

					}
				})
				
			}
		},
		components:{
			VueEditor
		}
	}
</script>
<style scoped>
	#myvueditor{
		height:240px;
		overflow-y: auto
	}
</style>
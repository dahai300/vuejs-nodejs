<template>
	<div class="products-wrapper overflowauto">
		<div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="标题" prop="title">
			    <el-input v-model="ruleForm.title"></el-input>
			  </el-form-item>
			  <el-form-item label="图片" prop="fileList">
			    <el-upload
				  class="upload-demo"
				  :action="uploadUrl"
				  :on-preview="handlePreview"
				  :on-progress="onProgress"
				  :on-change="onChange"
				  :file-list="fileList">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip" style="margin-top:0">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
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
				fileList:[],
				ruleForm:{
					title:'',
					image:'',
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
			handlePreview(file) {
		        console.log(file);
		    },
		    onProgress(file){
		    	console.log("progress:")
		    	console.log(file)
		    },
		    onChange(file){
		    	console.log(file);
		    	var fileName=file.name;
		    	this.fileList[0]={
		    		name:fileName
		    	};
		    },
			submitForm(formName) {
			 	var url=`${SERVER_API_URL}/admin/product`;
			 	var _this=this;
			 	console.log(_this.fileList)
		        _this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	_this.ruleForm.image=_this.fileList[0].name;
		          	console.log(_this.ruleForm)
		            axios.post(url,_this.ruleForm).then((res)=>{
		            	console.log(res)
		            	if(res.data.code===1){
		            		_this.$message({
					          message: '操作成功',
					          type: 'success'
					        });

					       //reset form
					       _this.fileList=[];
					       _this.ruleForm={
					       	title:'',
							image:'',
							publishdate:new Date(),
							content: '' 
					       }
		            	}
		            });
		            //refresh post token
					api.tokenRequest().then((res)=>{
						_this.$store.commit('REFRESH_TOKEN',{
							token:res.data.token
						});
					});

		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
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
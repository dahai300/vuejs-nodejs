<template>
	<div class="news-wrapper overflowauto">
		<div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="标题" prop="title">
			    <el-input v-model="ruleForm.title"></el-input>
			  </el-form-item>
			  <el-form-item label="来源" prop="from">
			    <el-input v-model="ruleForm.from"></el-input>
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
				ruleForm:{
					title:'',
					from:'network',
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
			 submitForm(formName) {
			 	var url=`${SERVER_API_URL}/admin/news`;
			 	var _this=this;
		        _this.$refs[formName].validate((valid) => {
		          if (valid) {
		            axios.post(url,_this.ruleForm).then((res)=>{
		            	if(res.data.code===1){
		            		_this.$message({
					          message: '操作成功',
					          type: 'success'
					        });

					       //reset form
					       _this.ruleForm={
					       	title:'',
							from:'',
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
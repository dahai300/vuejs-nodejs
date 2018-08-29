<template>
	<div class="overflowauto">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in users" :key="item._id">
						<td>{{item._id}}</td>
						<td>{{item.email}}</td>
					</tr>
				</tbody>
			</table>
	</div>
</template>
<script>
	import axios from 'axios';
  	import {SERVER_API_URL} from '@/basecomponents/var'
  	import api from '@/basecomponents/api'
	export default{
		created(){
			this.getUsers();
		},
		data(){
			return{
				users:[]
			}
		},
		methods:{
			getUsers(){
				let url=`${SERVER_API_URL}/admin/users`;
				//let tokenUrl=`${SERVER_API_URL}/admin/postoken`;
				let _this=this;
				axios.get(url).then((res)=>{
					console.log(res);
					if(res.data.code===1){
						_this.users=res.data.data;

						//refresh post token
						api.tokenRequest().then((res)=>{
							_this.$store.commit('REFRESH_TOKEN',{
								token:res.data.token
							})
						});
					}
				});
			}
		}
	}
</script>
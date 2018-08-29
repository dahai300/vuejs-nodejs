import axios from 'axios'
import {SERVER_API_URL} from './var'

export default{
	tokenRequest(){
		var url=`${SERVER_API_URL}/admin/postoken`;
		var email=localStorage.getItem('user');
		var refreshToken=localStorage.getItem('refreshToken');
		var data={
			email:email,
			refreshToken:refreshToken
		};
		return axios({method:'post',url:url,data:data})
	},
	formatDate(value){
		function padding(n){
			return n<10?'0'+n:n;
		}
		if(!value){
			return ''
		}
		var dateValue=new Date(value);
		return dateValue.getFullYear()+"-"+padding(parseInt(dateValue.getMonth())+1)+"-"+dateValue.getDate()+" "+padding(dateValue.getHours())+":"+padding(dateValue.getMinutes())+":"+padding(dateValue.getSeconds());
	}
}
export default{
	SET_USER(state,data){
		state.user=data;
	},
	SET_TOKEN(state,data){
		state.token=data;
	},
	LOGIN(state,data){
		localStorage.setItem('token',data.token);
		localStorage.setItem('refreshToken',data.refreshToken);
		localStorage.setItem('user',data.user);
		state.token=data.token;
		state.user=data.user;
	},
	LOGOUT(state){
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('user');
		state.token=null;
		state.user=null;
	},
	REFRESH_TOKEN(state,data){
		localStorage.setItem('token',data.token);
		state.token=data.token;
	}
}
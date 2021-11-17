import axios from 'axios'
import api from '@/assets/config/api'
export default {
    namespaced:true,
    state:{
		  categoryList:[], //分类logo
    },
    mutations:{
      setcategory:function(state, lists){
        state.categoryList = lists
      }
       
    },
    actions:{
		  //获取logo
      async getcategory(content){
        let lists = await axios.get(api.CategoryLogoLists);
        content.commit('setcategory',lists.data);
		  }
    }
}
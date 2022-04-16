import { defineComponent, reactive} from 'vue'
import { UserOutlined, LockOutlined} from '@ant-design/icons-vue';
// 导入auth网络请求
import { auth } from '@/service';

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {

    const regForm = reactive({
      account: '',
      password: '',
    })
    const register = () => {
      console.log(regForm);
      auth.register(regForm.account, regForm.password)
    }
    
 
    // reative 一组响应式数据（避免单独定义多个变量）
    const loginForm = reactive({
      account: '',
      password: '',
    })

    return {
      regForm, loginForm,
      register
    }
  },
})
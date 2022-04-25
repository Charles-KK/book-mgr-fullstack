import { defineComponent, reactive} from 'vue'
import { UserOutlined, LockOutlined} from '@ant-design/icons-vue';
// 导入auth网络请求
import { auth } from '@/service';
import { message } from 'ant-design-vue';
import { result } from '@/utils'


export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {

    const regForm = reactive({
      account: '',
      password: '',
      code:''
    })
    // 调用axios返回的是promise对象，所以这个函数应该是async
    const register = async () => {
      console.log(regForm);
      if(regForm.account === '') {
        message.error('账户名不能为空');
        return;
      }
      if(regForm.password === '') {
        message.error('密码不能为空')
        return;
      }
      if(regForm.code === '') {
        message.error('邀请码不能为空')
        return;
      }

      const res = await auth.register(regForm.account, regForm.password, regForm.code)
      
      const { data } = res;
    
      
      if(res.data.code == 1) {
        message.success(data.msg)
        return;
      } else if(data.code == 0){
          message.error(data.msg)
          return;
      }

    }
    
    //登录数据
    const loginForm = reactive({
      account: '',
      password: '',
    })
    // 登录逻辑
    const login = async () => {
      // console.log(loginForm);
      if(loginForm.account === '') {
        message.error('用户名不能为空')
        return;
      }
      if(loginForm.password === '') {
        message.error('密码不能为空')
        return;
      }

      const res = await auth.login(loginForm.account, loginForm.password);

      result(res)
      .success((data) => { 
        message.success(data.msg) 
      })
    }


    return {
      regForm, loginForm,
      
      register, login
    }
  },
})
import { message } from "ant-design-vue";

export const result = (response, autoShowError = true) => {
  const { data } = response;
  
  if(data.code === 0 && autoShowError) {
    message.error(data.msg);
  }
  return {
    success(callback) {
      if(data.code !== 0) {
        callback(data, response)
      }
      // 链式调用
      return this
    },
    fail(callback) {
      if(data.code === 0) {
        callback(data, response)
      }
      return this
    },
    finally(callback) {
      callback(data, response);
    }
  }
}
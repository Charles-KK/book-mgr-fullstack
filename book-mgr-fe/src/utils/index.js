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

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

export const formatTime = (ts) => {
  const date = new Date(Number(ts));
  const Year = date.getFullYear();
  const Month = date.getMonth() + 1;
  const Day = date.getDate();
  return `${Year}/${Month}/${Day}`
}
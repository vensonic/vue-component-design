import Alert from './alert.vue';
import Vue from 'vue';

//给alert添加一个实例方法，可以传递参数properties
Alert.newInstance = properties => {
    const props = properties || {};
    const Instance = new Vue({
      data: props,
      render (h) {
        return h(Alert, {
          props: props
        });
      }
    });
    //挂载
    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const alert = Instance.$children[0];
  
    return {
        //两个方法，添加和删除
      add (noticeProps) {
       return  alert.add(noticeProps);
      },
      remove (name) {
        alert.remove(name);
      }
    }
  };
  
  export default Alert;
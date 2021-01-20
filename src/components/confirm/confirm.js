import Confirm from "./confirm.vue";
import Vue from 'vue';

let ConfirmInstance = null;
let ConfirmConstructor = Vue.extend(Confirm);

ConfirmConstructor.prototype.show = function(options){
    this.options = options;
    this.vm = this.$mount();
    document.body.appendChild(this.vm.$el);
}
ConfirmConstructor.prototype.remove = function(){
    this.vm.$el && document.body.removeChild(this.vm.$el);
    this.vm.$destroy();
    ConfirmInstance = null;
}

function rendComfirm(options){
   ConfirmInstance = new ConfirmConstructor()
   ConfirmInstance.show(options);
   ConfirmInstance.$on('remove',()=>{
        ConfirmInstance.remove()
   })
   return new Promise((resolve,reject)=>{
    ConfirmInstance.$on('confirm',()=>{
        resolve()
    })
    ConfirmInstance.$on('cancel',()=>{
        reject()
    })
   })
}

export default rendComfirm
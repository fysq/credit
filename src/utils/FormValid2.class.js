import WxValidate from '@/libs/wx-validate/WxValidate'

class FormValid{
  constructor(rules,messages){
    this.validate = new WxValidate(rules,messages);
    return this;
  }
  check(e){
    return new Promise((resolve,reject) => {
      const { validate } = this;
      if(!validate.checkForm(e)){
        reject(validate.errorList[0]);
      }else{
        resolve();
      }
    })
  }
}

export default FormValid

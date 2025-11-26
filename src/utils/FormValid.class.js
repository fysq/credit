//import WxValidate from '@/libs/wx-validate/WxValidate'
import Schema from 'async-validator';

class FormValid{
  constructor(rules){
    this.validate = new Schema(rules);
    return this;
  }
  check(e,options){
    options = options || {
      first : true
    }
    return new Promise((resolve,reject) => {
      this.validate.validate(e,(errors,fields) => {
        if (errors) {
          reject(errors);
        } else {
          resolve();
        } 
      });
    })
  }
}

export default FormValid

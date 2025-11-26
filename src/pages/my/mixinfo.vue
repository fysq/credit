<script>
import FormValid from '@/utils/FormValid.class.js'
export default {
  data() {
    return {
      gender : [{
        name : '男',
        value : 1
      },{
        name : '女',
        value : 2
      }],
      form : {
        gender : '',
        birthday : '',
        name : ''
      },
      _originForm : null,
      user : null
    }
  },
  computed : {
    'form.genderFormat' : function() {
      let value = this.form.gender;
      if(value){
        return this.gender[value - 1].name;
      }
      return '';
    },
    phoneFormat(){
      if(this.user){
        let phone = this.user.phone;
        phone = phone.slice(0,3) + '****' + phone.slice(-4);
        return phone;
      }
    },
    formChange(){
      let { form,_originForm } = this;
      let isChange = false;
      if(_originForm){
        for(var i in form){
          if(form[i] !== _originForm[i]){
            isChange = true;
            break;
          }
        }
      }
      return isChange;
    }
  },
  onLoad() {
    this.$store.dispatch('getUserInfo').then(uinfo => {
      this.user = {
        nickName : uinfo.nickName,
        avatarUrl : uinfo.avatarUrl,
        phone : uinfo.phone,
      }
      this.form = {
        name : uinfo.name,
        gender : uinfo.gender,
        birthday : uinfo.birthday
      }
      this._originForm = Object.assign({},this.form);
    })
    this.fv = new FormValid({
      name : {
        required : true,
        message : '请输入姓名',
      },
      birthday : {
        required : true,
        message : '请选择出生日期'
      },
      gender : {
        required : true,
        message : '请选择性别'
      }
    })
  },
  methods: {
    onPicker(e){
      let { name } = e.currentTarget.dataset;
      let value = e.detail.value;
      if(name == 'form.birthday'){
        this.form.birthday = value;
      }
      if(name == 'form.gender'){
        this.form.gender = this.gender[value].value;
      }
    },
    onSubmit(){
      this.fv.check(this.form).then(res => {
        this.submitApi(this.form).then(res => {
          uni.showToast({
            title : `提交成功`
          });
          setTimeout(() => {
            uni.navigateBack();
          },2e3);
        })
      },err => {
        uni.showToast({
          title : err[0].message,
          icon : 'none'
        })
      })
    }
  }
}
</script>

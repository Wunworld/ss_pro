<template>
  <div class="login">
    <el-row>
      <el-col class="loginTop" :span="24">
        <div class="w logTopInner">
          <i class="left clear show logo"><img src="/static/img/logo.png" alt=""></i>
          <div @click="topSignUpHandle" class="right signUp posRe cursor">
            <div class="colorW txtCenter posAbZ leftTop50 signUpTxt">注册</div>
            <img class="show posAb leftTop0 wh1p" :src="!activeFlag ? '/static/img/signUp.png' : '/static/img/signIn.png'" alt="">
          </div>
          <div @click="topSignInHandle" class="right signIn posRe cursor" style="margin-right:10px;">
            <div class="colorW txtCenter posAbZ leftTop50 signUpTxt">登录</div>
            <img class="show posAb leftTop0 wh1p" :src="activeFlag ? '/static/img/signUp.png' : '/static/img/signIn.png'" alt="">
          </div>
        </div>
      </el-col>
      <el-col class="backBanner" :span="24">
        <div class="w posRe">
          <div v-show="!infoWrite" class="posAbZ signContainer bgW br">
            <el-row class="nav w1p ftw4">
              <el-col @click.native="signInHandle" :class="{active: activeFlag}" class="txtCenter cursor" :span="12">登录</el-col>
              <el-col @click.native="signUpHandle" :class="{active: !activeFlag}" class="txtCenter cursor" :span="12">注册</el-col>
            </el-row>
            <!-- 登录 -->
            <el-aside v-show="activeFlag" style="width: 100%;padding-top:2px;">
              <!-- 不同的输入区： 账号登录-->
              <el-form v-show="!accountFlag" ref="accuntSignForm" :model="accuntSignForm" :rules="accuntSignRules">
                <el-form-item prop="name">
                  <el-input v-model="accuntSignForm.name" style="border-left:none;" placeholder='请输入用户名'>
                    <template slot="prepend" style='background-color: #fff;'>
                      <i class="show left inputIconUser"><img src="/static/img/signUser.png" alt=""></i>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="accuntSignForm.password" style="border-left:none;" placeholder='请输入密码'>
                    <template slot="prepend" style='background-color: #fff;'>
                      <i class="show left inputIconPhone"><img src="/static/img/signpwd.png" alt=""></i>
                    </template>
                  </el-input>
                </el-form-item>
                <testSlide ref="signInAccountSlide" @testOK='signInAccountOK'/>
              </el-form>
              <!-- 不同的输入区： 手机登录-->
              <el-form v-show="accountFlag" ref="phoneSignForm" :model="phoneSignForm" :rules="phoneSignRules">
                <el-row class="signInForm">
                  <el-col :span="7" class="b br inputBox signPhonePro">中国+86</el-col>
                  <el-col :span="16" :offset="1" class="br inputBox clear">
                    <el-form-item prop="phoneNum">
                      <el-input v-model="phoneSignForm.phoneNum" style="border-left:none;" placeholder='输入手机号'>
                        <template slot="prepend" style='background-color: #fff;'>
                          <i class="show left inputIconUser"><img src="/static/img/signPhone.png" alt=""></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <testSlide ref="signInPhoneSlide" @testOK='signInPhoneOK'/>
                  </el-col>
                  <el-col :span="16" class="br inputBox" style="margin: 20px 0 0 0;">
                    <el-form-item prop="phoneCode">
                      <el-input v-model="phoneSignForm.phoneCode" style="border-left:none;" placeholder='输入手机验证码'></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" class="b br inputBox signPhonePro cursor right" style="margin: 20px 0 0 0;">发送验证码</el-col>
                </el-row>
              </el-form>
              <!-- 登录 -->
              <el-row class="signInForm">
                <el-col :span="24" class="ft14 errorTips">{{signInErrorTips}}</el-col>
                <el-col :span="24" class="signBtn txtCenter colorW cursor ft16">登&nbsp;&nbsp;录</el-col>
                <el-col :span="24" class="txtCenter">
                  <el-checkbox v-model="checkbox"></el-checkbox>&nbsp;&nbsp;<span class="signCopyRight ft14">勾选代表你同意《注册声明》《版权声明》</span>
                </el-col>
                <el-col @click.native="toggleSign" :span="12" :offset="6" class="cursor clear">
                  <i v-show="!accountFlag" class="show inputIconPhone left" style="margin: 16px 0 0 10px;"><img src="/static/img/signPhone1.png" alt=""></i>
                  <i v-show="accountFlag" class="show inputIconPhone left" style="margin: 16px 0 0 10px;"><img src="/static/img/signUser1.png" alt=""></i>
                  <span v-show="!accountFlag" class="show colorBase left ftw2" style="margin-top: 15px;">手机号码登录</span>
                  <span v-show="accountFlag" class="show colorBase left ftw2" style="margin-top: 15px;">账号密码登录</span>
                </el-col>
              </el-row>
            </el-aside>
            <!-- 注册 -->
            <el-aside v-show="!activeFlag" style="width: 100%;height: auto;overflow:hidden;padding-top:2px;">
              <el-form ref="signUpForm" :model="signUpForm" :rules="signUpFormRules">
                <el-row class="signInForm">
                  <el-col :span="7" class="b br inputBox signPhonePro">中国+86</el-col>
                  <el-col :span="16" :offset="1" class="br inputBox clear">
                    <el-form-item prop="phoneNum">
                      <el-input v-model="signUpForm.phoneNum" style="border-left:none;" placeholder='输入手机号'>
                        <template slot="prepend" style='background-color: #fff;'>
                          <i class="show left inputIconUser"><img src="/static/img/signPhone.png" alt=""></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <testSlide ref="signUpSlide" @testOK='signUpOK'/>
                  </el-col>
                  <el-col :span="16" class="br inputBox" style="margin: 20px 0 0 0;">
                    <el-form-item prop="phoneCode">
                      <el-input v-model="signUpForm.phoneCode" style="border-left:none;" placeholder='输入手机验证码'></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" class="b br inputBox signPhonePro cursor right" style="margin: 20px 0 0 0;">发送验证码</el-col>
                </el-row>
              </el-form>
              <!-- 注册 -->
              <el-row class="signInForm">
                <el-col :span="24" class="ft14 errorTips">{{signUpErrorTips}}</el-col>
                <el-col @click.native="signUpBtnHandle" :span="24" class="signBtn txtCenter colorW cursor ft16">注&nbsp;&nbsp;册</el-col>
                <el-col :span="24" class="txtCenter">
                  <el-checkbox v-model="checkbox"></el-checkbox>&nbsp;&nbsp;<span class="signCopyRight ft14">勾选代表你同意《注册声明》《版权声明》</span>
                </el-col>
              </el-row>
            </el-aside>
          </div>
          <!-- 账号信息完善 -->
          <div v-show="infoWrite" class="posAbZ signContainer bgW br">
            <el-aside style="width: 100%;">
              <el-row class="signInForm">
                <el-col :span="24" class="bm2 inputBox color74 ft18" style="line-height: 42px;">账号信息完善</el-col>
                <el-form :label-position="labelPosition" :rules="infoRules" label-width="80px" :model="formLabelAlign">
                  <el-form-item label="邮箱" prop="mail">
                    <el-input v-model="formLabelAlign.mail" placeholder='设置绑定邮箱地址'></el-input>
                  </el-form-item>
                  <el-form-item label="昵称" prop="name">
                    <el-input v-model="formLabelAlign.name" placeholder='设置昵称'></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="formLabelAlign.pwd" placeholder='设置登录密码'></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="surePwd">
                    <el-input type="password" v-model="formLabelAlign.surePwd" placeholder='重复登录密码'></el-input>
                  </el-form-item>
                </el-form>
              </el-row>
              <!-- 登录 -->
              <el-row class="signInForm">
                <el-col :span="24" class="signBtn txtCenter colorW cursor ft16">完成信息填写</el-col>
              </el-row>
            </el-aside>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import testSlide from '@/components/common/testSlide'
// import {testPhoneNum} from '@/api/api.js'
import loginAPI from '@/api/login.js'

export default {
  name: 'Login',
  components: {
    testSlide
  },
  data () {
    return {
      login: '登录页',
      // signInFlag: false,
      // topNavActiveFlag: true,
      activeFlag: true,
      accountFlag: true,
      infoWrite: false,
      checkbox: false,
      signInErrorTips: '',
      signUpErrorTips: '',
      // 表单：登录-->账号登录
      accuntSignForm: {
        name: '',
        password: ''
      },
      accuntSignRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { validator: validatePass, trigger: 'blur' }
        ]
      },
      // 表单：登录-->手机登录
      phoneSignForm: {
        phoneNum: '',
        phoneCode: ''
      },
      phoneSignRules: {
        phoneNum: [
          { required: true, message: '输入合法的手机号', trigger: 'blur' },
          { min: 1, max: 11, message: '输入合法的手机号', validator: this.validatePhone, trigger: 'blur' }
        ],
        phoneCode: [
          { required: true, message: '输入手机验证码', trigger: 'blur' }
        ]
      },
      // 表单：注册-->
      signUpForm: {
        phoneNum: '',
        phoneCode: ''
      },
      signUpFormRules: {
        phoneNum: [
          { required: true, message: '输入合法的手机号', trigger: 'blur' }
        ],
        phoneCode: [
          { required: true, message: '输入合法的手机号', trigger: 'blur' }
        ]
      },
      // 表单：注册-->信息完善
      labelPosition: 'right',
      formLabelAlign: {
        mail: '',
        name: '',
        pwd: '',
        surePwd: ''
      },
      infoRules: {
        mail: [
          { required: true, message: '设置绑定邮箱地址', trigger: 'blur' },
          { message: '请输入正确的邮箱地址', validator: this.validateMail, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '设置昵称', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '设置登录密码', trigger: 'blur' },
          { message: '设置登录密码', validator: this.validatePwd1, trigger: 'blur' }
        ],
        surePwd: [
          { required: true, message: '重复登录密码', trigger: 'blur' },
          { message: '两次输入密码不一致', validator: this.validatePwd2, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    console.log(this.$store.state.count);
    this.$store.dispatch('setCount', 20);
    console.log(this.$store.state.count);
    // this.toggleSign();
    loginAPI.PhoneTest(this.phoneSignForm.phoneNum).then((res) => {
      console.log(this.phoneSignForm.phoneNum);
    }).catch(() => {

    });
  },
  watch: {
    activeFlag (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$refs.signInAccountSlide.slideOrigin();
      }
    },
    accountFlag (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$refs.signInAccountSlide.slideOrigin();
      }
    }
  },
  methods: {
    signInAccountOK (OK) {
      try {
        if (OK === 'OK') {
          console.log('滑动校验OK1！');
          // const APItestPhoneNum = testPhoneNum(this.phoneSignForm.phoneNum);
          console.log(this.phoneSignForm.phoneNum);
          loginAPI.PhoneTest({mobilephone: '15901406291'}).then((res) => {
            console.log(this.phoneSignForm.phoneNum);
          }).catch(() => {});
          // console.log('response:', APItestPhoneNum);
        }
      } catch (err) {
        console.log(err);
      }
    },
    signInPhoneOK (OK) {
      if (OK === 'OK') {
        console.log('滑动校验OK2！');
      } else {
        console.log('滑动校验失败2！');
      }
    },
    signUpOK (OK) {
      if (OK === 'OK') {
        console.log('滑动校验OK3！');
      } else {
        console.log('滑动校验失败3！');
      }
    },
    // ====================表单校验部分===================
    validatePhone (rule, value, callback) {
      console.log(value);
      if (/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确的手机号码'));
      }
    },
    validateMail (rule, value, callback) {
      console.log(value);
      if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
        callback();
      } else {
        callback(Error('请输入正确的邮箱地址'));
      }
    },
    validatePwd1 (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        // if (this.formLabelAlign.pwd !== '') {
        //   this.$refs.formLabelAlign.validateField('pwd');
        // }
        callback();
      }
    },
    validatePwd2 (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formLabelAlign.pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    },
    // ==================表单tab切换 开关控制=====================
    topSignUpHandle () {
      console.log('注册');
      // 输入框中的导航控制
      this.activeFlag = false;
      this.infoWrite = false;
    },
    topSignInHandle () {
      console.log('登录');
      this.activeFlag = true;
      this.infoWrite = false;
    },
    toggleSign () {
      if (this.accountFlag) {
        this.accountFlag = false;
      } else {
        this.accountFlag = true;
      }
    },
    signInHandle () {
      this.activeFlag = true;
    },
    signUpHandle () {
      this.activeFlag = false;
    },
    signUpBtnHandle () {
      this.accountFlag = false;
      this.infoWrite = true;
    }
    // =======================================
  }
}
</script>

<style socped lang="less" type="text/less">
.el-input-group__prepend{background: #fff!important;padding:0 12px 0 5px!important;}
  // @import '../../style/mixin';
  // body {
  //   .loginTop{
  //     background: red;
  //   }
  // }
  .loginTop{
    // .wh(100%, 70px);
    // .bak(#0c0d0d);
    width: 100%;height: 70px;
    background: #0c0d0d;
  }
  .logTopInner{height: 100%;}
  .logo{width: 113px;height: 40px;margin-top: 15px;}
  .signIn, .signUp{width: 112px;height: 40px;margin-top: 15px;}
  .signUpTxt{width:40px;height:30px;line-height: 30px;margin: -15px 0 0 -20px;}
  .backBanner{width: 100%;height: 520px;background: deepskyblue;}
  .signContainer{width: 345px;height: 410px;right: 30px;top: 40px;padding: 15px 40px;}
  .nav{height: 60px;line-height: 60px;font-size: 22px;margin-bottom: 35px;}
  .active{color: #e14668;border-bottom: 3px solid #e14668;}
  .inputBox{height: 41px;margin-bottom: 20px;}
  .inputIconUser{width: 19px;height: 27px;margin: 0 2px 0 6px;}
  .inputIconPhone{width: 21px;height: 29px;margin: 3px 0 0 6px;}
  .inputUserBox{width: 80%;margin-left: 10px;border: none!important;}
  .errorTips{height: 40px;line-height: 40px;color: red;}
  .signBtn{height: 40px;line-height: 40px;background: url("/static/img/signBtn.png");margin: 0 0 10px 0;}
  .signPhonePro{padding-left: 15px;line-height: 42px;color: #474747;font-size: 14px;}
</style>

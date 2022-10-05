export default {
  menu: {
    login: '登录',
    signin: '注册'
  },
  public:{
    cancel:'取消',
    confirm:'确定',
    save:'保存'
  },
  rulesMsg: {
    email: '请填写邮箱地址',
    correct_mail: '请输入正确的邮箱',
    pwd: '请填写登录密码',
    code: '请输入验证码',
    signin_pwd: '请填写密码',
    confirm_pass: '请确认密码',
    different_pass: '密码不相同',
    invited_address: '请输入邀请地址',
  },
  // 登录注册页
  content: {
    select_network: '选择网络',
    wallet_address: '钱包地址',
    email: '邮箱地址',
    pwd: '登录密码',
    not_account: '还没有账户',
    register: '立即注册',
    signin_title: 'EOTC采用严格的邀请注册制',
    send_code: '发送验证码',
    email_code: '邮箱验证码',
    signin_pwd: '密码',
    include: '包含字母、数字 最少8位',
    confirm_pass: '确认密码',
    invitation_code: '邀请码',
    not_required: '非必填',
    read_agree: '我已阅读并同意',
    user_agreement:'用户协议',
    registration:'确定注册',
    have_account:'已有账户',
    to_login:'去登录',
  },
  // 首页
  home:{
    authenticated:'身份已认证',
    start_attestation:'开始认证',
    system_introduction:'系统简介',
    not_bound:'检测到您暂无推荐关系，为了账户安全性请前往绑定推荐关系',
  },
  // 我的页面
  my:{
    unverified:'身份未认证',
    credit_core:'信用分',
    certification_audit:'认证审核',
    community_approval:'社区审批',
    identity_info:'身份信息',
    identity_unver:'未认证',
    under_review:'审核中',
    audit_failure:'审核失败',
    payment:'收付款方式',
    my_comm:'我的社区',
    my_team:'我的团队',
    invite_friends:'邀请好友',
    bind_address:'各公链绑定地址',
    each_item:'绑定各项目'
  },
  // 账号设置
  setup:{
    settings:'账号设置',
    email:'邮箱',
    referrer:'推荐人',
    add:'添加',
    telegram:'电报群',
    set:'设置',
    locality:'所在地',
    tab:'选择',
    change_pass:'修改密码',
    change_email:'修改邮箱',
    logout:'注销',
    setTelegram:'设置电报群',
    input_telegram:'请输入电报地址',
    logout_tip:'退出提示',
    logout_cont:'确定要退出当前账号吗？',
    logout:'退出登录',
    // 我的推荐人页面
    my_referrer:'我的推荐人',
    code:'填写邀请码',
    input_code:'请输入邀请码',
    get_code:'获取邀请码，绑定推荐关系',
    // 修改邮箱
    set_email:'修改邮箱地址',
    new_email:'新邮箱地址',
    input_email:'请输入新邮箱地址',
    new_code:'新邮箱验证码',
    input_code:'请输入新邮箱验证码',
    impower:'授权',
    cimmit_change:'提交修改',
    // 修改密码
    set_pwd:'修改密码',
    new_pwd:'新密码',
    conf_pwd:'确认新密码'
  },
  // 绑定社区(bindRelation)
  bindRelation:{
    tab_locality:'选择所在地',
    user_loc:'使用当前位置',
    loc:'当前位置',
    country:'国家',
    p_c_area:'省市',
    select_site:'选择当前所在地区',
    have_site:'当前地区现有',
    comm_num:'个社区',
    tip:'为了便于线下建立推荐关系请谨慎选择当前所在地，一旦绑定不可更改',
    next:'确认，前往下一步',
    conf_tip:'确认提示',
    conf_cont:'确认后将不可修改关系绑定所地区，确定前往下一步？',
    // bindNation
    search:'请输入搜索关键词',
    // bindCommunity
    site_comm:'所在地社区',
    comm_tip:'为了您的账户安全，请加入所在地的电报群联系管理进行线下建立推荐关系',
    not_more:'没有更多了',
    adbout:'社区简介',
  },
  // 账号注销(logout文件)
  logout:{
    logout:'账号注销',
    write_off:'注销',
    bind_account:'所绑定的账户',
    conf_info:'确定信息',
    imp_reminder:'重要提醒',
    cause:'注销原因',
    //确定信息confInfo
    acc_property:'账号资产',
    conf_tip:'账号资产包括不限于EOTC各个项目账户中的所有资产及奖励',
    give_up:'确定舍弃/已处理',
    next:'下一步',
    acc_dispose:'账户资产处理',
    dis_tip:'确定舍弃或已妥善处理好当前账户中所有的资产及奖励',
    think_again:'我再想想',
    //重要提醒(remind)
    parag1:'注销帐号是不可恢复的操作，操作之前，请确认与帐号相关的所有资产均已进行妥善处理。',
    parag2:'请谨记:注销帐号，你将无法再使用本帐号或找回你添加或绑定的任何内容或信息(即使你使用相同的邮箱再次注册)，包括但不限于',
    parag3:'(1)你将无法登录、使用本帐号，你的团队关系将不存在。',
    parag4:'(2)注销微信帐号前，你需妥善处理账户下所有资金问题。',
    parag5:'(3)你通过账号使用，曾获得的奖励、卡牌、盲盒、权益、资格、订单、优惠等视为你自行放弃，将无法继续使用。你理解并同意，EOTC无法协助你重新恢复前述资产。',
    parag6:'(4)与帐号的所有功能或服务都将无法继续使用。',
    parag7:'(5)在帐号注销期间，如果你的帐号正处于仲裁程序中，EOTC、DAO有权终止你帐号的注销而无需另行得到你的同意。',
    have_read:'我已阅读',
    // 注销原因(reason)
    reason:'请选择注销原因',
    rests:'请简述其他原因',
    conf_off:'确定注销',
    // 确认信息(verifyLogout)
    submit:'提交',
    warn:'警告',
    warn1:'1、注销提交后，EOTC DAO将在48小时内完成注销核查和处理。',
    warn2:'2、注销后，该账户的所有信息均将清除且无法恢复，请谨慎操作。',
    warn3:'3、注销成功后，该邮箱可以重新注册为一个全新的账号，不包含注销前的任何信息。',
    // 账号注销倒计时(logoutCountdown)
    title:'账号注销期',
    count_down:'后完成注销',
    waive:'放弃注销'
  },
  
}
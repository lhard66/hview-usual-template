const rules = {
  // 必填
  required: {
    required: true,
    whitespace: true,
    message: '必须输入',
  },
  // 必填（用于input-price）
  required_price: {
    required: true,
    whitespace: true,
    pattern: /[1-9]/,
    message: '必须输入',
  },
  // 必填（用于text、select、date等的group组件）
  required_group: {
    type: 'object',
    required: true,
    message: '必须输入',
    fields: {
      start: { required: true, whitespace: true, message: '必须输入', },
      end: { required: true, whitespace: true, message: '必须输入', },
    },
  },
  // 半角数字
  digit: {
    pattern: /^\d*$/,
    message: '只能输入数字',
  },
  // 半角英数字
  alphaNum: {
    pattern: /^[a-z0-9]*$/i,
    message: '只能输入英文字母或数字',
  },
  // 正整数
  positiveInt: {
    pattern: /^[1-9]\d*$/,
    message: '必须是正整数',
  },
  // 非负整数
  nonNegativeInt: {
    pattern: /^([1-9]\d*|0)$/,
    message: '必须是正整数或0',
  },
  // 正数
  positive: {
    pattern: /(^[1-9]\d*(\.\d+)?$)|(^0\.\d*[1-9]\d*$)/,
    message: '必须是正数',
  },
  // 非负数
  nonNegative: {
    pattern: /^([1-9]\d*|0)(\.\d+)?$/,
    message: '必须是正数或0',
  },
  // 非特殊字符
  noSpecial: {
    pattern: /^[^\\/"'“”’‘[\]{}]*$/,
    message: '禁止输入特殊字符',
  },
  // 非中文字符
  noCharacter: {
    pattern: /^[^\u4e00-\u9fa5]*$/,
    message: '禁止输入中文字符',
  },
  // 名称：统一50字，如：菜品名称、分类名称、店铺名称、集团名称、组织名称等
  stringLength: {
    min: 0,
    max: 50,
    message: '字符长度应在[min]到[max]之间',
  },
  // 描述或备注等最多输入200个字符
  desc: {
    min: 0,
    max: 200,
    message: '字符长度不能超过200',
  },
  // 手机号码
  phone: {
    // pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|19[9]|14[57])[0-9]{8}$/,
    pattern: /^(0|86|17951)?1[0-9]{10}$/,
    message: '无效的手机号码',
  },
  // 邮箱地址
  email: {
    pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    message: '无效的邮箱地址',
  },
  // 身份证号码
  idcard: {
    // eslint-disable-next-line max-len
    pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
    message: '无效的身份证号码',
  },
};

export function addRules(addedRules = {}) {
  Object.assign(rules, addedRules);
}

export default rules;

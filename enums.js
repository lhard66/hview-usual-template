export const MODAL_STATUS = { // TODO: deprecated
  INSERT: 1, // 新增
  UPDATE: 2, // 修改
  LOOKUP: 3, // 浏览
};

export const PAGE_STATUS = {
  INSERT: 1, // 新增
  UPDATE: 2, // 修改
  LOOKUP: 3, // 浏览
};

export const LOCATION_TYPE = {
  PREVIOUS: '1', // 上一笔
  NEXT: '2', // 下一笔
  FIRST: '3', // 首笔
  LAST: '4', // 末笔
};

// 凭证详情的来源页面
export const VC_DETAIL_SRC_PAGE = {
  // FILL: '1', // 填制凭证
  APPROVE: '2', // 凭证审核
  CASHIER: '3', // 出纳签字
  ACCOUNT: '4', // 凭证记账
};

// 处理类型：1A.审核 1B.取消审核 2A.出纳 2B.取消出纳 3A.记账 3B.取消记账 4A.标错 4B.取消标错 5A.作废 5B.取消作废
export const VOUCHER_HANDLE_TYPE = {
  APPROVE: '1A',
  CANCEL_APPROVE: '1B',
  CASHIER: '2A',
  CANCEL_CASHIER: '2B',
  ACCOUNT: '3A',
  CANCEL_ACCOUNT: '3B',
  MARK_ERROR: '4A',
  CANCEL_MARK_ERROR: '4B',
  ABANDON: '5A',
  CANCEL_ABANDON: '5B',
};

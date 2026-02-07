// 新版菜单配置 - TP(租户) + SP(服务提供商) 双角色体系
// 工作台 → 客户 → 交易 → 清结算 → 资金 → 渠道 → 合作伙伴 → 开发者 → 工单 → 数据 → 风控合规
// Settings(右上角齿轮) / 个人中心(右上角头像)
// 
// scope说明:
//   global   - 全局查询，所有TP可见（只读）
//   owned    - 仅对会员归属本机构的商户可操作
//   sp       - 仅SP可见/可操作
//   licensed - 仅持牌机构可见
//
// 核心原则: TP能看(查询)，SP能操作(处理)
// 查询跟着业务主体走，处理跟着能力走

const centerMenus = {
    dashboard: {
        name: '工作台',
        groups: [
            { label: '概览', items: [
                { name: '数据概览', icon: 'dashboard', active: true },
                { name: '实时监控', icon: 'activity' },
                { name: '业务看板', icon: 'bar-chart' }
            ]},
            { label: '待办事项', items: [
                { name: '待审核工单', icon: 'file', badge: '3' },
                { name: '待处理交易', icon: 'clock', badge: '5' },
                { name: '到期提醒', icon: 'bell', badge: '2' }
            ]},
            { label: '快捷操作', items: [
                { name: '发起付款', icon: 'upload' },
                { name: '新建商户', icon: 'user-plus' },
                { name: '创建订单', icon: 'plus-circle' }
            ]}
        ]
    },
    product: {
        name: '产品中心',
        groups: [
            { label: '产品管理', scope: 'sp', items: [
                { name: '产品管理', icon: 'settings' }
            ]},
            { label: '产品市场', items: [
                { name: '浏览产品', icon: 'grid' },
                { name: '已签约产品', icon: 'package' }
            ]}
        ]
    },
    client: {
        name: '客户中心',
        groups: [
            { label: '商户查询', scope: 'global', items: [
                { name: '商户查询', icon: 'search', active: true }
            ]},
            { label: '商户配置', scope: 'owned', items: [
                { name: '商户产品配置', icon: 'package' },
                { name: '商户费率配置', icon: 'percent' },
                { name: '商户汇率配置', icon: 'trending-up' }
            ]},
            { label: '商户余额查询', scope: 'global', items: [
                { name: '余额查询', icon: 'wallet' },
                { name: '余额变动流水', icon: 'list' }
            ]},
            { label: '商户结算/返点查询', scope: 'global', items: [
                { name: '结算单查询', icon: 'file-text' },
                { name: '返点/分佣查询', icon: 'dollar-sign' },
                { name: '商户对账单下载', icon: 'download' }
            ]}
        ]
    },
    transaction: {
        name: '交易中心',
        groups: [
            { label: '交易查询', scope: 'global', items: [
                { name: 'VA账户', icon: 'credit-card', active: true },
                { name: '收款单', icon: 'download' },
                { name: '付款单', icon: 'upload' },
                { name: '换汇单', icon: 'repeat' },
                { name: 'Ramp单', icon: 'zap' },
                { name: '充提币单', icon: 'bitcoin' },
                { name: 'VCC单', icon: 'credit-card' },
                { name: '收单单', icon: 'tag' }
            ]},
            { label: '交易监控', scope: 'sp', items: [
                { name: '实时交易大盘', icon: 'activity' },
                { name: '异常交易告警', icon: 'alert-triangle', badge: '2' },
                { name: '成功率监控', icon: 'percent' }
            ]},
            { label: '差错处理', scope: 'sp', items: [
                { name: '调单管理', icon: 'clipboard' },
                { name: '退款管理', icon: 'refresh' },
                { name: '拒付管理', icon: 'x-circle' }
            ]},
            { label: '交易背景', scope: 'global', items: [
                { name: '订单管理', icon: 'clipboard' },
                { name: '订单文件', icon: 'file' },
                { name: '店铺管理', icon: 'store' }
            ]}
        ]
    },
    settlement: {
        name: '清结算中心',
        requireSP: true,
        groups: [
            { label: '计费管理', scope: 'sp', items: [
                { name: '产品基本费率', icon: 'dollar-sign', active: true },
                { name: '费率模板管理', icon: 'sliders' },
                { name: '计费规则', icon: 'settings' }
            ]},
            { label: '返点/分佣规则', scope: 'sp', items: [
                { name: '返点规则配置', icon: 'sliders' },
                { name: '分佣规则配置', icon: 'settings' }
            ]},
            { label: '汇率配置', scope: 'sp', items: [
                { name: '汇率MK配置', icon: 'trending-up' },
                { name: '汇率路由规则', icon: 'git-branch' },
                { name: '汇率查询', icon: 'search' }
            ]},
            { label: '对账管理', scope: 'sp', items: [
                { name: '商户对账', icon: 'check-square' },
                { name: '渠道对账', icon: 'check-square' },
                { name: '对账差异', icon: 'alert-triangle' },
                { name: '差异处理', icon: 'edit' }
            ]},
            { label: '清分管理', scope: 'sp', items: [
                { name: '清算报表', icon: 'bar-chart' },
                { name: '手续费计算', icon: 'dollar-sign' },
                { name: '分润计算', icon: 'pie-chart' },
                { name: '返点计算', icon: 'percent' },
                { name: '分佣计算', icon: 'percent' }
            ]},
            { label: '结算管理', scope: 'sp', items: [
                { name: '商户结算单', icon: 'file-text' },
                { name: '结算执行', icon: 'check-circle' },
                { name: '结算记录', icon: 'clock' }
            ]},
            { label: '商户余额管理', scope: 'sp', items: [
                { name: '商户余额汇总', icon: 'wallet' },
                { name: '余额变动流水', icon: 'list' },
                { name: '余额调账', icon: 'edit' },
                { name: '余额冻结/解冻', icon: 'lock' }
            ]},
            { label: '交易单处理', scope: 'sp', items: [
                { name: '商户单管理', icon: 'file-text' },
                { name: '交易单管理', icon: 'clipboard' },
                { name: '渠道单管理', icon: 'link' },
                { name: '订单取消', icon: 'x-circle' },
                { name: '手动换渠道', icon: 'repeat' },
                { name: '手动补单', icon: 'plus-circle' }
            ]},
            { label: '账务核算', scope: 'sp', items: [
                { name: '总账校验', icon: 'layers' },
                { name: '日切管理', icon: 'calendar' }
            ]}
        ]
    },
    treasury: {
        name: '资金中心',
        requireSP: true,
        groups: [
            { label: '资金账户', scope: 'sp', items: [
                { name: '账户总览', icon: 'wallet', active: true },
                { name: '多渠道账户', icon: 'layers' },
                { name: '资金流水', icon: 'list' },
                { name: '可用/冻结余额', icon: 'lock' }
            ]},
            { label: '资金调拨', scope: 'sp', items: [
                { name: '跨账户调拨', icon: 'repeat' },
                { name: '调拨记录', icon: 'file-text' },
                { name: '调拨审核', icon: 'check-circle' }
            ]},
            { label: '外汇管理', scope: 'sp', items: [
                { name: '汇率监控', icon: 'eye' },
                { name: '平盘策略', icon: 'shield' },
                { name: '锁汇管理', icon: 'lock' }
            ]},
            { label: '资金运营', scope: 'sp', items: [
                { name: '头寸管理', icon: 'trending-up' },
                { name: '流动性管理', icon: 'activity' },
                { name: '资金预测', icon: 'bar-chart' }
            ]},
            { label: '备付金管理', scope: 'sp', items: [
                { name: '备付金监控', icon: 'shield' },
                { name: '备付金报表', icon: 'file-text' }
            ]}
        ]
    },
    channel: {
        name: '渠道中心',
        requireSP: true,
        groups: [
            { label: '渠道管理', scope: 'sp', items: [
                { name: '渠道列表', icon: 'list', active: true },
                { name: '银行渠道', icon: 'building' },
                { name: '卡组织', icon: 'credit-card' },
                { name: '本地支付', icon: 'globe' }
            ]},
            { label: '渠道配置', scope: 'sp', items: [
                { name: '路由规则', icon: 'git-branch' },
                { name: '渠道费率', icon: 'percent' },
                { name: '渠道限额', icon: 'shield' }
            ]},
            { label: '渠道监控', scope: 'sp', items: [
                { name: '成功率监控', icon: 'activity' },
                { name: '延迟监控', icon: 'clock' },
                { name: '渠道状态', icon: 'check-circle' }
            ]}
        ]
    },
    partner: {
        name: '合作伙伴中心',
        groups: [
            { label: '我的销售代理', scope: 'owned', items: [
                { name: '销售代理管理', icon: 'users', active: true },
                { name: '代理产品授权', icon: 'package' },
                { name: '代理商签约', icon: 'file-text' }
            ]},
            { label: '销售代理返点', scope: 'owned', items: [
                { name: '返点规则配置', icon: 'sliders' },
                { name: '代理业绩看板', icon: 'bar-chart' },
                { name: '返点明细', icon: 'list' }
            ]},
            { label: '销售代理分佣结算', scope: 'owned', items: [
                { name: '分佣账单', icon: 'file-text' },
                { name: '分佣明细', icon: 'list' },
                { name: '代理商结算', icon: 'calendar' },
                { name: '代理商付款', icon: 'credit-card' }
            ]},
            { label: '机构伙伴', scope: 'owned', items: [
                { name: '机构伙伴管理', icon: 'building' },
                { name: '机构签约产品', icon: 'package' }
            ]},
            { label: '机构佣金配置', scope: 'owned', items: [
                { name: '模版配置', icon: 'sliders' },
                { name: '机构佣金配置', icon: 'settings' }
            ]},
            { label: '机构佣金结算', scope: 'owned', items: [
                { name: '机构分佣账单', icon: 'file-text' },
                { name: '机构分佣明细', icon: 'list' },
                { name: '机构结算单', icon: 'calendar' }
            ]},
            { label: '我代理的（上游）', scope: 'global', items: [
                { name: '上游服务商列表', icon: 'globe' },
                { name: '代理产品查看', icon: 'package' },
                { name: '我的返点/佣金', icon: 'dollar-sign' },
                { name: '上游对账', icon: 'check-square' }
            ]}
        ]
    },
    developer: {
        name: '开发者中心',
        groups: [
            { label: 'API接入', items: [
                { name: 'API文档', icon: 'file-text', active: true },
                { name: '接口列表', icon: 'list' },
                { name: 'SDK下载', icon: 'download' }
            ]},
            { label: '密钥管理', items: [
                { name: 'API密钥', icon: 'key' },
                { name: '证书管理', icon: 'shield' }
            ]},
            { label: '回调配置', items: [
                { name: 'Webhooks', icon: 'link' },
                { name: '回调日志', icon: 'terminal' }
            ]},
            { label: '测试工具', items: [
                { name: 'API调试', icon: 'code' },
                { name: '沙箱环境', icon: 'box' }
            ]}
        ]
    },
    ticket: {
        name: '工单中心',
        groups: [
            { label: '工单列表', items: [
                { name: '全部工单', icon: 'file', active: true },
                { name: '待审核', icon: 'clock', badge: '3' },
                { name: '处理中', icon: 'loader' },
                { name: '已完成', icon: 'check-circle' },
                { name: '已拒绝', icon: 'x-circle' }
            ]},
            { label: '工单类型', items: [
                { name: '商户开户', icon: 'user-plus' },
                { name: '费率变更', icon: 'percent' },
                { name: '限额调整', icon: 'shield' },
                { name: '产品签约', icon: 'package' }
            ]},
            { label: '工单设置', items: [
                { name: '审批流程', icon: 'git-branch' },
                { name: '工单模板', icon: 'file-text' }
            ]}
        ]
    },
    data: {
        name: '数据中心',
        groups: [
            { label: '交易报表', items: [
                { name: '交易统计', icon: 'bar-chart', active: true },
                { name: '交易趋势', icon: 'trending-up' },
                { name: '成功率分析', icon: 'percent' }
            ]},
            { label: '商户报表', items: [
                { name: '商户分析', icon: 'users' },
                { name: '商户排行', icon: 'award' },
                { name: '商户增长', icon: 'user-plus' }
            ]},
            { label: '财务报表', items: [
                { name: '收入报表', icon: 'dollar-sign' },
                { name: '分佣报表', icon: 'pie-chart' },
                { name: '成本报表', icon: 'file-text' }
            ]},
            { label: '渠道报表', items: [
                { name: '渠道成功率', icon: 'activity' },
                { name: '渠道成本对比', icon: 'bar-chart' }
            ]},
            { label: '代理报表', items: [
                { name: '代理商业绩', icon: 'award' },
                { name: '返点统计', icon: 'dollar-sign' }
            ]},
            { label: '数据导出', items: [
                { name: '报表导出', icon: 'download' },
                { name: '定时报表', icon: 'clock' }
            ]}
        ]
    },
    risk: {
        name: '风控合规中心',
        groups: [
            { label: '商户审核', scope: 'licensed', items: [
                { name: '商户审核', icon: 'user-check', active: true, badge: '3' },
                { name: '审核记录', icon: 'file-text' }
            ]},
            { label: 'KYC/KYB', scope: 'licensed', items: [
                { name: '商户认证', icon: 'user-check' },
                { name: '认证审核', icon: 'check-square' },
                { name: '定期复核', icon: 'clock' }
            ]},
            { label: '交易风控', scope: 'sp', items: [
                { name: '风控规则', icon: 'shield' },
                { name: '黑白名单', icon: 'list' },
                { name: '风险预警', icon: 'alert-triangle', badge: '5' },
                { name: '拦截记录', icon: 'x-circle' }
            ]},
            { label: '交易监控', scope: 'sp', items: [
                { name: '实时监控', icon: 'activity' },
                { name: '异常交易', icon: 'alert-triangle' },
                { name: '人工复核', icon: 'user-check' }
            ]},
            { label: '合规管理', scope: 'sp', items: [
                { name: 'AML监控', icon: 'eye' },
                { name: '制裁名单', icon: 'alert-circle' },
                { name: '合规报告', icon: 'file-text' }
            ]},
            { label: '拒付管理', scope: 'sp', items: [
                { name: '拒付列表', icon: 'x-circle' },
                { name: '拒付率监控', icon: 'percent' },
                { name: '差错处理', icon: 'edit' }
            ]}
        ]
    },
    download: {
        name: '下载中心',
        groups: [
            { label: '下载管理', items: [
                { name: '下载记录', icon: 'download', active: true },
                { name: '导出任务', icon: 'clock' }
            ]}
        ]
    },
    settings: {
        name: 'Settings',
        groups: [
            { label: '企业信息', items: [
                { name: '公司信息', icon: 'building', active: true },
                { name: '营业执照', icon: 'file-text' },
                { name: '联系方式', icon: 'mail' }
            ]},
            { label: '组织管理', items: [
                { name: '部门管理', icon: 'git-branch' },
                { name: '成员管理', icon: 'users' },
                { name: '角色管理', icon: 'shield' },
                { name: '权限配置', icon: 'key' }
            ]},
            { label: '通知与集成', items: [
                { name: '通知设置', icon: 'bell' },
                { name: '邮件模板', icon: 'mail' },
                { name: '第三方集成', icon: 'link' }
            ]},
            { label: '系统配置', items: [
                { name: '时区/货币/语言', icon: 'globe' },
                { name: '业务配置', icon: 'sliders' }
            ]},
            { label: '审计与日志', items: [
                { name: '操作日志', icon: 'file-text' },
                { name: '审计追踪', icon: 'eye' }
            ]}
        ]
    }
};

// 图标SVG
const icons = {
    'dashboard': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>',
    'activity': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    'file': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    'search': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
    'grid': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    'package': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
    'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'file-text': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    'refresh': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
    'plus-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
    'settings': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    'user-plus': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
    'user': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    'dollar-sign': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    'trending-up': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    'credit-card': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
    'download': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    'upload': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    'repeat': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
    'zap': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    'bitcoin': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"/></svg>',
    'tag': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5Z"/><path d="M6 9.01V9"/></svg>',
    'clipboard': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
    'store': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/></svg>',
    'percent': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
    'sliders': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>',
    'calendar': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    'wallet': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>',
    'list': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
    'check-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    'building': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    'git-branch': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>',
    'shield': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    'layers': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    'check-square': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    'alert-triangle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    'bar-chart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    'pie-chart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>',
    'x-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    'key': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>',
    'link': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    'terminal': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',
    'lock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    'bell': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    'eye': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    'alert-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    'user-check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>',
    'folder': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    'globe': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    'award': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    'loader': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>',
    'edit': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    'code': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    'box': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    'image': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    'mail': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    'handshake': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
};

// 进入中心
function enterCenter(center) {
    const config = centerMenus[center];
    if (!config) return;

    document.getElementById('currentCenterName').textContent = config.name;

    // 生成侧边栏菜单
    let menuHtml = '';
    config.groups.forEach(group => {
        menuHtml += `<div class="menu-group"><div class="menu-label">${group.label}</div>`;
        group.items.forEach(item => {
            const icon = icons[item.icon] || icons['file'];
            const activeClass = item.active ? ' active' : '';
            const badge = item.badge ? `<span class="badge">${item.badge}</span>` : '';
            menuHtml += `<div class="menu-item${activeClass}" data-page="${item.name}">${icon}${item.name}${badge}</div>`;
        });
        menuHtml += '</div>';
    });
    document.getElementById('detailSidebar').innerHTML = menuHtml;

    // 产品中心特殊处理：默认显示产品市场
    if (center === 'product') {
        document.getElementById('detailMain').innerHTML = `
            <div class="page-header">
                <div class="breadcrumb">
                    <a href="#" onclick="goBack()">首页</a> / <span>${config.name}</span>
                </div>
                <h1 class="page-title">${config.name}</h1>
                <p class="page-desc">探索和管理您的产品服务</p>
            </div>
            <div class="product-container">
                ${renderProductList('all')}
            </div>
        `;
    } else {
        // 默认内容
        document.getElementById('detailMain').innerHTML = `
            <div class="page-header">
                <div class="breadcrumb">
                    <a href="#" onclick="goBack()">首页</a> / <span>${config.name}</span>
                </div>
                <h1 class="page-title">${config.name}</h1>
                <p class="page-desc">管理您的${config.name}相关业务</p>
            </div>
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">${config.groups[0]?.items[0]?.name || '概览'}</h2>
                </div>
                <p style="color: var(--text-secondary); padding: 40px; text-align: center;">
                    ${config.name}内容区域，点击左侧菜单查看详情
                </p>
            </div>
        `;
    }

    document.getElementById('centerDetail').classList.add('show');
}

// 返回首页
function goBack() {
    document.getElementById('centerDetail').classList.remove('show');
}

// 菜单点击事件 - 路由到对应渲染函数
document.addEventListener('click', function(e) {
    if (e.target.closest('.menu-item') && e.target.closest('.detail-sidebar')) {
        const menuItem = e.target.closest('.menu-item');
        const items = document.querySelectorAll('.detail-sidebar .menu-item');
        items.forEach(item => item.classList.remove('active'));
        menuItem.classList.add('active');

        const pageName = menuItem.dataset.page;
        const centerName = document.getElementById('currentCenterName').textContent;

        // 产品市场菜单切换
        if (pageName === '浏览产品') {
            filterProducts('all');
            return;
        } else if (pageName === '已签约产品') {
            filterProducts('signed');
            return;
        }

        // 路由分发
        const pageRenderers = {
            '机构伙伴查询': renderAgencyQuery,
            '机构签约产品': renderAgencyProductQuery,
            '模版配置': renderTemplateConfig,
            '机构佣金配置': renderAgencyRebateConfig,
        };

        if (pageRenderers[pageName]) {
            pageRenderers[pageName]();
        } else {
            // 默认占位页面
            const mainContent = document.getElementById('detailMain');
            mainContent.innerHTML = `
                <div class="page-header">
                    <div class="breadcrumb">
                        <a href="#" onclick="goBack()">首页</a> / <span>${centerName}</span> / <span>${pageName}</span>
                    </div>
                    <h1 class="page-title">${pageName}</h1>
                    <p class="page-desc">管理您的${pageName}相关业务</p>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">${pageName}</h2>
                    </div>
                    <p style="color: var(--text-secondary); padding: 40px; text-align: center;">
                        ${pageName} 页面内容开发中...
                    </p>
                </div>
            `;
        }
    }
});

// ========== 机构伙伴查询 ==========
function renderAgencyQuery() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" onclick="goBack()">首页</a> / <span>合作伙伴中心</span> / <span>机构伙伴查询</span>
            </div>
            <h1 class="page-title">机构伙伴查询</h1>
            <p class="page-desc">查询和管理机构伙伴信息</p>
        </div>
        
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">机构伙伴ID</label>
                        <input type="text" placeholder="请输入机构伙伴ID" id="agencyId" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">机构名称</label>
                        <input type="text" placeholder="请输入机构名称" id="agencyName" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">身份类型</label>
                        <select id="identityType" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="institution">机构</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">状态</label>
                        <select id="agencyStatus" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="active">正常</option>
                            <option value="suspended">暂停</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">来源</label>
                        <select id="agencySource" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="EX">EX</option>
                            <option value="Direct">直接签约</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">签约时间</label>
                        <input type="date" id="signDate" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="searchAgencies()" style="padding: 8px 20px; background: var(--accent); color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="resetAgencyForm()" style="padding: 8px 20px; background: white; color: var(--text-secondary); border: 1px solid var(--border); border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">机构伙伴列表</h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="exportAgencyData()" style="padding: 6px 12px; background: white; border: 1px solid var(--border); border-radius: 6px; font-size: 13px; cursor: pointer; color: var(--text-secondary);">导出</button>
                    <button onclick="renderAgencyQuery()" style="padding: 6px 12px; background: white; border: 1px solid var(--border); border-radius: 6px; font-size: 13px; cursor: pointer; color: var(--text-secondary);">刷新</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: var(--bg-hover);">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">机构伙伴ID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">机构名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">身份类型</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">状态</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">签约时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">来源</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">创建时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">操作</th>
                        </tr>
                    </thead>
                    <tbody id="agencyTableBody">
                        ${renderAgencyTableRows()}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderAgencyTableRows() {
    const mockData = [
        { id: 'AGT001', name: '深圳科技有限公司', identityType: '机构', status: 'active', signDate: '2024-01-16', source: 'EX', createTime: '2024-01-10 10:30:00' },
        { id: 'AGT002', name: '上海贸易集团', identityType: '机构', status: 'active', signDate: '2024-02-20', source: 'EX', createTime: '2024-02-15 14:20:00' },
        { id: 'AGT003', name: '北京投资公司', identityType: '机构', status: 'suspended', signDate: '2023-12-05', source: 'Direct', createTime: '2023-12-01 09:15:00' },
        { id: 'AGT004', name: '广州电商平台', identityType: '机构', status: 'active', signDate: '2024-03-10', source: 'EX', createTime: '2024-03-05 16:45:00' },
        { id: 'AGT005', name: '杭州金融服务', identityType: '机构', status: 'active', signDate: '2024-01-25', source: 'EX', createTime: '2024-01-20 11:00:00' }
    ];
    
    return mockData.map(item => `
        <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 16px; font-size: 14px;">${item.id}</td>
            <td style="padding: 16px; font-size: 14px;">${item.name}</td>
            <td style="padding: 16px; font-size: 14px;">${item.identityType}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${item.status === 'active' ? 'var(--success-bg)' : 'var(--warning-bg)'}; color: ${item.status === 'active' ? 'var(--success)' : 'var(--warning)'};">
                    ${item.status === 'active' ? '正常' : '暂停'}
                </span>
            </td>
            <td style="padding: 16px; font-size: 14px;">${item.signDate}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: var(--accent-bg); color: var(--accent);">${item.source}</span>
            </td>
            <td style="padding: 16px; font-size: 14px;">${item.createTime}</td>
            <td style="padding: 16px; font-size: 14px;">
                <button onclick="viewAgencyDetail('${item.id}')" style="background: none; border: none; color: var(--accent); cursor: pointer; font-size: 14px; text-decoration: underline;">详情</button>
            </td>
        </tr>
    `).join('');
}

function searchAgencies() { alert('搜索功能开发中'); }
function resetAgencyForm() {
    ['agencyId','agencyName','identityType','agencyStatus','agencySource','signDate'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}
function exportAgencyData() { alert('导出功能开发中'); }
function viewAgencyDetail(id) { alert('查看机构伙伴详情: ' + id); }

// ========== 机构签约产品 ==========
function renderAgencyProductQuery() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" onclick="goBack()">首页</a> / <span>合作伙伴中心</span> / <span>机构签约产品</span>
            </div>
            <h1 class="page-title">机构签约产品</h1>
            <p class="page-desc">查询机构伙伴的签约产品信息</p>
        </div>
        
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">机构代理ID</label>
                        <input type="text" placeholder="请输入机构代理ID" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">机构名称</label>
                        <input type="text" placeholder="请输入机构名称" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">身份类型</label>
                        <select style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="institution">机构</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">签约产品</label>
                        <input type="text" placeholder="请输入产品名称" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">签约方式</label>
                        <select style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="direct">机构直签</option>
                            <option value="agent">EX总代</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">签约状态</label>
                        <select style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="active">生效中</option>
                            <option value="pending">即将到期</option>
                            <option value="expired">已过期</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="alert('查询功能开发中')" style="padding: 8px 20px; background: var(--accent); color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置功能开发中')" style="padding: 8px 20px; background: white; color: var(--text-secondary); border: 1px solid var(--border); border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">产品签约列表</h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('导出功能开发中')" style="padding: 6px 12px; background: white; border: 1px solid var(--border); border-radius: 6px; font-size: 13px; cursor: pointer; color: var(--text-secondary);">导出</button>
                    <button onclick="renderAgencyProductQuery()" style="padding: 6px 12px; background: white; border: 1px solid var(--border); border-radius: 6px; font-size: 13px; cursor: pointer; color: var(--text-secondary);">刷新</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: var(--bg-hover);">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">机构代理ID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">机构名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">身份类型</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">签约产品</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">签约方式</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">签约有效期</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">签约状态</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">创建时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderAgencyProductRows()}
                    </tbody>
                </table>
            </div>
            <div style="display: flex; justify-content: center; align-items: center; gap: 8px; padding: 16px;">
                <button style="padding: 6px 12px; border: 1px solid var(--border); background: white; border-radius: 6px; cursor: pointer; font-size: 14px;">上一页</button>
                <button style="padding: 6px 12px; border: 1px solid var(--accent); background: var(--accent); color: white; border-radius: 6px; cursor: pointer; font-size: 14px;">1</button>
                <button style="padding: 6px 12px; border: 1px solid var(--border); background: white; border-radius: 6px; cursor: pointer; font-size: 14px;">2</button>
                <button style="padding: 6px 12px; border: 1px solid var(--border); background: white; border-radius: 6px; cursor: pointer; font-size: 14px;">3</button>
                <button style="padding: 6px 12px; border: 1px solid var(--border); background: white; border-radius: 6px; cursor: pointer; font-size: 14px;">下一页</button>
            </div>
        </div>
    `;
}

function renderAgencyProductRows() {
    const mockData = [
        { id: 'AGT001', name: '深圳科技有限公司', identityType: '机构', product: 'Crypto Collection', method: '机构直签', validity: '2024-01-15 ~ 2025-01-15', status: 'active', createTime: '2024-01-10 10:30:00' },
        { id: 'AGT001', name: '深圳科技有限公司', identityType: '机构', product: 'Fiat VA Collection', method: 'EX总代', validity: '2024-02-01 ~ 2025-02-01', status: 'active', createTime: '2024-01-25 14:20:00' },
        { id: 'AGT002', name: '上海贸易集团', identityType: '机构', product: 'Crypto Payment', method: '机构直签', validity: '2024-03-01 ~ 2024-12-31', status: 'pending', createTime: '2024-02-20 16:45:00' },
        { id: 'AGT003', name: '北京投资公司', identityType: '机构', product: 'Virtual Card Issuing', method: 'EX总代', validity: '2023-06-01 ~ 2024-06-01', status: 'expired', createTime: '2023-05-20 11:00:00' },
        { id: 'AGT004', name: '广州电商平台', identityType: '机构', product: 'On/Off Ramp', method: '机构直签', validity: '2024-04-01 ~ 2025-04-01', status: 'active', createTime: '2024-03-25 09:30:00' }
    ];
    
    return mockData.map(item => `
        <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 16px; font-size: 14px;">${item.id}</td>
            <td style="padding: 16px; font-size: 14px;">${item.name}</td>
            <td style="padding: 16px; font-size: 14px;">${item.identityType}</td>
            <td style="padding: 16px; font-size: 14px;">${item.product}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: var(--accent-bg); color: var(--accent);">${item.method}</span>
            </td>
            <td style="padding: 16px; font-size: 14px;">${item.validity}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${item.status === 'active' ? 'var(--success-bg)' : item.status === 'pending' ? 'var(--warning-bg)' : 'var(--danger-bg)'}; color: ${item.status === 'active' ? 'var(--success)' : item.status === 'pending' ? 'var(--warning)' : 'var(--danger)'};">
                    ${item.status === 'active' ? '生效中' : item.status === 'pending' ? '即将到期' : '已过期'}
                </span>
            </td>
            <td style="padding: 16px; font-size: 14px;">${item.createTime}</td>
            <td style="padding: 16px; font-size: 14px;">
                <button onclick="alert('查看详情: ${item.id}')" style="background: none; border: none; color: var(--accent); cursor: pointer; font-size: 14px; text-decoration: underline;">详情</button>
            </td>
        </tr>
    `).join('');
}

// ========== 模版配置 ==========
function renderTemplateConfig() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" onclick="goBack()">首页</a> / <span>合作伙伴中心</span> / <span>模版配置</span>
            </div>
            <h1 class="page-title">模版配置</h1>
            <p class="page-desc">管理返点模版配置</p>
        </div>
        
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">模版名称</label>
                        <input type="text" placeholder="请输入模版名称" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">签约产品</label>
                        <input type="text" placeholder="请输入产品名称" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">创建时间</label>
                        <input type="date" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="alert('查询功能开发中')" style="padding: 8px 20px; background: var(--accent); color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置功能开发中')" style="padding: 8px 20px; background: white; color: var(--text-secondary); border: 1px solid var(--border); border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
            ${renderTemplateCards()}
        </div>
    `;
}

function renderTemplateCards() {
    const templates = [
        { name: '标准收款模版', product: 'Crypto Collection', date: '2024-01-15', usage: '12 使用' },
        { name: '法币VA收款模版', product: 'Fiat VA Collection', date: '2024-02-20', usage: '8 使用' },
        { name: '加密支付模版', product: 'Crypto Payment', date: '2024-03-10', usage: '15 使用' },
        { name: '虚拟卡发卡模版', product: 'Virtual Card Issuing', date: '2024-03-25', usage: '6 使用' },
        { name: '出入金模版', product: 'On/Off Ramp', date: '2024-04-05', usage: '10 使用' },
        { name: '商级收款模版', product: 'Crypto Collection', date: '2024-04-15', usage: '4 使用' }
    ];
    
    return templates.map(template => `
        <div class="card" style="position: relative;">
            <div style="position: absolute; top: 12px; right: 12px; display: flex; gap: 8px;">
                <button onclick="alert('编辑模版: ${template.name}')" style="padding: 4px 8px; background: white; border: 1px solid var(--border); border-radius: 6px; cursor: pointer;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button onclick="alert('删除模版: ${template.name}')" style="padding: 4px 8px; background: white; border: 1px solid var(--border); border-radius: 6px; cursor: pointer;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
            <div style="padding: 24px; padding-top: 48px;">
                <div style="width: 48px; height: 48px; background: var(--accent); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                    </svg>
                </div>
                <h3 style="font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 8px;">${template.name}</h3>
                <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">${template.product}</p>
                <div style="display: flex; align-items: center; gap: 16px; font-size: 13px; color: var(--text-muted);">
                    <span>${template.date}</span>
                    <span>${template.usage}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ========== 机构佣金配置（返点配置） ==========
function renderAgencyRebateConfig() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" onclick="goBack()">首页</a> / <span>合作伙伴中心</span> / <span>机构佣金配置</span>
            </div>
            <h1 class="page-title">机构佣金配置</h1>
            <p class="page-desc">管理机构伙伴的返点配置</p>
        </div>
        
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">机构伙伴ID</label>
                        <input type="text" placeholder="请输入机构伙伴ID" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">机构名称</label>
                        <input type="text" placeholder="请输入机构名称" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">产品</label>
                        <input type="text" placeholder="请输入产品名称" style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">状态</label>
                        <select style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="active">启用</option>
                            <option value="inactive">停用</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="alert('查询功能开发中')" style="padding: 8px 20px; background: var(--accent); color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置功能开发中')" style="padding: 8px 20px; background: white; color: var(--text-secondary); border: 1px solid var(--border); border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                    <button onclick="alert('新增配置')" style="padding: 8px 20px; background: var(--success); color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500; margin-left: auto;">+ 新增配置</button>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">返点配置列表</h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('导出功能开发中')" style="padding: 6px 12px; background: white; border: 1px solid var(--border); border-radius: 6px; font-size: 13px; cursor: pointer; color: var(--text-secondary);">导出</button>
                    <button onclick="renderAgencyRebateConfig()" style="padding: 6px 12px; background: white; border: 1px solid var(--border); border-radius: 6px; font-size: 13px; cursor: pointer; color: var(--text-secondary);">刷新</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: var(--bg-hover);">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">机构伙伴ID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">机构名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">产品</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">返点比例</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">返点类型</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">状态</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">创建时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: var(--text-secondary); border-bottom: 2px solid var(--border);">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderAgencyRebateRows()}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderAgencyRebateRows() {
    const mockData = [
        { id: 'AGT001', name: '深圳科技有限公司', product: 'Crypto Collection', rate: '0.5%', type: '按交易额', status: 'active', createTime: '2024-01-10 10:30:00' },
        { id: 'AGT002', name: '上海贸易集团', product: 'Fiat VA Collection', rate: '0.3%', type: '按交易额', status: 'active', createTime: '2024-02-15 14:20:00' },
        { id: 'AGT003', name: '北京投资公司', product: 'Crypto Payment', rate: '0.4%', type: '按交易额', status: 'inactive', createTime: '2023-12-01 09:15:00' },
        { id: 'AGT004', name: '广州电商平台', product: 'Virtual Card Issuing', rate: '1.0%', type: '按交易笔数', status: 'active', createTime: '2024-03-05 16:45:00' },
        { id: 'AGT005', name: '杭州金融服务', product: 'On/Off Ramp', rate: '0.6%', type: '按交易额', status: 'active', createTime: '2024-01-20 11:00:00' }
    ];
    
    return mockData.map(item => `
        <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 16px; font-size: 14px;">${item.id}</td>
            <td style="padding: 16px; font-size: 14px;">${item.name}</td>
            <td style="padding: 16px; font-size: 14px;">${item.product}</td>
            <td style="padding: 16px; font-size: 14px; font-weight: 600; color: var(--success);">${item.rate}</td>
            <td style="padding: 16px; font-size: 14px;">${item.type}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${item.status === 'active' ? 'var(--success-bg)' : 'var(--danger-bg)'}; color: ${item.status === 'active' ? 'var(--success)' : 'var(--danger)'};">
                    ${item.status === 'active' ? '启用' : '停用'}
                </span>
            </td>
            <td style="padding: 16px; font-size: 14px;">${item.createTime}</td>
            <td style="padding: 16px; font-size: 14px;">
                <button onclick="alert('编辑配置: ${item.id}')" style="background: none; border: none; color: var(--accent); cursor: pointer; font-size: 14px; text-decoration: underline; margin-right: 8px;">编辑</button>
                <button onclick="alert('删除配置: ${item.id}')" style="background: none; border: none; color: var(--danger); cursor: pointer; font-size: 14px; text-decoration: underline;">删除</button>
            </td>
        </tr>
    `).join('');
}

// 角色切换（保留兼容）
function switchRole(role) {
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.role === role) {
            btn.classList.add('active');
        }
    });

    const badge = document.querySelector('.logo-badge');
    if (badge) {
        const labels = { sp: 'SP', tp: 'TP', both: 'SP + TP' };
        badge.textContent = labels[role];
    }

    document.querySelectorAll('.center-card').forEach(card => {
        const cardRole = card.dataset.role;
        if (role === 'both') {
            card.style.display = '';
        } else if (cardRole === 'both') {
            card.style.display = '';
        } else if (cardRole === role) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// ========== 产品市场数据与渲染 ==========
const products = [
    {
        id: 1, name: '数币收款', nameEn: 'Crypto Collection', provider: 'Blockchain Bank', providerLogo: '🏦',
        category: 'Crypto', description: 'Accept cryptocurrency payments with real-time settlement and multi-currency support.',
        features: ['Support BTC/ETH/USDT', 'Real-time conversion', '24/7 settlement', 'Multi-layer security'],
        price: '0.5% - 1.2%', status: 'active', signedDate: '2025-01-15', expiryDate: '2026-01-15', rating: 4.8, users: 1250, color: '#64748b'
    },
    {
        id: 2, name: '数币付款', nameEn: 'Crypto Payment', provider: 'IPayLinks', providerLogo: '💳',
        category: 'Crypto', description: 'Fast and convenient cryptocurrency payout solution with batch payment support.',
        features: ['Batch payment', 'Auto reconciliation', 'Multi-signature', 'Complete API'],
        price: '0.3% - 0.8%', status: 'active', signedDate: '2025-02-01', expiryDate: '2026-02-01', rating: 4.9, users: 980, color: '#64748b'
    },
    {
        id: 3, name: '法币VA收款', nameEn: 'Fiat VA Collection', provider: 'Circle', providerLogo: '🔵',
        category: 'Fiat', description: 'Virtual account collection service supporting major global fiat currencies.',
        features: ['Global banking network', 'Virtual account management', 'Auto reconciliation', 'Multi-currency'],
        price: '1.0% - 2.0%', status: 'active', signedDate: '2024-12-01', expiryDate: '2025-12-01', rating: 4.7, users: 2100, color: '#64748b'
    },
    {
        id: 4, name: '法币代付出款', nameEn: 'Fiat Payout', provider: 'Blockchain Bank', providerLogo: '🏦',
        category: 'Fiat', description: 'Global fiat payout service supporting bank cards and e-wallets.',
        features: ['Global coverage', 'Real-time payout', 'Compliance', 'Competitive rates'],
        price: '0.8% - 1.5%', status: 'expiring', signedDate: '2024-03-15', expiryDate: '2025-03-15', rating: 4.6, users: 1560, color: '#64748b'
    },
    {
        id: 5, name: '承兑服务', nameEn: 'Acceptance Service', provider: 'IPayLinks', providerLogo: '💳',
        category: 'Exchange', description: 'Professional cryptocurrency acceptance service with deep liquidity.',
        features: ['Deep liquidity', 'Best rates', 'Instant execution', 'Professional support'],
        price: '0.2% - 0.6%', status: 'expiring', signedDate: '2024-04-01', expiryDate: '2025-04-01', rating: 4.9, users: 850, color: '#64748b'
    },
    {
        id: 6, name: 'On/Off Ramp', nameEn: 'On/Off Ramp', provider: 'Circle', providerLogo: '🔵',
        category: 'Exchange', description: 'Bidirectional exchange channel between fiat and cryptocurrency.',
        features: ['Fast exchange', 'Compliant KYC', 'Multi-channel', 'Competitive rates'],
        price: '0.5% - 1.0%', status: 'available', signedDate: null, expiryDate: null, rating: 4.8, users: 3200, color: '#64748b'
    },
    {
        id: 7, name: '虚拟卡发行', nameEn: 'Virtual Card Issuing', provider: 'Blockchain Bank', providerLogo: '🏦',
        category: 'Card', description: 'Virtual credit card issuing service for global online payments.',
        features: ['Instant issuance', 'Global acceptance', 'Spending control', 'Security management'],
        price: '$2 - $5 /card', status: 'available', signedDate: null, expiryDate: null, rating: 4.7, users: 1800, color: '#64748b'
    },
    {
        id: 8, name: '收单服务', nameEn: 'Acquiring Service', provider: 'IPayLinks', providerLogo: '💳',
        category: 'Card', description: 'Professional card acquiring service supporting multiple card networks.',
        features: ['Visa/Master/UnionPay', '3D Secure', 'Risk management', 'Fast settlement'],
        price: '1.5% - 2.5%', status: 'available', signedDate: null, expiryDate: null, rating: 4.6, users: 2500, color: '#64748b'
    }
];

function renderProductList(filter = 'all') {
    let filteredProducts = products;
    if (filter === 'signed') {
        filteredProducts = products.filter(p => p.status === 'active' || p.status === 'expiring');
        filteredProducts.sort((a, b) => {
            if (a.status === 'expiring' && b.status !== 'expiring') return -1;
            if (a.status !== 'expiring' && b.status === 'expiring') return 1;
            return 0;
        });
    }
    if (filter === 'signed') {
        return renderProductTable(filteredProducts, filter);
    }
    const productGrid = filteredProducts.map(product => `
        <div class="product-card" onclick="showProductDetail(${product.id})">
            <div class="product-header">
                <div class="product-icon" style="background: linear-gradient(135deg, ${product.color}, ${product.color}dd);">
                    ${product.providerLogo}
                </div>
                <div class="product-header-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-name-en">${product.nameEn}</p>
                </div>
                ${product.status === 'active' ? '<span class="product-badge active">已签约</span>' : ''}
                ${product.status === 'expiring' ? '<span class="product-badge expiring">即将到期</span>' : ''}
            </div>
            <div class="product-info">
                <p class="product-provider">${product.provider}</p>
                <p class="product-desc">${product.description}</p>
            </div>
        </div>
    `).join('');
    return `
        <div class="product-list-header">
            <div class="product-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="text" placeholder="搜索产品..." id="productSearch">
            </div>
        </div>
        <div class="products-grid">
            ${productGrid}
        </div>
    `;
}

function renderProductTable(filteredProducts, filter) {
    const title = filter === 'signed' ? '已签约产品' : '即将到期产品';
    const emptyText = filter === 'signed' ? '暂无已签约产品' : '暂无即将到期产品';
    if (filteredProducts.length === 0) {
        return `
            <div class="product-table-header"><h2 class="product-table-title">${title}</h2></div>
            <div class="empty-state-table"><div class="empty-icon">📦</div><p>${emptyText}</p></div>
        `;
    }
    const tableRows = filteredProducts.map(product => `
        <tr onclick="showProductDetail(${product.id})" style="cursor: pointer;">
            <td>
                <div class="product-table-name">
                    <div class="product-table-icon" style="background: linear-gradient(135deg, ${product.color}, ${product.color}dd);">
                        ${product.providerLogo}
                    </div>
                    <div>
                        <div class="product-table-title-text">${product.name}</div>
                        <div class="product-table-subtitle">${product.nameEn}</div>
                    </div>
                </div>
            </td>
            <td><div class="product-table-provider">${product.provider}</div></td>
            <td><div class="product-table-date">${product.signedDate || '-'}</div></td>
            <td><div class="product-table-date ${product.status === 'expiring' ? 'expiring' : ''}">${product.expiryDate || '-'}</div></td>
            <td>
                ${product.status === 'active' ? '<span class="table-badge active">使用中</span>' : ''}
                ${product.status === 'expiring' ? '<span class="table-badge expiring">即将到期</span>' : ''}
            </td>
        </tr>
    `).join('');
    return `
        <div class="product-table-header">
            <h2 class="product-table-title">${title}</h2>
            <div class="product-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="text" placeholder="搜索产品..." id="productSearch">
            </div>
        </div>
        <div class="product-table-container">
            <table class="product-table">
                <thead>
                    <tr>
                        <th>产品名称</th>
                        <th>服务商</th>
                        <th>签约时间</th>
                        <th>到期时间</th>
                        <th>状态</th>
                    </tr>
                </thead>
                <tbody>${tableRows}</tbody>
            </table>
        </div>
    `;
}

function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="product-modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="product-modal-content">
            <button class="modal-close" onclick="this.closest('.product-modal').remove()">×</button>
            <div class="product-detail-header">
                <div class="product-detail-icon" style="background: linear-gradient(135deg, ${product.color}, ${product.color}dd);">
                    ${product.providerLogo}
                </div>
                <div class="product-detail-title">
                    <h2>${product.name}</h2>
                    <p class="product-detail-en">${product.nameEn}</p>
                    <div class="product-detail-provider">
                        <span>服务商：${product.provider}</span>
                    </div>
                </div>
            </div>
            <div class="product-detail-body">
                <div class="product-detail-section">
                    <h3>产品介绍</h3>
                    <p>${product.description}</p>
                </div>
                <div class="product-detail-section">
                    <h3>核心功能</h3>
                    <ul class="product-features">
                        ${product.features.map(f => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${f}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="product-detail-footer">
                ${product.status === 'available' ? `<button class="btn-primary-large" onclick="signProduct(${product.id})">立即签约</button>` : ''}
                ${product.status === 'active' ? `<button class="btn-secondary-large" onclick="manageProduct(${product.id})">管理产品</button>` : ''}
                ${product.status === 'expiring' ? `
                    <button class="btn-primary-large" onclick="renewProduct(${product.id})">续签产品</button>
                    <button class="btn-secondary-large" onclick="manageProduct(${product.id})">管理产品</button>
                ` : ''}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function filterProducts(filter) {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    const container = mainContent.querySelector('.product-container');
    if (container) {
        container.innerHTML = renderProductList(filter);
    } else {
        mainContent.innerHTML = `
            <div class="page-header">
                <div class="breadcrumb">
                    <a href="#" onclick="goBack()">首页</a> / <span>产品中心</span>
                </div>
                <h1 class="page-title">产品中心</h1>
                <p class="page-desc">探索和管理您的产品服务</p>
            </div>
            <div class="product-container">
                ${renderProductList(filter)}
            </div>
        `;
    }
}

function signProduct(productId) { alert(`正在发起产品签约流程... 产品ID: ${productId}`); }
function renewProduct(productId) { alert(`正在发起产品续签流程... 产品ID: ${productId}`); }
function manageProduct(productId) { alert(`正在打开产品管理... 产品ID: ${productId}`); }

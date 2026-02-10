// 14大中心菜单配置 - 参考Stripe/Adyen/PayPal/Airwallex
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
            { label: '产品市场', items: [
                { name: '浏览产品', icon: 'grid', active: true },
                { name: '已签约产品', icon: 'package' }
            ]}
        ]
    },
    supply: {
        name: '产品中心',
        groups: [
            { label: '产品中心', items: [
                { name: '上架产品', icon: 'package', active: true },
                { name: '产品管理', icon: 'settings' }
            ]},
            { label: '机构伙伴', items: [
                { name: '机构伙伴查询', icon: 'users' },
                { name: '机构签约产品', icon: 'package' }
            ]},
            
            { label: '机构佣金配置', items: [
                { name: '模版配置', icon: 'sliders' },
                { name: '机构佣金配置', icon: 'settings' }
            ]},
            { label: '机构佣金结算', items: [
                { name: '分佣账单', icon: 'file-text' },
                { name: '分佣明细', icon: 'list' },
                { name: '结算单', icon: 'calendar' },
            ]}
        ]
    },
    spSales: {
        name: '销售渠道',
        groups: [
            { label: '代理商管理', items: [
                { name: '代理商签约', icon: 'users', active: true },
                { name: '代理商管理', icon: 'git-branch' },
            ]},
            { label: '代理商分佣', items: [
                { name: '分佣账单', icon: 'file-text' },
                { name: '分佣明细', icon: 'list' },
                { name: '代理商结算', icon: 'check-circle' },
                { name: '代理商付款', icon: 'check-circle' },


            ]},
           
        ]
    },
    merchant: {
        name: '会员中心',
        groups: [
            { label: '会员查询', items: [
                { name: '会员信息查询', icon: 'search', active: true },
                { name: '会员产品查询', icon: 'package' }
            ]},
            { label: '会员管理', items: [
                { name: '商户基本信息管理', icon: 'user' },
                { name: '商户开通产品', icon: 'package' },
                { name: '商户产品配置', icon: 'settings' },
                { name: '会员产品配置', icon: 'package' }
            ]}
        ]
    },
    order: {
        name: '订单中心',
        groups: [
            { label: '商户单管理', items: [
                { name: 'VA账户', icon: 'credit-card', active: true },
                { name: '收款商户单', icon: 'download' },
                { name: '付款商户单', icon: 'upload' },
                { name: '换汇商户单', icon: 'repeat' },
                { name: 'Ramp商户单', icon: 'zap' },
                { name: '充提币商户单', icon: 'bitcoin' },
                { name: '卡片查询', icon: 'credit-card' },
                { name: 'VCC商户单', icon: 'credit-card' },
                { name: '收单商户单', icon: 'tag' }
            ]},
            { label: '交易背景', items: [
                { name: '订单管理', icon: 'clipboard' },
                { name: '订单文件', icon: 'file' },
                { name: '店铺管理', icon: 'store' }
            ]}
        ]
    },
    'sales-channel': {
        name: '销售渠道中心',
        groups: [
            { label: '代理商', items: [
                { name: '代理商查询', icon: 'user' },
                { name: '代理商产品查询', icon: 'shopping-cart' }
            ]},
            { label: '商户查询', items: [
                { name: '代理商拓客查询', icon: 'search' }
            ]},
            { label: '分润/返点配置', items: [
                { name: '模版配置', icon: 'sliders' },
                { name: '代理商配置', icon: 'settings' }
            ]},
            { label: '分佣结算', items: [
                { name: '分佣账单', icon: 'file-text' },
                { name: '分佣明细', icon: 'list' },
                { name: '结算单', icon: 'calendar' },
                { name: '付款单', icon: 'credit-card' }
            ]}
        ]
    },
    finance: {
        name: '财资中心',
        groups: [
            { label: '资金账户', items: [
                { name: '账户总览', icon: 'wallet', active: true },
                { name: '多渠道账户', icon: 'layers' },
                { name: '资金流水', icon: 'list' },
                { name: '可用余额/冻绗余额', icon: 'lock' }
            ]},
            { label: '资金调拨', items: [
                { name: '跨账户调拨', icon: 'repeat' },
                { name: '调拨记录', icon: 'file-text' },
                { name: '调拨审核', icon: 'check-circle' }
            ]},
            { label: '清结算', items: [
                { name: '清算管理', icon: 'layers' },
                { name: '结算管理', icon: 'calendar' },
                { name: '对账管理', icon: 'check-square' }
            ]},
            { label: '资金运营', items: [
                { name: '头寸管理', icon: 'trending-up' },
                { name: '流动性管理', icon: 'activity' },
                { name: '资金预测', icon: 'bar-chart' }
            ]},
            { label: '汇率运营', items: [
                { name: '汇率监控', icon: 'eye' },
                { name: '套利管理', icon: 'dollar-sign' },
                { name: '对冲管理', icon: 'shield' }
            ]},
            { label: '分佣结算', items: [
                { name: 'TP分佣账单', icon: 'file-text' },
                { name: 'TP结算付款', icon: 'credit-card' }
            ]}
        ]
    },
    channel: {
        name: '渠道中心',
        groups: [
            { label: '渠道管理', items: [
                { name: '渠道列表', icon: 'list', active: true },
                { name: '银行渠道', icon: 'building' },
                { name: '卡组织', icon: 'credit-card' },
                { name: '本地支付', icon: 'globe' }
            ]},
            { label: '渠道配置', items: [
                { name: '路由规则', icon: 'git-branch' },
                { name: '渠道费率', icon: 'percent' },
                { name: '渠道限额', icon: 'shield' }
            ]},
            { label: '渠道监控', items: [
                { name: '成功率监控', icon: 'activity' },
                { name: '渠道状态', icon: 'check-circle' }
            ]}
        ]
    },
    settlement: {
        name: '清结算中心',
        groups: [
            { label: '清算管理', items: [
                { name: '交易单', icon: 'file-text', active: true },
                { name: '渠道单', icon: 'layers' },
                { name: '清算报表', icon: 'bar-chart' }
            ]},
            { label: '商户结算', items: [
                { name: '商户结算单', icon: 'file-text' },
                { name: '结算记录', icon: 'clock' }
            ]},
            { label: '代理商分佣', items: [
                { name: '分佣账单', icon: 'file-text' },
                { name: '代理商结算', icon: 'calendar' },
                { name: '代理商付款', icon: 'credit-card' }
            ]},
            { label: '对账管理', items: [
                { name: '对账任务', icon: 'check-circle' },
                { name: '对账差异', icon: 'alert-triangle' },
                { name: '差异处理', icon: 'edit' }
            ]},
            { label: '费率配置', items: [
                { name: '产品收费配置', icon: 'dollar-sign' },
                { name: '产品收费查询', icon: 'dollar-sign' },
                { name: '模板管理', icon: 'sliders' }
            ]},
            { label: '汇率配置', items: [
                { name: '汇率MK配置', icon: 'trending-up' },
                { name: '汇率路由规则', icon: 'git-branch' },
                { name: '汇率查询', icon: 'git-branch' }
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
            { label: '数据导出', items: [
                { name: '报表导出', icon: 'download' },
                { name: '定时报表', icon: 'clock' }
            ]},
            { label: '下载管理', items: [
                { name: '下载列表', icon: 'download' },
                { name: '导出任务', icon: 'file-text' },
                { name: '定时导出', icon: 'clock' },
                { name: '导出模板', icon: 'file' }
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
    settings: {
        name: '设置',
        groups: [
            { label: '账号设置', items: [
                { name: '个人资料', icon: 'user', active: true },
                { name: '安全设置', icon: 'lock' },
                { name: '登录日志', icon: 'terminal' }
            ]},
            { label: '企业设置', items: [
                { name: '公司信息', icon: 'building' },
                { name: '品牌设置', icon: 'image' },
                { name: '业务配置', icon: 'sliders' }
            ]},
            { label: '团队管理', items: [
                { name: '成员管理', icon: 'users' },
                { name: '角色管理', icon: 'shield' },
                { name: '权限配置', icon: 'key' },
                { name: '部门管理', icon: 'git-branch' }
            ]},
            { label: '通知与集成', items: [
                { name: '通知设置', icon: 'bell' },
                { name: '邮件模板', icon: 'mail' },
                { name: '第三方集成', icon: 'link' }
            ]},
            { label: '审计与日志', items: [
                { name: '操作日志', icon: 'file-text' },
                { name: '审计追踪', icon: 'eye' }
            ]}
        ]
    },
    // 客户中心（TP端：合并会员中心+订单中心）
    customer: {
        name: '客户中心',
        groups: [
            { label: '会员管理', items: [
                { name: '会员基本信息查询', icon: 'users', active: true },
                { name: '会员开通产品', icon: 'package' }
            ]},
            { label: '订单查询', items: [
                { name: 'VA账户', icon: 'credit-card' },
                { name: '收款商户单', icon: 'download' },
                { name: '付款商户单', icon: 'upload' },
                { name: '换汇商户单', icon: 'repeat' },
                { name: 'Ramp商户单', icon: 'zap' },
                { name: '充提币商户单', icon: 'bitcoin' },
                { name: '卡片查询', icon: 'credit-card' },
                { name: 'VCC商户单', icon: 'credit-card' },
                { name: '收单商户单', icon: 'tag' }
            ]},
            
            { label: '会员分佣结算', items: [
                { name: '分佣/返点账单', icon: 'clipboard' },
                { name: '结算单查询', icon: 'file' },
            ]}
        ]
    },
    // 客户中心（SP端）
    client: {
        name: '客户中心',
        groups: [
            { label: '客户信息', items: [
                { name: '客户基本信息查询', icon: 'users', active: true }
            ]},
            { label: '客户产品信息', items: [
                { name: '客户产品列表', icon: 'package' }
            ]},
            { label: '客户余额查询', items: [
                { name: '客户余额', icon: 'credit-card' },
                { name: '客户流水', icon: 'list' },
                { name: '客户历史余额', icon: 'calendar' },
                { name: '客户冻结记录', icon: 'lock' },
                { name: '客户解冻记录', icon: 'unlock' }
            ]},
            { label: '客户订单', items: [
                { name: 'VA账户', icon: 'credit-card' },
                { name: '收款商户单', icon: 'download' },
                { name: '付款商户单', icon: 'upload' },
                { name: '换汇商户单', icon: 'repeat' },
                { name: 'Ramp商户单', icon: 'zap' },
                { name: '充提币商户单', icon: 'bitcoin' },
                { name: '卡片查询', icon: 'credit-card' },
                { name: 'VCC商户单', icon: 'credit-card' },
                { name: '收单商户单', icon: 'tag' }
            ]},
            { label: '客户贸易背景', items: [
                { name: '贸易订单', icon: 'clipboard' },
                { name: '订单文件', icon: 'file' },
                { name: '店铺查询', icon: 'store' }
            ]}
        ]
    },
    // 销售渠道（SP端：只有机构代理商）
    sales: {
        name: '销售渠道',
        groups: [
            { label: '机构代理商', items: [
                { name: '代理商查询', icon: 'users', active: true },
                { name: '代理商管理', icon: 'settings' }
            ]},
            { label: '分佣配置', items: [
                { name: '分佣模板配置', icon: 'sliders' },
                { name: '代理商分佣配置', icon: 'settings' }
            ]},
            { label: '分佣查询', items: [
                { name: '分佣账单', icon: 'file-text' },
                { name: '分佣明细', icon: 'list' },
                { name: '结算单', icon: 'calendar' }
            ]}
        ]
    },
    // 工作流配置
    workflow: {
        name: '工作流配置',
        groups: [
            { label: '审批流程', items: [
                { name: '审批流程管理', icon: 'git-branch', active: true },
                { name: '审批模板', icon: 'file-text' },
                { name: '审批规则', icon: 'sliders' }
            ]},
            { label: '工单管理', items: [
                { name: '全部工单', icon: 'file', badge: '3' },
                { name: '待审核', icon: 'clock', badge: '3' },
                { name: '处理中', icon: 'loader' },
                { name: '已完成', icon: 'check-circle' }
            ]},
            { label: '通知配置', items: [
                { name: '审批通知', icon: 'bell' },
                { name: '邮件模板', icon: 'mail' }
            ]}
        ]
    },
    
    risk: {
        name: '风控合规中心',
        groups: [
            { label: '风控管理', items: [
                { name: '风控规则', icon: 'shield', active: true },
                { name: '黑白名单', icon: 'list' },
                { name: '风险预警', icon: 'alert-triangle', badge: '5' },
                { name: '拦截记录', icon: 'x-circle' }
            ]},
            { label: '交易监控', items: [
                { name: '实时监控', icon: 'activity' },
                { name: '异常交易', icon: 'alert-triangle' },
                { name: '人工复核', icon: 'user-check' }
            ]},
            { label: 'KYC/KYB', items: [
                { name: '商户认证', icon: 'user-check' },
                { name: '认证审核', icon: 'check-square' },
                { name: '定期复核', icon: 'clock' }
            ]},
            { label: '合规管理', items: [
                { name: 'AML监控', icon: 'eye' },
                { name: '制裁名单', icon: 'alert-circle' },
                { name: '合规报告', icon: 'file-text' }
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
    'columns': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/></svg>',
    'grid': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    'package': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
    'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'file-text': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    'refresh': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
    'plus-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
    'settings': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    'user-plus': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
    'shopping-cart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
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
    'heart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    'folder': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    'globe': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    'award': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    'loader': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>',
    'edit': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    'code': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    'box': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    'image': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    'mail': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
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

    // 为产品中心生成特殊内容
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
        // 其他中心使用默认内容
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

// 菜单点击事件
document.addEventListener('click', function(e) {
    if (e.target.closest('.menu-item') && e.target.closest('.detail-sidebar')) {
        const menuItem = e.target.closest('.menu-item');
        const items = document.querySelectorAll('.detail-sidebar .menu-item');
        items.forEach(item => item.classList.remove('active'));
        menuItem.classList.add('active');
        
        // 处理产品中心的菜单切换
        const pageName = menuItem.getAttribute('data-page');
        if (pageName) {
            if (pageName === '浏览产品') {
                filterProducts('all');
            } else if (pageName === '已签约产品') {
                filterProducts('signed');
            } else if (pageName === '机构伙伴查询') {
                renderAgencyQuery();
            } else if (pageName === '机构签约产品') {
                renderAgencyProductQuery();
            } else if (pageName === '模版配置') {
                renderTemplateConfig();
            } else if (pageName === '机构返点配置') {
                renderAgencyRebateConfig();
            } else if (pageName === '会员基本信息查询') {
                renderMemberInfoQuery();
            } else if (pageName === '会员开通产品') {
                renderMemberProducts();
            } else if (pageName === '商户开通产品') {
                renderMerchantProducts();
            } else if (pageName === '代理商查询') {
                renderSalesAgentQuery();
            } else if (pageName === '代理商产品查询') {
                renderSalesAgentProductQuery();
            } else if (pageName === '客户基本信息查询') {
                renderClientInfoQuery();
            } else if (pageName === '客户产品列表') {
                renderClientProductList();
            } else if (pageName === '客户余额') {
                renderClientBalance();
            } else if (pageName === '客户流水') {
                renderClientTransactions();
            } else if (pageName === '客户历史余额') {
                renderClientHistoryBalance();
            } else if (pageName === '客户冻结记录') {
                renderClientFreezeRecords();
            } else if (pageName === '客户解冻记录') {
                renderClientUnfreezeRecords();
            } else if (pageName === '贸易订单') {
                renderTradeOrders();
            } else if (pageName === '店铺查询') {
                renderShopQuery();
            }
        }
    }
});

// 产品数据
const products = [
    {
        id: 1,
        name: '数币收款',
        nameEn: 'Crypto Collection',
        provider: 'Blockchain Bank',
        providerLogo: '🏦',
        category: 'Crypto',
        description: 'Accept cryptocurrency payments with real-time settlement and multi-currency support.',
        features: ['Support BTC/ETH/USDT', 'Real-time conversion', '24/7 settlement', 'Multi-layer security'],
        price: '0.5% - 1.2%',
        status: 'active',
        signedDate: '2025-01-15',
        expiryDate: '2026-01-15',
        rating: 4.8,
        users: 1250,
        color: '#64748b'
    },
    {
        id: 2,
        name: '数币付款',
        nameEn: 'Crypto Payment',
        provider: 'IPayLinks',
        providerLogo: '💳',
        category: 'Crypto',
        description: 'Fast and convenient cryptocurrency payout solution with batch payment support.',
        features: ['Batch payment', 'Auto reconciliation', 'Multi-signature', 'Complete API'],
        price: '0.3% - 0.8%',
        status: 'active',
        signedDate: '2025-02-01',
        expiryDate: '2026-02-01',
        rating: 4.9,
        users: 980,
        color: '#64748b'
    },
    {
        id: 3,
        name: '法币VA收款',
        nameEn: 'Fiat VA Collection',
        provider: 'Circle',
        providerLogo: '🔵',
        category: 'Fiat',
        description: 'Virtual account collection service supporting major global fiat currencies.',
        features: ['Global banking network', 'Virtual account management', 'Auto reconciliation', 'Multi-currency'],
        price: '1.0% - 2.0%',
        status: 'active',
        signedDate: '2024-12-01',
        expiryDate: '2025-12-01',
        rating: 4.7,
        users: 2100,
        color: '#64748b'
    },
    {
        id: 4,
        name: '法币代付出款',
        nameEn: 'Fiat Payout',
        provider: 'Blockchain Bank',
        providerLogo: '🏦',
        category: 'Fiat',
        description: 'Global fiat payout service supporting bank cards and e-wallets.',
        features: ['Global coverage', 'Real-time payout', 'Compliance', 'Competitive rates'],
        price: '0.8% - 1.5%',
        status: 'expiring',
        signedDate: '2024-03-15',
        expiryDate: '2025-03-15',
        rating: 4.6,
        users: 1560,
        color: '#64748b'
    },
    {
        id: 5,
        name: '承兑服务',
        nameEn: 'Acceptance Service',
        provider: 'IPayLinks',
        providerLogo: '💳',
        category: 'Exchange',
        description: 'Professional cryptocurrency acceptance service with deep liquidity.',
        features: ['Deep liquidity', 'Best rates', 'Instant execution', 'Professional support'],
        price: '0.2% - 0.6%',
        status: 'expiring',
        signedDate: '2024-04-01',
        expiryDate: '2025-04-01',
        rating: 4.9,
        users: 850,
        color: '#64748b'
    },
    {
        id: 6,
        name: 'On/Off Ramp',
        nameEn: 'On/Off Ramp',
        provider: 'Circle',
        providerLogo: '🔵',
        category: 'Exchange',
        description: 'Bidirectional exchange channel between fiat and cryptocurrency.',
        features: ['Fast exchange', 'Compliant KYC', 'Multi-channel', 'Competitive rates'],
        price: '0.5% - 1.0%',
        status: 'available',
        signedDate: null,
        expiryDate: null,
        rating: 4.8,
        users: 3200,
        color: '#64748b'
    },
    {
        id: 7,
        name: '虚拟卡发行',
        nameEn: 'Virtual Card Issuing',
        provider: 'Blockchain Bank',
        providerLogo: '🏦',
        category: 'Card',
        description: 'Virtual credit card issuing service for global online payments.',
        features: ['Instant issuance', 'Global acceptance', 'Spending control', 'Security management'],
        price: '$2 - $5 /card',
        status: 'available',
        signedDate: null,
        expiryDate: null,
        rating: 4.7,
        users: 1800,
        color: '#64748b'
    },
    {
        id: 8,
        name: '收单服务',
        nameEn: 'Acquiring Service',
        provider: 'IPayLinks',
        providerLogo: '💳',
        category: 'Card',
        description: 'Professional card acquiring service supporting multiple card networks.',
        features: ['Visa/Master/UnionPay', '3D Secure', 'Risk management', 'Fast settlement'],
        price: '1.5% - 2.5%',
        status: 'available',
        signedDate: null,
        expiryDate: null,
        rating: 4.6,
        users: 2500,
        color: '#64748b'
    }
];

// 渲染产品列表
function renderProductList(filter = 'all') {
    let filteredProducts = products;
    
    if (filter === 'signed') {
        filteredProducts = products.filter(p => p.status === 'active' || p.status === 'expiring');
        // 将即将到期的产品排在前面
        filteredProducts.sort((a, b) => {
            if (a.status === 'expiring' && b.status !== 'expiring') return -1;
            if (a.status !== 'expiring' && b.status === 'expiring') return 1;
            return 0;
        });
    }

    // 如果是已签约，使用列表视图
    if (filter === 'signed') {
        return renderProductTable(filteredProducts, filter);
    }

    // 浏览产品使用卡片网格
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

// 渲染产品表格（已签约和即将到期）
function renderProductTable(filteredProducts, filter) {
    const title = filter === 'signed' ? '已签约产品' : '即将到期产品';
    const emptyText = filter === 'signed' ? '暂无已签约产品' : '暂无即将到期产品';
    
    if (filteredProducts.length === 0) {
        return `
            <div class="product-table-header">
                <h2 class="product-table-title">${title}</h2>
            </div>
            <div class="empty-state-table">
                <div class="empty-icon">📦</div>
                <p>${emptyText}</p>
            </div>
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
            <td>
                <div class="product-table-provider">${product.provider}</div>
            </td>
            <td>
                <div class="product-table-date">${product.signedDate || '-'}</div>
            </td>
            <td>
                <div class="product-table-date ${product.status === 'expiring' ? 'expiring' : ''}">${product.expiryDate || '-'}</div>
            </td>
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
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>
    `;
}

// 显示产品详情
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
                ${product.status === 'available' ? `
                    <button class="btn-primary-large" onclick="signProduct(${product.id})">立即签约</button>
                ` : ''}
                ${product.status === 'active' ? `
                    <button class="btn-secondary-large" onclick="manageProduct(${product.id})">管理产品</button>
                ` : ''}
                ${product.status === 'expiring' ? `
                    <button class="btn-primary-large" onclick="renewProduct(${product.id})">续签产品</button>
                    <button class="btn-secondary-large" onclick="manageProduct(${product.id})">管理产品</button>
                ` : ''}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 筛选产品
function filterProducts(filter) {
    const mainContent = document.getElementById('detailMain');
    if (mainContent) {
        const html = renderProductList(filter);
        mainContent.querySelector('.product-container').innerHTML = html;
    }
}

// 签约产品
function signProduct(productId) {
    alert(`正在发起产品签约流程... 产品ID: ${productId}`);
}

// 续签产品
function renewProduct(productId) {
    alert(`正在发起产品续签流程... 产品ID: ${productId}`);
}

// 管理产品
function manageProduct(productId) {
    alert(`正在打开产品管理页面... 产品ID: ${productId}`);
}

// 渲染机构伙伴查询页面
function renderAgencyQuery() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" onclick="goBack()">首页</a> / <span>产品中心</span> / <span>机构伙伴查询</span>
            </div>
            <h1 class="page-title">机构伙伴查询</h1>
            <p class="page-desc">查询和管理机构伙伴信息</p>
        </div>
        
        <!-- 搜索表单 -->
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">机构伙伴ID</label>
                        <input type="text" placeholder="请输入机构伙伴ID" id="agencyId" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">机构名称</label>
                        <input type="text" placeholder="请输入机构名称" id="agencyName" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">身份类型</label>
                        <select id="identityType" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="institution">机构</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">状态</label>
                        <select id="status" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="active">正常</option>
                            <option value="suspended">暂停</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">来源</label>
                        <select id="source" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="EX">EX</option>
                            <option value="Direct">直接签约</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">签约时间</label>
                        <input type="date" id="signDate" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="searchAgencies()" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="resetAgencyForm()" style="padding: 8px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>
        
        <!-- 数据表格 -->
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">机构伙伴列表</h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="exportAgencyData()" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">导出</button>
                    <button onclick="refreshAgencyData()" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">刷新</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">机构伙伴ID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">机构名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">身份类型</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">状态</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">签约时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">来源</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">创建时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">操作</th>
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

// 渲染机构伙伴表格行
function renderAgencyTableRows() {
    const mockData = [
        { id: 'AGT001', name: '深圳科技有限公司', identityType: '机构', status: 'active', signDate: '2024-01-16', source: 'EX', createTime: '2024-01-10 10:30:00' },
        { id: 'AGT002', name: '上海贸易集团', identityType: '机构', status: 'active', signDate: '2024-02-20', source: 'EX', createTime: '2024-02-15 14:20:00' },
        { id: 'AGT003', name: '北京投资公司', identityType: '机构', status: 'suspended', signDate: '2023-12-05', source: 'Direct', createTime: '2023-12-01 09:15:00' },
        { id: 'AGT004', name: '广州电商平台', identityType: '机构', status: 'active', signDate: '2024-03-10', source: 'EX', createTime: '2024-03-05 16:45:00' },
        { id: 'AGT005', name: '杭州金融服务', identityType: '机构', status: 'active', signDate: '2024-01-25', source: 'EX', createTime: '2024-01-20 11:00:00' }
    ];
    
    return mockData.map(item => `
        <tr style="border-bottom: 1px solid #e9ecef;">
            <td style="padding: 16px; font-size: 14px;">${item.id}</td>
            <td style="padding: 16px; font-size: 14px;">${item.name}</td>
            <td style="padding: 16px; font-size: 14px;">${item.identityType}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${item.status === 'active' ? '#d1fae5' : '#fef3c7'}; color: ${item.status === 'active' ? '#065f46' : '#92400e'};">
                    ${item.status === 'active' ? '正常' : '暂停'}
                </span>
            </td>
            <td style="padding: 16px; font-size: 14px;">${item.signDate}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: #dbeafe; color: #1e40af;">${item.source}</span>
            </td>
            <td style="padding: 16px; font-size: 14px;">${item.createTime}</td>
            <td style="padding: 16px; font-size: 14px;">
                <button onclick="viewAgencyDetail('${item.id}')" style="background: none; border: none; color: #4f46e5; cursor: pointer; font-size: 14px; text-decoration: underline;">详情</button>
            </td>
        </tr>
    `).join('');
}

// 搜索机构伙伴
function searchAgencies() {
    console.log('执行搜索');
    alert('搜索功能开发中');
}

// 重置表单
function resetAgencyForm() {
    document.getElementById('agencyId').value = '';
    document.getElementById('agencyName').value = '';
    document.getElementById('identityType').value = '';
    document.getElementById('status').value = '';
    document.getElementById('source').value = '';
    document.getElementById('signDate').value = '';
}

// 导出数据
function exportAgencyData() {
    alert('导出功能开发中');
}

// 刷新数据
function refreshAgencyData() {
    renderAgencyQuery();
}

// 查看详情
function viewAgencyDetail(id) {
    alert(`查看机构伙伴详情: ${id}`);
}

// 渲染机构签约产品查询页面
function renderAgencyProductQuery() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" onclick="goBack()">首页</a> / <span>产品中心</span> / <span>机构签约产品</span>
            </div>
            <h1 class="page-title">机构签约产品</h1>
        </div>
        
        <!-- 搜索表单 -->
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">机构代理ID</label>
                        <input type="text" placeholder="请输入机构代理ID" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">机构名称</label>
                        <input type="text" placeholder="请输入机构名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">身份类型</label>
                        <select style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="institution">机构</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">签约产品</label>
                        <input type="text" placeholder="请输入产品名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">签约方式</label>
                        <select style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="direct">机构直签</option>
                            <option value="agent">EX总代</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">签约状态</label>
                        <select style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="active">生效中</option>
                            <option value="pending">即将到期</option>
                            <option value="expired">已过期</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="alert('查询功能开发中')" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置功能开发中')" style="padding: 8px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>
        
        <!-- 数据表格 -->
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">产品签约列表</h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('导出功能开发中')" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">导出</button>
                    <button onclick="renderAgencyProductQuery()" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">刷新</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">机构代理ID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">机构名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">身份类型</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">签约产品</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">签约方式</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">签约有效期</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">签约状态</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">创建时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderAgencyProductRows()}
                    </tbody>
                </table>
            </div>
            <div style="display: flex; justify-content: center; align-items: center; gap: 8px; padding: 16px;">
                <button style="padding: 6px 12px; border: 1px solid #dee2e6; background: white; border-radius: 4px; cursor: pointer; font-size: 14px;">上一页</button>
                <button style="padding: 6px 12px; border: 1px solid #4f46e5; background: #4f46e5; color: white; border-radius: 4px; cursor: pointer; font-size: 14px;">1</button>
                <button style="padding: 6px 12px; border: 1px solid #dee2e6; background: white; border-radius: 4px; cursor: pointer; font-size: 14px;">2</button>
                <button style="padding: 6px 12px; border: 1px solid #dee2e6; background: white; border-radius: 4px; cursor: pointer; font-size: 14px;">3</button>
                <button style="padding: 6px 12px; border: 1px solid #dee2e6; background: white; border-radius: 4px; cursor: pointer; font-size: 14px;">下一页</button>
            </div>
        </div>
    `;
}

// 渲染机构签约产品表格行
function renderAgencyProductRows() {
    const mockData = [
        { id: 'AGT001', name: '深圳科技有限公司', identityType: '机构', product: 'Crypto Collection', method: '机构直签', validity: '2024-01-15 ~ 2025-01-15', status: 'active', createTime: '2024-01-10 10:30:00' },
        { id: 'AGT001', name: '深圳科技有限公司', identityType: '机构', product: 'Fiat VA Collection', method: 'EX总代', validity: '2024-02-01 ~ 2025-02-01', status: 'active', createTime: '2024-01-25 14:20:00' },
        { id: 'AGT002', name: '上海贸易集团', identityType: '机构', product: 'Crypto Payment', method: '机构直签', validity: '2024-03-01 ~ 2024-12-31', status: 'pending', createTime: '2024-02-20 16:45:00' },
        { id: 'AGT003', name: '北京投资公司', identityType: '机构', product: 'Virtual Card Issuing', method: 'EX总代', validity: '2023-06-01 ~ 2024-06-01', status: 'expired', createTime: '2023-05-20 11:00:00' },
        { id: 'AGT004', name: '广州电商平台', identityType: '机构', product: 'On/Off Ramp', method: '机构直签', validity: '2024-04-01 ~ 2025-04-01', status: 'active', createTime: '2024-03-25 09:30:00' }
    ];
    
    return mockData.map(item => `
        <tr style="border-bottom: 1px solid #e9ecef;">
            <td style="padding: 16px; font-size: 14px;">${item.id}</td>
            <td style="padding: 16px; font-size: 14px;">${item.name}</td>
            <td style="padding: 16px; font-size: 14px;">${item.identityType}</td>
            <td style="padding: 16px; font-size: 14px;">${item.product}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: #dbeafe; color: #1e40af;">${item.method}</span>
            </td>
            <td style="padding: 16px; font-size: 14px;">${item.validity}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${item.status === 'active' ? '#d1fae5' : item.status === 'pending' ? '#fef3c7' : '#fee2e2'}; color: ${item.status === 'active' ? '#065f46' : item.status === 'pending' ? '#92400e' : '#991b1b'};">
                    ${item.status === 'active' ? '生效中' : item.status === 'pending' ? '即将到期' : '已过期'}
                </span>
            </td>
            <td style="padding: 16px; font-size: 14px;">${item.createTime}</td>
            <td style="padding: 16px; font-size: 14px;">
                <button onclick="alert('查看详情: ${item.id}')" style="background: none; border: none; color: #4f46e5; cursor: pointer; font-size: 14px; text-decoration: underline;">详情</button>
            </td>
        </tr>
    `).join('');
}

// 渲染模版配置页面（卡片样式）
function renderTemplateConfig() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" onclick="goBack()">首页</a> / <span>产品中心</span> / <span>模版配置</span>
            </div>
            <h1 class="page-title">模版配置</h1>
            <p class="page-desc">管理返点模版配置</p>
        </div>
        
        <!-- 搜索表单 -->
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">模版名称</label>
                        <input type="text" placeholder="请输入模版名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">签约产品</label>
                        <input type="text" placeholder="请输入产品名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">创建时间</label>
                        <input type="date" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="alert('查询功能开发中')" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置功能开发中')" style="padding: 8px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>
        
        <!-- 模版卡片列表 -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
            ${renderTemplateCards()}
        </div>
    `;
}

// 渲染模版卡片
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
                <button onclick="alert('编辑模版: ${template.name}')" style="padding: 4px 8px; background: white; border: 1px solid #dee2e6; border-radius: 4px; cursor: pointer;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button onclick="alert('删除模版: ${template.name}')" style="padding: 4px 8px; background: white; border: 1px solid #dee2e6; border-radius: 4px; cursor: pointer;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
            <div style="padding: 24px; padding-top: 48px;">
                <div style="width: 48px; height: 48px; background: #4f46e5; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                    </svg>
                </div>
                <h3 style="font-size: 16px; font-weight: 600; color: #2c3e50; margin-bottom: 8px;">${template.name}</h3>
                <p style="font-size: 13px; color: #6c757d; margin-bottom: 12px;">○ ${template.product}</p>
                <div style="display: flex; align-items: center; gap: 16px; font-size: 13px; color: #6c757d;">
                    <span>📅 ${template.date}</span>
                    <span>👥 ${template.usage}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染机构返点配置页面
function renderAgencyRebateConfig() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" onclick="goBack()">首页</a> / <span>产品中心</span> / <span>机构返点配置</span>
            </div>
            <h1 class="page-title">机构返点配置</h1>
            <p class="page-desc">管理机构伙伴的返点配置</p>
        </div>
        
        <!-- 搜索表单 -->
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">机构伙伴ID</label>
                        <input type="text" placeholder="请输入机构伙伴ID" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">机构名称</label>
                        <input type="text" placeholder="请输入机构名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">产品</label>
                        <input type="text" placeholder="请输入产品名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">状态</label>
                        <select style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="active">启用</option>
                            <option value="inactive">停用</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="alert('查询功能开发中')" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置功能开发中')" style="padding: 8px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                    <button onclick="alert('新增配置')" style="padding: 8px 20px; background: #10b981; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500; margin-left: auto;">+ 新增配置</button>
                </div>
            </div>
        </div>
        
        <!-- 数据表格 -->
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">返点配置列表</h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('导出功能开发中')" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">导出</button>
                    <button onclick="renderAgencyRebateConfig()" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">刷新</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">机构伙伴ID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">机构名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">产品</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">返点比例</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">返点类型</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">状态</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">创建时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">操作</th>
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

// 渲染机构返点配置表格行
function renderAgencyRebateRows() {
    const mockData = [
        { id: 'AGT001', name: '深圳科技有限公司', product: 'Crypto Collection', rate: '0.5%', type: '按交易额', status: 'active', createTime: '2024-01-10 10:30:00' },
        { id: 'AGT002', name: '上海贸易集团', product: 'Fiat VA Collection', rate: '0.3%', type: '按交易额', status: 'active', createTime: '2024-02-15 14:20:00' },
        { id: 'AGT003', name: '北京投资公司', product: 'Crypto Payment', rate: '0.4%', type: '按交易额', status: 'inactive', createTime: '2023-12-01 09:15:00' },
        { id: 'AGT004', name: '广州电商平台', product: 'Virtual Card Issuing', rate: '1.0%', type: '按交易笔数', status: 'active', createTime: '2024-03-05 16:45:00' },
        { id: 'AGT005', name: '杭州金融服务', product: 'On/Off Ramp', rate: '0.6%', type: '按交易额', status: 'active', createTime: '2024-01-20 11:00:00' }
    ];
    
    return mockData.map(item => `
        <tr style="border-bottom: 1px solid #e9ecef;">
            <td style="padding: 16px; font-size: 14px;">${item.id}</td>
            <td style="padding: 16px; font-size: 14px;">${item.name}</td>
            <td style="padding: 16px; font-size: 14px;">${item.product}</td>
            <td style="padding: 16px; font-size: 14px; font-weight: 600; color: #10b981;">${item.rate}</td>
            <td style="padding: 16px; font-size: 14px;">${item.type}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${item.status === 'active' ? '#d1fae5' : '#fee2e2'}; color: ${item.status === 'active' ? '#065f46' : '#991b1b'};">
                    ${item.status === 'active' ? '启用' : '停用'}
                </span>
            </td>
            <td style="padding: 16px; font-size: 14px;">${item.createTime}</td>
            <td style="padding: 16px; font-size: 14px;">
                <button onclick="alert('编辑配置: ${item.id}')" style="background: none; border: none; color: #4f46e5; cursor: pointer; font-size: 14px; text-decoration: underline; margin-right: 8px;">编辑</button>
                <button onclick="alert('删除配置: ${item.id}')" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 14px; text-decoration: underline;">删除</button>
            </td>
        </tr>
    `).join('');
}

// 渲染商户开通产品页面（带tab）
function renderMerchantProducts() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" onclick="goBack()">首页</a> / <span>商户中心</span> / <span>商户开通产品</span>
            </div>
            <h1 class="page-title">商户开通产品</h1>
            <p class="page-desc">管理商户开通的产品信息</p>
        </div>
        
        <!-- Tab导航 -->
        <div style="margin-bottom: 16px;">
            <div style="border-bottom: 2px solid #e9ecef; display: flex; gap: 32px;">
                <button id="tab-active" onclick="switchMerchantProductTab('active')" style="padding: 12px 0; border: none; background: none; font-size: 15px; font-weight: 600; color: #4f46e5; border-bottom: 2px solid #4f46e5; margin-bottom: -2px; cursor: pointer;">已开通产品</button>
                <button id="tab-history" onclick="switchMerchantProductTab('history')" style="padding: 12px 0; border: none; background: none; font-size: 15px; font-weight: 500; color: #6c757d; cursor: pointer;">开通记录</button>
            </div>
        </div>
        
        <div id="merchant-product-content">
            ${renderMerchantProductActiveTab()}
        </div>
    `;
}

// 切换商户产品tab
function switchMerchantProductTab(tab) {
    const activeBtn = document.getElementById('tab-active');
    const historyBtn = document.getElementById('tab-history');
    const content = document.getElementById('merchant-product-content');
    
    if (tab === 'active') {
        activeBtn.style.color = '#4f46e5';
        activeBtn.style.fontWeight = '600';
        activeBtn.style.borderBottom = '2px solid #4f46e5';
        historyBtn.style.color = '#6c757d';
        historyBtn.style.fontWeight = '500';
        historyBtn.style.borderBottom = 'none';
        content.innerHTML = renderMerchantProductActiveTab();
    } else {
        historyBtn.style.color = '#4f46e5';
        historyBtn.style.fontWeight = '600';
        historyBtn.style.borderBottom = '2px solid #4f46e5';
        activeBtn.style.color = '#6c757d';
        activeBtn.style.fontWeight = '500';
        activeBtn.style.borderBottom = 'none';
        content.innerHTML = renderMerchantProductHistoryTab();
    }
}

// 渲染已开通产品tab
function renderMerchantProductActiveTab() {
    return `
        <!-- 搜索表单 -->
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">商户MID</label>
                        <input type="text" placeholder="请输入商户MID" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">商户名称</label>
                        <input type="text" placeholder="请输入商户名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">商户来源</label>
                        <select style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="direct">直客</option>
                            <option value="agent">代理商</option>
                            <option value="partner">机构伙伴</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">商户类型</label>
                        <select style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="enterprise">企业</option>
                            <option value="individual">个人</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">签约产品</label>
                        <input type="text" placeholder="请输入产品名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="alert('查询功能开发中')" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置功能开发中')" style="padding: 8px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>
        
        <!-- 数据表格 -->
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">已开通产品列表</h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('导出功能开发中')" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">导出</button>
                    <button onclick="renderMerchantProducts()" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">刷新</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">商户MID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">商户名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">商户来源</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">商户类型</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">签约产品</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">开通时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderMerchantProductActiveRows()}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 渲染开通记录tab
function renderMerchantProductHistoryTab() {
    return `
        <!-- 搜索表单 -->
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">商户MID</label>
                        <input type="text" placeholder="请输入商户MID" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">商户名称</label>
                        <input type="text" placeholder="请输入商户名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">产品名称</label>
                        <input type="text" placeholder="请输入产品名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">开通时间</label>
                        <input type="date" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="alert('查询功能开发中')" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置功能开发中')" style="padding: 8px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>
        
        <!-- 数据表格 -->
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">开通记录</h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('导出功能开发中')" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">导出</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">商户MID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">商户名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">产品名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">操作类型</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">操作人</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">操作时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">备注</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderMerchantProductHistoryRows()}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 渲染已开通产品表格行
function renderMerchantProductActiveRows() {
    const mockData = [
        { mid: 'M001', name: '深圳电商有限公司', source: '直客', type: '企业', product: 'Crypto Collection', openTime: '2024-01-15 10:30:00' },
        { mid: 'M001', name: '深圳电商有限公司', source: '直客', type: '企业', product: 'Fiat VA Collection', openTime: '2024-02-20 14:20:00' },
        { mid: 'M002', name: '上海贸易公司', source: '代理商', type: '企业', product: 'Crypto Payment', openTime: '2024-03-10 09:15:00' },
        { mid: 'M003', name: '北京科技', source: '机构伙伴', type: '企业', product: 'Virtual Card Issuing', openTime: '2024-03-25 16:45:00' },
        { mid: 'M004', name: '广州跨境', source: '直客', type: '企业', product: 'On/Off Ramp', openTime: '2024-04-05 11:00:00' }
    ];
    
    return mockData.map(item => `
        <tr style="border-bottom: 1px solid #e9ecef;">
            <td style="padding: 16px; font-size: 14px;">${item.mid}</td>
            <td style="padding: 16px; font-size: 14px;">${item.name}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: #dbeafe; color: #1e40af;">${item.source}</span>
            </td>
            <td style="padding: 16px; font-size: 14px;">${item.type}</td>
            <td style="padding: 16px; font-size: 14px;">${item.product}</td>
            <td style="padding: 16px; font-size: 14px;">${item.openTime}</td>
            <td style="padding: 16px; font-size: 14px;">
                <button onclick="goToProductConfig('${item.mid}', '${item.product}')" style="background: none; border: none; color: #4f46e5; cursor: pointer; font-size: 14px; text-decoration: underline;">产品配置</button>
            </td>
        </tr>
    `).join('');
}

// 渲染开通记录表格行
function renderMerchantProductHistoryRows() {
    const mockData = [
        { mid: 'M001', name: '深圳电商有限公司', product: 'Crypto Collection', action: '开通', operator: '张三', time: '2024-01-15 10:30:00', remark: '首次开通' },
        { mid: 'M001', name: '深圳电商有限公司', product: 'Fiat VA Collection', action: '开通', operator: '李四', time: '2024-02-20 14:20:00', remark: '业务扩展' },
        { mid: 'M002', name: '上海贸易公司', product: 'Crypto Payment', action: '开通', operator: '王五', time: '2024-03-10 09:15:00', remark: '' },
        { mid: 'M001', name: '深圳电商有限公司', product: 'Crypto Collection', action: '配置变更', operator: '张三', time: '2024-03-15 11:20:00', remark: '费率调整' },
        { mid: 'M003', name: '北京科技', product: 'Virtual Card Issuing', action: '开通', operator: '赵六', time: '2024-03-25 16:45:00', remark: '机构推荐' }
    ];
    
    return mockData.map(item => `
        <tr style="border-bottom: 1px solid #e9ecef;">
            <td style="padding: 16px; font-size: 14px;">${item.mid}</td>
            <td style="padding: 16px; font-size: 14px;">${item.name}</td>
            <td style="padding: 16px; font-size: 14px;">${item.product}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${item.action === '开通' ? '#d1fae5' : '#fef3c7'}; color: ${item.action === '开通' ? '#065f46' : '#92400e'};">
                    ${item.action}
                </span>
            </td>
            <td style="padding: 16px; font-size: 14px;">${item.operator}</td>
            <td style="padding: 16px; font-size: 14px;">${item.time}</td>
            <td style="padding: 16px; font-size: 14px;">${item.remark || '-'}</td>
        </tr>
    `).join('');
}

// 跳转到产品配置页面
function goToProductConfig(mid, product) {
    window.location.href = `merchant-product-detail-editable.html?mid=${mid}&product=${encodeURIComponent(product)}`;
}

// 渲染代理商查询页面
function renderSalesAgentQuery() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" onclick="goBack()">首页</a> / <span>销售渠道中心</span> / <span>代理商查询</span>
            </div>
            <h1 class="page-title">代理商查询</h1>
        </div>
        
        <!-- 搜索表单 -->
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">代理商简称</label>
                        <input type="text" placeholder="请输入代理商简称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">签约状态</label>
                        <select style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="active">生效中</option>
                            <option value="expired">已过期</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">标签名称</label>
                        <select style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="secretary">秘书公司</option>
                            <option value="freight">货代</option>
                            <option value="logistics">物流公司</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">创建时间</label>
                        <input type="date" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="alert('查询功能开发中')" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置功能开发中')" style="padding: 8px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>
        
        <!-- 数据表格 -->
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">代理商列表</h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('创建代理商')" style="padding: 6px 16px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 13px; cursor: pointer;">创建代理商</button>
                    <button onclick="alert('导出功能开发中')" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">导出</button>
                    <button onclick="renderSalesAgentQuery()" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">刷新</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">代理商简称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">签约时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">签约状态</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">签约产品</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">拓客数量</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">所属期间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">创建</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderSalesAgentRows()}
                    </tbody>
                </table>
            </div>
            <div style="display: flex; justify-content: center; align-items: center; gap: 8px; padding: 16px;">
                <button style="padding: 6px 12px; border: 1px solid #dee2e6; background: white; border-radius: 4px; cursor: pointer; font-size: 14px;">上一页</button>
                <button style="padding: 6px 12px; border: 1px solid #4f46e5; background: #4f46e5; color: white; border-radius: 4px; cursor: pointer; font-size: 14px;">1</button>
                <button style="padding: 6px 12px; border: 1px solid #dee2e6; background: white; border-radius: 4px; cursor: pointer; font-size: 14px;">2</button>
                <button style="padding: 6px 12px; border: 1px solid #dee2e6; background: white; border-radius: 4px; cursor: pointer; font-size: 14px;">3</button>
                <button style="padding: 6px 12px; border: 1px solid #dee2e6; background: white; border-radius: 4px; cursor: pointer; font-size: 14px;">下一页</button>
            </div>
        </div>
    `;
}

// 渲染代理商表格行
function renderSalesAgentRows() {
    const mockData = [
        { code: 'ring', name: 'ring', signDate: '2026-08-11', status: 'active', products: '2个', merchants: '海外公司', period: 'CNY', createTime: '2025-03-12 17:05:32' },
        { code: 'keni1', name: 'keni1', signDate: '2025-08-31', status: 'active', products: '1个', merchants: '海外公司', period: 'USD', createTime: '2025-03-09 16:07:00' },
        { code: 'test', name: '1', signDate: '2025-08-31', status: 'active', products: '1个', merchants: '234<br>test', period: 'CNY', createTime: '2025-03-07 10:06:37' },
        { code: 'gaming', name: '游戏总代', signDate: '2027-11-25', status: 'active', products: '1个', merchants: 'hd.azxdkjdxjjkn.com<br>hd.azxdkjdxjjkn.com', period: 'CNY', createTime: '2024-07-31 15:03:35' },
        { code: 'MAOHAO', name: 'MAOHAO', signDate: '2026-06-30', status: 'active', products: '1个', merchants: 'test.maohao.com<br>www.maohao.com', period: 'USD', createTime: '2025-07-20 22:59:29' }
    ];
    
    return mockData.map(item => `
        <tr style="border-bottom: 1px solid #e9ecef;">
            <td style="padding: 16px; font-size: 14px;">
                <a href="#" onclick="alert('查看代理商: ${item.code}')" style="color: #4f46e5; text-decoration: none;">${item.code}</a>
            </td>
            <td style="padding: 16px; font-size: 14px;">${item.name}</td>
            <td style="padding: 16px; font-size: 14px;">${item.signDate}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${item.status === 'active' ? '#d1fae5' : '#fee2e2'}; color: ${item.status === 'active' ? '#065f46' : '#991b1b'};">
                    ${item.status === 'active' ? '生效中' : '已过期'}
                </span>
            </td>
            <td style="padding: 16px; font-size: 14px;">
                <a href="#" onclick="alert('查看产品')" style="color: #4f46e5; text-decoration: none;">${item.products}</a>
            </td>
            <td style="padding: 16px; font-size: 14px;">${item.merchants}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: #fef3c7; color: #92400e;">${item.period}</span>
            </td>
            <td style="padding: 16px; font-size: 14px; color: #6c757d;">${item.createTime}</td>
            <td style="padding: 16px; font-size: 14px;">
                <button onclick="alert('详情: ${item.code}')" style="background: none; border: none; color: #4f46e5; cursor: pointer; font-size: 14px; text-decoration: underline; margin-right: 8px;">详情</button>
                <button onclick="alert('编辑: ${item.code}')" style="background: none; border: none; color: #4f46e5; cursor: pointer; font-size: 14px; text-decoration: underline;">编辑</button>
            </td>
        </tr>
    `).join('');
}

// 渲染代理商产品查询页面
function renderSalesAgentProductQuery() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" onclick="goBack()">首页</a> / <span>销售渠道中心</span> / <span>代理商产品查询</span>
            </div>
            <h1 class="page-title">代理商产品查询</h1>
            <p class="page-desc">查询代理商签约的产品信息</p>
        </div>
        
        <!-- 搜索表单 -->
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">代理商简称</label>
                        <input type="text" placeholder="请输入代理商简称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">产品名称</label>
                        <input type="text" placeholder="请输入产品名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">签约状态</label>
                        <select style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="active">生效中</option>
                            <option value="expired">已过期</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="alert('查询功能开发中')" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置功能开发中')" style="padding: 8px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>
        
        <!-- 数据表格 -->
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">代理商产品列表</h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('导出功能开发中')" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">导出</button>
                    <button onclick="renderSalesAgentProductQuery()" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">刷新</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">代理商简称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">代理商名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">产品名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">签约时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">签约状态</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">创建时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderSalesAgentProductRows()}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ========== 会员管理模块 ==========

// 会员 mock 数据
const memberMockData = [
    { mid: 'MBR20250001', name: 'Alice Johnson', type: '个人', regUser: 'alice_j', regCredential: '+852****8901', regSource: '张三（销售）', salesName: '张三', agentName: '鲲鹏科技', status: 'active', regTime: '2025-01-15 10:30:00', lastLoginIp: '103.25.68.12', lastLoginTime: '2025-02-09 14:22:35' },
    { mid: 'MBR20250002', name: 'Global Trading Ltd', type: '企业', regUser: 'gt_admin', regCredential: '+86****5678', regSource: '李四（销售）', salesName: '李四', agentName: '鲲鹏科技', status: 'active', regTime: '2025-01-20 14:15:00', lastLoginIp: '202.96.134.88', lastLoginTime: '2025-02-09 09:45:12' },
    { mid: 'MBR20250003', name: 'Bob Smith', type: '个人', regUser: 'bob_smith', regCredential: '+1****4321', regSource: '', salesName: '', agentName: '', status: 'suspended', regTime: '2025-02-01 09:00:00', lastLoginIp: '74.125.224.72', lastLoginTime: '2025-02-05 18:30:00' },
    { mid: 'MBR20250004', name: '深圳前海科技有限公司', type: '企业', regUser: 'sz_tech', regCredential: '+86****9012', regSource: '王五（销售）', salesName: '王五', agentName: '', status: 'active', regTime: '2025-02-05 16:20:00', lastLoginIp: '120.78.193.45', lastLoginTime: '2025-02-09 16:10:08' },
    { mid: 'MBR20250005', name: 'Tokyo Payments Inc', type: '企业', regUser: 'tp_inc', regCredential: '+81****5566', regSource: '', salesName: '', agentName: '游戏总代', status: 'active', regTime: '2025-02-08 11:45:00', lastLoginIp: '210.171.226.40', lastLoginTime: '2025-02-09 11:20:55' },
    { mid: 'MBR20250006', name: 'Maria Garcia', type: '个人', regUser: 'maria_g', regCredential: '+34****7788', regSource: '张三（销售）', salesName: '张三', agentName: '鲲鹏科技', status: 'inactive', regTime: '2024-12-10 08:30:00', lastLoginIp: '88.26.12.115', lastLoginTime: '2025-01-15 20:05:30' }
];

// 渲染会员基本信息查询页面
function renderMemberInfoQuery() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" onclick="goBack()">首页</a> / <span>客户中心</span> / <span>会员基本信息查询</span>
            </div>
            <h1 class="page-title">会员基本信息查询</h1>
            <p class="page-desc">查询和管理所有会员的基本信息</p>
        </div>

        <!-- 搜索表单 -->
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">会员 MID</label>
                        <input type="text" id="memberMid" placeholder="请输入会员MID" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">会员名称</label>
                        <input type="text" id="memberName" placeholder="请输入会员名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">会员类型</label>
                        <select id="memberType" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="个人">个人</option>
                            <option value="企业">企业</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">会员状态</label>
                        <select id="memberStatus" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="active">正常</option>
                            <option value="suspended">暂停</option>
                            <option value="inactive">未激活</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">所属代理商</label>
                        <input type="text" id="memberAgent" placeholder="请输入代理商名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">注册时间</label>
                        <input type="date" id="memberRegDate" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="searchMembers()" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="resetMemberForm()" style="padding: 8px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>

        <!-- 数据表格 -->
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">会员列表 <span style="font-size: 13px; color: #6c757d; font-weight: 400;">共 ${memberMockData.length} 条</span></h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('导出功能开发中')" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">导出</button>
                    <button onclick="renderMemberInfoQuery()" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">刷新</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">会员 MID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">会员名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">类型</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">注册用户</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">所属销售</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">所属代理商</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">状态</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">注册时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderMemberTableRows()}
                    </tbody>
                </table>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px;">
                <span style="font-size: 13px; color: #6c757d;">显示 1-${memberMockData.length} 条，共 ${memberMockData.length} 条</span>
                <div style="display: flex; gap: 4px;">
                    <button style="padding: 6px 12px; border: 1px solid #dee2e6; background: white; border-radius: 4px; cursor: pointer; font-size: 14px;">上一页</button>
                    <button style="padding: 6px 12px; border: 1px solid #4f46e5; background: #4f46e5; color: white; border-radius: 4px; cursor: pointer; font-size: 14px;">1</button>
                    <button style="padding: 6px 12px; border: 1px solid #dee2e6; background: white; border-radius: 4px; cursor: pointer; font-size: 14px;">下一页</button>
                </div>
            </div>
        </div>
    `;
}

// 渲染会员表格行
function renderMemberTableRows() {
    const statusMap = { active: { label: '正常', bg: '#d1fae5', color: '#065f46' }, suspended: { label: '暂停', bg: '#fef3c7', color: '#92400e' }, inactive: { label: '未激活', bg: '#e2e8f0', color: '#475569' } };

    return memberMockData.map(m => `
        <tr style="border-bottom: 1px solid #e9ecef; cursor: pointer;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background=''">
            <td style="padding: 14px 16px; font-size: 14px; font-family: monospace; color: #4f46e5;">${m.mid}</td>
            <td style="padding: 14px 16px; font-size: 14px; font-weight: 500;">${m.name}</td>
            <td style="padding: 14px 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${m.type === '企业' ? '#dbeafe' : '#fae8ff'}; color: ${m.type === '企业' ? '#1e40af' : '#86198f'};">${m.type}</span>
            </td>
            <td style="padding: 14px 16px; font-size: 14px; color: #6c757d;">${m.regUser}</td>
            <td style="padding: 14px 16px; font-size: 14px; color: ${m.salesName ? '#1f2937' : '#adb5bd'};">${m.salesName || '-'}</td>
            <td style="padding: 14px 16px; font-size: 14px; color: ${m.agentName ? '#1f2937' : '#adb5bd'};">${m.agentName || '-'}</td>
            <td style="padding: 14px 16px; font-size: 14px;">
                <span style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${statusMap[m.status].bg}; color: ${statusMap[m.status].color};">
                    <span style="width: 6px; height: 6px; border-radius: 50%; background: ${statusMap[m.status].color};"></span>
                    ${statusMap[m.status].label}
                </span>
            </td>
            <td style="padding: 14px 16px; font-size: 13px; color: #6c757d; white-space: nowrap;">${m.regTime}</td>
            <td style="padding: 14px 16px; font-size: 14px;">
                <button onclick="viewMemberDetail('${m.mid}')" style="background: none; border: none; color: #4f46e5; cursor: pointer; font-size: 14px; text-decoration: underline;">详情</button>
            </td>
        </tr>
    `).join('');
}

// 查看会员详情
function viewMemberDetail(mid) {
    const m = memberMockData.find(item => item.mid === mid);
    if (!m) return;

    const statusMap = { active: { label: '正常', bg: '#d1fae5', color: '#065f46' }, suspended: { label: '暂停', bg: '#fef3c7', color: '#92400e' }, inactive: { label: '未激活', bg: '#e2e8f0', color: '#475569' } };
    const s = statusMap[m.status];

    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="product-modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="product-modal-content" style="max-width: 720px;">
            <button class="modal-close" onclick="this.closest('.product-modal').remove()">×</button>

            <!-- 头部 -->
            <div style="display: flex; align-items: center; gap: 16px; padding-bottom: 24px; border-bottom: 1px solid #e9ecef; margin-bottom: 24px;">
                <div style="width: 56px; height: 56px; border-radius: 14px; background: ${m.type === '企业' ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'linear-gradient(135deg, #a855f7, #7c3aed)'}; display: flex; align-items: center; justify-content: center; color: white; font-size: 22px; font-weight: 700;">
                    ${m.type === '企业' ? '企' : '个'}
                </div>
                <div style="flex: 1;">
                    <h2 style="margin: 0 0 4px 0; font-size: 20px; font-weight: 600;">${m.name}</h2>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 13px; color: #6c757d; font-family: monospace;">${m.mid}</span>
                        <span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${s.bg}; color: ${s.color};">
                            <span style="width: 6px; height: 6px; border-radius: 50%; background: ${s.color};"></span>
                            ${s.label}
                        </span>
                        <span style="padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${m.type === '企业' ? '#dbeafe' : '#fae8ff'}; color: ${m.type === '企业' ? '#1e40af' : '#86198f'};">${m.type}</span>
                    </div>
                </div>
            </div>

            <!-- 详情字段 -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0;">
                ${renderDetailRow('会员 MID', m.mid, true)}
                ${renderDetailRow('会员名称', m.name + ' <span style=\"font-size:12px;color:#6c757d;\">(KYC名称)</span>')}
                ${renderDetailRow('会员类型', m.type)}
                ${renderDetailRow('会员注册用户', m.regUser + ' <span style=\"font-size:12px;color:#6c757d;\">(用户昵称)</span>')}
                ${renderDetailRow('会员注册凭证', '<span style="font-family:monospace;">' + m.regCredential + '</span> <span style="font-size:12px;color:#6c757d;">(手机号)</span>')}
                ${renderDetailRow('会员注册来源', m.regSource || '<span style="color:#adb5bd;">-</span>')}
                ${renderDetailRow('会员所属销售', m.salesName || '<span style="color:#adb5bd;">-</span>')}
                ${renderDetailRow('会员所属代理商', m.agentName || '<span style="color:#adb5bd;">-</span>')}
                ${renderDetailRow('会员状态', '<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:500;background:' + s.bg + ';color:' + s.color + ';"><span style="width:6px;height:6px;border-radius:50%;background:' + s.color + ';"></span>' + s.label + '</span>')}
                ${renderDetailRow('会员注册时间', m.regTime)}
                ${renderDetailRow('会员最后登录 IP', '<span style="font-family:monospace;">' + m.lastLoginIp + '</span>')}
                ${renderDetailRow('会员最后登录时间', m.lastLoginTime)}
            </div>

            <!-- 底部操作 -->
            <div style="display: flex; gap: 12px; margin-top: 24px; padding-top: 24px; border-top: 1px solid #e9ecef;">
                <button onclick="alert('查看会员开通产品: ${m.mid}')" style="padding: 10px 20px; background: #4f46e5; color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">查看开通产品</button>
                <button onclick="this.closest('.product-modal').remove()" style="padding: 10px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">关闭</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 渲染详情行
function renderDetailRow(label, value, isFirst) {
    return `
        <div style="padding: 12px 0; ${isFirst ? '' : 'border-top: 1px solid #f1f3f5;'}">
            <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">${label}</div>
            <div style="font-size: 14px; color: #1f2937;">${value}</div>
        </div>
    `;
}

// 搜索会员
function searchMembers() {
    alert('搜索功能开发中');
}

// 重置会员搜索表单
function resetMemberForm() {
    ['memberMid', 'memberName', 'memberType', 'memberStatus', 'memberAgent', 'memberRegDate'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}

// 渲染会员开通产品页面
function renderMemberProducts() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" onclick="goBack()">首页</a> / <span>客户中心</span> / <span>会员开通产品</span>
            </div>
            <h1 class="page-title">会员开通产品</h1>
            <p class="page-desc">查看和管理会员已开通的产品</p>
        </div>

        <!-- 搜索表单 -->
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">会员 MID</label>
                        <input type="text" placeholder="请输入会员MID" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">会员名称</label>
                        <input type="text" placeholder="请输入会员名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">产品名称</label>
                        <input type="text" placeholder="请输入产品名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">开通状态</label>
                        <select style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="active">已开通</option>
                            <option value="pending">审核中</option>
                            <option value="expired">已过期</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="alert('查询功能开发中')" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置功能开发中')" style="padding: 8px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>

        <!-- 数据表格 -->
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">会员产品列表</h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('导出功能开发中')" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">导出</button>
                    <button onclick="renderMemberProducts()" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">刷新</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">会员 MID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">会员名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">产品名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">开通时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">到期时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">状态</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderMemberProductRows()}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 渲染会员产品表格行
function renderMemberProductRows() {
    const mockData = [
        { mid: 'MBR20250001', name: 'Alice Johnson', product: '数币收款', openDate: '2025-01-20', expireDate: '2026-01-20', status: 'active' },
        { mid: 'MBR20250001', name: 'Alice Johnson', product: '法币VA收款', openDate: '2025-01-25', expireDate: '2026-01-25', status: 'active' },
        { mid: 'MBR20250002', name: 'Global Trading Ltd', product: '数币付款', openDate: '2025-02-01', expireDate: '2026-02-01', status: 'active' },
        { mid: 'MBR20250002', name: 'Global Trading Ltd', product: '承兑服务', openDate: '2025-02-01', expireDate: '2026-02-01', status: 'active' },
        { mid: 'MBR20250004', name: '深圳前海科技有限公司', product: '虚拟卡发行', openDate: '2025-02-10', expireDate: '2025-02-28', status: 'pending' },
        { mid: 'MBR20250005', name: 'Tokyo Payments Inc', product: '收单服务', openDate: '2024-06-01', expireDate: '2025-06-01', status: 'active' }
    ];

    return mockData.map(item => `
        <tr style="border-bottom: 1px solid #e9ecef;">
            <td style="padding: 14px 16px; font-size: 14px; font-family: monospace; color: #4f46e5;">${item.mid}</td>
            <td style="padding: 14px 16px; font-size: 14px;">${item.name}</td>
            <td style="padding: 14px 16px; font-size: 14px; font-weight: 500;">${item.product}</td>
            <td style="padding: 14px 16px; font-size: 14px;">${item.openDate}</td>
            <td style="padding: 14px 16px; font-size: 14px;">${item.expireDate}</td>
            <td style="padding: 14px 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${item.status === 'active' ? '#d1fae5' : item.status === 'pending' ? '#fef3c7' : '#fee2e2'}; color: ${item.status === 'active' ? '#065f46' : item.status === 'pending' ? '#92400e' : '#991b1b'};">
                    ${item.status === 'active' ? '已开通' : item.status === 'pending' ? '审核中' : '已过期'}
                </span>
            </td>
            <td style="padding: 14px 16px; font-size: 14px;">
                <button onclick="window.open('merchant-product-detail-editable.html', '_blank')" style="background: none; border: none; color: #4f46e5; cursor: pointer; font-size: 14px; text-decoration: underline;">产品配置</button>
            </td>
        </tr>
    `).join('');
}

// ========== SP 客户中心模块 ==========

const clientMockData = [
    { mid: 'CLT20250001', name: 'Alice Johnson', type: '个人', regSource: 'EX', agentType: '普通代理商', agentId: 'AGT001', agentName: '鲲鹏科技', status: 'active', regTime: '2025-01-15 10:30:00', kyc: { legalName: 'Alice Johnson', idType: '护照', idNumber: 'E1234****', nationality: '美国', address: '123 Main St, New York, NY 10001', phone: '+1-212-555-0001', email: 'alice@example.com', kycStatus: 'approved', kycTime: '2025-01-16 14:00:00' }},
    { mid: 'CLT20250002', name: 'Global Trading Ltd', type: '企业', regSource: '张三', agentType: '机构代理', agentId: 'AGT002', agentName: '上海贸易集团', status: 'active', regTime: '2025-01-20 14:15:00', kyc: { legalName: 'Global Trading Limited', idType: '营业执照', idNumber: '91310000****', nationality: '中国', address: '上海市浦东新区陆家嘴金融中心', phone: '+86-21-5555-0002', email: 'admin@globaltrading.com', kycStatus: 'approved', kycTime: '2025-01-22 09:30:00', regCapital: 'USD 5,000,000', legalRep: 'Wang Lei', bizScope: '跨境支付、国际贸易' }},
    { mid: 'CLT20250003', name: 'Bob Smith', type: '个人', regSource: '', agentType: '', agentId: '', agentName: '', status: 'suspended', regTime: '2025-02-01 09:00:00', kyc: { legalName: 'Robert Smith', idType: '身份证', idNumber: '4403****5678', nationality: '英国', address: '45 Oxford Street, London W1D 2DZ', phone: '+44-20-7946-0003', email: 'bob.smith@mail.com', kycStatus: 'pending', kycTime: '' }},
    { mid: 'CLT20250004', name: '深圳前海科技有限公司', type: '企业', regSource: '王五', agentType: '机构代理', agentId: 'AGT003', agentName: '深圳科技集团', status: 'active', regTime: '2025-02-05 16:20:00', kyc: { legalName: '深圳前海科技有限公司', idType: '营业执照', idNumber: '91440300****', nationality: '中国', address: '深圳市前海深港合作区', phone: '+86-755-8888-0004', email: 'info@szqhtech.com', kycStatus: 'approved', kycTime: '2025-02-06 11:00:00', regCapital: 'CNY 10,000,000', legalRep: 'Li Ming', bizScope: '电子商务、支付技术' }},
    { mid: 'CLT20250005', name: 'Tokyo Payments Inc', type: '企业', regSource: 'EX', agentType: '普通代理商', agentId: 'AGT004', agentName: '游戏总代', status: 'active', regTime: '2025-02-08 11:45:00', kyc: { legalName: 'Tokyo Payments Inc.', idType: '营业执照', idNumber: 'JP-CORP-****', nationality: '日本', address: '1-1-1 Shibuya, Tokyo 150-0002', phone: '+81-3-1234-0005', email: 'contact@tokyopay.jp', kycStatus: 'approved', kycTime: '2025-02-09 10:00:00', regCapital: 'JPY 100,000,000', legalRep: 'Tanaka Yuki', bizScope: '游戏支付、跨境结算' }},
    { mid: 'CLT20250006', name: 'Maria Garcia', type: '个人', regSource: '张三', agentType: '普通代理商', agentId: 'AGT001', agentName: '鲲鹏科技', status: 'inactive', regTime: '2024-12-10 08:30:00', kyc: { legalName: 'Maria Garcia Lopez', idType: '护照', idNumber: 'ES9876****', nationality: '西班牙', address: 'Calle Mayor 10, Madrid 28013', phone: '+34-91-555-0006', email: 'maria.garcia@correo.es', kycStatus: 'approved', kycTime: '2024-12-12 15:30:00' }}
];

// 渲染客户基本信息查询页面
function renderClientInfoQuery() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" onclick="goBack()">首页</a> / <span>客户中心</span> / <span>客户基本信息查询</span>
            </div>
            <h1 class="page-title">客户基本信息查询</h1>
            <p class="page-desc">查询和管理所有客户的基本信息</p>
        </div>

        <!-- 搜索表单 -->
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">客户 MID</label>
                        <input type="text" id="clientMid" placeholder="请输入客户MID" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">客户名称</label>
                        <input type="text" id="clientName" placeholder="请输入客户名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">客户类型</label>
                        <select id="clientType" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="个人">个人</option>
                            <option value="企业">企业</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">客户状态</label>
                        <select id="clientStatus" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="active">正常</option>
                            <option value="suspended">暂停</option>
                            <option value="inactive">未激活</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">所属代理类型</label>
                        <select id="clientAgentType" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="机构代理">机构代理</option>
                            <option value="普通代理商">普通代理商</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">注册来源</label>
                        <select id="clientSource" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="EX">EX</option>
                            <option value="sales">销售推荐</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="searchClients()" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="resetClientForm()" style="padding: 8px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>

        <!-- 数据表格 -->
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">客户列表 <span style="font-size: 13px; color: #6c757d; font-weight: 400;">共 ${clientMockData.length} 条</span></h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('导出功能开发中')" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">导出</button>
                    <button onclick="renderClientInfoQuery()" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">刷新</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">客户 MID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">客户名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">类型</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">注册来源</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">代理类型</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">代理商ID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">代理商名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">状态</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">注册时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderClientTableRows()}
                    </tbody>
                </table>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px;">
                <span style="font-size: 13px; color: #6c757d;">显示 1-${clientMockData.length} 条，共 ${clientMockData.length} 条</span>
                <div style="display: flex; gap: 4px;">
                    <button style="padding: 6px 12px; border: 1px solid #dee2e6; background: white; border-radius: 4px; cursor: pointer; font-size: 14px;">上一页</button>
                    <button style="padding: 6px 12px; border: 1px solid #4f46e5; background: #4f46e5; color: white; border-radius: 4px; cursor: pointer; font-size: 14px;">1</button>
                    <button style="padding: 6px 12px; border: 1px solid #dee2e6; background: white; border-radius: 4px; cursor: pointer; font-size: 14px;">下一页</button>
                </div>
            </div>
        </div>
    `;
}

function renderClientTableRows() {
    const statusMap = { active: { label: '正常', bg: '#d1fae5', color: '#065f46' }, suspended: { label: '暂停', bg: '#fef3c7', color: '#92400e' }, inactive: { label: '未激活', bg: '#e2e8f0', color: '#475569' } };
    return clientMockData.map(c => `
        <tr style="border-bottom: 1px solid #e9ecef; cursor: pointer;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background=''">
            <td style="padding: 14px 16px; font-size: 14px; font-family: monospace; color: #4f46e5;">${c.mid}</td>
            <td style="padding: 14px 16px; font-size: 14px; font-weight: 500;">${c.name}</td>
            <td style="padding: 14px 16px; font-size: 14px;">
                <span style="padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${c.type === '企业' ? '#dbeafe' : '#fae8ff'}; color: ${c.type === '企业' ? '#1e40af' : '#86198f'};">${c.type}</span>
            </td>
            <td style="padding: 14px 16px; font-size: 14px; color: ${c.regSource ? '#1f2937' : '#adb5bd'};">${c.regSource || '-'}</td>
            <td style="padding: 14px 16px; font-size: 14px; color: ${c.agentType ? '#1f2937' : '#adb5bd'};">${c.agentType || '-'}</td>
            <td style="padding: 14px 16px; font-size: 14px; font-family: monospace; color: ${c.agentId ? '#6c757d' : '#adb5bd'};">${c.agentId || '-'}</td>
            <td style="padding: 14px 16px; font-size: 14px; color: ${c.agentName ? '#1f2937' : '#adb5bd'};">${c.agentName || '-'}</td>
            <td style="padding: 14px 16px; font-size: 14px;">
                <span style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${statusMap[c.status].bg}; color: ${statusMap[c.status].color};">
                    <span style="width: 6px; height: 6px; border-radius: 50%; background: ${statusMap[c.status].color};"></span>
                    ${statusMap[c.status].label}
                </span>
            </td>
            <td style="padding: 14px 16px; font-size: 13px; color: #6c757d; white-space: nowrap;">${c.regTime}</td>
            <td style="padding: 14px 16px; font-size: 14px;">
                <button onclick="viewClientDetail('${c.mid}')" style="background: none; border: none; color: #4f46e5; cursor: pointer; font-size: 14px; text-decoration: underline;">详情</button>
            </td>
        </tr>
    `).join('');
}

// 查看客户详情（基本信息 + KYC主体信息）
function viewClientDetail(mid) {
    const c = clientMockData.find(item => item.mid === mid);
    if (!c) return;
    const statusMap = { active: { label: '正常', bg: '#d1fae5', color: '#065f46' }, suspended: { label: '暂停', bg: '#fef3c7', color: '#92400e' }, inactive: { label: '未激活', bg: '#e2e8f0', color: '#475569' } };
    const s = statusMap[c.status];
    const k = c.kyc;
    const kycStatusMap = { approved: { label: '已通过', bg: '#d1fae5', color: '#065f46' }, pending: { label: '审核中', bg: '#fef3c7', color: '#92400e' }, rejected: { label: '已拒绝', bg: '#fee2e2', color: '#991b1b' } };
    const ks = kycStatusMap[k.kycStatus] || { label: k.kycStatus, bg: '#e2e8f0', color: '#475569' };

    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="product-modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="product-modal-content" style="max-width: 800px; max-height: 90vh; overflow-y: auto;">
            <button class="modal-close" onclick="this.closest('.product-modal').remove()">×</button>

            <!-- 头部 -->
            <div style="display: flex; align-items: center; gap: 16px; padding-bottom: 20px; border-bottom: 1px solid #e9ecef; margin-bottom: 24px;">
                <div style="width: 56px; height: 56px; border-radius: 14px; background: ${c.type === '企业' ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'linear-gradient(135deg, #a855f7, #7c3aed)'}; display: flex; align-items: center; justify-content: center; color: white; font-size: 22px; font-weight: 700;">
                    ${c.type === '企业' ? '企' : '个'}
                </div>
                <div style="flex: 1;">
                    <h2 style="margin: 0 0 4px 0; font-size: 20px; font-weight: 600;">${c.name}</h2>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 13px; color: #6c757d; font-family: monospace;">${c.mid}</span>
                        <span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${s.bg}; color: ${s.color};">
                            <span style="width: 6px; height: 6px; border-radius: 50%; background: ${s.color};"></span>${s.label}
                        </span>
                        <span style="padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${c.type === '企业' ? '#dbeafe' : '#fae8ff'}; color: ${c.type === '企业' ? '#1e40af' : '#86198f'};">${c.type}</span>
                    </div>
                </div>
            </div>

            <!-- 基本信息 -->
            <div style="margin-bottom: 24px;">
                <h3 style="font-size: 15px; font-weight: 600; color: #1f2937; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #4f46e5; display: inline-block;">基本信息</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0;">
                    ${renderClientDetailRow('客户 MID', c.mid, true)}
                    ${renderClientDetailRow('客户名称', c.name + ' <span style="font-size:12px;color:#6c757d;">(KYC名称)</span>')}
                    ${renderClientDetailRow('客户类型', c.type)}
                    ${renderClientDetailRow('注册来源', c.regSource || '<span style="color:#adb5bd;">-</span>')}
                    ${renderClientDetailRow('所属代理类型', c.agentType || '<span style="color:#adb5bd;">-</span>')}
                    ${renderClientDetailRow('代理商 ID', c.agentId ? '<span style="font-family:monospace;">' + c.agentId + '</span>' : '<span style="color:#adb5bd;">-</span>')}
                    ${renderClientDetailRow('代理商名称', c.agentName || '<span style="color:#adb5bd;">-</span>')}
                    ${renderClientDetailRow('客户状态', '<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:500;background:' + s.bg + ';color:' + s.color + ';"><span style="width:6px;height:6px;border-radius:50%;background:' + s.color + ';"></span>' + s.label + '</span>')}
                    ${renderClientDetailRow('注册时间', c.regTime)}
                </div>
            </div>

            <!-- KYC 主体信息 -->
            <div style="margin-bottom: 24px;">
                <h3 style="font-size: 15px; font-weight: 600; color: #1f2937; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #10b981; display: inline-block;">主体信息（KYC）</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0;">
                    ${renderClientDetailRow('法定名称', k.legalName, true)}
                    ${renderClientDetailRow('证件类型', k.idType)}
                    ${renderClientDetailRow('证件号码', '<span style="font-family:monospace;">' + k.idNumber + '</span>')}
                    ${renderClientDetailRow('国籍/注册地', k.nationality)}
                    ${renderClientDetailRow('地址', k.address)}
                    ${renderClientDetailRow('联系电话', '<span style="font-family:monospace;">' + k.phone + '</span>')}
                    ${renderClientDetailRow('邮箱', k.email)}
                    ${c.type === '企业' && k.regCapital ? renderClientDetailRow('注册资本', k.regCapital) : ''}
                    ${c.type === '企业' && k.legalRep ? renderClientDetailRow('法定代表人', k.legalRep) : ''}
                    ${c.type === '企业' && k.bizScope ? renderClientDetailRow('经营范围', k.bizScope) : ''}
                    ${renderClientDetailRow('KYC 状态', '<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:500;background:' + ks.bg + ';color:' + ks.color + ';"><span style="width:6px;height:6px;border-radius:50%;background:' + ks.color + ';"></span>' + ks.label + '</span>')}
                    ${renderClientDetailRow('KYC 审核时间', k.kycTime || '<span style="color:#adb5bd;">-</span>')}
                </div>
            </div>

            <!-- 底部操作 -->
            <div style="display: flex; gap: 12px; padding-top: 20px; border-top: 1px solid #e9ecef;">
                <button onclick="alert('查看客户产品: ${c.mid}')" style="padding: 10px 20px; background: #4f46e5; color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">查看开通产品</button>
                <button onclick="alert('查看客户余额: ${c.mid}')" style="padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">查看余额</button>
                <button onclick="this.closest('.product-modal').remove()" style="padding: 10px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">关闭</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function renderClientDetailRow(label, value, isFirst) {
    return `<div style="padding: 12px 0; ${isFirst ? '' : 'border-top: 1px solid #f1f3f5;'}">
        <div style="font-size: 12px; color: #6c757d; margin-bottom: 4px;">${label}</div>
        <div style="font-size: 14px; color: #1f2937;">${value}</div>
    </div>`;
}

function searchClients() { alert('搜索功能开发中'); }
function resetClientForm() {
    ['clientMid','clientName','clientType','clientStatus','clientAgentType','clientSource'].forEach(id => {
        const el = document.getElementById(id); if (el) el.value = '';
    });
}

// ========== 2. 客户产品信息 ==========
function renderClientProductList() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    const productData = [
        { mid: 'CLT20250001', name: 'Alice Johnson', product: 'Crypto Collection', openDate: '2025-01-20', expireDate: '2026-01-20', status: 'active' },
        { mid: 'CLT20250001', name: 'Alice Johnson', product: 'Fiat VA Collection', openDate: '2025-01-25', expireDate: '2026-01-25', status: 'active' },
        { mid: 'CLT20250002', name: 'Global Trading Ltd', product: 'Crypto Payment', openDate: '2025-02-01', expireDate: '2026-02-01', status: 'active' },
        { mid: 'CLT20250002', name: 'Global Trading Ltd', product: 'On/Off Ramp', openDate: '2025-02-01', expireDate: '2026-02-01', status: 'active' },
        { mid: 'CLT20250004', name: '深圳前海科技有限公司', product: 'Virtual Card Issuing', openDate: '2025-02-10', expireDate: '2025-08-10', status: 'active' },
        { mid: 'CLT20250005', name: 'Tokyo Payments Inc', product: 'Checkout', openDate: '2025-02-08', expireDate: '2026-02-08', status: 'active' },
        { mid: 'CLT20250003', name: 'Bob Smith', product: 'Crypto Collection', openDate: '2025-02-01', expireDate: '2025-04-01', status: 'disabled' },
        { mid: 'CLT20250006', name: 'Maria Garcia', product: 'Fiat VA Collection', openDate: '2024-12-15', expireDate: '2025-06-15', status: 'expired' }
    ];
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb"><a href="#" onclick="goBack()">首页</a> / <span>客户中心</span> / <span>客户产品列表</span></div>
            <h1 class="page-title">客户产品信息</h1>
            <p class="page-desc">查看客户已开通的产品及状态</p>
        </div>
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">客户 MID</label>
                        <input type="text" placeholder="请输入客户MID" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">客户名称</label>
                        <input type="text" placeholder="请输入客户名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">产品名称</label>
                        <input type="text" placeholder="请输入产品名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">状态</label>
                        <select style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option>
                            <option value="active">已开通</option>
                            <option value="disabled">已禁用</option>
                            <option value="expired">已过期</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="alert('查询功能开发中')" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置')" style="padding: 8px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">客户产品列表 <span style="font-size: 13px; color: #6c757d; font-weight: 400;">共 ${productData.length} 条</span></h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('导出功能开发中')" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">导出</button>
                    <button onclick="renderClientProductList()" style="padding: 6px 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer; color: #6c757d;">刷新</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">客户 MID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">客户名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">开通产品名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">开通时间</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">有效期截止</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">状态</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productData.map(p => {
                            const sMap = { active: {l:'已开通',bg:'#d1fae5',c:'#065f46'}, disabled: {l:'已禁用',bg:'#fee2e2',c:'#991b1b'}, expired: {l:'已过期',bg:'#e2e8f0',c:'#475569'} };
                            const st = sMap[p.status];
                            const toggleLabel = p.status === 'active' ? '禁用' : p.status === 'disabled' ? '启用' : '';
                            const toggleColor = p.status === 'active' ? '#dc2626' : '#10b981';
                            return `<tr style="border-bottom: 1px solid #e9ecef;">
                                <td style="padding: 14px 16px; font-size: 14px; font-family: monospace; color: #4f46e5;">${p.mid}</td>
                                <td style="padding: 14px 16px; font-size: 14px;">${p.name}</td>
                                <td style="padding: 14px 16px; font-size: 14px; font-weight: 500;">${p.product}</td>
                                <td style="padding: 14px 16px; font-size: 14px;">${p.openDate}</td>
                                <td style="padding: 14px 16px; font-size: 14px;">${p.expireDate}</td>
                                <td style="padding: 14px 16px; font-size: 14px;">
                                    <span style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${st.bg}; color: ${st.c};">
                                        <span style="width: 6px; height: 6px; border-radius: 50%; background: ${st.c};"></span>${st.l}
                                    </span>
                                </td>
                                <td style="padding: 14px 16px; font-size: 14px; white-space: nowrap;">
                                    <button onclick="alert('产品详情: ${p.mid} - ${p.product}')" style="background: none; border: none; color: #4f46e5; cursor: pointer; font-size: 14px; text-decoration: underline; margin-right: 8px;">详情</button>
                                    ${toggleLabel ? `<button onclick="alert('${toggleLabel}: ${p.mid} - ${p.product}')" style="background: none; border: none; color: ${toggleColor}; cursor: pointer; font-size: 14px; text-decoration: underline;">${toggleLabel}</button>` : ''}
                                </td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ========== 3. 客户余额查询 ==========

// 3.1 客户余额
function renderClientBalance() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    const balanceData = [
        { mid: 'CLT20250001', name: 'Alice Johnson', currency: 'USD', available: '12,580.50', pending: '1,200.00', frozen: '500.00', total: '14,280.50' },
        { mid: 'CLT20250001', name: 'Alice Johnson', currency: 'USDT', available: '8,350.00', pending: '0.00', frozen: '0.00', total: '8,350.00' },
        { mid: 'CLT20250002', name: 'Global Trading Ltd', currency: 'USD', available: '156,800.25', pending: '12,500.00', frozen: '5,000.00', total: '174,300.25' },
        { mid: 'CLT20250002', name: 'Global Trading Ltd', currency: 'EUR', available: '45,200.00', pending: '3,000.00', frozen: '0.00', total: '48,200.00' },
        { mid: 'CLT20250002', name: 'Global Trading Ltd', currency: 'BTC', available: '2.35000000', pending: '0.00000000', frozen: '0.50000000', total: '2.85000000' },
        { mid: 'CLT20250004', name: '深圳前海科技有限公司', currency: 'USD', available: '89,100.00', pending: '5,600.00', frozen: '2,000.00', total: '96,700.00' },
        { mid: 'CLT20250004', name: '深圳前海科技有限公司', currency: 'CNY', available: '520,000.00', pending: '0.00', frozen: '0.00', total: '520,000.00' },
        { mid: 'CLT20250005', name: 'Tokyo Payments Inc', currency: 'USD', available: '34,500.00', pending: '2,100.00', frozen: '0.00', total: '36,600.00' },
        { mid: 'CLT20250005', name: 'Tokyo Payments Inc', currency: 'JPY', available: '5,200,000', pending: '0', frozen: '0', total: '5,200,000' }
    ];
    const thStyle = 'padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;';
    const thStyleR = 'padding: 10px 14px; text-align: right; font-size: 12px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;';
    const tdStyle = 'padding: 10px 14px; font-size: 13px; white-space: nowrap;';
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb"><a href="#" onclick="goBack()">首页</a> / <span>客户中心</span> / <span>客户余额</span></div>
            <h1 class="page-title">客户余额查询</h1>
            <p class="page-desc">查看客户各币种账户余额</p>
        </div>
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 16px 20px;">
                <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-end;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">客户 MID</label>
                        <input type="text" placeholder="客户MID" style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; width: 150px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">客户名称</label>
                        <input type="text" placeholder="客户名称" style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; width: 150px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">币种</label>
                        <select style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; width: 100px;">
                            <option value="">全部</option>
                            <option>USD</option><option>EUR</option><option>CNY</option><option>JPY</option><option>GBP</option>
                            <option>USDT</option><option>BTC</option><option>ETH</option>
                        </select>
                    </div>
                    <button onclick="alert('查询功能开发中')" style="padding: 6px 16px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 13px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置')" style="padding: 6px 16px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer;">重置</button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">余额列表</h2>
                <button onclick="renderClientBalance()" style="padding: 5px 10px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 12px; cursor: pointer; color: #6c757d;">刷新</button>
            </div>
            <div style="overflow-x: auto;">
                <table style="min-width: 800px; width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="${thStyle}">客户 MID</th>
                            <th style="${thStyle}">客户名称</th>
                            <th style="${thStyle}">币种</th>
                            <th style="${thStyleR}">可用余额</th>
                            <th style="${thStyleR}">待结算</th>
                            <th style="${thStyleR}">冻结金额</th>
                            <th style="${thStyleR}">总余额</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${balanceData.map(b => `<tr style="border-bottom: 1px solid #e9ecef;">
                            <td style="${tdStyle} font-family: monospace; color: #4f46e5;">${b.mid}</td>
                            <td style="${tdStyle}">${b.name}</td>
                            <td style="${tdStyle}"><span style="padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; background: #f0f0f0; color: #333; font-family: monospace;">${b.currency}</span></td>
                            <td style="${tdStyle} text-align: right; font-family: monospace; font-weight: 500; color: #059669;">${b.available}</td>
                            <td style="${tdStyle} text-align: right; font-family: monospace; color: #d97706;">${b.pending}</td>
                            <td style="${tdStyle} text-align: right; font-family: monospace; color: ${b.frozen !== '0.00' && b.frozen !== '0' && b.frozen !== '0.00000000' ? '#dc2626' : '#adb5bd'};">${b.frozen}</td>
                            <td style="${tdStyle} text-align: right; font-family: monospace; font-weight: 600;">${b.total}</td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 3.2 客户流水
function renderClientTransactions() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    const txData = [
        { mid: 'CLT20250001', acctId: 'ACC-USD-0001', acctName: 'Alice USD Main', productType: '法币VA收款', txType: '收款', txId: 'TXN20250209001', merchantRef: 'PAY-2025020900123', amount: '+3,500.00', currency: 'USD', balance: '12,580.50', balCurrency: 'USD', time: '2025-02-09 14:30:22', desc: 'VA收款入账' },
        { mid: 'CLT20250001', acctId: 'ACC-USD-0001', acctName: 'Alice USD Main', productType: '法币代付出款', txType: '提现', txId: 'TXN20250209002', merchantRef: 'WDR-2025020900045', amount: '-2,000.00', currency: 'USD', balance: '9,080.50', balCurrency: 'USD', time: '2025-02-09 11:15:08', desc: '银行卡提现' },
        { mid: 'CLT20250002', acctId: 'ACC-USD-0002', acctName: 'Global Trading USD', productType: '法币VA收款', txType: '收款', txId: 'TXN20250209003', merchantRef: 'PAY-2025020900089', amount: '+25,000.00', currency: 'USD', balance: '156,800.25', balCurrency: 'USD', time: '2025-02-09 10:22:15', desc: 'VA收款入账' },
        { mid: 'CLT20250002', acctId: 'ACC-EUR-0002', acctName: 'Global Trading EUR', productType: '承兑服务', txType: '换汇', txId: 'TXN20250209004', merchantRef: 'FX-2025020900012', amount: '+10,000.00', currency: 'EUR', balance: '45,200.00', balCurrency: 'EUR', time: '2025-02-09 09:45:30', desc: 'USD→EUR 换汇入账' },
        { mid: 'CLT20250004', acctId: 'ACC-USD-0004', acctName: '前海科技 USD', productType: '法币代付出款', txType: '付款', txId: 'TXN20250208005', merchantRef: 'OUT-2025020800067', amount: '-5,600.00', currency: 'USD', balance: '89,100.00', balCurrency: 'USD', time: '2025-02-08 16:20:45', desc: '供应商付款' },
        { mid: 'CLT20250005', acctId: 'ACC-JPY-0005', acctName: 'Tokyo JPY Main', productType: '法币VA收款', txType: '收款', txId: 'TXN20250208006', merchantRef: 'PAY-2025020800034', amount: '+1,200,000', currency: 'JPY', balance: '5,200,000', balCurrency: 'JPY', time: '2025-02-08 15:10:33', desc: 'VA收款入账' },
        { mid: 'CLT20250001', acctId: 'ACC-USD-0001', acctName: 'Alice USD Main', productType: '-', txType: '冻结', txId: 'TXN20250208007', merchantRef: 'FRZ-2025020800011', amount: '-500.00', currency: 'USD', balance: '12,580.50', balCurrency: 'USD', time: '2025-02-08 14:05:12', desc: '风控审查冻结' },
        { mid: 'CLT20250002', acctId: 'ACC-BTC-0002', acctName: 'Global Trading BTC', productType: '数币收款', txType: '收款', txId: 'TXN20250207008', merchantRef: 'CRY-2025020700023', amount: '+0.85000000', currency: 'BTC', balance: '2.35000000', balCurrency: 'BTC', time: '2025-02-07 18:30:00', desc: '链上收款确认' }
    ];
    const typeColors = { '收款': '#059669', '提现': '#dc2626', '付款': '#dc2626', '换汇': '#d97706', '冻结': '#7c3aed', '解冻': '#2563eb' };
    const th = 'padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;';
    const thR = 'padding: 10px 14px; text-align: right; font-size: 12px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;';
    const td = 'padding: 10px 14px; font-size: 13px; white-space: nowrap;';
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb"><a href="#" onclick="goBack()">首页</a> / <span>客户中心</span> / <span>客户流水</span></div>
            <h1 class="page-title">客户流水查询</h1>
            <p class="page-desc">查看客户账户交易流水明细</p>
        </div>
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 16px 20px;">
                <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-end;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">客户 MID</label>
                        <input type="text" placeholder="客户MID" style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; width: 140px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">账户ID</label>
                        <input type="text" placeholder="账户ID" style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; width: 140px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">产品类型</label>
                        <select style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; width: 130px;">
                            <option value="">全部</option>
                            <option>法币VA收款</option><option>法币代付出款</option><option>数币收款</option><option>数币付款</option><option>承兑服务</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">交易类型</label>
                        <select style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; width: 100px;">
                            <option value="">全部</option>
                            <option>收款</option><option>付款</option><option>提现</option><option>换汇</option><option>冻结</option><option>解冻</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">开始日期</label>
                        <input type="date" style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">结束日期</label>
                        <input type="date" style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px;">
                    </div>
                    <button onclick="alert('查询功能开发中')" style="padding: 6px 16px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 13px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置')" style="padding: 6px 16px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer;">重置</button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <h2 class="card-title">流水记录</h2>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('导出功能开发中')" style="padding: 5px 10px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 12px; cursor: pointer; color: #6c757d;">导出</button>
                    <button onclick="renderClientTransactions()" style="padding: 5px 10px; background: white; border: 1px solid #dee2e6; border-radius: 4px; font-size: 12px; cursor: pointer; color: #6c757d;">刷新</button>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table style="min-width: 1400px; width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="${th}">客户 MID</th>
                            <th style="${th}">客户账户ID</th>
                            <th style="${th}">客户账户名称</th>
                            <th style="${th}">产品类型</th>
                            <th style="${th}">交易类型</th>
                            <th style="${th}">交易编号</th>
                            <th style="${th}">商户单号</th>
                            <th style="${thR}">金额</th>
                            <th style="${thR}">余额</th>
                            <th style="${th}">时间</th>
                            <th style="${th}">资金描述</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${txData.map(t => `<tr style="border-bottom: 1px solid #e9ecef;">
                            <td style="${td} font-family: monospace; color: #4f46e5;">${t.mid}</td>
                            <td style="${td} font-family: monospace; color: #6c757d;">${t.acctId}</td>
                            <td style="${td}">${t.acctName}</td>
                            <td style="${td} color: #6c757d;">${t.productType}</td>
                            <td style="${td}"><span style="padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 500; background: ${typeColors[t.txType]}15; color: ${typeColors[t.txType]};">${t.txType}</span></td>
                            <td style="${td} font-family: monospace; color: #6c757d;">${t.txId}</td>
                            <td style="${td} font-family: monospace; color: #6c757d;">${t.merchantRef}</td>
                            <td style="${td} text-align: right; font-family: monospace; font-weight: 500; color: ${t.amount.startsWith('+') ? '#059669' : '#dc2626'};">${t.amount} ${t.currency}</td>
                            <td style="${td} text-align: right; font-family: monospace;">${t.balance} ${t.balCurrency}</td>
                            <td style="${td} color: #6c757d;">${t.time}</td>
                            <td style="${td} color: #495057;">${t.desc}</td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 3.3 客户历史余额
function renderClientHistoryBalance() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    const histData = [
        { date: '2025-02-09', mid: 'CLT20250001', name: 'Alice Johnson', currency: 'USD', openBalance: '11,080.50', inflow: '3,500.00', outflow: '2,000.00', closeBalance: '12,580.50' },
        { date: '2025-02-08', mid: 'CLT20250001', name: 'Alice Johnson', currency: 'USD', openBalance: '10,580.50', inflow: '1,000.00', outflow: '500.00', closeBalance: '11,080.50' },
        { date: '2025-02-09', mid: 'CLT20250002', name: 'Global Trading Ltd', currency: 'USD', openBalance: '131,800.25', inflow: '25,000.00', outflow: '0.00', closeBalance: '156,800.25' },
        { date: '2025-02-08', mid: 'CLT20250002', name: 'Global Trading Ltd', currency: 'EUR', openBalance: '35,200.00', inflow: '10,000.00', outflow: '0.00', closeBalance: '45,200.00' },
        { date: '2025-02-09', mid: 'CLT20250004', name: '深圳前海科技有限公司', currency: 'USD', openBalance: '94,700.00', inflow: '0.00', outflow: '5,600.00', closeBalance: '89,100.00' },
        { date: '2025-02-08', mid: 'CLT20250005', name: 'Tokyo Payments Inc', currency: 'JPY', openBalance: '4,000,000', inflow: '1,200,000', outflow: '0', closeBalance: '5,200,000' }
    ];
    const th = 'padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;';
    const thR = 'padding: 10px 14px; text-align: right; font-size: 12px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;';
    const td = 'padding: 10px 14px; font-size: 13px; white-space: nowrap;';
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb"><a href="#" onclick="goBack()">首页</a> / <span>客户中心</span> / <span>客户历史余额</span></div>
            <h1 class="page-title">客户历史余额</h1>
            <p class="page-desc">查看客户每日余额快照</p>
        </div>
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 16px 20px;">
                <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-end;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">客户 MID</label>
                        <input type="text" placeholder="客户MID" style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; width: 140px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">币种</label>
                        <select style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; width: 100px;">
                            <option value="">全部</option><option>USD</option><option>EUR</option><option>CNY</option><option>JPY</option><option>USDT</option><option>BTC</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">开始日期</label>
                        <input type="date" style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">结束日期</label>
                        <input type="date" style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px;">
                    </div>
                    <button onclick="alert('查询功能开发中')" style="padding: 6px 16px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 13px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置')" style="padding: 6px 16px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer;">重置</button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h2 class="card-title">历史余额</h2></div>
            <div style="overflow-x: auto;">
                <table style="min-width: 900px; width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="${th}">日期</th>
                            <th style="${th}">客户 MID</th>
                            <th style="${th}">客户名称</th>
                            <th style="${th}">币种</th>
                            <th style="${thR}">期初余额</th>
                            <th style="${thR}">流入</th>
                            <th style="${thR}">流出</th>
                            <th style="${thR}">期末余额</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${histData.map(h => `<tr style="border-bottom: 1px solid #e9ecef;">
                            <td style="${td}">${h.date}</td>
                            <td style="${td} font-family: monospace; color: #4f46e5;">${h.mid}</td>
                            <td style="${td}">${h.name}</td>
                            <td style="${td} font-family: monospace;">${h.currency}</td>
                            <td style="${td} text-align: right; font-family: monospace;">${h.openBalance}</td>
                            <td style="${td} text-align: right; font-family: monospace; color: #059669;">${h.inflow}</td>
                            <td style="${td} text-align: right; font-family: monospace; color: #dc2626;">${h.outflow}</td>
                            <td style="${td} text-align: right; font-family: monospace; font-weight: 600;">${h.closeBalance}</td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 3.4 客户冻结记录
function renderClientFreezeRecords() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    const freezeData = [
        { id: 'FRZ20250208001', mid: 'CLT20250001', name: 'Alice Johnson', currency: 'USD', amount: '500.00', reason: '风控审查', operator: 'system', time: '2025-02-08 14:05:12', status: 'frozen', unfreezeTime: '' },
        { id: 'FRZ20250205002', mid: 'CLT20250002', name: 'Global Trading Ltd', currency: 'USD', amount: '5,000.00', reason: '大额交易审核', operator: 'admin_zhang', time: '2025-02-05 10:30:00', status: 'frozen', unfreezeTime: '' },
        { id: 'FRZ20250205003', mid: 'CLT20250002', name: 'Global Trading Ltd', currency: 'BTC', amount: '0.50000000', reason: '合规检查', operator: 'system', time: '2025-02-05 11:00:00', status: 'frozen', unfreezeTime: '' },
        { id: 'FRZ20250201004', mid: 'CLT20250004', name: '深圳前海科技有限公司', currency: 'USD', amount: '2,000.00', reason: '争议交易', operator: 'admin_li', time: '2025-02-01 16:20:00', status: 'frozen', unfreezeTime: '' },
        { id: 'FRZ20250115005', mid: 'CLT20250001', name: 'Alice Johnson', currency: 'USD', amount: '1,000.00', reason: '可疑交易', operator: 'system', time: '2025-01-15 09:00:00', status: 'unfrozen', unfreezeTime: '2025-01-20 14:30:00' }
    ];
    const th = 'padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;';
    const thR = 'padding: 10px 14px; text-align: right; font-size: 12px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;';
    const td = 'padding: 10px 14px; font-size: 13px; white-space: nowrap;';
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb"><a href="#" onclick="goBack()">首页</a> / <span>客户中心</span> / <span>客户冻结记录</span></div>
            <h1 class="page-title">客户冻结记录</h1>
            <p class="page-desc">查看客户资金冻结记录，支持解冻操作</p>
        </div>
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 16px 20px;">
                <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-end;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">客户 MID</label>
                        <input type="text" placeholder="客户MID" style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; width: 140px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">状态</label>
                        <select style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; width: 100px;">
                            <option value="">全部</option><option value="frozen">冻结中</option><option value="unfrozen">已解冻</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">币种</label>
                        <select style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; width: 100px;">
                            <option value="">全部</option><option>USD</option><option>EUR</option><option>BTC</option><option>USDT</option>
                        </select>
                    </div>
                    <button onclick="alert('查询功能开发中')" style="padding: 6px 16px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 13px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置')" style="padding: 6px 16px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer;">重置</button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h2 class="card-title">冻结记录</h2></div>
            <div style="overflow-x: auto;">
                <table style="min-width: 1100px; width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="${th}">冻结单号</th>
                            <th style="${th}">客户 MID</th>
                            <th style="${th}">客户名称</th>
                            <th style="${th}">币种</th>
                            <th style="${thR}">冻结金额</th>
                            <th style="${th}">冻结原因</th>
                            <th style="${th}">操作人</th>
                            <th style="${th}">冻结时间</th>
                            <th style="${th}">状态</th>
                            <th style="${th}">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${freezeData.map(f => `<tr style="border-bottom: 1px solid #e9ecef;">
                            <td style="${td} font-family: monospace; color: #6c757d;">${f.id}</td>
                            <td style="${td} font-family: monospace; color: #4f46e5;">${f.mid}</td>
                            <td style="${td}">${f.name}</td>
                            <td style="${td} font-family: monospace;">${f.currency}</td>
                            <td style="${td} text-align: right; font-family: monospace; font-weight: 500; color: #dc2626;">${f.amount}</td>
                            <td style="${td}">${f.reason}</td>
                            <td style="${td} color: #6c757d;">${f.operator}</td>
                            <td style="${td} color: #6c757d;">${f.time}</td>
                            <td style="${td}">
                                <span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 500; background: ${f.status === 'frozen' ? '#fee2e2' : '#d1fae5'}; color: ${f.status === 'frozen' ? '#991b1b' : '#065f46'};">
                                    <span style="width: 5px; height: 5px; border-radius: 50%; background: ${f.status === 'frozen' ? '#991b1b' : '#065f46'};"></span>
                                    ${f.status === 'frozen' ? '冻结中' : '已解冻'}
                                </span>
                            </td>
                            <td style="${td}">
                                ${f.status === 'frozen' ? '<button onclick="alert(\'解冻: ' + f.id + '\')" style="padding: 3px 10px; background: #2563eb; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">解冻</button>' : '<span style="color: #adb5bd;">-</span>'}
                            </td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 3.5 客户解冻记录
function renderClientUnfreezeRecords() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    const unfreezeData = [
        { id: 'UFZ20250120001', freezeId: 'FRZ20250115005', mid: 'CLT20250001', name: 'Alice Johnson', currency: 'USD', amount: '1,000.00', reason: '审核通过，解除冻结', operator: 'admin_wang', freezeTime: '2025-01-15 09:00:00', unfreezeTime: '2025-01-20 14:30:00' },
        { id: 'UFZ20250130002', freezeId: 'FRZ20250125006', mid: 'CLT20250002', name: 'Global Trading Ltd', currency: 'USD', amount: '3,000.00', reason: '争议处理完毕', operator: 'admin_zhang', freezeTime: '2025-01-25 10:00:00', unfreezeTime: '2025-01-30 16:45:00' },
        { id: 'UFZ20250203003', freezeId: 'FRZ20250128007', mid: 'CLT20250004', name: '深圳前海科技有限公司', currency: 'CNY', amount: '50,000.00', reason: '合规审查完成', operator: 'admin_li', freezeTime: '2025-01-28 14:20:00', unfreezeTime: '2025-02-03 11:10:00' }
    ];
    const th = 'padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;';
    const thR = 'padding: 10px 14px; text-align: right; font-size: 12px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap;';
    const td = 'padding: 10px 14px; font-size: 13px; white-space: nowrap;';
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb"><a href="#" onclick="goBack()">首页</a> / <span>客户中心</span> / <span>客户解冻记录</span></div>
            <h1 class="page-title">客户解冻记录</h1>
            <p class="page-desc">查看客户资金解冻历史记录</p>
        </div>
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 16px 20px;">
                <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-end;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">客户 MID</label>
                        <input type="text" placeholder="客户MID" style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; width: 140px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">开始日期</label>
                        <input type="date" style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 12px; color: #495057; margin-bottom: 4px; font-weight: 500;">结束日期</label>
                        <input type="date" style="padding: 6px 10px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px;">
                    </div>
                    <button onclick="alert('查询功能开发中')" style="padding: 6px 16px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 13px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置')" style="padding: 6px 16px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 13px; cursor: pointer;">重置</button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h2 class="card-title">解冻记录</h2></div>
            <div style="overflow-x: auto;">
                <table style="min-width: 1200px; width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="${th}">解冻单号</th>
                            <th style="${th}">冻结单号</th>
                            <th style="${th}">客户 MID</th>
                            <th style="${th}">客户名称</th>
                            <th style="${th}">币种</th>
                            <th style="${thR}">解冻金额</th>
                            <th style="${th}">解冻原因</th>
                            <th style="${th}">操作人</th>
                            <th style="${th}">冻结时间</th>
                            <th style="${th}">解冻时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${unfreezeData.map(u => `<tr style="border-bottom: 1px solid #e9ecef;">
                            <td style="${td} font-family: monospace; color: #059669;">${u.id}</td>
                            <td style="${td} font-family: monospace; color: #6c757d;">${u.freezeId}</td>
                            <td style="${td} font-family: monospace; color: #4f46e5;">${u.mid}</td>
                            <td style="${td}">${u.name}</td>
                            <td style="${td} font-family: monospace;">${u.currency}</td>
                            <td style="${td} text-align: right; font-family: monospace; font-weight: 500; color: #059669;">${u.amount}</td>
                            <td style="${td}">${u.reason}</td>
                            <td style="${td} color: #6c757d;">${u.operator}</td>
                            <td style="${td} color: #6c757d;">${u.freezeTime}</td>
                            <td style="${td} color: #059669;">${u.unfreezeTime}</td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ========== 5. 客户贸易背景 ==========

// 5.1 贸易订单
function renderTradeOrders() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    const tradeData = [
        { id: 'TRD20250209001', mid: 'CLT20250001', name: 'Alice Johnson', type: '货物贸易', counterparty: 'Supplier Co Ltd', currency: 'USD', amount: '15,000.00', tradeDate: '2025-02-09', status: 'completed' },
        { id: 'TRD20250208002', mid: 'CLT20250002', name: 'Global Trading Ltd', type: '服务贸易', counterparty: 'Tech Services Inc', currency: 'EUR', amount: '8,500.00', tradeDate: '2025-02-08', status: 'completed' },
        { id: 'TRD20250207003', mid: 'CLT20250004', name: '深圳前海科技有限公司', type: '货物贸易', counterparty: '广州供应链有限公司', currency: 'CNY', amount: '120,000.00', tradeDate: '2025-02-07', status: 'pending' },
        { id: 'TRD20250206004', mid: 'CLT20250005', name: 'Tokyo Payments Inc', type: '服务贸易', counterparty: 'Game Studio JP', currency: 'JPY', amount: '2,500,000', tradeDate: '2025-02-06', status: 'completed' },
        { id: 'TRD20250205005', mid: 'CLT20250001', name: 'Alice Johnson', type: '货物贸易', counterparty: 'Fashion Brand EU', currency: 'EUR', amount: '3,200.00', tradeDate: '2025-02-05', status: 'reviewing' }
    ];
    const statusMap = { completed: {l:'已完成',bg:'#d1fae5',c:'#065f46'}, pending: {l:'待审核',bg:'#fef3c7',c:'#92400e'}, reviewing: {l:'审核中',bg:'#dbeafe',c:'#1e40af'} };
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb"><a href="#" onclick="goBack()">首页</a> / <span>客户中心</span> / <span>贸易订单</span></div>
            <h1 class="page-title">贸易订单</h1>
            <p class="page-desc">查看客户贸易背景订单信息</p>
        </div>
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">客户 MID</label>
                        <input type="text" placeholder="请输入客户MID" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">贸易类型</label>
                        <select style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option><option>货物贸易</option><option>服务贸易</option>
                        </select>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">状态</label>
                        <select style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option><option value="completed">已完成</option><option value="pending">待审核</option><option value="reviewing">审核中</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="alert('查询功能开发中')" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置')" style="padding: 8px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h2 class="card-title">贸易订单列表</h2></div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">贸易单号</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">客户 MID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">客户名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">贸易类型</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">交易对手</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">币种</th>
                            <th style="padding: 12px 16px; text-align: right; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">金额</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">贸易日期</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">状态</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tradeData.map(t => { const st = statusMap[t.status]; return `<tr style="border-bottom: 1px solid #e9ecef;">
                            <td style="padding: 14px 16px; font-size: 13px; font-family: monospace; color: #6c757d;">${t.id}</td>
                            <td style="padding: 14px 16px; font-size: 14px; font-family: monospace; color: #4f46e5;">${t.mid}</td>
                            <td style="padding: 14px 16px; font-size: 14px;">${t.name}</td>
                            <td style="padding: 14px 16px; font-size: 14px;">${t.type}</td>
                            <td style="padding: 14px 16px; font-size: 14px;">${t.counterparty}</td>
                            <td style="padding: 14px 16px; font-size: 13px; font-family: monospace;">${t.currency}</td>
                            <td style="padding: 14px 16px; font-size: 14px; text-align: right; font-family: monospace; font-weight: 500;">${t.amount}</td>
                            <td style="padding: 14px 16px; font-size: 14px;">${t.tradeDate}</td>
                            <td style="padding: 14px 16px; font-size: 14px;">
                                <span style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${st.bg}; color: ${st.c};">
                                    <span style="width: 6px; height: 6px; border-radius: 50%; background: ${st.c};"></span>${st.l}
                                </span>
                            </td>
                            <td style="padding: 14px 16px; font-size: 14px;">
                                <button onclick="alert('贸易订单详情: ${t.id}')" style="background: none; border: none; color: #4f46e5; cursor: pointer; font-size: 14px; text-decoration: underline;">详情</button>
                            </td>
                        </tr>`; }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 5.3 店铺查询
function renderShopQuery() {
    const mainContent = document.getElementById('detailMain');
    if (!mainContent) return;
    const shopData = [
        { id: 'SHOP001', mid: 'CLT20250001', name: 'Alice Johnson', shopName: "Alice's Fashion Store", platform: 'Shopify', url: 'alicefashion.myshopify.com', status: 'active', createTime: '2025-01-20 10:00:00' },
        { id: 'SHOP002', mid: 'CLT20250002', name: 'Global Trading Ltd', shopName: 'GT Electronics', platform: 'Amazon', url: 'amazon.com/gt-electronics', status: 'active', createTime: '2025-01-25 14:30:00' },
        { id: 'SHOP003', mid: 'CLT20250002', name: 'Global Trading Ltd', shopName: 'GT Home Goods', platform: 'eBay', url: 'ebay.com/gt-home', status: 'active', createTime: '2025-02-01 09:15:00' },
        { id: 'SHOP004', mid: 'CLT20250004', name: '深圳前海科技有限公司', shopName: '前海数码旗舰店', platform: '独立站', url: 'www.qhdigital.com', status: 'active', createTime: '2025-02-05 16:45:00' },
        { id: 'SHOP005', mid: 'CLT20250005', name: 'Tokyo Payments Inc', shopName: 'TP Game Shop', platform: 'Steam', url: 'store.steampowered.com/tp', status: 'suspended', createTime: '2025-02-08 11:00:00' }
    ];
    mainContent.innerHTML = `
        <div class="page-header">
            <div class="breadcrumb"><a href="#" onclick="goBack()">首页</a> / <span>客户中心</span> / <span>店铺查询</span></div>
            <h1 class="page-title">店铺查询</h1>
            <p class="page-desc">查看客户关联的店铺信息</p>
        </div>
        <div class="card" style="margin-bottom: 16px;">
            <div style="padding: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">客户 MID</label>
                        <input type="text" placeholder="请输入客户MID" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">店铺名称</label>
                        <input type="text" placeholder="请输入店铺名称" style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <label style="font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500;">平台</label>
                        <select style="padding: 8px 12px; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px;">
                            <option value="">全部</option><option>Shopify</option><option>Amazon</option><option>eBay</option><option>独立站</option><option>Steam</option>
                        </select>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="alert('查询功能开发中')" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">查询</button>
                    <button onclick="alert('重置')" style="padding: 8px 20px; background: white; color: #6c757d; border: 1px solid #dee2e6; border-radius: 4px; font-size: 14px; cursor: pointer; font-weight: 500;">重置</button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h2 class="card-title">店铺列表</h2></div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">店铺ID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">客户 MID</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">客户名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">店铺名称</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">平台</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">店铺地址</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">状态</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; color: #495057; border-bottom: 2px solid #e9ecef;">创建时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${shopData.map(s => `<tr style="border-bottom: 1px solid #e9ecef;">
                            <td style="padding: 14px 16px; font-size: 13px; font-family: monospace; color: #6c757d;">${s.id}</td>
                            <td style="padding: 14px 16px; font-size: 14px; font-family: monospace; color: #4f46e5;">${s.mid}</td>
                            <td style="padding: 14px 16px; font-size: 14px;">${s.name}</td>
                            <td style="padding: 14px 16px; font-size: 14px; font-weight: 500;">${s.shopName}</td>
                            <td style="padding: 14px 16px; font-size: 14px;"><span style="padding: 2px 8px; border-radius: 4px; font-size: 12px; background: #f0f0f0; color: #333;">${s.platform}</span></td>
                            <td style="padding: 14px 16px; font-size: 13px; color: #4f46e5;">${s.url}</td>
                            <td style="padding: 14px 16px; font-size: 14px;">
                                <span style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${s.status === 'active' ? '#d1fae5' : '#fef3c7'}; color: ${s.status === 'active' ? '#065f46' : '#92400e'};">
                                    <span style="width: 6px; height: 6px; border-radius: 50%; background: ${s.status === 'active' ? '#065f46' : '#92400e'};"></span>
                                    ${s.status === 'active' ? '正常' : '暂停'}
                                </span>
                            </td>
                            <td style="padding: 14px 16px; font-size: 13px; color: #6c757d; white-space: nowrap;">${s.createTime}</td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 渲染代理商产品表格行
function renderSalesAgentProductRows() {
    const mockData = [
        { code: 'ring', name: 'ring', product: 'Crypto Collection', signDate: '2026-08-11', status: 'active', createTime: '2025-03-12 17:05:32' },
        { code: 'keni1', name: 'keni1', product: 'Fiat VA Collection', signDate: '2025-08-31', status: 'active', createTime: '2025-03-09 16:07:00' },
        { code: 'test', name: '1', product: 'Crypto Payment', signDate: '2025-08-31', status: 'active', createTime: '2025-03-07 10:06:37' },
        { code: 'gaming', name: '游戏总代', product: 'Virtual Card Issuing', signDate: '2027-11-25', status: 'active', createTime: '2024-07-31 15:03:35' }
    ];
    
    return mockData.map(item => `
        <tr style="border-bottom: 1px solid #e9ecef;">
            <td style="padding: 16px; font-size: 14px;">${item.code}</td>
            <td style="padding: 16px; font-size: 14px;">${item.name}</td>
            <td style="padding: 16px; font-size: 14px;">${item.product}</td>
            <td style="padding: 16px; font-size: 14px;">${item.signDate}</td>
            <td style="padding: 16px; font-size: 14px;">
                <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: ${item.status === 'active' ? '#d1fae5' : '#fee2e2'}; color: ${item.status === 'active' ? '#065f46' : '#991b1b'};">
                    ${item.status === 'active' ? '生效中' : '已过期'}
                </span>
            </td>
            <td style="padding: 16px; font-size: 14px; color: #6c757d;">${item.createTime}</td>
            <td style="padding: 16px; font-size: 14px;">
                <button onclick="alert('详情: ${item.code} - ${item.product}')" style="background: none; border: none; color: #4f46e5; cursor: pointer; font-size: 14px; text-decoration: underline;">详情</button>
            </td>
        </tr>
    `).join('');
}

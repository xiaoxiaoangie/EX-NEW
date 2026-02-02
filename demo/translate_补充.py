#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Additional translations
additional_translations = {
    # More specific terms
    '网络手续费': 'Network Fee',
    '网络手续费：': 'Network Fee:',
    'NetworkFee': 'Network Fee',
    '费用：': 'Fee:',
    '费用明细': 'Fee Details',
    '区块链网络': 'blockchain network',
    '区块链Network': 'blockchain network',
    '会收取一定的交易费': 'will charge transaction fees',
    '会收取一定的交易Fee': 'will charge transaction fees',
    '具体金额': 'specific amount',
    '具体Amount': 'specific amount',
    '交易详情': 'transaction details',
    '交易Details': 'transaction details',
    '中显示': 'will be displayed',
    
    # Payment terms
    '通过SWIFT电汇Network的转账方式': 'Transfer via SWIFT wire network',
    '可Support大额转账': 'supports large transfers',
    '需提供SWIFT号和Bank代码': 'requires SWIFT code and bank code',
    'Fees shown are based on"SHA"fee structure': 'Fees shown are based on "SHA" fee structure',
    '即Payment Collection人承担中间费用': 'meaning payee bears intermediary fees',
    
    # Exchange terms
    'Exchange率': 'Exchange Rate',
    '兑换率': 'Exchange Rate',
    
    # Status terms
    '待补充': 'Pending Supplement',
    '审核拒绝': 'Rejected',
    '审核通过': 'Approved',
    '激活失败': 'Activation Failed',
    
    # Action terms
    '补充材料': 'Supplement Materials',
    '查看': 'View',
    '编辑': 'Edit',
    '删除': 'Delete',
    '隐藏': 'Hide',
    
    # Common phrases
    '请输入': 'Please enter',
    '请选择': 'Please select',
    '请确认': 'Please confirm',
    '请注意': 'Please note',
    
    # Time related
    '分钟前': 'minutes ago',
    '小时前': 'hours ago',
    '天前': 'days ago',
    '刚刚': 'Just now',
    
    # Numbers and pagination
    '项': 'items',
    '共': 'Total',
    '每页': 'Per page',
    '上一页': 'Previous',
    '下一页': 'Next',
    '前往': 'Go to',
    '页': 'page',
    
    # Buttons
    '提交': 'Submit',
    '确定': 'Confirm',
    '取消': 'Cancel',
    '关闭': 'Close',
    '保存': 'Save',
    '添加': 'Add',
    '新增': 'Add New',
    '搜索': 'Search',
    '导出': 'Export',
    '下载': 'Download',
    '复制': 'Copy',
    '一键复制': 'Copy All',
    
    # Form labels
    '必填': 'Required',
    '选填': 'Optional',
    '备注': 'Remarks',
    '说明': 'Description',
    
    # Messages
    '操作成功': 'Operation successful',
    '操作失败': 'Operation failed',
    '请稍候': 'Please wait',
    '加载中': 'Loading',
    '暂无数据': 'No data',
    
    # Specific fixes
    '网络选择': 'network selection',
    '发送到错误的网络可能导致资产损失': 'Sending to wrong network may result in asset loss',
    '最小充值金额': 'Minimum deposit amount',
    '小于最小金额的充值将不会到账': 'Deposits below minimum amount will not be credited',
    '充值到账时间': 'Deposit arrival time',
    '需要': 'Requires',
    '个网络确认': 'network confirmations',
    '如需帮助': 'For assistance',
    '请登录邮箱生成工单': 'please create a ticket via email',
    '或通过': 'or contact us via',
    '联系我们': 'contact us',
}

# Read the file
with open('merchant-dashboard-en.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Apply additional translations
for chinese, english in additional_translations.items():
    content = content.replace(chinese, english)

# Write back
with open('merchant-dashboard-en.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Additional translations completed!")
print(f"Total additional translations applied: {len(additional_translations)}")

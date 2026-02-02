#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Read Chinese version to get the transaction query page
with open('merchant-dashboard.html', 'r', encoding='utf-8') as f:
    content_cn = f.read()

# Extract transaction query page
start_marker = '<!-- Page: Transaction Query -->'
end_marker = '<!-- End Page: Transaction Query -->'
start_idx = content_cn.find(start_marker)
end_idx = content_cn.find(end_marker) + len(end_marker)
transaction_query_cn = content_cn[start_idx:end_idx]

# Translate to English
translations = {
    '<!-- Page: Transaction Query -->': '<!-- Page: Transaction Query -->',
    '交易查询': 'Transaction Query',
    '法币入金': 'Fiat Deposit',
    '法币出金': 'Fiat Withdrawal',
    '法币换汇': 'Fiat Exchange',
    '收款明细': 'Payment Details',
    '筛选': 'Filter',
    '请输入收款账号': 'Enter receiving account',
    '下载列表': 'Download List',
    '态': 'Status',
    '收款金额': 'Received Amount',
    '入账金额': 'Credited Amount',
    '手续费合计': 'Total Fees',
    '汇率': 'Exchange Rate',
    '交易附言': 'Transaction Note',
    '结算': 'Settlement',
    '操作': 'Actions',
    '没有数据': 'No data',
    '提现/付款记录': 'Withdrawal/Payment Records',
    '快速搜索账户或账号': 'Quick search account or number',
    '批量下载付款凭证': 'Batch Download Payment Receipts',
    '下载历史记录': 'Download History',
    '全部': 'All',
    '待审核': 'Pending Review',
    '审核拒绝': 'Rejected',
    '待付款': 'Pending Payment',
    '预计收到的金额': 'Expected Amount',
    '支付方式': 'Payment Method',
    '交易类型': 'Transaction Type',
    '状态': 'Status',
    '备注': 'Remarks',
    '商户订单号': 'Merchant Order No.',
    '10条/页': '10 per page',
    '换汇中心': 'Exchange Center',
    '下载明细': 'Download Details',
    '换汇失败': 'Exchange Failed',
    '换汇成功': 'Exchange Successful',
    '换汇中': 'Exchanging',
    '订单编号': 'Order No.',
    '卖出金额': 'Sell Amount',
    '买入金额': 'Buy Amount',
    '交易汇率': 'Exchange Rate',
    '创建时间': 'Created At',
    '兑换日期': 'Exchange Date',
}

transaction_query_en = transaction_query_cn
for cn, en in translations.items():
    transaction_query_en = transaction_query_en.replace(cn, en)

# Read English version
with open('merchant-dashboard-en.html', 'r', encoding='utf-8') as f:
    content_en = f.read()

# Find insertion point (before Fiat Exchange page)
insert_marker = '<!-- Page: Fiat Exchange -->'
insert_idx = content_en.find(insert_marker)

# Insert transaction query page
new_content_en = content_en[:insert_idx] + transaction_query_en + '\n\n        ' + content_en[insert_idx:]

# Write back
with open('merchant-dashboard-en.html', 'w', encoding='utf-8') as f:
    f.write(new_content_en)

# Also add the JavaScript function
js_function = '''
        // Transaction Query Tab Switching
        function switchTransactionTab(tabName) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            
            // Remove active state from all tabs
            document.querySelectorAll('[id^="tab-"]').forEach(tab => {
                tab.classList.remove('border-blue-500', 'text-blue-600');
                tab.classList.add('border-transparent', 'text-gray-600');
            });
            
            // Show selected tab content
            document.getElementById('content-' + tabName).classList.remove('hidden');
            
            // Add active state to selected tab
            const activeTab = document.getElementById('tab-' + tabName);
            activeTab.classList.remove('border-transparent', 'text-gray-600');
            activeTab.classList.add('border-blue-500', 'text-blue-600');
        }
'''

# Read the updated file
with open('merchant-dashboard-en.html', 'r', encoding='utf-8') as f:
    content_en = f.read()

# Find where to insert JS function (before Auto-expand comment)
js_insert_marker = '        // Auto-expand first menu on load'
js_insert_idx = content_en.find(js_insert_marker)

# Insert JS function
new_content_en = content_en[:js_insert_idx] + js_function + '\n' + content_en[js_insert_idx:]

# Write back
with open('merchant-dashboard-en.html', 'w', encoding='utf-8') as f:
    f.write(new_content_en)

print("Transaction Query page added to English version successfully!")

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Complete Translation Script for Merchant Dashboard
Translates all Chinese content to professional English
"""

import re

# Comprehensive translation dictionary
TRANSLATIONS = {
    # Page titles
    "商户管理系统": "Merchant Management System",
    "MP商户平台": "MP Merchant Portal",
    "商户平台": "Merchant Platform",
    
    # Menu items
    "首页": "Dashboard",
    "我的资产": "My Assets",
    "资产余额": "Account Balance",
    "账户流水": "Transaction History",
    "收款入金": "Receive Funds",
    "收法币": "Receive Fiat",
    "收数币": "Receive Crypto",
    "充币": "Deposit Crypto",
    "交易与对账": "Transactions & Reconciliation",
    "交易查询": "Transaction Query",
    "对账单": "Reconciliation Statement",
    "资金对账单": "Fund Reconciliation Statement",
    "换汇承兑": "Exchange Services",
    "法币换汇": "Fiat Exchange",
    "数法承兑": "Crypto-Fiat Settlement",
    "承兑": "Settlement",
    "付款提币": "Payment & Withdrawal",
    "付法币": "Pay Fiat",
    "付数币": "Withdraw Crypto",
    "提币": "Withdraw Crypto",
    "付款": "Payment",
    "收款人管理": "Payee Management",
    "法币收款人": "Fiat Payees",
    "数币地址簿": "Crypto Address Book",
    "收款人地址簿": "Crypto Address Book",
    "下载中心": "Download Center",
    "订单管理": "Order Management",
    "销售订单": "Sales Orders",
    "采购订单": "Purchase Orders",
    "账户信息": "Account Information",
    "账号中心": "Account Center",
    
    # Header and greetings
    "你好": "Hello",
    "您好": "Hello",
    "商户管理员": "Merchant Admin",
    "欢迎回来": "Welcome back",
    "管理员": "Administrator",
    
    # Balance and amounts
    "总余额": "Total Balance",
    "总账户余额": "Total Account Balance",
    "可用余额": "Available Balance",
    "不可用余额": "Unavailable Balance",
    "冻结余额": "Frozen Balance",
    "处理中余额": "Processing Balance",
    "可付款余额": "Available Payment Balance",
    "当前账户的可支配余额": "Current account available balance",
    "当前账户的不可用余额，可联系客户经理": "Current account unavailable balance, please contact your account manager",
    
    # Transaction types
    "法币入金": "Fiat Deposit",
    "数币入金": "Crypto Deposit",
    "法币换汇": "Fiat Exchange",
    "数法承兑": "Crypto-Fiat Settlement",
    "法币出金": "Fiat Withdrawal",
    "数币出金": "Crypto Withdrawal",
    "业务类型": "Business Type",
    "交易类型": "Transaction Type",
    
    # Status
    "待处理": "Pending",
    "处理中": "Processing",
    "已完成": "Completed",
    "已取消": "Cancelled",
    "失败": "Failed",
    "成功": "Success",
    "审核中": "Under Review",
    
    # Common terms
    "充值": "Deposit",
    "提现": "Withdrawal",
    "转账": "Transfer",
    "手续费": "Fee",
    "网络手续费": "Network Fee",
    "费用合计": "Total Fees",
    "汇率": "Exchange Rate",
    "实时汇率": "Real-time Rate",
    "参考汇率": "Reference Rate",
    "汇率有效期": "Rate Validity Period",
    "兑换率": "Exchange Rate",
    "实时兑换率": "Real-time Exchange Rates",
    
    # Account terms
    "收款人": "Payee",
    "付款人": "Payer",
    "收款账户": "Receiving Account",
    "收款地址": "Receiving Address",
    "付款账户": "Payment Account",
    "请选择收款人": "Please Select Payee",
    "请选择您的收款账户": "Please Select Receiving Account",
    "选择收款人": "Select Payee",
    
    # Amount terms
    "交易金额": "Transaction Amount",
    "到账金额": "Received Amount",
    "预计收到的金额": "Estimated Received Amount",
    "您预计收到的金额，请以实际到账为准": "Estimated received amount, actual amount may vary",
    "付款金额": "Payment Amount",
    "您的付款金额": "Your Payment Amount",
    "您总共扣款": "Total Deduction",
    "您当前可付款余额为": "Your current available payment balance is",
    "您将收到": "You Will Receive",
    
    # Time terms
    "交易时间": "Transaction Time",
    "更新时间": "Update Time",
    "刚刚": "Just now",
    "选择月份": "Select Month",
    "开始日期": "Start Date",
    "结束日期": "End Date",
    "付款日期": "Payment Date",
    
    # ID terms
    "交易编号": "Transaction ID",
    "订单编号": "Order ID",
    "物流单号": "Tracking Number",
    "物流公司": "Logistics Company",
    
    # Business terms
    "交易用途": "Transaction Purpose",
    "用途": "Purpose",
    "货物采购": "Goods Purchase",
    "物流服务采购": "Logistics Service Purchase",
    "广告服务采购": "Advertising Service Purchase",
    "其他": "Other",
    "具体用途": "Specific Purpose",
    "请输入具体的交易用途": "Please enter specific transaction purpose",
    
    # Action buttons
    "下载": "Download",
    "导出": "Export",
    "查询": "Query",
    "搜索": "Search",
    "筛选": "Filter",
    "重置": "Reset",
    "确认": "Confirm",
    "取消": "Cancel",
    "提交": "Submit",
    "保存": "Save",
    "编辑": "Edit",
    "删除": "Delete",
    "详情": "Details",
    "下一步": "Next",
    "上一步": "Previous",
    "完成": "Complete",
    "返回": "Back",
    "关闭": "Close",
    "返回修改": "Back to Edit",
    "确认并继续": "Confirm and Continue",
    "确认提交": "Confirm and Submit",
    "全部卖出": "Sell All",
    "查询汇率": "Query Rate",
    "确认承兑": "Confirm Settlement",
    "确认换汇": "Confirm Exchange",
    "发送验证码": "Send Code",
    "新增": "Add New",
    "新增地址": "Add Address",
    "新增收款人": "Add Payee",
    "复制": "Copy",
    "已复制": "Copied",
    
    # Form labels
    "选择币种": "Select Currency",
    "选择网络": "Select Network",
    "全部": "All",
    "下载类型": "Download Type",
    "按月下载": "Download by Month",
    "按日下载": "Download by Day",
    "自定义日期下载": "Download by Custom Date",
    "文件格式": "File Format",
    "文件名称": "File Name",
    "网络": "Network",
    "地址": "Address",
    "金额": "Amount",
    "数量": "Quantity",
    "备注": "Remarks",
    "说明": "Description",
    
    # Payment flow
    "付款信息": "Payment Information",
    "信息确认": "Confirmation",
    "请填写附加信息": "Please Fill in Additional Information",
    "确认付款信息": "Confirm Payment Information",
    "请仔细核对付款信息，确认无误后继续": "Please carefully verify payment information before proceeding",
    "交易安全验证": "Transaction Security Verification",
    "为了您的账户安全，请输入验证码完成本次交易": "For your account security, please enter the verification code to complete this transaction",
    "验证码": "Verification Code",
    "请输入6位验证码": "Please enter 6-digit verification code",
    "验证码将发送至您的注册手机号": "Verification code will be sent to your registered mobile number",
    "付款成功": "Payment Successful",
    "您的付款申请已提交，请等待处理": "Your payment request has been submitted, please wait for processing",
    
    # Exchange
    "创建实时承兑交易": "Create Real-time Settlement Transaction",
    "创建实时换汇交易": "Create Real-time Exchange Transaction",
    "卖出": "Sell",
    "买入": "Buy",
    "重要提示": "Important Notice",
    
    # Messages
    "大额付款可能会多笔到账": "Large payments may arrive in multiple transactions",
    "对账单生成中": "Generating Reconciliation Statement",
    "数据量较大，系统正在处理中，不影响您的其他操作": "Large data volume, system is processing. This will not affect your other operations",
    "处理完成后，请前往": "After processing is complete, please go to",
    "查看和下载您的对账单": "to view and download your reconciliation statement",
    
    # Statistics
    "待办事项": "Pending Tasks",
    "今日收入": "Today's Income",
    "今日支出": "Today's Expenses",
    "收支概览": "Revenue Overview",
    "近7天": "Last 7 Days",
    "近一个月": "Last Month",
    "近三月": "Last 3 Months",
    
    # Settings
    "设置币种": "Set Currency",
    "基本信息": "Basic Information",
    "安全设置": "Security Settings",
    "通知设置": "Notification Settings",
    
    # Tabs
    "全球后快账号": "Global Express Account",
    "本地收款账号": "Local Receiving Account",
    
    # Crypto specific
    "充币地址": "Deposit Address",
    "提币地址": "Withdrawal Address",
    "最小充值": "Minimum Deposit",
    "最小提币": "Minimum Withdrawal",
    "到账时间": "Arrival Time",
    "区块确认": "Block Confirmations",
    
    # Account info
    "商户名称": "Merchant Name",
    "商户编号": "Merchant ID",
    "联系人": "Contact Person",
    "联系电话": "Contact Phone",
    "电子邮箱": "Email",
    "注册时间": "Registration Time",
    "账户状态": "Account Status",
    "正常": "Active",
    
    # Download center
    "文件名": "File Name",
    "文件类型": "File Type",
    "文件大小": "File Size",
    "生成时间": "Generated Time",
    "状态": "Status",
    "操作": "Actions",
    "生成中": "Generating",
    "可下载": "Available",
    
    # Orders
    "订单号": "Order No.",
    "客户名称": "Customer Name",
    "订单金额": "Order Amount",
    "订单状态": "Order Status",
    "创建时间": "Created Time",
    "查看详情": "View Details",
    "物流信息": "Logistics Information",
    "订单详情": "Order Details",
    
    # Placeholders
    "请输入": "Please enter",
    "请选择": "Please select",
    "请输入金额": "Please enter amount",
    "请输入地址": "Please enter address",
    "请输入备注": "Please enter remarks",
}

def translate_file(input_file, output_file):
    """Translate Chinese content to English"""
    print(f"Reading {input_file}...")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("Translating content...")
    
    # Sort translations by length (longest first) to avoid partial replacements
    sorted_translations = sorted(TRANSLATIONS.items(), key=lambda x: len(x[0]), reverse=True)
    
    translation_count = 0
    for chinese, english in sorted_translations:
        if chinese in content:
            content = content.replace(chinese, english)
            translation_count += 1
    
    # Update HTML lang attribute
    content = content.replace('lang="zh-CN"', 'lang="en"')
    
    # Update title if not already translated
    content = re.sub(r'<title>([^<]*)</title>', '<title>Merchant Management System</title>', content)
    
    print(f"Writing to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n✅ Translation complete!")
    print(f"📊 Applied {translation_count} translations")
    print(f"📁 Output file: {output_file}")

if __name__ == "__main__":
    translate_file(
        "merchant-dashboard.html",
        "merchant-dashboard-en-complete.html"
    )

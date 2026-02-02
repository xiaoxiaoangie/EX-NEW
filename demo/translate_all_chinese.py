#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Complete Chinese to English Translation Script
Handles ALL remaining Chinese text with professional terminology
"""

import re

# Comprehensive translation dictionary - LONGEST PHRASES FIRST
TRANSLATIONS = {
    # Very long phrases
    "提款前请仔细核对收款地址，错误的地址可能导致资金永久丢失。": "Please carefully verify the receiving address before withdrawal. Incorrect addresses may result in permanent loss of funds.",
    "请确保收款地址支持所选网络，否则资产将无法找回。": "Please ensure the receiving address supports the selected network, otherwise assets cannot be recovered.",
    "提币需要区块链网络确认，到账时间取决于网络拥堵情况。": "Crypto withdrawal requires blockchain network confirmation. Arrival time depends on network congestion.",
    "区块链网络会收取一定的交易手续费，具体金额会在交易详情中显示。": "Blockchain network will charge transaction fees. Specific amount will be displayed in transaction details.",
    "最小提币金额为": "Minimum withdrawal amount is",
    "低于此金额的提币申请将不会被处理。": "Withdrawal requests below this amount will not be processed.",
    "您可以选择卖出币种和买入币种，并输入对应金额实时换汇，您将实时收到买入金额。": "You can select the sell currency and buy currency, then enter the amount for real-time exchange. You will receive the buy amount in real-time.",
    "兑换汇率为真实兑换的市场价格，仅供参考，以交易执行时的实际汇率为准。": "Exchange rate is the real market price for reference only. Actual rate at transaction execution shall prevail.",
    "请确认兑换手续费，如有任何手续费问题，请先与您的客户经理确认。": "Please confirm exchange fee. For any fee-related questions, please contact your account manager.",
    "数据量较大，系统正在处理中，不影响您的其他操作。": "Large data volume, system is processing. This will not affect your other operations.",
    "处理完成后，请前往": "After processing is complete, please go to",
    "查看和下载您的对账单。": "to view and download your reconciliation statement.",
    "大额付款可能会多笔到账。": "Large payments may arrive in multiple transactions.",
    "您预计收到的金额，请以实际到账为准。": "Estimated received amount, actual amount may vary.",
    "请仔细核对付款信息，确认无误后继续。": "Please carefully verify payment information before proceeding.",
    "为了您的账户安全，请输入验证码完成本次交易。": "For your account security, please enter the verification code to complete this transaction.",
    "验证码将发送至您的注册手机号。": "Verification code will be sent to your registered mobile number.",
    "您的付款申请已提交，请等待处理。": "Your payment request has been submitted, please wait for processing.",
    "当前账户的可支配余额": "Current account available balance",
    "当前账户的不可用余额，可联系客户经理。": "Current account unavailable balance, please contact your account manager.",
    "您当前可付款余额为": "Your current available payment balance is",
    "请输入金额（最小10，最大3000000）": "Please enter amount (Min: 10, Max: 3,000,000)",
    "请输入具体的交易用途": "Please enter specific transaction purpose",
    "请通过邮箱": "Please contact us via email",
    "或通过": "or via",
    "联系我们：": "contact us:",
    "联系我们": "contact us",
    
    # Page titles and sections
    "MP商户后台": "MP Merchant Portal",
    "商户后台": "Merchant Portal",
    "Dashboard概览": "Dashboard Overview",
    "换汇中心": "Exchange Center",
    "合同订单": "Contract Orders",
    "最近交易": "Recent Transactions",
    "银行假期": "Bank Holidays",
    "账户余额": "Account Balance",
    "总Account Balance": "Total Account Balance",
    
    # Calendar
    "2025年11月": "November 2025",
    "2024年12月": "December 2024",
    "2025年1月": "January 2025",
    "年": " ",
    "月": " ",
    "日": "Sun",
    "一": "Mon",
    "二": "Tue",
    "三": "Wed",
    "四": "Thu",
    "五": "Fri",
    "六": "Sat",
    "12月25日 - 圣诞节": "Dec 25 - Christmas",
    "1月1日 - 元旦": "Jan 1 - New Year's Day",
    "1月28日 - 春节": "Jan 28 - Spring Festival",
    "圣诞节": "Christmas",
    "元旦": "New Year's Day",
    "春节": "Spring Festival",
    
    # Table headers
    "交易ID": "Transaction ID",
    "类型": "Type",
    "时间": "Time",
    "收入": "Income",
    "支出": "Expenses",
    
    # Menu items
    "数币Address": "Crypto Addresses",
    "数币地址": "Crypto Addresses",
    
    # Form labels and placeholders
    "Withdraw CryptoAmount": "Withdrawal Amount",
    "充币Amount": "Deposit Amount",
    "输入Amount": "Enter Amount",
    "请输入Amount": "Please Enter Amount",
    "最小Amount": "Minimum Amount",
    "最大Amount": "Maximum Amount",
    
    # Account terms
    "可用": "Available",
    "不可用": "Unavailable",
    "冻结": "Frozen",
    "处理中": "Processing",
    
    # Status
    "待确认": "Pending Confirmation",
    "已确认": "Confirmed",
    "进行中": "In Progress",
    
    # Actions
    "查看": "View",
    "编辑": "Edit",
    "删除": "Delete",
    "添加": "Add",
    "修改": "Modify",
    "取消": "Cancel",
    "确定": "Confirm",
    "保存": "Save",
    "提交": "Submit",
    "下载": "Download",
    "上传": "Upload",
    "导出": "Export",
    "导入": "Import",
    "刷新": "Refresh",
    "搜索": "Search",
    "筛选": "Filter",
    "排序": "Sort",
    "清空": "Clear",
    
    # Common words
    "请": "Please",
    "的": "",
    "了": "",
    "和": "and",
    "或": "or",
    "与": "and",
    "及": "and",
    "等": "etc.",
    "个": "",
    "次": "times",
    "笔": "",
    "条": "",
    "项": "",
    "人": "person",
    "天": "day",
    "小时": "hour",
    "分钟": "minute",
    "秒": "second",
    "元": "",
    "美元": "USD",
    "欧元": "EUR",
    "英镑": "GBP",
    "日元": "JPY",
    "港币": "HKD",
    "人民币": "CNY",
    
    # Numbers and units
    "第": "",
    "共": "Total",
    "总计": "Total",
    "合计": "Total",
    "小计": "Subtotal",
    
    # Messages
    "成功": "Success",
    "失败": "Failed",
    "错误": "Error",
    "警告": "Warning",
    "提示": "Notice",
    "信息": "Information",
    "确认": "Confirm",
    "取消": "Cancel",
    
    # Misc
    "客服": "Customer Service",
    "支持": "Support",
    "帮助": "Help",
    "关于": "About",
    "设置": "Settings",
    "退出": "Logout",
    "登录": "Login",
    "注册": "Register",
}

def translate_content(content):
    """Translate Chinese to English"""
    
    # Sort by length (longest first) to avoid partial replacements
    sorted_trans = sorted(TRANSLATIONS.items(), key=lambda x: len(x[0]), reverse=True)
    
    count = 0
    for chinese, english in sorted_trans:
        if chinese in content:
            content = content.replace(chinese, english)
            count += 1
    
    return content, count

def main():
    input_file = "merchant-dashboard-en-complete.html"
    output_file = "merchant-dashboard-en-complete.html"
    
    print(f"📖 Reading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("🔄 Translating all Chinese content...")
    content, count = translate_content(content)
    
    # Update HTML lang
    content = content.replace('lang="zh-CN"', 'lang="en"')
    content = content.replace('lang="zh"', 'lang="en"')
    
    print(f"💾 Writing to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n✅ Translation complete!")
    print(f"📊 Applied {count} translations")
    print(f"📁 Output: {output_file}")
    
    # Check for remaining Chinese
    chinese_pattern = re.compile(r'[\u4e00-\u9fff]+')
    remaining = chinese_pattern.findall(content)
    if remaining:
        unique_remaining = list(set(remaining))
        print(f"\n⚠️  Found {len(unique_remaining)} unique Chinese terms still remaining:")
        for term in sorted(unique_remaining)[:20]:  # Show first 20
            print(f"   - {term}")
        if len(unique_remaining) > 20:
            print(f"   ... and {len(unique_remaining) - 20} more")
    else:
        print("\n🎉 No Chinese characters remaining!")

if __name__ == "__main__":
    main()

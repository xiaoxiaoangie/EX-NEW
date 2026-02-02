#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Super Comprehensive Translation Script
Translates ALL Chinese content with professional payment/crypto industry terminology
"""

import re

# MEGA translation dictionary - organized by category
TRANSLATIONS = {
    # === VERY LONG PHRASES (Must be first) ===
    "仅用于非中国收款取货物贸易下卖家支付货款": "Only for non-China receiving goods trade seller payment",
    "仅用于非中国收款取货物贸易下海外买家支付货款": "Only for non-China receiving goods trade overseas buyer payment",
    "提款前请仔细核对收款地址，错误的地址可能导致资金永久丢失。": "Please carefully verify the receiving address before withdrawal. Incorrect addresses may result in permanent loss of funds.",
    "请确保收款地址支持所选网络，否则资产将无法找回。": "Please ensure the receiving address supports the selected network, otherwise assets cannot be recovered.",
    "提币需要区块链网络确认，到账时间取决于网络拥堵情况。": "Crypto withdrawal requires blockchain network confirmation. Arrival time depends on network congestion.",
    "区块链网络会收取一定的交易手续费，具体金额会在交易详情中显示。": "Blockchain network will charge transaction fees. Specific amount will be displayed in transaction details.",
    "兑换直率为真实兑换市场价格": "Exchange rate is the real market price",
    "以交易執行時實際匯率為準": "Actual rate at transaction execution shall prevail",
    "数据量较大，系统正在处理中，不影响您的其他操作。": "Large data volume, system is processing. This will not affect your other operations.",
    "您可以选择卖出币种和买入币种，并输入对应金额实时换汇，您将实时收到买入金额。": "You can select the sell currency and buy currency, then enter the amount for real-time exchange. You will receive the buy amount in real-time.",
    "为保证您账户安全": "To ensure your account security",
    "为保证您能": "To ensure you can",
    "不会影响您": "will not affect you",
    "仅在使用公链进行": "Only when using public chain for",
    "仅供参考": "For reference only",
    "僅供參考": "For reference only",
    "兑换手續費": "Exchange Fee",
    
    # === LONG PHRASES ===
    "请仔细核对付款信息，确认无误后继续。": "Please carefully verify payment information before proceeding.",
    "为了您的账户安全，请输入验证码完成本次交易。": "For your account security, please enter the verification code to complete this transaction.",
    "验证码将发送至您的注册手机号。": "Verification code will be sent to your registered mobile number.",
    "您的付款申请已提交，请等待处理。": "Your payment request has been submitted, please wait for processing.",
    "当前账户的可支配余额": "Current account available balance",
    "当前账户的不可用余额，可联系客户经理。": "Current account unavailable balance, please contact your account manager.",
    "您当前可付款余额为": "Your current available payment balance is",
    "大额付款可能会多笔到账。": "Large payments may arrive in multiple transactions.",
    "您预计收到的金额，请以实际到账为准。": "Estimated received amount, actual amount may vary.",
    "处理完成后，请前往": "After processing is complete, please go to",
    "查看和下载您的对账单。": "to view and download your reconciliation statement.",
    "请通过邮箱": "Please contact us via email",
    "保持手机号归属": "Keep mobile number ownership",
    "交易密码涉": "Transaction password involves",
    "下列所需填写": "Required fields below",
    "估算首选货币供参考": "Estimated preferred currency for reference",
    "先进行处理": "Process first",
    "仅限工": "Limited to work",
    
    # === PAGE TITLES ===
    "MP商户后台": "MP Merchant Portal",
    "商户后台": "Merchant Portal",
    "Dashboard概览": "Dashboard Overview",
    "换汇中心": "Exchange Center",
    "合同订单": "Contract Orders",
    "最近交易": "Recent Transactions",
    "银行假期": "Bank Holidays",
    "账户余额": "Account Balance",
    "总Account Balance": "Total Account Balance",
    "交易明细": "Transaction Details",
    "交易流水号": "Transaction Serial Number",
    "交易附言": "Transaction Remarks",
    "交易验证": "Transaction Verification",
    "交易安全": "Transaction Security",
    "交易密码": "Transaction Password",
    "交易出入": "Transaction In/Out",
    
    # === CALENDAR ===
    "2025年11月": "November 2025",
    "2024年12月": "December 2024",
    "2025年1月": "January 2025",
    "12月25日 - 圣诞节": "Dec 25 - Christmas",
    "1月1日 - 元旦": "Jan 1 - New Year's Day",
    "1月28日 - 春节": "Jan 28 - Spring Festival",
    "圣诞节": "Christmas",
    "元旦": "New Year's Day",
    "春节": "Spring Festival",
    
    # === COUNTRIES ===
    "中国香港": "Hong Kong, China",
    "中国": "China",
    "乌克兰": "Ukraine",
    "伊朗": "Iran",
    "俄罗斯": "Russia",
    "克里米亚": "Crimea",
    "以太坊": "Ethereum",
    
    # === TABLE HEADERS ===
    "交易ID": "Transaction ID",
    "类型": "Type",
    "时间": "Time",
    "收入": "Income",
    "支出": "Expenses",
    "数币Address": "Crypto Addresses",
    "数币地址": "Crypto Addresses",
    
    # === FORM LABELS ===
    "Withdraw CryptoAmount": "Withdrawal Amount",
    "充币Amount": "Deposit Amount",
    "输入Amount": "Enter Amount",
    "请输入Amount": "Please Enter Amount",
    "最小Amount": "Minimum Amount",
    "最大Amount": "Maximum Amount",
    
    # === BUSINESS TERMS ===
    "买家关系": "Buyer Relationship",
    "买家": "Buyer",
    "卖家": "Seller",
    "货物贸易": "Goods Trade",
    "海外": "Overseas",
    "支付货款": "Payment for Goods",
    "收款": "Receive Payment",
    "付款": "Payment",
    "企业": "Enterprise",
    "全新": "Brand New",
    "入账": "Credited",
    "兑换": "Exchange",
    "兑换直率": "Exchange Rate",
    "仔细核对": "Carefully Verify",
    
    # === RESTRICTIONS ===
    "仅限": "Limited to",
    "仅用于": "Only for",
    "仅": "Only",
    "且该": "and this",
    
    # === COMMON PHRASES ===
    "以": "with",
    "为": "for",
    "为账户": "for account",
    "使用": "use",
    "两": "two",
    "不": "not",
    "且": "and",
    "或": "or",
    "和": "and",
    "与": "and",
    "及": "and",
    "等": "etc.",
    "的": "",
    "了": "",
    "个": "",
    "次": "times",
    "笔": "",
    "条": "",
    "项": "",
    
    # === ACTIONS ===
    "查看": "View",
    "编辑": "Edit",
    "删除": "Delete",
    "添加": "Add",
    "修改": "Modify",
    "取消": "Cancel",
    "确定": "Confirm",
    "确认": "Confirm",
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
    
    # === STATUS ===
    "待确认": "Pending Confirmation",
    "已确认": "Confirmed",
    "进行中": "In Progress",
    "处理中": "Processing",
    "已完成": "Completed",
    "成功": "Success",
    "失败": "Failed",
    "错误": "Error",
    "警告": "Warning",
    
    # === COMMON WORDS ===
    "请": "Please",
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
    
    # === NUMBERS ===
    "第": "",
    "共": "Total",
    "总计": "Total",
    "合计": "Total",
    "小计": "Subtotal",
    
    # === MISC ===
    "客服": "Customer Service",
    "支持": "Support",
    "帮助": "Help",
    "关于": "About",
    "设置": "Settings",
    "退出": "Logout",
    "登录": "Login",
    "注册": "Register",
    "信息": "Information",
    "提示": "Notice",
    "侯其欧": "Hou Qiou",
    
    # === SINGLE CHARACTERS (Last priority) ===
    "年": " ",
    "月": " ",
    "日": "Sun",
    "一": "Mon",
    "二": "Tue",
    "三": "Wed",
    "四": "Thu",
    "五": "Fri",
    "六": "Sat",
}

def main():
    input_file = "merchant-dashboard-en-complete.html"
    
    print(f"📖 Reading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("🔄 Translating (this may take a moment)...")
    
    # Sort by length (longest first)
    sorted_trans = sorted(TRANSLATIONS.items(), key=lambda x: len(x[0]), reverse=True)
    
    count = 0
    for chinese, english in sorted_trans:
        if chinese in content:
            content = content.replace(chinese, english)
            count += 1
    
    # Update HTML lang
    content = content.replace('lang="zh-CN"', 'lang="en"')
    content = content.replace('lang="zh"', 'lang="en"')
    
    print(f"💾 Writing to {input_file}...")
    with open(input_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n✅ Translation complete!")
    print(f"📊 Applied {count} translations")
    
    # Check remaining Chinese
    chinese_pattern = re.compile(r'[\u4e00-\u9fff]+')
    remaining = chinese_pattern.findall(content)
    if remaining:
        unique = list(set(remaining))
        print(f"\n⚠️  Still {len(unique)} unique Chinese terms remaining")
        print("First 30 terms:")
        for i, term in enumerate(sorted(unique)[:30], 1):
            print(f"   {i}. {term}")
    else:
        print("\n🎉 SUCCESS! No Chinese characters remaining!")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Professional Translation Script for Merchant Dashboard
Translates Chinese payment and crypto industry terms to English
"""

import json
import re

# Professional translation dictionary for payment and crypto industry
TRANSLATIONS = {
    # Menu items
    "我的资产": "My Assets",
    "资产余额": "Account Balance",
    "账户流水": "Transaction History",
    "收款入金": "Receive Funds",
    "收法币": "Receive Fiat",
    "收数币": "Receive Crypto",
    "交易与对账": "Transactions & Reconciliation",
    "交易查询": "Transaction Query",
    "对账单": "Reconciliation Statement",
    "换汇承兑": "Exchange Services",
    "法币换汇": "Fiat Exchange",
    "数法承兑": "Crypto-Fiat Settlement",
    "付款提币": "Payment & Withdrawal",
    "付法币": "Pay Fiat",
    "付数币": "Withdraw Crypto",
    "收款人管理": "Payee Management",
    "法币收款人": "Fiat Payees",
    "数币地址簿": "Crypto Address Book",
    "下载中心": "Download Center",
    "订单管理": "Order Management",
    "销售订单": "Sales Orders",
    "采购订单": "Purchase Orders",
    "账户信息": "Account Information",
    
    # Transaction types
    "法币入金": "Fiat Deposit",
    "数币入金": "Crypto Deposit",
    "法币出金": "Fiat Withdrawal",
    "数币出金": "Crypto Withdrawal",
    
    # Status
    "待处理": "Pending",
    "处理中": "Processing",
    "已完成": "Completed",
    "已取消": "Cancelled",
    "失败": "Failed",
    "成功": "Success",
    "审核中": "Under Review",
    
    # Balance terms
    "可用余额": "Available Balance",
    "不可用余额": "Unavailable Balance",
    "冻结余额": "Frozen Balance",
    "总余额": "Total Balance",
    "当前账户的可支配余额": "Current account available balance",
    "当前账户的不可用余额，可联系客户经理": "Current account unavailable balance, please contact your account manager",
    
    # Transaction terms
    "充值": "Deposit",
    "提现": "Withdrawal",
    "转账": "Transfer",
    "手续费": "Fee",
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
    "付款账户": "Payment Account",
    "请选择收款人": "Please Select Payee",
    "请选择您的收款账户": "Please Select Receiving Account",
    
    # Amount terms
    "交易金额": "Transaction Amount",
    "到账金额": "Received Amount",
    "预计收到的金额": "Estimated Received Amount",
    "付款金额": "Payment Amount",
    "您的付款金额": "Your Payment Amount",
    "可付款余额": "Available Payment Balance",
    "您总共扣款": "Total Deduction",
    "您当前可付款余额为": "Your current available payment balance is",
    
    # Time terms
    "交易时间": "Transaction Time",
    "更新时间": "Update Time",
    "刚刚": "Just now",
    "选择月份": "Select Month",
    
    # ID terms
    "交易编号": "Transaction ID",
    "订单编号": "Order ID",
    "物流单号": "Tracking Number",
    
    # Business terms
    "业务类型": "Business Type",
    "交易用途": "Transaction Purpose",
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
    
    # Reconciliation
    "资金对账单": "Fund Reconciliation Statement",
    "选择币种": "Select Currency",
    "全部": "All",
    "下载类型": "Download Type",
    "按月下载": "Download by Month",
    "按日下载": "Download by Day",
    "自定义日期下载": "Download by Custom Date",
    "文件格式": "File Format",
    "文件名称": "File Name",
    "对账单生成中": "Generating Reconciliation Statement",
    "数据量较大，系统正在处理中，不影响您的其他操作": "Large data volume, system is processing. This will not affect your other operations",
    "处理完成后，请前往": "After processing is complete, please go to",
    "查看和下载您的对账单": "to view and download your reconciliation statement",
    
    # Payment
    "付款": "Payment",
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
    "承兑": "Settlement",
    "创建实时承兑交易": "Create Real-time Settlement Transaction",
    "创建实时换汇交易": "Create Real-time Exchange Transaction",
    "卖出": "Sell",
    "买入": "Buy",
    "重要提示": "Important Notice",
    "兑换直率": "Exchange Rate",
    "兑换直率为真实兑换的市场价格，僅供參考，以交易執行時的實際匯率為準": "Exchange rate is the real market price for reference only. Actual rate at transaction execution shall prevail",
    "兑换手續費": "Exchange Fee",
    "請確認兌換手續費，如有任何手續費問題，請先與您的客戶經理確認": "Please confirm exchange fee. For any fee-related questions, please contact your account manager",
    
    # Messages
    "大额付款可能会多笔到账": "Large payments may arrive in multiple transactions",
    "时间范围过大时，明细生成时间可能较长": "When the time range is large, statement generation may take longer",
    "我们会在处理，不影响您的其他操作": "We are processing, this will not affect your other operations",
    "待明细生成后，您可以去": "After the statement is generated, you can go to",
    "获取您需要的明细内容": "to get the statement content you need",
}

def translate_text(text):
    """Translate Chinese text to English using professional terms"""
    for cn, en in TRANSLATIONS.items():
        text = text.replace(cn, en)
    return text

def main():
    print("Professional Translation Dictionary Created")
    print(f"Total translations: {len(TRANSLATIONS)}")
    print("\nSample translations:")
    for i, (cn, en) in enumerate(list(TRANSLATIONS.items())[:10]):
        print(f"  {cn} → {en}")
    print("\nTranslation dictionary is ready to use.")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re

# Complete translations including all remaining Chinese
TRANS = {
    # Long phrases
    "提款前请仔细核对收款地址，错误的地址可能导致资金永久丢失": "Please carefully verify the receiving address before withdrawal. Incorrect addresses may result in permanent loss of funds",
    "请确保收款地址支持所选网络，否则资产将无法找回": "Please ensure the receiving address supports the selected network, otherwise assets cannot be recovered",
    "提币需要区块链网络确认，到账时间取决于网络拥堵情况": "Crypto withdrawal requires blockchain network confirmation. Arrival time depends on network congestion",
    "最小提币金额为": "Minimum withdrawal amount is",
    "低于此金额的提币申请将不会被处理": "Withdrawal requests below this amount will not be processed",
    "区块链网络会收取一定的交易手续费，具体金额会在交易详情中显示": "Blockchain network will charge transaction fees, specific amount will be displayed in transaction details",
    "请通过邮箱": "Please contact us via email",
    "或通过": "or via",
    "联系我们": "contact us",
    "客服联系": "Customer Service",
    
    # All remaining Chinese words
    "费用": "Fee",
    "详情": "details",
    "会收取": "will charge",
    "一定的": "certain",
    "具体": "specific",
    "会在": "will be in",
    "中显示": "displayed",
    "邮箱": "email",
    "通过": "via",
}

with open("merchant-dashboard-en-complete.html", "r", encoding="utf-8") as f:
    content = f.read()

for cn, en in sorted(TRANS.items(), key=lambda x: len(x[0]), reverse=True):
    content = content.replace(cn, en)

with open("merchant-dashboard-en-complete.html", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ Final translation complete!")

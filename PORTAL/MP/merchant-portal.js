const pages = {
    'dashboard': {
        title: 'Dashboard',
        render: renderDashboard
    },
    'fiat-accounts': {
        title: 'Fiat Accounts',
        render: renderFiatAccounts
    },
    'crypto-wallet': {
        title: 'Crypto Wallet',
        render: renderCryptoWallet
    },
    'global-accounts': {
        title: 'Global Accounts',
        render: renderGlobalAccounts
    },
    'payins': {
        title: 'Payins',
        render: renderPayins
    },
    'payouts': {
        title: 'Payouts',
        render: renderPayouts
    },
    'instant-exchange': {
        title: 'Instant Exchange',
        render: renderInstantExchange
    },
    'trade-documents': {
        title: 'Trade Documents',
        render: renderTradeDocuments
    },
    'deposit': {
        title: 'Deposit',
        render: renderDeposit
    },
    'withdraw': {
        title: 'Withdraw',
        render: renderWithdraw
    },
    'on-off-ramp': {
        title: 'On/Off Ramp',
        render: renderOnOffRamp
    },
    'cards-management': {
        title: 'Cards Management',
        render: renderCardsManagement
    },
    'card-transactions': {
        title: 'Card Transactions',
        render: renderCardTransactions
    },
    'merchant-orders': {
        title: 'Merchant Orders',
        render: renderMerchantOrders
    },
    'channel-orders': {
        title: 'Channel Orders',
        render: renderChannelOrders
    },
    'payment-settings': {
        title: 'Payment Settings',
        render: renderPaymentSettings
    },
    'reports': {
        title: 'Reports',
        render: renderReports
    },
    'downloads': {
        title: 'Downloads',
        render: renderDownloads
    },
    'api-keys': {
        title: 'API Keys',
        render: renderAPIKeys
    },
    'webhooks': {
        title: 'Webhooks',
        render: renderWebhooks
    },
    'company-profile': {
        title: 'Company Profile',
        render: renderCompanyProfile
    },
    'roles-permissions': {
        title: 'Roles & Permissions',
        render: renderRolesPermissions
    },
    'notifications': {
        title: 'Notifications',
        render: renderNotifications
    }
};

function renderDashboard() {
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Total Balance</div>
                <div class="stat-value">$1,234,567.89</div>
                <div class="stat-change positive">+12.5% from last month</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Total Transactions</div>
                <div class="stat-value">45,678</div>
                <div class="stat-change positive">+8.3% from last month</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Active Accounts</div>
                <div class="stat-value">234</div>
                <div class="stat-change positive">+5 new this month</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Pending Orders</div>
                <div class="stat-value">12</div>
                <div class="stat-change">Requires attention</div>
            </div>
        </div>
        
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Recent Transactions</h2>
                <button class="btn-secondary">View All</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>TXN20240201001</td>
                        <td>2024-02-01 14:23:45</td>
                        <td>Payin</td>
                        <td>$5,000.00</td>
                        <td><span class="status-badge status-success">Completed</span></td>
                    </tr>
                    <tr>
                        <td>TXN20240201002</td>
                        <td>2024-02-01 15:10:22</td>
                        <td>Payout</td>
                        <td>$3,500.00</td>
                        <td><span class="status-badge status-pending">Pending</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderGlobalAccounts() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Global Accounts</h2>
                <button class="btn-primary">+ Add Account</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Account Name</th>
                        <th>Currency</th>
                        <th>Balance</th>
                        <th>Country</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>US Business Account</strong></td>
                        <td>USD</td>
                        <td>$456,780.00</td>
                        <td>United States</td>
                        <td><span class="status-badge status-success">Active</span></td>
                        <td><button class="btn-secondary">View</button></td>
                    </tr>
                    <tr>
                        <td><strong>EU Business Account</strong></td>
                        <td>EUR</td>
                        <td>€123,450.00</td>
                        <td>Germany</td>
                        <td><span class="status-badge status-success">Active</span></td>
                        <td><button class="btn-secondary">View</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderCryptoWallet() {
    return `
        <div style="display: flex; gap: 24px; margin-bottom: 32px;">
            <div class="balance-card">
                <div class="balance-header">
                    <span class="crypto-icon">₮</span>
                    <span class="currency-code">USDT</span>
                </div>
                <div class="balance-amount">50,617.50</div>
                <div class="balance-details">
                    <div class="balance-row">
                        <span>Available:</span>
                        <span>48,617.50</span>
                    </div>
                    <div class="balance-row">
                        <span>Frozen:</span>
                        <span>2,000.00</span>
                    </div>
                </div>
            </div>
            
            <div class="balance-card">
                <div class="balance-header">
                    <span class="crypto-icon">$</span>
                    <span class="currency-code">USDC</span>
                </div>
                <div class="balance-amount">30,000.00</div>
                <div class="balance-details">
                    <div class="balance-row">
                        <span>Available:</span>
                        <span>30,000.00</span>
                    </div>
                    <div class="balance-row">
                        <span>Frozen:</span>
                        <span>0.00</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Recent Transactions</h2>
                <div style="display: flex; gap: 12px;">
                    <button class="btn-secondary">Filter</button>
                    <button class="btn-secondary">Export</button>
                </div>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>TRANSACTION ID</th>
                        <th>TIME</th>
                        <th>PRODUCT NAME</th>
                        <th>TRANSACTION TYPE</th>
                        <th>AMOUNT</th>
                        <th>NETWORK</th>
                        <th>STATUS</th>
                        <th>DESCRIPTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a href="#" class="transaction-link">CD-2025-001</a></td>
                        <td>2025-11-15 10:30</td>
                        <td>Crypto Deposit</td>
                        <td><span class="type-badge type-deposit">Deposit</span></td>
                        <td class="amount-positive">+10,000.00 USDT</td>
                        <td><span class="network-badge network-trc20">TRC20</span></td>
                        <td><span class="status-badge status-success">Completed</span></td>
                        <td>TRC20 Deposit from External Wallet</td>
                    </tr>
                    <tr>
                        <td><a href="#" class="transaction-link">CD-2025-002</a></td>
                        <td>2025-11-14 14:20</td>
                        <td>Crypto Withdrawal</td>
                        <td><span class="type-badge type-withdrawal">Withdrawal</span></td>
                        <td class="amount-negative">-6,000.00 USDC</td>
                        <td><span class="network-badge network-erc20">ERC20</span></td>
                        <td><span class="status-badge status-pending">Pending</span></td>
                        <td>ERC20 Withdrawal to External Wallet</td>
                    </tr>
                    <tr>
                        <td><a href="#" class="transaction-link">CD-2025-003</a></td>
                        <td>2025-11-13 09:45</td>
                        <td>Crypto Deposit</td>
                        <td><span class="type-badge type-deposit">Deposit</span></td>
                        <td class="amount-positive">+8,500.00 USDT</td>
                        <td><span class="network-badge network-erc20">ERC20</span></td>
                        <td><span class="status-badge status-success">Completed</span></td>
                        <td>ERC20 Deposit from External Wallet</td>
                    </tr>
                    <tr>
                        <td><a href="#" class="transaction-link">CD-2025-004</a></td>
                        <td>2025-11-12 16:10</td>
                        <td>Crypto Swap</td>
                        <td><span class="type-badge type-swap">Swap</span></td>
                        <td class="amount-negative">-2,000 USDT <span class="exchange-info">→ +1,998 USDC</span></td>
                        <td><span class="network-badge network-erc20">ERC20</span></td>
                        <td><span class="status-badge status-success">Completed</span></td>
                        <td>Token Swap: USDT → USDC</td>
                    </tr>
                    <tr>
                        <td><a href="#" class="transaction-link">CD-2025-005</a></td>
                        <td>2025-11-11 11:20</td>
                        <td>Crypto Deposit</td>
                        <td><span class="type-badge type-deposit">Deposit</span></td>
                        <td class="amount-positive">+15,000.00 USDT</td>
                        <td><span class="network-badge network-trc20">TRC20</span></td>
                        <td><span class="status-badge status-success">Completed</span></td>
                        <td>TRC20 Deposit from External Wallet</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="pagination">
                <span class="pagination-info">Showing 1-5 of 68 transactions</span>
                <div class="pagination-buttons">
                    <button class="pagination-btn active">1</button>
                    <button class="pagination-btn">2</button>
                    <button class="pagination-btn">3</button>
                </div>
            </div>
        </div>
    `;
}

function renderCryptoDeposit() {
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">今日入账</div>
                <div class="stat-value">45,230.00</div>
                <div class="stat-change positive">+15.3% vs yesterday</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">本月入账</div>
                <div class="stat-value">1,234,560.00</div>
                <div class="stat-change positive">+8.7% vs last month</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">待确认交易</div>
                <div class="stat-value">12</div>
                <div class="stat-change">Pending confirmations</div>
            </div>
        </div>
        
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Crypto Deposit 交易记录</h2>
                <div style="display: flex; gap: 12px;">
                    <button class="btn-secondary">导出</button>
                    <button class="btn-primary">刷新</button>
                </div>
            </div>
            
            <div style="margin-bottom: 20px; display: flex; gap: 12px;">
                <select class="form-select" style="width: 200px;">
                    <option>全部币种</option>
                    <option>USDT</option>
                    <option>USDC</option>
                </select>
                <select class="form-select" style="width: 200px;">
                    <option>全部状态</option>
                    <option>已完成</option>
                    <option>处理中</option>
                    <option>失败</option>
                </select>
                <input type="date" class="form-input" style="width: 200px;">
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>交易ID</th>
                        <th>时间</th>
                        <th>币种</th>
                        <th>金额</th>
                        <th>发送地址</th>
                        <th>接收地址</th>
                        <th>确认数</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>DEP20240201001</td>
                        <td>2024-02-01 14:23:45</td>
                        <td>USDT</td>
                        <td>5,000.00</td>
                        <td>TXhw...k8Qm</td>
                        <td>TYsd...m9Kp</td>
                        <td>21/21</td>
                        <td><span class="status-badge status-success">已完成</span></td>
                        <td><button class="btn-secondary">详情</button></td>
                    </tr>
                    <tr>
                        <td>DEP20240201002</td>
                        <td>2024-02-01 15:10:22</td>
                        <td>USDC</td>
                        <td>3,500.00</td>
                        <td>0x7a8...9d2F</td>
                        <td>0x9b3...7e1A</td>
                        <td>8/12</td>
                        <td><span class="status-badge status-pending">处理中</span></td>
                        <td><button class="btn-secondary">详情</button></td>
                    </tr>
                    <tr>
                        <td>DEP20240201003</td>
                        <td>2024-02-01 16:45:11</td>
                        <td>USDT</td>
                        <td>10,000.00</td>
                        <td>TXhw...k8Qm</td>
                        <td>TYsd...m9Kp</td>
                        <td>21/21</td>
                        <td><span class="status-badge status-success">已完成</span></td>
                        <td><button class="btn-secondary">详情</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderPayouts() {
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">今日付款</div>
                <div class="stat-value">28,450.00</div>
                <div class="stat-change negative">-5.2% vs yesterday</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">本月付款</div>
                <div class="stat-value">856,320.00</div>
                <div class="stat-change positive">+12.4% vs last month</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">待处理付款</div>
                <div class="stat-value">8</div>
                <div class="stat-change">Pending approval</div>
            </div>
        </div>
        
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">创建付款</h2>
            </div>
            
            <form id="payout-form">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label class="form-label">选择币种 *</label>
                        <select class="form-select" id="crypto-currency" required>
                            <option value="">请选择币种</option>
                            <option value="USDT">USDT (TRC20)</option>
                            <option value="USDC">USDC (ERC20)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">付款金额 *</label>
                        <input type="number" class="form-input" placeholder="请输入金额" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">收款人地址 *</label>
                        <input type="text" class="form-input" placeholder="请输入收款人钱包地址" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">收款人姓名</label>
                        <input type="text" class="form-input" placeholder="请输入收款人姓名">
                    </div>
                    
                    <div class="form-group" style="grid-column: 1 / -1;">
                        <label class="form-label">备注</label>
                        <textarea class="form-input" rows="3" placeholder="请输入备注信息"></textarea>
                    </div>
                </div>
                
                <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px;">
                    <button type="button" class="btn-secondary">取消</button>
                    <button type="submit" class="btn-primary">提交付款</button>
                </div>
            </form>
        </div>
        
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">付款记录</h2>
                <button class="btn-secondary">导出</button>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>付款ID</th>
                        <th>时间</th>
                        <th>币种</th>
                        <th>金额</th>
                        <th>收款人</th>
                        <th>收款地址</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>PAY20240201001</td>
                        <td>2024-02-01 10:15:30</td>
                        <td>USDT</td>
                        <td>2,500.00</td>
                        <td>Supplier A</td>
                        <td>TXhw...k8Qm</td>
                        <td><span class="status-badge status-success">已完成</span></td>
                        <td><button class="btn-secondary">详情</button></td>
                    </tr>
                    <tr>
                        <td>PAY20240201002</td>
                        <td>2024-02-01 11:30:45</td>
                        <td>USDC</td>
                        <td>5,000.00</td>
                        <td>Supplier B</td>
                        <td>0x7a8...9d2F</td>
                        <td><span class="status-badge status-pending">处理中</span></td>
                        <td><button class="btn-secondary">详情</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderFiatAccounts() {
    return `
        <div style="display: flex; gap: 24px; margin-bottom: 32px;">
            <div class="balance-card">
                <div class="balance-header">
                    <span class="currency-flag">🇺🇸</span>
                    <span class="currency-code">USD</span>
                </div>
                <div class="balance-amount">$45,230.00</div>
                <div class="balance-details">
                    <div class="balance-row">
                        <span>Available:</span>
                        <span>$45,230.00</span>
                    </div>
                    <div class="balance-row">
                        <span>Frozen:</span>
                        <span>$0.00</span>
                    </div>
                </div>
            </div>
            
            <div class="balance-card">
                <div class="balance-header">
                    <span class="currency-flag">🇪🇺</span>
                    <span class="currency-code">EUR</span>
                </div>
                <div class="balance-amount">€32,150.00</div>
                <div class="balance-details">
                    <div class="balance-row">
                        <span>Available:</span>
                        <span>€32,150.00</span>
                    </div>
                    <div class="balance-row">
                        <span>Frozen:</span>
                        <span>€0.00</span>
                    </div>
                </div>
            </div>
            
            <div class="account-settings-card">
                <div class="settings-icon">⚙️</div>
                <div class="settings-title">Account Settings</div>
                <div class="settings-subtitle">Manage currencies</div>
            </div>
        </div>
        
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Recent Transactions</h2>
                <div style="display: flex; gap: 12px;">
                    <button class="btn-secondary">Filter</button>
                    <button class="btn-secondary">Export</button>
                </div>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>TRANSACTION ID</th>
                        <th>TIME</th>
                        <th>PRODUCT NAME</th>
                        <th>TRANSACTION TYPE</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th>DESCRIPTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a href="#" class="transaction-link">TXN2625115001</a></td>
                        <td>2025-11-18 10:30</td>
                        <td>ABC Trading Company</td>
                        <td><span class="type-badge type-deposit">Deposit</span></td>
                        <td class="amount-positive">+10,000.00 USD</td>
                        <td><span class="status-badge status-success">Completed</span></td>
                        <td>Wire Transfer from ABC Trading Company</td>
                    </tr>
                    <tr>
                        <td><a href="#" class="transaction-link">TXN2625114002</a></td>
                        <td>2025-11-14 14:20</td>
                        <td>FX Exchange</td>
                        <td><span class="type-badge type-exchange">Exchange</span></td>
                        <td class="amount-negative">-5,000.00 USD <span class="exchange-info">→ +4,625.00 EUR</span></td>
                        <td><span class="status-badge status-success">Completed</span></td>
                        <td>FX Exchange: USD → EUR</td>
                    </tr>
                    <tr>
                        <td><a href="#" class="transaction-link">TXN2625113003</a></td>
                        <td>2025-11-13 09:15</td>
                        <td>Supplier Ltd</td>
                        <td><span class="type-badge type-withdrawal">Withdrawal</span></td>
                        <td class="amount-negative">-3,500.00 GBP</td>
                        <td><span class="status-badge status-pending">Pending</span></td>
                        <td>Bank Transfer to Supplier Ltd</td>
                    </tr>
                    <tr>
                        <td><a href="#" class="transaction-link">TXN2625112004</a></td>
                        <td>2025-11-12 16:45</td>
                        <td>Global Imports</td>
                        <td><span class="type-badge type-deposit">Deposit</span></td>
                        <td class="amount-positive">+15,000.00 EUR</td>
                        <td><span class="status-badge status-success">Completed</span></td>
                        <td>SWIFT Transfer from Global Imports</td>
                    </tr>
                    <tr>
                        <td><a href="#" class="transaction-link">TXN2625111005</a></td>
                        <td>2025-11-11 11:30</td>
                        <td>Tech Solutions Inc</td>
                        <td><span class="type-badge type-withdrawal">Withdrawal</span></td>
                        <td class="amount-negative">-8,200.00 USD</td>
                        <td><span class="status-badge status-success">Completed</span></td>
                        <td>Payment to Tech Solutions Inc</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="pagination">
                <span class="pagination-info">Showing 1-5 of 128 transactions</span>
                <div class="pagination-buttons">
                    <button class="pagination-btn active">1</button>
                    <button class="pagination-btn">2</button>
                    <button class="pagination-btn">3</button>
                </div>
            </div>
        </div>
    `;
}

function renderVAPayins() {
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">今日入账</div>
                <div class="stat-value">$32,450.00</div>
                <div class="stat-change positive">+18.5% vs yesterday</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">本月入账</div>
                <div class="stat-value">$987,650.00</div>
                <div class="stat-change positive">+22.3% vs last month</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">活跃VA数量</div>
                <div class="stat-value">45</div>
                <div class="stat-change positive">+5 new this month</div>
            </div>
        </div>
        
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Virtual Account (VA) 列表</h2>
                <button class="btn-primary">+ 创建VA</button>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>VA ID</th>
                        <th>VA名称</th>
                        <th>币种</th>
                        <th>账户号码</th>
                        <th>创建时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>VA001234</td>
                        <td>Customer A - USD</td>
                        <td>USD</td>
                        <td>****6789</td>
                        <td>2024-01-15</td>
                        <td><span class="status-badge status-success">活跃</span></td>
                        <td><button class="btn-secondary">详情</button></td>
                    </tr>
                    <tr>
                        <td>VA001235</td>
                        <td>Customer B - EUR</td>
                        <td>EUR</td>
                        <td>****3456</td>
                        <td>2024-01-20</td>
                        <td><span class="status-badge status-success">活跃</span></td>
                        <td><button class="btn-secondary">详情</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Payins 交易记录</h2>
                <button class="btn-secondary">导出</button>
            </div>
            
            <div style="margin-bottom: 20px; display: flex; gap: 12px;">
                <select class="form-select" style="width: 200px;">
                    <option>全部币种</option>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                </select>
                <select class="form-select" style="width: 200px;">
                    <option>全部状态</option>
                    <option>已完成</option>
                    <option>处理中</option>
                    <option>失败</option>
                </select>
                <input type="date" class="form-input" style="width: 200px;">
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>交易ID</th>
                        <th>时间</th>
                        <th>VA ID</th>
                        <th>币种</th>
                        <th>金额</th>
                        <th>付款人</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>PIN20240201001</td>
                        <td>2024-02-01 09:30:15</td>
                        <td>VA001234</td>
                        <td>USD</td>
                        <td>$5,000.00</td>
                        <td>Customer A</td>
                        <td><span class="status-badge status-success">已完成</span></td>
                        <td><button class="btn-secondary">详情</button></td>
                    </tr>
                    <tr>
                        <td>PIN20240201002</td>
                        <td>2024-02-01 10:45:22</td>
                        <td>VA001235</td>
                        <td>EUR</td>
                        <td>€3,500.00</td>
                        <td>Customer B</td>
                        <td><span class="status-badge status-pending">处理中</span></td>
                        <td><button class="btn-secondary">详情</button></td>
                    </tr>
                    <tr>
                        <td>PIN20240201003</td>
                        <td>2024-02-01 12:20:45</td>
                        <td>VA001234</td>
                        <td>USD</td>
                        <td>$8,000.00</td>
                        <td>Customer A</td>
                        <td><span class="status-badge status-success">已完成</span></td>
                        <td><button class="btn-secondary">详情</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderOnRamp() {
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">今日兑换</div>
                <div class="stat-value">$45,230.00</div>
                <div class="stat-change positive">+12.3% vs yesterday</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">本月兑换</div>
                <div class="stat-value">$1,456,780.00</div>
                <div class="stat-change positive">+28.5% vs last month</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">待处理订单</div>
                <div class="stat-value">6</div>
                <div class="stat-change">Pending processing</div>
            </div>
        </div>
        
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">创建On Ramp订单</h2>
            </div>
            
            <form id="onramp-form">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label class="form-label">法币币种 *</label>
                        <select class="form-select" required>
                            <option value="">请选择法币币种</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">法币金额 *</label>
                        <input type="number" class="form-input" placeholder="请输入法币金额" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">目标数币 *</label>
                        <select class="form-select" required>
                            <option value="">请选择目标数币</option>
                            <option value="USDT">USDT (TRC20)</option>
                            <option value="USDC">USDC (ERC20)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">预计获得数币</label>
                        <input type="text" class="form-input" placeholder="系统自动计算" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">接收钱包地址 *</label>
                        <input type="text" class="form-input" placeholder="请输入接收钱包地址" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">汇率</label>
                        <input type="text" class="form-input" value="1 USD = 1.00 USDT" readonly>
                    </div>
                    
                    <div class="form-group" style="grid-column: 1 / -1;">
                        <label class="form-label">备注</label>
                        <textarea class="form-input" rows="3" placeholder="请输入备注信息"></textarea>
                    </div>
                </div>
                
                <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px;">
                    <button type="button" class="btn-secondary">取消</button>
                    <button type="submit" class="btn-primary">创建订单</button>
                </div>
            </form>
        </div>
        
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">On Ramp 订单记录</h2>
                <button class="btn-secondary">导出</button>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>订单ID</th>
                        <th>时间</th>
                        <th>法币</th>
                        <th>法币金额</th>
                        <th>数币</th>
                        <th>数币金额</th>
                        <th>汇率</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ONR20240201001</td>
                        <td>2024-02-01 08:15:30</td>
                        <td>USD</td>
                        <td>$10,000.00</td>
                        <td>USDT</td>
                        <td>10,000.00</td>
                        <td>1.0000</td>
                        <td><span class="status-badge status-success">已完成</span></td>
                        <td><button class="btn-secondary">详情</button></td>
                    </tr>
                    <tr>
                        <td>ONR20240201002</td>
                        <td>2024-02-01 09:30:45</td>
                        <td>EUR</td>
                        <td>€5,000.00</td>
                        <td>USDC</td>
                        <td>5,450.00</td>
                        <td>1.0900</td>
                        <td><span class="status-badge status-pending">处理中</span></td>
                        <td><button class="btn-secondary">详情</button></td>
                    </tr>
                    <tr>
                        <td>ONR20240201003</td>
                        <td>2024-02-01 11:45:12</td>
                        <td>USD</td>
                        <td>$15,000.00</td>
                        <td>USDT</td>
                        <td>15,000.00</td>
                        <td>1.0000</td>
                        <td><span class="status-badge status-success">已完成</span></td>
                        <td><button class="btn-secondary">详情</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function navigateToPage(pageId) {
    const page = pages[pageId];
    if (!page) return;
    
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeMenuItem = document.querySelector(`[data-page="${pageId}"]`);
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
    }
    
    document.getElementById('page-title').textContent = page.title;
    document.getElementById('content-area').innerHTML = page.render();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            navigateToPage(pageId);
        });
    });
    
    navigateToPage('dashboard');
    
    document.querySelector('.logout-btn').addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            alert('Logged out successfully');
        }
    });
});

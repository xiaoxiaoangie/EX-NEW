function renderPayins() {
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Today's Payins</div>
                <div class="stat-value">$32,450.00</div>
                <div class="stat-change positive">+18.5% vs yesterday</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">This Month</div>
                <div class="stat-value">$987,650.00</div>
                <div class="stat-change positive">+22.3% vs last month</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Pending Payins</div>
                <div class="stat-value">8</div>
                <div class="stat-change">Awaiting confirmation</div>
            </div>
        </div>
        
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Payin Transactions</h2>
                <button class="btn-secondary">Export</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>Payer</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>PIN20240201001</td>
                        <td>2024-02-01 09:30:15</td>
                        <td>USD</td>
                        <td>$5,000.00</td>
                        <td>Customer A</td>
                        <td><span class="status-badge status-success">Completed</span></td>
                        <td><button class="btn-secondary">View</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderInstantExchange() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Instant Exchange</h2>
            </div>
            <form>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label class="form-label">From Currency</label>
                        <select class="form-select">
                            <option>USD</option>
                            <option>EUR</option>
                            <option>GBP</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">To Currency</label>
                        <select class="form-select">
                            <option>EUR</option>
                            <option>USD</option>
                            <option>GBP</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Amount</label>
                        <input type="number" class="form-input" placeholder="Enter amount">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Exchange Rate</label>
                        <input type="text" class="form-input" value="1 USD = 0.92 EUR" readonly>
                    </div>
                </div>
                <button type="submit" class="btn-primary">Exchange Now</button>
            </form>
        </div>
    `;
}

function renderTradeDocuments() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Trade Documents</h2>
                <button class="btn-primary">+ Upload Document</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Document Name</th>
                        <th>Type</th>
                        <th>Upload Date</th>
                        <th>Size</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Invoice_2024_001.pdf</td>
                        <td>Invoice</td>
                        <td>2024-02-01</td>
                        <td>245 KB</td>
                        <td><span class="status-badge status-success">Verified</span></td>
                        <td><button class="btn-secondary">Download</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderDeposit() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Crypto Deposit</h2>
                <button class="btn-primary">Refresh</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>From Address</th>
                        <th>Confirmations</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>DEP20240201001</td>
                        <td>2024-02-01 14:23:45</td>
                        <td>USDT</td>
                        <td>5,000.00</td>
                        <td>TXhw...k8Qm</td>
                        <td>21/21</td>
                        <td><span class="status-badge status-success">Completed</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderWithdraw() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Crypto Withdraw</h2>
            </div>
            <form>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label class="form-label">Currency</label>
                        <select class="form-select">
                            <option>USDT (TRC20)</option>
                            <option>USDC (ERC20)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Amount</label>
                        <input type="number" class="form-input" placeholder="Enter amount">
                    </div>
                    <div class="form-group" style="grid-column: 1 / -1;">
                        <label class="form-label">Destination Address</label>
                        <input type="text" class="form-input" placeholder="Enter wallet address">
                    </div>
                </div>
                <button type="submit" class="btn-primary">Withdraw</button>
            </form>
        </div>
    `;
}

function renderOnOffRamp() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">On/Off Ramp</h2>
            </div>
            <form>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label class="form-label">From</label>
                        <select class="form-select">
                            <option>USD</option>
                            <option>USDT</option>
                            <option>USDC</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">To</label>
                        <select class="form-select">
                            <option>USDT</option>
                            <option>USD</option>
                            <option>USDC</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Amount</label>
                        <input type="number" class="form-input" placeholder="Enter amount">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Exchange Rate</label>
                        <input type="text" class="form-input" value="1 USD = 1.00 USDT" readonly>
                    </div>
                </div>
                <button type="submit" class="btn-primary">Convert</button>
            </form>
        </div>
    `;
}

function renderCardsManagement() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Cards Management</h2>
                <button class="btn-primary">+ Issue New Card</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Card Number</th>
                        <th>Cardholder</th>
                        <th>Type</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>****1234</td>
                        <td>John Doe</td>
                        <td>Virtual</td>
                        <td>$5,000.00</td>
                        <td><span class="status-badge status-success">Active</span></td>
                        <td><button class="btn-secondary">Manage</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderCardTransactions() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Card Transactions</h2>
                <button class="btn-secondary">Export</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Card</th>
                        <th>Merchant</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CTX20240201001</td>
                        <td>2024-02-01 10:30:00</td>
                        <td>****1234</td>
                        <td>Amazon</td>
                        <td>$125.50</td>
                        <td><span class="status-badge status-success">Completed</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderMerchantOrders() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Merchant Orders</h2>
                <button class="btn-secondary">Export</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ORD20240201001</td>
                        <td>2024-02-01 11:20:00</td>
                        <td>Customer A</td>
                        <td>$250.00</td>
                        <td>Card</td>
                        <td><span class="status-badge status-success">Completed</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderChannelOrders() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Channel Orders</h2>
                <button class="btn-secondary">Export</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Channel ID</th>
                        <th>Date</th>
                        <th>Channel Name</th>
                        <th>Amount</th>
                        <th>Fee</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CHN20240201001</td>
                        <td>2024-02-01 12:00:00</td>
                        <td>Payment Gateway A</td>
                        <td>$1,500.00</td>
                        <td>$15.00</td>
                        <td><span class="status-badge status-success">Completed</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderPaymentSettings() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Payment Settings</h2>
                <button class="btn-primary">Save Changes</button>
            </div>
            <form>
                <div class="form-group">
                    <label class="form-label">Default Currency</label>
                    <select class="form-select">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Payment Methods</label>
                    <div style="display: flex; gap: 16px; margin-top: 8px;">
                        <label><input type="checkbox" checked> Credit Card</label>
                        <label><input type="checkbox" checked> Bank Transfer</label>
                        <label><input type="checkbox"> Crypto</label>
                    </div>
                </div>
            </form>
        </div>
    `;
}

function renderReports() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Reports</h2>
                <button class="btn-primary">Generate Report</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Report Name</th>
                        <th>Type</th>
                        <th>Generated Date</th>
                        <th>Period</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Monthly Transaction Report</td>
                        <td>Transactions</td>
                        <td>2024-02-01</td>
                        <td>January 2024</td>
                        <td><button class="btn-secondary">Download</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderDownloads() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Downloads</h2>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>transactions_jan_2024.csv</td>
                        <td>CSV</td>
                        <td>2.5 MB</td>
                        <td>2024-02-01</td>
                        <td><button class="btn-secondary">Download</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderAPIKeys() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">API Keys</h2>
                <button class="btn-primary">+ Create API Key</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Key Name</th>
                        <th>API Key</th>
                        <th>Created Date</th>
                        <th>Last Used</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Production Key</td>
                        <td>pk_live_****abc123</td>
                        <td>2024-01-15</td>
                        <td>2024-02-01</td>
                        <td><span class="status-badge status-success">Active</span></td>
                        <td><button class="btn-secondary">Manage</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderWebhooks() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Webhooks</h2>
                <button class="btn-primary">+ Add Webhook</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Endpoint URL</th>
                        <th>Events</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>https://api.example.com/webhook</td>
                        <td>payment.success, payment.failed</td>
                        <td>2024-01-20</td>
                        <td><span class="status-badge status-success">Active</span></td>
                        <td><button class="btn-secondary">Edit</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderCompanyProfile() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Company Profile</h2>
                <button class="btn-primary">Save Changes</button>
            </div>
            <form>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label class="form-label">Company Name</label>
                        <input type="text" class="form-input" value="Acme Corporation">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Registration Number</label>
                        <input type="text" class="form-input" value="12345678">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-input" value="contact@acme.com">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone</label>
                        <input type="tel" class="form-input" value="+1 234 567 8900">
                    </div>
                    <div class="form-group" style="grid-column: 1 / -1;">
                        <label class="form-label">Address</label>
                        <textarea class="form-input" rows="3">123 Business St, New York, NY 10001</textarea>
                    </div>
                </div>
            </form>
        </div>
    `;
}

function renderRolesPermissions() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Roles & Permissions</h2>
                <button class="btn-primary">+ Add Role</button>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Role Name</th>
                        <th>Users</th>
                        <th>Permissions</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Admin</strong></td>
                        <td>5</td>
                        <td>Full Access</td>
                        <td>2024-01-01</td>
                        <td><button class="btn-secondary">Edit</button></td>
                    </tr>
                    <tr>
                        <td><strong>Finance</strong></td>
                        <td>12</td>
                        <td>View Transactions, Export Reports</td>
                        <td>2024-01-01</td>
                        <td><button class="btn-secondary">Edit</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderNotifications() {
    return `
        <div class="page-card">
            <div class="card-header">
                <h2 class="card-title">Notification Settings</h2>
                <button class="btn-primary">Save Changes</button>
            </div>
            <form>
                <div class="form-group">
                    <label class="form-label">Email Notifications</label>
                    <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 8px;">
                        <label><input type="checkbox" checked> Transaction confirmations</label>
                        <label><input type="checkbox" checked> Payment failures</label>
                        <label><input type="checkbox"> Weekly reports</label>
                        <label><input type="checkbox"> Monthly statements</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">SMS Notifications</label>
                    <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 8px;">
                        <label><input type="checkbox" checked> Large transactions (>$10,000)</label>
                        <label><input type="checkbox"> Security alerts</label>
                    </div>
                </div>
            </form>
        </div>
    `;
}

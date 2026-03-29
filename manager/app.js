const MOCK_DATA = [
  {
    id: 'EXP-1042',
    employee: { name: 'Alex Johnson', title: 'Sales Director', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80' },
    title: 'Client Dinner - Acme Corp',
    category: 'Meals & Entert.',
    amount: 345.50,
    currency: 'USD',
    converted: null,
    date: 'Oct 28, 2023',
    priority: 'high',
    vendor: 'The Capital Grille',
    notes: 'Dinner with Acme Corp executives to finalize Q4 contract renewal. Includes 4 attendees.',
    submitted: '3 hours ago',
    receipt: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80',
    rules: [
      { text: 'Within $500 client dinner policy limit', type: 'green' },
      { text: 'Receipt scan matches claimed amount', type: 'green' },
      { text: 'High priority due to month-end close proximity', type: 'yellow' }
    ]
  },
  {
    id: 'EXP-1043',
    employee: { name: 'Sarah Wu', title: 'Marketing Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80' },
    title: 'Facebook Ads - Oct Campaign',
    category: 'Software/Ads',
    amount: 1200.00,
    currency: 'USD',
    converted: null,
    date: 'Oct 27, 2023',
    priority: 'medium',
    vendor: 'Meta Platforms Inc.',
    notes: 'Monthly ad spend for October scaling campaign.',
    submitted: '5 hours ago',
    receipt: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80',
    rules: [
      { text: 'Requires Finance approval after you (> $1,000)', type: 'yellow' },
      { text: 'Matches expected monthly ad budget', type: 'green' },
      { text: 'Vendor is registered software provider', type: 'green' }
    ]
  },
  {
    id: 'EXP-1044',
    employee: { name: 'Marcus Miller', title: 'Field Engineer', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80' },
    title: 'London Site Visit Travel',
    category: 'Travel',
    amount: 450.00,
    currency: 'GBP',
    converted: { amount: 546.75, currency: 'USD' },
    date: 'Oct 25, 2023',
    priority: 'medium',
    vendor: 'British Airways',
    notes: 'Flight to London for on-site server maintenance at branch office.',
    submitted: '1 day ago',
    receipt: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80',
    rules: [
      { text: 'Currency conversion applied (GBP to USD)', type: 'blue' },
      { text: 'Economy class rule validated', type: 'green' }
    ]
  },
  {
    id: 'EXP-1045',
    employee: { name: 'Emma Davis', title: 'HR Manager', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80' },
    title: 'Team Offsite Supplies',
    category: 'Office Supl.',
    amount: 85.20,
    currency: 'USD',
    converted: null,
    date: 'Oct 29, 2023',
    priority: 'low',
    vendor: 'Staples',
    notes: 'Whiteboards and markers for team offsite session.',
    submitted: '10 mins ago',
    receipt: 'https://images.unsplash.com/photo-1542435503-956c223ff972?w=400&q=80',
    rules: [
      { text: 'Auto-approval criteria met (Under $100)', type: 'green' },
      { text: 'Pending secondary signature', type: 'yellow' }
    ]
  }
];

// Helper to format currency
const formatMoney = (amount, currency) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
};

// Populate Table
const tbody = document.getElementById('approvals-body');

function renderTable() {
  if (!tbody) return;
  tbody.innerHTML = '';
  MOCK_DATA.forEach(expense => {
    const tr = document.createElement('tr');
    
    // Amount formatting
    let amountHtml = `<div class="amount-main">${formatMoney(expense.amount, expense.currency)}</div>`;
    if (expense.converted) {
      amountHtml += `<div class="amount-conv">(~${formatMoney(expense.converted.amount, expense.converted.currency)})</div>`;
    }

    tr.innerHTML = `
      <td>
        <div class="employee-cell">
          <img src="${expense.employee.avatar}" alt="avatar">
          <span>${expense.employee.name}</span>
        </div>
      </td>
      <td>
        <div class="expense-title">${expense.title}</div>
        <div class="amount-conv">${expense.id}</div>
      </td>
      <td><span class="expense-badge">${expense.category}</span></td>
      <td>
        <div class="amount-cell">${amountHtml}</div>
      </td>
      <td>${expense.date}</td>
      <td>
        <span class="priority-dot dot-${expense.priority}"></span>
        ${expense.priority.charAt(0).toUpperCase() + expense.priority.slice(1)}
      </td>
      <td>
        <div class="action-cell">
          <button class="btn-icon approve" title="Quick Approve"><i class="ph ph-check"></i></button>
          <button class="btn-icon reject" title="Quick Reject"><i class="ph ph-x"></i></button>
          <button class="btn-view" onclick="openExpenseDetail('${expense.id}')">View details</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Sidebar logic
const overlay = document.getElementById('panel-overlay');
const panel = document.getElementById('detail-panel');
const closeBtn = document.getElementById('close-panel');

function openExpenseDetail(id) {
  const expense = MOCK_DATA.find(e => e.id === id);
  if (!expense) return;

  // Populate data
  document.getElementById('detail-avatar').src = expense.employee.avatar;
  document.getElementById('detail-name').innerText = expense.employee.name;
  document.getElementById('detail-title').innerText = expense.employee.title;
  document.getElementById('detail-time').innerText = `Submitted: ${expense.submitted}`;

  const mainAmount = formatMoney(expense.amount, expense.currency);
  document.getElementById('detail-amount').innerText = mainAmount;
  
  const conversionEl = document.getElementById('detail-conversion');
  if (expense.converted) {
    conversionEl.innerText = `(Converted to ${formatMoney(expense.converted.amount, expense.converted.currency)})`;
    conversionEl.style.display = 'block';
  } else {
    conversionEl.style.display = 'none';
  }

  document.getElementById('detail-date').innerText = expense.date;
  document.getElementById('detail-category').innerText = expense.category;
  document.getElementById('detail-vendor').innerText = expense.vendor;
  document.getElementById('detail-notes').innerText = expense.notes;

  // Receipt
  document.getElementById('detail-receipt').src = expense.receipt;

  // Rules
  const rulesList = document.getElementById('detail-rules');
  rulesList.innerHTML = '';
  expense.rules.forEach(rule => {
    let icon = 'ph-info';
    let colorClass = 'text-blue';
    
    if (rule.type === 'green') { icon = 'ph-check-circle'; colorClass = 'text-green'; }
    else if (rule.type === 'yellow') { icon = 'ph-warning-circle'; colorClass = 'text-yellow'; }

    rulesList.innerHTML += `<li><i class="ph-fill ${icon} ${colorClass}"></i> ${rule.text}</li>`;
  });

  // Open Panel
  overlay.classList.add('active');
  panel.classList.add('open');
}

window.openExpenseDetail = openExpenseDetail;

function closePanel() {
  overlay.classList.remove('active');
  panel.classList.remove('open');
}

if (closeBtn) closeBtn.addEventListener('click', closePanel);
if (overlay) overlay.addEventListener('click', closePanel);

// Render Chart
function renderTeamChart() {
  const chartData = [
    { label: 'Software/Ads', value: 45, color: 'var(--primary)' },
    { label: 'Travel', value: 30, color: 'var(--secondary)' },
    { label: 'Meals & Entert.', value: 15, color: 'var(--highlight)' },
    { label: 'Office Supl.', value: 10, color: 'var(--accent)' }
  ];

  const container = document.getElementById('category-chart');
  if (!container) return;
  
  chartData.forEach(item => {
    container.innerHTML += `
      <div class="chart-row">
        <div class="chart-label">
          <span>${item.label}</span>
          <span>${item.value}%</span>
        </div>
        <div class="chart-bar-bg">
          <div class="chart-bar-fill" style="width: ${item.value}%; background: ${item.color}"></div>
        </div>
      </div>
    `;
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderTable();
  renderTeamChart();
});

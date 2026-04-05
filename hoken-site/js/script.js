/* =============================================
   保険見直しナビ — 共通スクリプト
   CrossOver / 真-SHIN-
   ============================================= */

/* ── フェードイン ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ── チェックリスト（index.html用） ── */
function toggleCheck(el) {
  el.classList.toggle('checked');
  const count = document.querySelectorAll('.check-item.checked').length;
  const countEl = document.getElementById('check-count');
  if (countEl) countEl.textContent = count;
  const result = document.getElementById('check-result');
  if (result) result.classList.toggle('show', count >= 3);
}

/* ── タブ切替（simulator.html用） ── */
function switchTab(id) {
  document.querySelectorAll('.tab-btn').forEach((b, i) => {
    b.classList.toggle('active', (i === 0 && id === 'saving') || (i === 1 && id === 'coverage'));
  });
  document.getElementById('tab-saving').classList.toggle('active', id === 'saving');
  document.getElementById('tab-coverage').classList.toggle('active', id === 'coverage');
  if (id === 'saving')   calcSaving();
  if (id === 'coverage') calcCoverage();
}

/* ── ユーティリティ ── */
function fmt(n) {
  if (n >= 10000) return Math.round(n / 10000) + '万';
  return Math.round(n).toLocaleString();
}
function fmtFull(n) { return Math.round(n).toLocaleString(); }
function getRadio(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : null;
}

/* ── 節約シミュレーター ── */
let savingChartInstance = null;

function calcSaving() {
  const curEl  = document.getElementById('current-fee');
  const tgtEl  = document.getElementById('target-fee');
  const ageEl  = document.getElementById('age');
  const rateEl = document.getElementById('nisa-rate');
  if (!curEl) return;

  const cur  = parseInt(curEl.value);
  const tgt  = parseInt(tgtEl.value);
  const age  = parseInt(ageEl.value);
  const rate = parseFloat(rateEl.value) / 100;
  const use  = getRadio('use') || 'nisa';

  document.getElementById('current-fee-val').textContent = (cur / 10000).toFixed(1) + '万円';
  document.getElementById('target-fee-val').textContent  = (tgt / 10000).toFixed(1) + '万円';
  document.getElementById('age-val').textContent         = age + '歳';
  document.getElementById('nisa-rate-val').textContent   = parseFloat(rateEl.value).toFixed(1) + '%';

  const diff   = Math.max(0, cur - tgt);
  const yearly = diff * 12;
  const years  = Math.max(0, 70 - age);

  const nisaPct     = use === 'nisa' ? 1 : use === 'half' ? 0.5 : 0;
  const monthlyNisa = diff * nisaPct;
  const monthlyRate = rate / 12;
  let nisaFinal = 0;
  for (let m = 0; m < years * 12; m++) {
    nisaFinal = (nisaFinal + monthlyNisa) * (1 + monthlyRate);
  }
  const diffVal = nisaFinal - yearly * years;

  document.getElementById('r-monthly').textContent    = fmtFull(diff);
  document.getElementById('r-yearly').textContent     = fmtFull(yearly);
  document.getElementById('r-total-save').textContent = fmt(yearly * years);
  document.getElementById('r-nisa').textContent       = fmt(nisaFinal);
  document.getElementById('r-diff').textContent       = fmt(Math.max(0, diffVal));

  let comment = '';
  if (diff <= 0) {
    comment = '目標額が現在の保険料以上に設定されています。目標を下げてみましょう。';
  } else {
    comment = `月<strong>${fmtFull(diff)}円</strong>の節約で、年間<strong>${fmtFull(yearly)}円</strong>が手元に残ります。`;
    if (years > 0 && nisaFinal > 0) {
      comment += `<br>全額をNISAに回し続けると、70歳時点で約<strong>${fmt(nisaFinal)}円</strong>に育ちます（年利${(rate * 100).toFixed(1)}%想定）。`;
    }
    if (diff >= 10000) {
      comment += '<br><strong>真-SHIN-と同水準の節約ができています。</strong>まず無料のFP相談で現状を確認しましょう。';
    }
  }
  document.getElementById('saving-comment').innerHTML = comment;

  // グラフ
  const step = Math.max(1, Math.floor(years / 8));
  const chartLabels = [];
  const nisaData    = [];
  const saveData    = [];
  for (let y = 1; y <= Math.max(1, years); y++) {
    if (y % step !== 0 && y !== years) continue;
    chartLabels.push((age + y) + '歳');
    let nisa = 0;
    const mr = rate / 12;
    for (let m = 0; m < y * 12; m++) nisa = (nisa + monthlyNisa) * (1 + mr);
    nisaData.push(Math.round(nisa / 10000));
    saveData.push(Math.round(yearly * y / 10000));
  }

  const ctx = document.getElementById('savingChart').getContext('2d');
  if (savingChartInstance) savingChartInstance.destroy();
  savingChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [
        { label: 'NISA運用', data: nisaData, backgroundColor: '#1D9E75', borderRadius: 3 },
        { label: '貯金のみ', data: saveData, backgroundColor: '#E2DDD6', borderRadius: 3 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      layout: { padding: { top: 24 } },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => c.dataset.label + '：' + c.raw.toLocaleString() + '万円' } },
        datalabels: {
          anchor: 'end',
          align: 'end',
          offset: 2,
          font: { size: 10 },
          formatter: v => v + '万',
          color: ctx => ctx.dataset.label === 'NISA運用' ? '#0F6E56' : '#888780',
        }
      },
      scales: {
        x: { ticks: { font: { size: 11 } } },
        y: { ticks: { font: { size: 11 }, callback: v => v + '万' } }
      }
    },
    plugins: [ChartDataLabels]
  });
}

/* ── 必要保障額シミュレーター ── */
function calcCoverage() {
  const ageEl    = document.getElementById('c-age');
  if (!ageEl) return;

  const age    = parseInt(ageEl.value);
  const income = parseInt(document.getElementById('c-income').value);
  const retire = parseInt(document.getElementById('c-retire').value);
  const loan   = parseInt(document.getElementById('c-loan').value);
  const asset  = parseInt(document.getElementById('c-asset').value);
  const family = getRadio('family') || 'couple';

  document.getElementById('c-age-val').textContent    = age + '歳';
  document.getElementById('c-income-val').textContent = income + '万円';
  document.getElementById('c-retire-val').textContent = retire + '歳';
  document.getElementById('c-loan-val').textContent   = loan + '万円';
  document.getElementById('c-asset-val').textContent  = asset + '万円';

  const workYears     = Math.max(0, retire - age);
  const lifeExpense   = family === 'single' ? 150 : family === 'couple' ? 220 : 300;
  const livingCost    = lifeExpense * Math.max(0, 80 - age);
  const educationCost = family === 'children' ? 800 : 0;
  const need          = livingCost + educationCost + loan;
  const have          = asset + Math.round(income * 0.55 * workYears);
  const gap           = Math.max(0, need - have);
  const deathInsure   = Math.round(gap * 0.9 / 100) * 100;

  const rows = [
    { label: '生活費（推計）',         val: fmt(livingCost) + '万円',    note: '月' + lifeExpense + '万円 × ' + (80 - age) + '年' },
    { label: '教育費（推計）',         val: fmt(educationCost) + '万円', note: family === 'children' ? 'お子さんあり' : '該当なし' },
    { label: 'ローン残高',            val: loan + '万円',               note: '団信で相殺される場合は不要' },
    { label: '保有資産（推計）',       val: '－' + fmt(have) + '万円',   note: '現在の貯蓄＋就労収入' },
    { label: '必要な死亡保障額（目安）', val: fmt(deathInsure) + '万円',  note: '不足額の約90%', total: true }
  ];

  document.getElementById('coverage-table').innerHTML = rows.map(r => `
    <div class="coverage-row${r.total ? ' total' : ''}">
      <div>
        <div class="cov-label">${r.label}</div>
        ${r.note ? `<div class="cov-note">${r.note}</div>` : ''}
      </div>
      <div class="cov-val">${r.val}</div>
    </div>
  `).join('');

  let comment = deathInsure <= 0
    ? `現在の資産・収入で生活費をほぼカバーできています。<strong>高額な死亡保障は不要かもしれません。</strong>医療保険・がん保険の見直しを優先しましょう。`
    : `必要保障額は<strong>${fmt(deathInsure)}万円</strong>程度です。現在の保険証券で死亡保障額を確認してみましょう。`;
  if (age >= 60) comment += '<br>60代以降は死亡保障より<strong>医療・介護への備え</strong>にシフトするタイミングです。';

  document.getElementById('coverage-comment').innerHTML = comment;
}

/* ── 初期実行（simulator.html用） ── */
if (document.getElementById('savingChart'))   calcSaving();
if (document.getElementById('c-age'))         calcCoverage();

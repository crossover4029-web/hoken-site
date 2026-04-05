/* =============================================
   保険見直しナビ — real-sim.js
   real-sim.html 専用スクリプト
   CrossOver / 真-SHIN-
   ============================================= */

const CASES = [
  {
    id:'mocho', icon:'🏥', name:'盲腸', sub:'入院5〜7日・手術',
    cards:[
      {icon:'🏥',type:'red',  label:'病院からの請求',          title:'医療費の総額',              amount:'約25万円',         desc:'入院6日・手術・麻酔・検査などの合計費用です。'},
      {icon:'🏛️',type:'blue', label:'高額療養費制度のおかげで', title:'国が肩代わりしてくれる金額', amount:'約17万円',         desc:'窓口では一度全額払いますが、月の自己負担上限（30代会社員で約8〜9万円）を超えた分は後日払い戻されます。事前に「限度額適用認定証」を用意すると、窓口負担を最初から上限額に抑えられます。'},
      {icon:'💳',type:'red',  label:'実際に財布から出るお金',   title:'あなたが払う金額',           amount:'約8万円',          desc:'高額療養費制度を使った後、実際に支払う金額です。'},
      {icon:'🛡️',type:'green',label:'保険から受け取れるお金',   title:'給付金の目安',              amount:'約5〜8万円',       desc:'入院日額5,000円×6日＋手術給付金。加入内容によって変わります。'},
    ],
    ins: '給付金5〜8万円で自己負担8万円をほぼカバーできます。<br>ただし<strong>今まで払い続けた保険料の累計</strong>と比べると…',
    nisa:'NISAに<strong>約8万円</strong>あれば今すぐ払えます。<br>20歳から積み立てていれば余裕でカバーできます。',
    verdict:'nisa',
    conclusion:'盲腸なら、<strong>NISAに10万円あれば保険なしでも乗り越えられます。</strong><br>毎月払い続けた保険料の累計と比べると、考えさせられます。',
  },
  {
    id:'accident', icon:'🚗', name:'交通事故', sub:'骨折・入院2週間',
    cards:[
      {icon:'🚗',type:'red',  label:'病院からの請求',          title:'医療費の総額',              amount:'約60万円',         desc:'入院14日・手術・リハビリ・検査などの合計費用です。'},
      {icon:'🏛️',type:'blue', label:'高額療養費制度のおかげで', title:'国が肩代わりしてくれる金額', amount:'約51万円',         desc:'窓口では一度全額払いますが、月の自己負担上限（約8〜9万円）を超えた分は後日払い戻されます。長期入院でも上限は変わりません。事前に「限度額適用認定証」を用意すると窓口負担を最初から抑えられます。'},
      {icon:'💳',type:'red',  label:'実際に財布から出るお金',   title:'あなたが払う金額',           amount:'約9万円',          desc:'相手方の保険（自賠責・任意保険）が使えれば、さらに減る場合もあります。'},
      {icon:'🛡️',type:'green',label:'保険から受け取れるお金',   title:'給付金の目安',              amount:'約10〜14万円',     desc:'入院日額5,000円×14日＋手術給付金。給付金は9万円の自己負担を上回りますが、毎月の保険料累計との比較が大切です。'},
    ],
    ins: '給付金10〜14万円で自己負担9万円をカバーできます。<br>ただし<strong>毎月払い続けた保険料の累計</strong>と比べると、コスト面では見直しが必要です。',
    nisa:'NISAに<strong>約200万円</strong>あれば9万円はすぐ引き出せます。<br>残高に対してわずか4〜5%の支出です。',
    verdict:'nisa',
    conclusion:'交通事故の自己負担は<strong>約9万円。NISA残高200万円あれば余裕でカバーできます。</strong><br>毎月払い続けた保険料の累計を考えると、NISAで備える方が合理的なケースです。',
  },
  {
    id:'polyp', icon:'🔬', name:'大腸ポリープ', sub:'日帰り〜1泊・内視鏡切除',
    cards:[
      {icon:'🔬',type:'red',  label:'病院からの請求',          title:'医療費の総額',              amount:'約3〜5万円',       desc:'日帰り内視鏡手術。検査・切除・病理検査の合計です。<br><span class="fcd-note fcd-note-red">※大腸ポリープが複数見つかった場合：約10〜20万円</span>'},
      {icon:'🏛️',type:'blue', label:'高額療養費制度のおかげで', title:'国が肩代わりしてくれる金額', amount:'ほぼなし',         desc:'費用が低いため高額療養費の対象外になることがほとんど。3割負担がそのままかかります。<br><span class="fcd-note fcd-note-blue">※複数の場合は一部適用されることもあります</span>'},
      {icon:'💳',type:'red',  label:'実際に財布から出るお金',   title:'あなたが払う金額',           amount:'約2〜3万円',       desc:'1つなら3割負担で2〜3万円が目安。交通費を含めても5万円以内が多いです。<br><span class="fcd-note fcd-note-red">※複数見つかった場合：約10〜20万円</span>'},
      {icon:'🛡️',type:'green',label:'保険から受け取れるお金',   title:'給付金の目安',              amount:'約5〜10万円',      desc:'手術給付金が5〜10万円出るケースが多く、1つの場合は自己負担を上回ります。複数の場合は給付金が自己負担を下回ることも。毎月の保険料累計との比較が重要です。'},
    ],
    ins: '1つの場合、給付金5〜10万円で自己負担2〜3万円を上回ります。<br>ただし<strong>毎月払い続けた保険料の累計</strong>と比べると、コスト優位とは言い切れません。',
    nisa:'NISAに<strong>約200万円</strong>あれば1〜2万円〜最大20万円（複数の場合）まで問題なく引き出せます。',
    verdict:'nisa',
    conclusion:'大腸ポリープの自己負担は<strong>1つなら2〜3万円、複数でも最大20万円程度。NISA残高200万円があればどちらのケースもカバーできます。</strong><br>保険の給付金が上回って見える場合も、月々の保険料累計と比べてみましょう。',
  },
  {
    id:'cancer', icon:'🎗️', name:'がん（初期）', sub:'手術＋入院2〜3週間',
    cards:[
      {icon:'🎗️',type:'red',  label:'病院からの請求',          title:'医療費の総額',              amount:'約100〜150万円',   desc:'手術・入院・放射線治療・抗がん剤など。治療内容で大きく変わります。'},
      {icon:'🏛️',type:'blue', label:'高額療養費制度のおかげで', title:'国が肩代わりしてくれる金額', amount:'約90〜140万円',    desc:'窓口では一度全額払いますが、高額療養費制度で月の自己負担は約8〜9万円に抑えられます（後日払い戻し）。事前に「限度額適用認定証」を用意すれば窓口負担を最初から上限額に抑えられます。長期治療でも毎月上限があります。'},
      {icon:'💳',type:'red',  label:'実際に財布から出るお金',   title:'あなたが払う金額',           amount:'月8〜9万円×数ヶ月', desc:'治療が数ヶ月続く場合、毎月自己負担が発生。差額ベッド代・交通費・仕事を休む間の収入減も考慮が必要です。'},
      {icon:'🛡️',type:'green',label:'保険から受け取れるお金',   title:'給付金の目安',              amount:'診断一時金100万円＋入院給付金', desc:'がん保険なら診断一時金が一括で下りることが多い。「病気とわかった瞬間に現金が入る」精神的な安心感は大きいです。'},
    ],
    ins: '診断一時金100万円が一括で入ります。<strong>治療中の生活費・収入減をカバー</strong>できる点が最大のメリット。精神的にも楽になります。',
    nisa:'NISAに<strong>100万円以上</strong>あれば対応できます。<br>ただし治療が長引くと資産が大きく減るリスクがあります。',
    verdict:'ins',
    conclusion:'がんは<strong>保険の価値が最も高いケース</strong>です。<br>診断一時金が「病気とわかった瞬間に下りる」安心感は、NISAの引き出しとは別の価値があります。真-SHIN-が「診断一時金型を一本だけ持つ」と言う理由がここにあります。',
  },
  {
    id:'cardiac', icon:'❤️‍🔥', name:'心筋梗塞・脳卒中', sub:'緊急入院・長期リハビリ',
    cards:[
      {icon:'❤️‍🔥',type:'red',  label:'病院からの請求',          title:'医療費の総額',              amount:'約200〜500万円',   desc:'緊急手術・ICU・長期入院・リハビリを含めると総額は非常に高額になります。'},
      {icon:'🏛️',type:'blue', label:'高額療養費制度のおかげで', title:'国が肩代わりしてくれる金額', amount:'大部分が対象',     desc:'窓口では一度全額払いますが、高額療養費制度で月の自己負担は約8〜9万円に抑えられます（後日払い戻し）。事前に「限度額適用認定証」を用意すれば窓口負担を最初から抑えられます。ただし複数月にわたるため累計負担は増えます。'},
      {icon:'💳',type:'red',  label:'実際に財布から出るお金',   title:'あなたが払う金額',           amount:'月8〜9万円×3〜6ヶ月', desc:'急性期＋リハビリで3〜6ヶ月の入院になるケースも。後遺症が残ると収入減・介護費用も発生します。'},
      {icon:'🛡️',type:'green',label:'保険から受け取れるお金',   title:'給付金の目安',              amount:'診断一時金50〜100万円＋', desc:'三大疾病保険・特定疾病保険なら診断一時金が下りるケースが多い。生活習慣病特約があればさらに手厚くなります。'},
    ],
    ins: '診断一時金50〜100万円＋入院給付金で、<strong>長期治療・収入減をカバー</strong>できます。<br>後遺症が残った場合の生活設計にも保険が役立ちます。',
    nisa:'NISAに<strong>200万円</strong>あっても、長期入院＋収入減が重なると<strong>不足するリスク</strong>があります。',
    verdict:'ins',
    conclusion:'心筋梗塞・脳卒中は<strong>保険の検討価値が高いケース</strong>です。<br>高額療養費制度で1ヶ月の上限はあっても、複数月・後遺症・収入減が重なると200万円では足りなくなる可能性があります。三大疾病保険の一本化を検討する価値があります。',
  },
  {
    id:'mental', icon:'🧠', name:'うつ病', sub:'休職・通院3〜6ヶ月',
    cards:[
      {icon:'🧠',type:'red',  label:'仕事への影響',            title:'休職中の収入減',            amount:'月収の約1/3が消える', desc:'傷病手当金（月収の2/3）が最長1年6ヶ月支給されますが、残り1/3は自己負担。生活費が不足します。'},
      {icon:'🏛️',type:'blue', label:'国の制度のおかげで',       title:'傷病手当金',                amount:'月収の約67%',       desc:'健康保険の傷病手当金で月収の2/3が支給されます。会社員なら申請できます。自営業・フリーランスは対象外です。'},
      {icon:'💳',type:'red',  label:'実際に財布から出るお金',   title:'3ヶ月休職した場合の不足額', amount:'約30〜60万円',      desc:'月収の1/3×3ヶ月＋通院費・薬代・生活費の変化など。回復が長引くと半年〜1年以上になることも。'},
      {icon:'🛡️',type:'green',label:'保険から受け取れるお金',   title:'給付金の目安',              amount:'就業不能給付金・通院給付金', desc:'就業不能保険があれば月10〜20万円が支給されます。ただし「精神疾患は対象外」の保険も多いので加入時に必ず確認を。'},
    ],
    ins: 'うつ病対応の<strong>就業不能保険</strong>があれば、長期の休職中も収入を補えます。<br>回復が1年を超えるケースでは<strong>保険の検討価値が高い</strong>です。',
    nisa:'NISAに<strong>約200万円</strong>あれば3〜4ヶ月の不足はカバーできます。<br>ただし回復が長引くと資産が大きく減り、精神的なプレッシャーになるリスクもあります。',
    verdict:'both',
    conclusion:'うつ病は<strong>現代人に最も身近なリスク</strong>です。<br>3〜6ヶ月の短期なら<strong>NISA200万円でギリギリ対応可能</strong>。ただし長期化すると資産が尽きるリスクがあるため、<strong>長引きそうな場合は就業不能保険の検討を。</strong>精神疾患が対象かどうか必ず確認してください。',
  },
];

/* ── 状態管理 ── */
let currentId = 'mocho';

/* ── スライダー連動・NISA計算 ── */
function updateInputs() {
  const fee = parseInt(document.getElementById('ins-fee').value);
  const age = parseInt(document.getElementById('sim-age').value);
  document.getElementById('ins-fee-val').textContent = fee.toLocaleString() + '円/月';
  document.getElementById('sim-age-val').textContent = age + '歳';
  document.getElementById('yearly-fee').textContent  = (fee * 12).toLocaleString() + '円';

  const years    = Math.max(0, age - 20);
  const totalMan = Math.round(fee * 12 * years / 10000);
  document.getElementById('total-paid').textContent = '約' + totalMan + '万円';

  const noteEl = document.getElementById('paid-note');
  if (noteEl) {
    noteEl.textContent = years === 0
      ? '20歳時点での試算です'
      : `仮に20歳から${age}歳まで同額を払い続けた場合の試算`;
  }

  // NISA複利計算（年利4%・毎月積立）
  const monthlyRate = 0.04 / 12;
  let nisaVal = 0;
  for (let m = 0; m < years * 12; m++) {
    nisaVal = (nisaVal + fee) * (1 + monthlyRate);
  }
  const nisaMan = Math.round(nisaVal / 10000);

  const yearlyEl = document.getElementById('nisa-yearly');
  const resultEl = document.getElementById('nisa-result');
  if (yearlyEl) yearlyEl.textContent = (fee * 12).toLocaleString() + '円';
  if (resultEl) resultEl.textContent = years > 0 ? '約' + nisaMan + '万円' : '—';

  // 前提カード更新
  const premiseFee  = document.getElementById('premise-fee');
  const premiseNisa = document.getElementById('premise-nisa');
  const premiseNote = document.getElementById('premise-note');
  if (premiseFee)  premiseFee.textContent  = fee.toLocaleString() + '円/月';
  if (premiseNisa) premiseNisa.textContent = years > 0 ? '約' + nisaMan + '万円' : '—';
  if (premiseNote) premiseNote.textContent = 'があります。';

  drawBarChart(fee, age);
  renderCase(currentId);
}

/* ── 棒グラフ描画（Canvas） ── */
function drawBarChart(fee, age) {
  const canvas = document.getElementById('bar-chart');
  if (!canvas) return;
  const ctx  = canvas.getContext('2d');
  const dpr  = window.devicePixelRatio || 1;
  const cssW = canvas.parentElement.clientWidth;
  const cssH = 300;
  canvas.width  = cssW * dpr;
  canvas.height = cssH * dpr;
  canvas.style.width  = cssW + 'px';
  canvas.style.height = cssH + 'px';
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, cssW, cssH);

  const W = cssW, H = cssH;
  const padL = 58, padR = 12, padTop = 28, padBot = 36;
  const chartH = H - padTop - padBot;
  const chartW = W - padL - padR;

  // 1年刻みデータ（20歳〜現在年齢）
  const years = Math.max(0, age - 20);
  const labels = [];
  for (let y = 0; y <= years; y++) labels.push(20 + y);

  const monthlyRate = 0.04 / 12;
  const insData = [], nisaData = [];
  labels.forEach(a => {
    const y = a - 20;
    insData.push(Math.round(fee * 12 * y / 10000));
    let nv = 0;
    for (let m = 0; m < y * 12; m++) nv = (nv + fee) * (1 + monthlyRate);
    nisaData.push(Math.round(nv / 10000));
  });

  const maxVal = Math.max(...nisaData, ...insData, 10);
  const n      = labels.length;
  const zeroY  = padTop + chartH / 2;
  const halfH  = chartH / 2;
  const slotW  = chartW / Math.max(n, 1);
  const barW   = Math.max(Math.min(slotW * 0.7, 32), 2);

  // グリッド線
  ctx.strokeStyle = '#E8E4DC'; ctx.lineWidth = 1;
  [0.25, 0.5, 0.75, 1].forEach(r => {
    [zeroY - halfH * r, zeroY + halfH * r].forEach(y => {
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
    });
  });

  // ゼロライン
  ctx.strokeStyle = '#999'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(padL, zeroY); ctx.lineTo(W - padR, zeroY); ctx.stroke();

  // 縦軸ラベル
  ctx.fillStyle = '#888'; ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
  [0.5, 1].forEach(r => {
    const val = Math.round(maxVal * r / 5) * 5;
    ctx.fillText('+' + val + '万', padL - 4, zeroY - halfH * r + 4);
    ctx.fillText('−' + val + '万', padL - 4, zeroY + halfH * r + 4);
  });
  ctx.fillText('0', padL - 4, zeroY + 4);

  // roundRect フォールバック（Edge 旧版・Safari 15.3以下対応）
  function roundBar(x, y, w, h, radii) {
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, w, h, radii);
    } else {
      ctx.rect(x, y, w, h);
    }
  }

  // 棒＋ラベル描画
  labels.forEach((a, i) => {
    const cx    = padL + slotW * i + slotW / 2;
    const nisaH = (nisaData[i] / maxVal) * halfH;
    const insH  = (insData[i]  / maxVal) * halfH;

    // 上：NISA（青）
    ctx.fillStyle = '#4A90D9';
    ctx.beginPath();
    roundBar(cx - barW / 2, zeroY - nisaH, barW, Math.max(nisaH, 1), nisaH > 3 ? [3, 3, 0, 0] : 0);
    ctx.fill();

    // 下：保険（赤）
    ctx.fillStyle = '#E05252';
    ctx.beginPath();
    roundBar(cx - barW / 2, zeroY, barW, Math.max(insH, 1), insH > 3 ? [0, 0, 3, 3] : 0);
    ctx.fill();

    const showLabel = n <= 16 || i % Math.ceil(n / 12) === 0;
    if (showLabel) {
      if (nisaData[i] > 0) {
        ctx.fillStyle = '#1A5FA8'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('+' + nisaData[i] + '万', cx, zeroY - nisaH - 4);
      }
      if (insData[i] > 0) {
        ctx.fillStyle = '#C02020'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('−' + insData[i] + '万', cx, zeroY + insH + 13);
      }
      ctx.fillStyle = '#555'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(a + '歳', cx, H - 6);
    }
  });

  // 端の年齢ラベルは必ず表示
  if (n > 16) {
    [0, n - 1].forEach(i => {
      const cx = padL + slotW * i + slotW / 2;
      ctx.fillStyle = '#555'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(labels[i] + '歳', cx, H - 6);
    });
  }
}

/* ── タブ選択 ── */
function selectCase(id) {
  currentId = id;
  document.querySelectorAll('.case-tab').forEach(t => {
    const isActive = t.id === 'tab-' + id;
    t.classList.toggle('active', isActive);
    t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    t.setAttribute('tabindex', isActive ? '0' : '-1');
  });
  const c = CASES.find(x => x.id === id);
  const titleEl = document.getElementById('case-title');
  if (titleEl && c) titleEl.textContent = c.name + 'の場合';
  renderCase(id);
}

/* ── ケース描画 ── */
function renderCase(id) {
  const c        = CASES.find(x => x.id === id);
  const fee      = parseInt(document.getElementById('ins-fee').value);
  const age      = parseInt(document.getElementById('sim-age').value);
  const years    = Math.max(0, age - 20);

  // SVGデータ
  const SVG_DATA = {
    mocho:    { total:'約25万円',       cover:'約17万円戻る',      self:'約8万円',          insAmt:'約5〜8万円',           nisaOk:true,  insWin:false, conclusion:'盲腸ならNISAに10万円あれば保険なしでも乗り越えられます' },
    accident: { total:'約60万円',       cover:'約51万円戻る',      self:'約9万円',          insAmt:'約10〜14万円',         nisaOk:true,  insWin:false, conclusion:'自己負担は約9万円。NISA残高200万円があれば余裕でカバーできます' },
    polyp:    { total:'約3〜20万円',    cover:'ほぼなし〜一部適用', self:'約2〜20万円',      insAmt:'約5〜10万円',          nisaOk:true,  insWin:false, conclusion:'1つなら2〜3万円、複数でも最大20万円。NISA200万円があればカバーできます' },
    cancer:   { total:'約100〜150万円', cover:'約90〜140万円戻る', self:'月8〜9万円×数ヶ月', insAmt:'診断一時金100万円＋',  nisaOk:false, insWin:true,  conclusion:'がんは保険の価値が最も高い。診断一時金の安心感は別格です' },
    cardiac:  { total:'約200〜500万円', cover:'大部分が対象',      self:'月8〜9万円×数ヶ月', insAmt:'診断一時金50〜100万円＋', nisaOk:false, insWin:true, conclusion:'長期入院＋収入減が重なるとNISA200万でも不足リスク。保険の検討価値が高い' },
    mental:   { total:'収入の1/3消える', cover:'傷病手当金67%',   self:'約30〜60万円',      insAmt:'就業不能給付金',       nisaOk:true,  insWin:false, conclusion:'短期ならNISA200万でカバー可。長期化する場合は就業不能保険を検討' },
  };
  const d = SVG_DATA[id];

  setText('f-total',      d.total);
  setText('f-cover',      d.cover);
  setText('f-self',       d.self);
  setText('f-ins-amount', d.insAmt);
  setText('f-conclusion', d.conclusion);

  // SVG NISA残高表示
  let nisaVal2 = 0;
  const monthlyRate2 = 0.04 / 12;
  for (let m = 0; m < years * 12; m++) {
    nisaVal2 = (nisaVal2 + fee) * (1 + monthlyRate2);
  }
  const nisaMan2 = years > 0 ? Math.round(nisaVal2 / 10000) : 0;
  setText('f-nisa-stock', nisaMan2 > 0 ? `NISA残高 約${nisaMan2}万円 ← ここから出せる` : 'NISA残高 — ← ここから出せる');

  // バッジ非表示
  const nisaBadge = document.getElementById('f-nisa-badge');
  const nisaText  = document.getElementById('f-nisa-badge-text');
  nisaBadge.setAttribute('height', '0');
  nisaText.textContent = '';

  const insBadge = document.getElementById('f-ins-badge');
  const insText  = document.getElementById('f-ins-badge-text');
  const insBox   = document.getElementById('f-ins-box');
  insBadge.setAttribute('height', '0');
  insText.textContent = '';
  insBox.setAttribute('stroke', '#C04B1A');
  insBox.setAttribute('stroke-width', d.insWin ? '2.5' : '1.5');

  // 比較バー
  const COMP_DATA = {
    mocho:    { nisaAmt:'約200万円',           insAmt:'約5〜8万円',              winner:'nisa', nisaLabel:'8万円を余裕でカバーできる',       insLabel:'給付金の目安' },
    accident: { nisaAmt:'約200万円',           insAmt:'約10〜14万円',            winner:'nisa', nisaLabel:'9万円をすぐ引き出せる',           insLabel:'給付金の目安' },
    polyp:    { nisaAmt:'約200万円',           insAmt:'約5〜10万円',             winner:'nisa', nisaLabel:'複数でも最大20万円をカバーできる', insLabel:'※複数の場合、給付金が自己負担以下に' },
    cancer:   { nisaAmt:'100万円以上必要',     insAmt:'診断一時金100万円＋',     winner:'ins',  nisaLabel:'長期治療でリスクあり',             insLabel:'給付金の目安（有利）' },
    cardiac:  { nisaAmt:'200万円でも不足リスク', insAmt:'診断一時金50〜100万円＋', winner:'ins', nisaLabel:'長期入院＋収入減で資産が枯渇',     insLabel:'三大疾病保険が有効' },
    mental:   { nisaAmt:'約200万円',           insAmt:'約30〜60万円',            winner:'nisa', nisaLabel:'3〜4ヶ月の不足をカバーできる',   insLabel:'3ヶ月休職の場合の不足額目安' },
  };
  const comp = COMP_DATA[id];

  document.getElementById('comp-nisa-amount').textContent = comp.nisaAmt;
  document.getElementById('comp-nisa-label').textContent  = comp.nisaLabel;
  document.getElementById('comp-ins-amount').textContent  = comp.insAmt;
  document.getElementById('comp-ins-label').textContent   = comp.insLabel;

  const nisaHana = document.getElementById('comp-nisa-hanamaru');
  const insHana  = document.getElementById('comp-ins-hanamaru');
  const nisaBox  = document.getElementById('comp-nisa');
  const insBox2  = document.getElementById('comp-ins');

  // クラスでリセット
  nisaHana.classList.remove('comp-hanamaru-show');
  insHana.classList.remove('comp-hanamaru-show');
  nisaBox.classList.remove('comp-winner', 'comp-loser');
  insBox2.classList.remove('comp-winner', 'comp-loser');

  if (comp.winner === 'nisa') {
    nisaHana.classList.add('comp-hanamaru-show');
    nisaBox.classList.add('comp-winner');
    insBox2.classList.add('comp-loser');
  } else if (comp.winner === 'ins') {
    insHana.classList.add('comp-hanamaru-show');
    insBox2.classList.add('comp-winner');
    nisaBox.classList.add('comp-loser');
  }

  // フローカード更新
  const grid = document.getElementById('cards-grid');
  grid.classList.remove('show');
  grid.innerHTML = c.cards.map((card, i) => `
    <div class="flow-card flow-card-delay-${i}">
      <div class="flow-card-header ${card.type}">
        <div class="fci">${card.icon}</div>
        <div>
          <div class="fcl ${card.type}">${card.label}</div>
          <div class="fct">${card.title}</div>
        </div>
      </div>
      <div class="flow-card-body">
        <div class="fca ${card.type}">${card.amount}</div>
        <div class="fcd">${card.desc}</div>
      </div>
    </div>
  `).join('');

  requestAnimationFrame(() => {
    document.getElementById('cards-grid').classList.add('show');
  });

  // 結論
  const concEl = document.getElementById('conclusion');
  concEl.classList.remove('show');
  const badge = {
    ins:  '<span class="vbadge vb-ins">保険が有利</span>',
    nisa: '<span class="vbadge vb-nisa">NISAで対応可</span>',
    both: '<span class="vbadge vb-both">状況次第</span>',
  };
  concEl.innerHTML = badge[c.verdict] + '<br>' + c.conclusion;
  setTimeout(() => { concEl.classList.add('show'); }, 400);
}

/* ── ユーティリティ ── */
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ── タブ生成 ── */
function buildTabs() {
  const container = document.getElementById('case-tabs');
  container.innerHTML = CASES.map((c, i) => `
    <div
      class="case-tab ${c.id === currentId ? 'active' : ''}"
      id="tab-${c.id}"
      role="tab"
      tabindex="${c.id === currentId ? '0' : '-1'}"
      aria-selected="${c.id === currentId ? 'true' : 'false'}"
      aria-controls="case-panel"
      onclick="selectCase('${c.id}')"
      onkeydown="handleTabKey(event, ${i})"
    >
      <div class="tab-icon">${c.icon}</div>
      <div class="tab-name">${c.name}</div>
      <div class="tab-sub">${c.sub}</div>
    </div>
  `).join('');
}

/* ── タブキーボード操作（←→・Home・End） ── */
function handleTabKey(event, index) {
  const keys = { ArrowRight: 1, ArrowLeft: -1, Home: null, End: null };
  if (!(event.key in keys)) return;
  event.preventDefault();
  let next;
  if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = CASES.length - 1;
  else next = (index + keys[event.key] + CASES.length) % CASES.length;
  selectCase(CASES[next].id);
  document.getElementById('tab-' + CASES[next].id).focus();
}

/* ── 初期化 ── */
buildTabs();
updateInputs();

/* ── ResizeObserver：ウィンドウ幅変化でグラフ再描画 ── */
(function () {
  const chartWrap = document.querySelector('.bar-chart-wrap');
  if (!chartWrap || typeof ResizeObserver === 'undefined') return;
  let rafId = null;
  const ro = new ResizeObserver(() => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const fee = parseInt(document.getElementById('ins-fee').value);
      const age = parseInt(document.getElementById('sim-age').value);
      drawBarChart(fee, age);
    });
  });
  ro.observe(chartWrap);
})();

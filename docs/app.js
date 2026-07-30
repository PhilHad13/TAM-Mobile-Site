const state = {
  data: null,
};

const app = document.getElementById("app");

function dataset(command) {
  return state.data.commands[command].Data;
}

function get(data, row, name) {
  return row[data.ColumnInfo[name].I];
}

function money(value, currency = "GBP") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function header(home = "#summary") {
  return `
    <header class="topbar">
      <a class="brand" href="${home}" aria-label="TAM Asset Management home">
        <img class="brandLogo" src="./tam-logo-white.png" alt="TAM Asset Management">
      </a>
      <div class="topActions">
        <span class="status"><span class="statusDot"></span>Secure demo</span>
        <a class="staticSignOut" href="#login">Sign out</a>
      </div>
    </header>
  `;
}

function renderLogin() {
  app.innerHTML = `
    <main class="loginShell">
      <section class="loginBrandPanel" aria-label="TAM Asset Management">
        <div class="loginBrandInner">
          <img class="loginLogo" src="./tam-logo-white.png" alt="TAM Asset Management">
          <div class="loginIntroduction">
            <p class="eyebrow">Client portal</p>
            <h1>Your investments, clearly in view.</h1>
            <p>Secure access to your portfolio valuations, performance and investment updates.</p>
          </div>
          <p class="loginBrandFooter">TAM Asset Management · Client valuation service</p>
        </div>
      </section>
      <section class="loginFormPanel">
        <div class="loginFormWrap">
          <div class="loginMobileBrand">
            <img src="./tam-logo-white.png" alt="TAM Asset Management">
          </div>
          <p class="eyebrow darkEyebrow">Welcome back</p>
          <h2>Sign in to your account</h2>
          <p class="loginLead">Enter demonstration credentials to view the sample valuation.</p>
          <form class="loginForm" id="demo-login">
            <div class="loginField">
              <label for="username">Username</label>
              <input id="username" name="username" autocomplete="username" placeholder="Enter any test username" required>
            </div>
            <div class="loginField">
              <div class="passwordLabel">
                <label for="password">Password</label>
                <button class="showPassword" id="show-password" type="button">Show</button>
              </div>
              <input id="password" name="password" autocomplete="current-password" placeholder="Enter any test password" required type="password">
            </div>
            <div class="loginOptions">
              <button class="forgotButton" id="forgot-password" type="button">Forgotten password?</button>
            </div>
            <button class="loginSubmit" type="submit">View demonstration <span aria-hidden="true">→</span></button>
            <p class="loginStatus" id="login-status" aria-live="polite"></p>
          </form>
          <div class="demoNotice">
            <span aria-hidden="true">i</span>
            <p><strong>Demonstration login</strong>Do not enter real account credentials. This static preview does not send or store the username or password.</p>
          </div>
        </div>
      </section>
    </main>
  `;

  const password = document.getElementById("password");
  const showPassword = document.getElementById("show-password");
  showPassword.addEventListener("click", () => {
    const show = password.type === "password";
    password.type = show ? "text" : "password";
    showPassword.textContent = show ? "Hide" : "Show";
  });
  document.getElementById("forgot-password").addEventListener("click", () => {
    document.getElementById("login-status").textContent =
      "Password recovery is not connected in this demonstration.";
  });
  document.getElementById("demo-login").addEventListener("submit", (event) => {
    event.preventDefault();
    window.location.hash = "summary";
  });
}

function renderSummary() {
  const client = dataset("ClientSummary");
  const first = client.Rows[0];
  const commentary = dataset("Commentary");
  const update = commentary.Rows[0];

  const cards = client.Rows.map((row, index) => {
    const id = get(client, row, "PortfolioID");
    const currency = get(client, row, "PortfolioCurrencyISOCode");
    return `
      <article class="portfolioCard">
        <div class="cardAccent"></div>
        <div class="cardTop">
          <div>
            <span class="portfolioLabel">Portfolio ${index + 1}</span>
            <h3>${get(client, row, "PortfolioName")}</h3>
            <p>${get(client, row, "PortfolioReference")}</p>
          </div>
          <span class="riskBadge">${get(client, row, "RiskProfileDescription")}</span>
        </div>
        <div class="portfolioValue">
          <span>Current value</span>
          <strong>${money(get(client, row, "PortfolioValue"), currency)}</strong>
        </div>
        <dl class="metrics">
          <div><dt>Holdings</dt><dd>${money(get(client, row, "HoldingValue"), currency)}</dd></div>
          <div><dt>Cash</dt><dd>${money(get(client, row, "CashValue"), currency)}</dd></div>
          <div><dt>Since inception</dt><dd class="positive">+${Number(get(client, row, "GeometricPerformance")).toFixed(2)}%</dd></div>
        </dl>
        <div class="cardDetails">
          <div><span>Benchmark</span><strong>${get(client, row, "BenchmarkName")}</strong></div>
          <div><span>Inception</span><strong>${formatDate(get(client, row, "InceptionDate"))}</strong></div>
        </div>
        <a class="viewButton" href="#portfolio-${id}">View portfolio <span aria-hidden="true">→</span></a>
      </article>
    `;
  }).join("");

  app.innerHTML = `
    <main>
      ${header()}
      <section class="hero">
        <div class="heroInner">
          <p class="eyebrow">Your investments</p>
          <div class="clientHeading">
            <div>
              <h1>${get(client, first, "ClientName")}</h1>
              <p class="reference">Client reference ${get(client, first, "ClientReference")}</p>
            </div>
            <div class="asOf"><span>Valuation date</span><strong>30 Jul 2026</strong></div>
          </div>
          <div class="totalValue">
            <span>Total portfolio value</span>
            <strong>${money(get(client, first, "ClientValue"), get(client, first, "ClientCurrencyISOCode"))}</strong>
            <small>Across ${client.RowCount} portfolios</small>
          </div>
        </div>
      </section>
      <div class="page">
        <section>
          <div class="sectionHeading">
            <div><p class="eyebrow darkEyebrow">Portfolio overview</p><h2>Your portfolios</h2></div>
            <span class="portfolioCount">${client.RowCount}</span>
          </div>
          <div class="portfolioGrid">${cards}</div>
        </section>
        <section class="commentary">
          <div class="commentaryIcon" aria-hidden="true">“</div>
          <div class="commentaryContent">
            <p class="eyebrow darkEyebrow">From your investment manager</p>
            <h2>Recent commentary</h2>
            <time datetime="${get(commentary, update, "EffectiveDate")}">${formatDate(get(commentary, update, "EffectiveDate"))}</time>
            <h3>${get(commentary, update, "Title")}</h3>
            <p>${get(commentary, update, "CommentaryText")}</p>
          </div>
        </section>
        <p class="disclaimer">Test environment · Values are based on supplied demonstration data and are not a live valuation.</p>
      </div>
    </main>
  `;
}

function renderPortfolio(id) {
  const client = dataset("ClientSummary");
  const row = client.Rows.find((item) => get(client, item, "PortfolioID") === id);
  if (!row) {
    window.location.hash = "summary";
    return;
  }

  if (id !== "76") {
    app.innerHTML = `
      <main>
        ${header()}
        <section class="portfolioHero"><div class="portfolioHeroInner">
          <a class="backLink" href="#summary">← All portfolios</a>
          <div class="portfolioHeroTitle">
            <div><p class="eyebrow">Portfolio overview</p><h1>${get(client, row, "PortfolioName")}</h1><p class="reference">${get(client, row, "PortfolioReference")}</p></div>
            <span class="heroRisk">${get(client, row, "RiskProfileDescription")}</span>
          </div>
        </div></section>
        <div class="portfolioPage"><section class="panel emptyPortfolio">
          <span class="emptyNumber">02</span>
          <p class="eyebrow darkEyebrow">Summary data available</p>
          <h2>${get(client, row, "PortfolioName")}</h2>
          <p>The detailed valuation, exposure and activity samples supplied belong to Balanced GBP.</p>
          <a class="emptyBack" href="#summary">Return to all portfolios</a>
        </section></div>
      </main>
    `;
    return;
  }

  const exposure = dataset("Exposure");
  const valuation = dataset("Valuation");
  const transactions = dataset("RecentTransactions");
  const trades = dataset("RecentTrades");
  const performance = dataset("PortfolioBenchmark");
  const holding = valuation.Rows[0];
  const total = exposure.Rows.reduce((sum, item) => sum + Number(get(exposure, item, "Value")), 0);
  const currency = get(client, row, "PortfolioCurrencyISOCode");

  const allocations = exposure.Rows.map((item, index) => {
    const amount = Number(get(exposure, item, "Value"));
    const percentage = amount / total * 100;
    return `
      <div class="allocationRow">
        <div class="allocationLabel"><span><i class="swatch swatch${index + 1}"></i>${get(exposure, item, "Name")}</span><strong>${percentage.toFixed(2)}%</strong></div>
        <div class="allocationTrack"><span class="allocationBar swatch${index + 1}" style="width:${percentage}%"></span></div>
        <small>${money(amount, currency)}</small>
      </div>
    `;
  }).join("");

  const transactionRows = transactions.Rows.slice(0, 4).map((item) => `
    <div class="activityRow">
      <div class="activityDate">${formatDate(get(transactions, item, "TransactionDate"))}</div>
      <div><strong>${get(transactions, item, "CashTransactionTypeName")}</strong><p>${get(transactions, item, "CashAccountName")}</p></div>
      <b class="${Number(get(transactions, item, "CreditAmount")) >= 0 ? "positive" : "negative"}">${money(get(transactions, item, "CreditAmount"), currency)}</b>
    </div>
  `).join("");

  const tradeRows = trades.Rows.slice(0, 4).map((item) => `
    <div class="activityRow">
      <span class="tradeBadge ${get(trades, item, "SecurityTradeTypeName").toLowerCase()}">${get(trades, item, "SecurityTradeTypeName")}</span>
      <div><strong>${get(trades, item, "SecurityShortName")}</strong><p>${formatDate(get(trades, item, "TradeDate"))}</p></div>
      <b>${money(get(trades, item, "TradeValue"), currency)}</b>
    </div>
  `).join("");

  app.innerHTML = `
    <main>
      ${header()}
      <section class="portfolioHero">
        <div class="portfolioHeroInner">
          <a class="backLink" href="#summary">← All portfolios</a>
          <div class="portfolioHeroTitle">
            <div><p class="eyebrow">Portfolio overview</p><h1>${get(client, row, "PortfolioName")}</h1><p class="reference">${get(client, row, "PortfolioReference")}</p></div>
            <span class="heroRisk">${get(client, row, "RiskProfileDescription")}</span>
          </div>
          <div class="portfolioHeroMetrics">
            <div class="primaryMetric"><span>Current value</span><strong>${money(get(client, row, "PortfolioValue"), currency)}</strong><small>Valued 30 Jul 2026</small></div>
            <div><span>Since inception</span><strong class="heroPositive">+${Number(get(client, row, "GeometricPerformance")).toFixed(2)}%</strong><small>From 1 Jan 2005</small></div>
            <div><span>Available cash</span><strong>${money(get(client, row, "CashValue"), currency)}</strong><small>2.56% of portfolio</small></div>
          </div>
        </div>
      </section>
      <nav class="sectionNav"><div><a href="#portfolio-76">Overview</a><a href="#holdings">Holdings</a><a href="#activity">Activity</a></div></nav>
      <div class="portfolioPage">
        <section class="detailGrid">
          <article class="panel">
            <div class="panelHeading"><div><p class="eyebrow darkEyebrow">Allocation</p><h2>Portfolio exposure</h2></div><span class="panelDate">30 Jul 2026</span></div>
            <div class="allocationList">${allocations}</div>
          </article>
          <article class="panel performancePanel">
            <div class="panelHeading"><div><p class="eyebrow darkEyebrow">Returns</p><h2>Performance</h2></div><span class="panelDate">Since inception</span></div>
            <canvas id="performance-chart" class="performanceLineChart" role="img" aria-label="Line chart comparing portfolio and benchmark performance"></canvas>
            <div class="chartLegend"><span><i class="legendPortfolio"></i>Portfolio</span><span><i class="legendBenchmark"></i>Benchmark</span></div>
            <p class="performanceNote">Representative test history from Jan 2005 to Mar 2006.</p>
          </article>
        </section>
        <section class="panel holdingsPanel" id="holdings">
          <div class="panelHeading"><div><p class="eyebrow darkEyebrow">Investments</p><h2>Holdings</h2></div><span class="panelDate">1 supplied holding</span></div>
          <div class="holdingRow">
            <div class="holdingIdentity"><span class="holdingType">${get(valuation, holding, "Grouped")}</span><div><h3>${get(valuation, holding, "AssetName")}</h3><p>ISIN ${get(valuation, holding, "ISIN")} · SEDOL ${get(valuation, holding, "SEDOL")}</p></div></div>
            <dl class="holdingMetrics"><div><dt>Market value</dt><dd>${money(get(valuation, holding, "MarketValueTotalInValuation"), currency)}</dd></div><div><dt>Portfolio</dt><dd>${Number(get(valuation, holding, "PercentageTotalPortfolio")).toFixed(2)}%</dd></div><div><dt>Gain / loss</dt><dd class="positive">+${money(get(valuation, holding, "UnrealisedGainLossInValuation"), currency)}</dd></div></dl>
          </div>
          <p class="dataNotice">The source valuation response was truncated, so this preview shows only the one complete holding supplied.</p>
        </section>
        <section class="activityGrid" id="activity">
          <article class="panel"><div class="panelHeading"><div><p class="eyebrow darkEyebrow">Cash account</p><h2>Recent transactions</h2></div></div><div class="activityList">${transactionRows}</div></article>
          <article class="panel"><div class="panelHeading"><div><p class="eyebrow darkEyebrow">Dealing</p><h2>Recent trades</h2></div></div><div class="activityList">${tradeRows}</div></article>
        </section>
        <p class="disclaimer">Test environment · Values are based on supplied demonstration data and are not a live valuation.</p>
      </div>
    </main>
  `;

  requestAnimationFrame(() => drawPerformanceChart(performance));
}

function drawPerformanceChart(performance) {
  const canvas = document.getElementById("performance-chart");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const points = performance.Rows.map((row) => ({
    benchmark: Number(get(performance, row, "BenchmarkPerformance")),
    portfolio: Number(get(performance, row, "GeometricPerformance")),
  }));
  const width = canvas.clientWidth;
  const height = 180;
  const scale = window.devicePixelRatio || 1;
  canvas.width = width * scale;
  canvas.height = height * scale;
  context.scale(scale, scale);
  const padding = { top: 15, right: 10, bottom: 20, left: 34 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const values = points.flatMap((point) => [point.benchmark, point.portfolio]);
  const min = Math.min(0, ...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const x = (index) => padding.left + index / (points.length - 1) * chartWidth;
  const y = (value) => padding.top + chartHeight - (value - min) / range * chartHeight;
  context.font = "10px system-ui";
  for (let step = 0; step <= 4; step += 1) {
    const value = min + range * step / 4;
    const lineY = y(value);
    context.strokeStyle = "#e7eaee";
    context.beginPath();
    context.moveTo(padding.left, lineY);
    context.lineTo(width - padding.right, lineY);
    context.stroke();
    context.fillStyle = "#7c8795";
    context.textAlign = "right";
    context.fillText(`${value.toFixed(0)}%`, padding.left - 6, lineY + 3);
  }
  [["benchmark", "#91a5b7"], ["portfolio", "#c7a35a"]].forEach(([key, colour]) => {
    context.strokeStyle = colour;
    context.lineWidth = 2.5;
    context.beginPath();
    points.forEach((point, index) => index ? context.lineTo(x(index), y(point[key])) : context.moveTo(x(index), y(point[key])));
    context.stroke();
  });
}

function route() {
  const hash = window.location.hash.slice(1);
  if (!hash || hash === "login") return renderLogin();
  if (hash === "summary") return renderSummary();
  if (hash.startsWith("portfolio-")) return renderPortfolio(hash.replace("portfolio-", ""));
  if (hash === "holdings" || hash === "activity") {
    renderPortfolio("76");
    requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
    return;
  }
  renderLogin();
}

fetch("./test-data.json")
  .then((response) => {
    if (!response.ok) throw new Error("Unable to load test data.");
    return response.json();
  })
  .then((data) => {
    state.data = data;
    route();
  })
  .catch((error) => {
    app.innerHTML = `<main class="staticError"><h1>Unable to open the demonstration</h1><p>${error.message}</p></main>`;
  });

window.addEventListener("hashchange", route);
window.addEventListener("resize", () => {
  if (window.location.hash === "#portfolio-76" && state.data) {
    drawPerformanceChart(dataset("PortfolioBenchmark"));
  }
});

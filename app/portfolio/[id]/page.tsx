import Link from "next/link";
import { notFound } from "next/navigation";
import fixture from "../../../test-data.json";
import { PerformanceLineChart } from "./performance-line-chart";

type Column = { I: number; T: string };
type DataSet = {
  ColumnInfo: Record<string, Column>;
  Rows: string[][];
};

function field(data: DataSet, row: string[], name: string) {
  const column = data.ColumnInfo[name];
  return column ? row[column.I] : "";
}

function money(amount: string, currency = "GBP") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));
}

function shortDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = fixture.commands.ClientSummary.Data as DataSet;
  const portfolio = client.Rows.find(
    (row) => field(client, row, "PortfolioID") === id,
  );

  if (!portfolio) notFound();

  const currency = field(client, portfolio, "PortfolioCurrencyISOCode");
  const isBalanced = id === "76";
  const exposure = fixture.commands.Exposure.Data as DataSet;
  const valuation = fixture.commands.Valuation.Data as DataSet;
  const performance = fixture.commands.PortfolioBenchmark.Data as DataSet;
  const transactions = fixture.commands.RecentTransactions.Data as DataSet;
  const trades = fixture.commands.RecentTrades.Data as DataSet;
  const exposureTotal = exposure.Rows.reduce(
    (sum, row) => sum + Number(field(exposure, row, "Value")),
    0,
  );
  const latestPerformance = performance.Rows[performance.Rows.length - 1];
  const performancePoints = performance.Rows.map((row) => ({
    benchmark: Number(field(performance, row, "BenchmarkPerformance")),
    date: new Intl.DateTimeFormat("en-GB", {
      month: "short",
      year: "2-digit",
    }).format(new Date(`${field(performance, row, "DateOfValue")}T12:00:00`)),
    portfolio: Number(field(performance, row, "GeometricPerformance")),
  }));
  const holding = valuation.Rows[0];

  return (
    <main>
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Return to portfolio summary">
          <img
            className="brandLogo"
            src="/tam-logo-white.png"
            alt="TAM Asset Management"
          />
        </Link>
        <div className="topActions">
          <span className="status">
            <span className="statusDot" />
            Secure
          </span>
          <button className="menuButton" aria-label="Open menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <section className="portfolioHero">
        <div className="portfolioHeroInner">
          <Link className="backLink" href="/">
            ← All portfolios
          </Link>
          <div className="portfolioHeroTitle">
            <div>
              <p className="eyebrow">Portfolio overview</p>
              <h1>{field(client, portfolio, "PortfolioName")}</h1>
              <p className="reference">
                {field(client, portfolio, "PortfolioReference")}
              </p>
            </div>
            <span className="heroRisk">
              {field(client, portfolio, "RiskProfileDescription")}
            </span>
          </div>

          <div className="portfolioHeroMetrics">
            <div className="primaryMetric">
              <span>Current value</span>
              <strong>
                {money(field(client, portfolio, "PortfolioValue"), currency)}
              </strong>
              <small>Valued 30 Jul 2026</small>
            </div>
            <div>
              <span>Since inception</span>
              <strong className="heroPositive">
                +{Number(field(client, portfolio, "GeometricPerformance")).toFixed(2)}%
              </strong>
              <small>From 1 Jan 2005</small>
            </div>
            <div>
              <span>Available cash</span>
              <strong>{money(field(client, portfolio, "CashValue"), currency)}</strong>
              <small>
                {(
                  (Number(field(client, portfolio, "CashValue")) /
                    Number(field(client, portfolio, "PortfolioValue"))) *
                  100
                ).toFixed(2)}
                % of portfolio
              </small>
            </div>
          </div>
        </div>
      </section>

      <nav className="sectionNav" aria-label="Portfolio sections">
        <div>
          <a href="#overview">Overview</a>
          <a href="#holdings">Holdings</a>
          <a href="#activity">Activity</a>
        </div>
      </nav>

      <div className="portfolioPage">
        {isBalanced ? (
          <>
            <section className="detailGrid" id="overview">
              <article className="panel">
                <div className="panelHeading">
                  <div>
                    <p className="eyebrow darkEyebrow">Allocation</p>
                    <h2>Portfolio exposure</h2>
                  </div>
                  <span className="panelDate">30 Jul 2026</span>
                </div>
                <div className="allocationList">
                  {exposure.Rows.map((row, index) => {
                    const amount = Number(field(exposure, row, "Value"));
                    const percent = (amount / exposureTotal) * 100;
                    return (
                      <div className="allocationRow" key={row[0]}>
                        <div className="allocationLabel">
                          <span>
                            <i className={`swatch swatch${index + 1}`} />
                            {field(exposure, row, "Name")}
                          </span>
                          <strong>{percent.toFixed(2)}%</strong>
                        </div>
                        <div className="allocationTrack">
                          <span
                            className={`allocationBar swatch${index + 1}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <small>{money(String(amount), currency)}</small>
                      </div>
                    );
                  })}
                </div>
              </article>

              <article className="panel performancePanel">
                <div className="panelHeading">
                  <div>
                    <p className="eyebrow darkEyebrow">Returns</p>
                    <h2>Performance</h2>
                  </div>
                  <span className="panelDate">Since inception</span>
                </div>
                <div className="returnComparison">
                  <div>
                    <span>Your portfolio</span>
                    <strong>
                      +
                      {Number(
                        field(performance, latestPerformance, "GeometricPerformance"),
                      ).toFixed(2)}
                      %
                    </strong>
                  </div>
                  <div>
                    <span>Benchmark</span>
                    <strong>
                      +
                      {Number(
                        field(performance, latestPerformance, "BenchmarkPerformance"),
                      ).toFixed(2)}
                      %
                    </strong>
                  </div>
                </div>
                <PerformanceLineChart points={performancePoints} />
                <div className="chartLegend">
                  <span><i className="legendPortfolio" />Portfolio</span>
                  <span><i className="legendBenchmark" />Benchmark</span>
                </div>
                <p className="performanceNote">
                  Representative test history from Jan 2005 to Mar 2006.
                </p>
              </article>
            </section>

            <section className="panel holdingsPanel" id="holdings">
              <div className="panelHeading">
                <div>
                  <p className="eyebrow darkEyebrow">Investments</p>
                  <h2>Holdings</h2>
                </div>
                <span className="panelDate">1 supplied holding</span>
              </div>
              <div className="holdingRow">
                <div className="holdingIdentity">
                  <span className="holdingType">
                    {field(valuation, holding, "Grouped")}
                  </span>
                  <div>
                    <h3>{field(valuation, holding, "AssetName")}</h3>
                    <p>
                      ISIN {field(valuation, holding, "ISIN")} · SEDOL{" "}
                      {field(valuation, holding, "SEDOL")}
                    </p>
                  </div>
                </div>
                <dl className="holdingMetrics">
                  <div>
                    <dt>Market value</dt>
                    <dd>
                      {money(
                        field(valuation, holding, "MarketValueTotalInValuation"),
                        currency,
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Portfolio</dt>
                    <dd>
                      {Number(
                        field(valuation, holding, "PercentageTotalPortfolio"),
                      ).toFixed(2)}
                      %
                    </dd>
                  </div>
                  <div>
                    <dt>Gain / loss</dt>
                    <dd className="positive">
                      +
                      {money(
                        field(valuation, holding, "UnrealisedGainLossInValuation"),
                        currency,
                      )}
                    </dd>
                  </div>
                </dl>
                <button className="rowButton" type="button">
                  View holding <span>→</span>
                </button>
              </div>
              <p className="dataNotice">
                The source valuation response was truncated, so this preview shows
                only the one complete holding supplied.
              </p>
            </section>

            <section className="activityGrid" id="activity">
              <article className="panel">
                <div className="panelHeading">
                  <div>
                    <p className="eyebrow darkEyebrow">Cash account</p>
                    <h2>Recent transactions</h2>
                  </div>
                </div>
                <div className="activityList">
                  {transactions.Rows.slice(0, 4).map((row) => (
                    <div className="activityRow" key={`${row[0]}-${row[2]}`}>
                      <div className="activityDate">
                        <span>{shortDate(field(transactions, row, "TransactionDate"))}</span>
                      </div>
                      <div>
                        <strong>
                          {field(transactions, row, "CashTransactionTypeName")}
                        </strong>
                        <p>{field(transactions, row, "CashAccountName")}</p>
                      </div>
                      <b
                        className={
                          Number(field(transactions, row, "CreditAmount")) >= 0
                            ? "positive"
                            : "negative"
                        }
                      >
                        {money(field(transactions, row, "CreditAmount"), currency)}
                      </b>
                    </div>
                  ))}
                </div>
              </article>

              <article className="panel">
                <div className="panelHeading">
                  <div>
                    <p className="eyebrow darkEyebrow">Dealing</p>
                    <h2>Recent trades</h2>
                  </div>
                </div>
                <div className="activityList">
                  {trades.Rows.slice(0, 4).map((row) => (
                    <div className="activityRow" key={`${row[0]}-${row[7]}`}>
                      <span
                        className={`tradeBadge ${field(trades, row, "SecurityTradeTypeName").toLowerCase()}`}
                      >
                        {field(trades, row, "SecurityTradeTypeName")}
                      </span>
                      <div>
                        <strong>{field(trades, row, "SecurityShortName")}</strong>
                        <p>{shortDate(field(trades, row, "TradeDate"))}</p>
                      </div>
                      <b>{money(field(trades, row, "TradeValue"), currency)}</b>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </>
        ) : (
          <section className="panel emptyPortfolio" id="overview">
            <span className="emptyNumber">02</span>
            <p className="eyebrow darkEyebrow">Summary data available</p>
            <h2>{field(client, portfolio, "PortfolioName")}</h2>
            <p>
              We have the portfolio’s summary value, risk profile and performance,
              but the detailed valuation, exposure and activity samples supplied
              belong to Balanced GBP.
            </p>
            <Link className="emptyBack" href="/">
              Return to all portfolios
            </Link>
          </section>
        )}

        <p className="disclaimer">
          Test environment · Values are based on supplied demonstration data and
          are not a live valuation. Past performance is not a reliable indicator
          of future results.
        </p>
      </div>
    </main>
  );
}

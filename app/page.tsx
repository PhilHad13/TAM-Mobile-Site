import fixture from "../test-data.json";
import Link from "next/link";

type Column = { I: number; T: string };
type DataSet = {
  ColumnInfo: Record<string, Column>;
  Rows: string[][];
};

const clientData = fixture.commands.ClientSummary.Data as DataSet;
const commentaryData = fixture.commands.Commentary.Data as DataSet;

function value(row: string[], name: string) {
  return row[clientData.ColumnInfo[name].I];
}

function money(amount: string, currency = "GBP") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}

function date(dateString: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${dateString}T12:00:00`));
}

export default function Home() {
  const first = clientData.Rows[0];
  const commentary = commentaryData.Rows[0];
  const commentaryValue = (name: string) =>
    commentary[commentaryData.ColumnInfo[name].I];
  const portfolios = clientData.Rows.map((row) => ({
    id: value(row, "PortfolioID"),
    name: value(row, "PortfolioName"),
    reference: value(row, "PortfolioReference"),
    value: value(row, "PortfolioValue"),
    currency: value(row, "PortfolioCurrencyISOCode"),
    risk: value(row, "RiskProfileDescription"),
    benchmark: value(row, "BenchmarkName"),
    inception: value(row, "InceptionDate"),
    performance: Number(value(row, "GeometricPerformance")),
    holdings: value(row, "HoldingValue"),
    cash: value(row, "CashValue"),
  }));

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#" aria-label="TAM Asset Management home">
          <img
            className="brandLogo"
            src="/tam-logo-white.png"
            alt="TAM Asset Management"
          />
        </a>
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

      <section className="hero">
        <div className="heroInner">
          <p className="eyebrow">Your investments</p>
          <div className="clientHeading">
            <div>
              <h1>{value(first, "ClientName")}</h1>
              <p className="reference">
                Client reference {value(first, "ClientReference")}
              </p>
            </div>
            <div className="asOf">
              <span>Valuation date</span>
              <strong>30 Jul 2026</strong>
            </div>
          </div>
          <div className="totalValue">
            <span>Total portfolio value</span>
            <strong>
              {money(
                value(first, "ClientValue"),
                value(first, "ClientCurrencyISOCode"),
              )}
            </strong>
            <small>Across {clientData.Rows.length} portfolios</small>
          </div>
        </div>
      </section>

      <div className="page">
        <section aria-labelledby="portfolio-heading">
          <div className="sectionHeading">
            <div>
              <p className="eyebrow darkEyebrow">Portfolio overview</p>
              <h2 id="portfolio-heading">Your portfolios</h2>
            </div>
            <span className="portfolioCount">{portfolios.length}</span>
          </div>

          <div className="portfolioGrid">
            {portfolios.map((portfolio, index) => (
              <article className="portfolioCard" key={portfolio.id}>
                <div className="cardAccent" />
                <div className="cardTop">
                  <div>
                    <span className="portfolioLabel">Portfolio {index + 1}</span>
                    <h3>{portfolio.name}</h3>
                    <p>{portfolio.reference}</p>
                  </div>
                  <span className="riskBadge">{portfolio.risk}</span>
                </div>

                <div className="portfolioValue">
                  <span>Current value</span>
                  <strong>{money(portfolio.value, portfolio.currency)}</strong>
                </div>

                <dl className="metrics">
                  <div>
                    <dt>Holdings</dt>
                    <dd>{money(portfolio.holdings, portfolio.currency)}</dd>
                  </div>
                  <div>
                    <dt>Cash</dt>
                    <dd>{money(portfolio.cash, portfolio.currency)}</dd>
                  </div>
                  <div>
                    <dt>Since inception</dt>
                    <dd className="positive">+{portfolio.performance.toFixed(2)}%</dd>
                  </div>
                </dl>

                <div className="cardDetails">
                  <div>
                    <span>Benchmark</span>
                    <strong>{portfolio.benchmark}</strong>
                  </div>
                  <div>
                    <span>Inception</span>
                    <strong>{date(portfolio.inception)}</strong>
                  </div>
                </div>

                <Link
                  className="viewButton"
                  href={`/portfolio/${portfolio.id}`}
                >
                  View portfolio
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="commentary" aria-labelledby="commentary-heading">
          <div className="commentaryIcon" aria-hidden="true">
            “
          </div>
          <div className="commentaryContent">
            <p className="eyebrow darkEyebrow">From your investment manager</p>
            <h2 id="commentary-heading">Recent commentary</h2>
            <time dateTime={commentaryValue("EffectiveDate")}>
              {date(commentaryValue("EffectiveDate"))}
            </time>
            <h3>{commentaryValue("Title")}</h3>
            <p>{commentaryValue("CommentaryText")}</p>
          </div>
        </section>

        <p className="disclaimer">
          Test environment · Values are based on supplied demonstration data and
          are not a live valuation.
        </p>
      </div>

      <nav className="mobileNav" aria-label="Primary">
        <a className="active" href="#">
          <span aria-hidden="true">⌂</span>
          Overview
        </a>
        <a href="#portfolio-heading">
          <span aria-hidden="true">◫</span>
          Portfolios
        </a>
        <a href="#commentary-heading">
          <span aria-hidden="true">◌</span>
          Updates
        </a>
      </nav>
    </main>
  );
}

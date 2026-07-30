window.TAM_TEST_DATA = {
  "fixtureVersion": 1,
  "description": "Anonymised TAM mobile valuation test data assembled from supplied developer samples.",
  "asOfDate": "2026-07-30",
  "notes": [
    "Commentary was added from the supplied 30 July 2026 market update.",
    "The supplied Valuation and Performance responses were truncated. Valuation contains the one complete holding and Performance contains a representative valid subset.",
    "Each command is wrapped in a Data property to match the response shape expected by LoadRender in codemobile4.js."
  ],
  "commands": {
    "ClientSummary": {
      "Data": {
        "ColumnCount": 28,
        "ColumnInfo": {
          "ClientID": { "T": "I", "I": 0 },
          "PortfolioID": { "T": "I", "I": 1 },
          "ClientName": { "T": "S", "I": 2 },
          "ClientValue": { "T": "M", "I": 3 },
          "ClientReference": { "T": "S", "I": 4 },
          "PortfolioName": { "T": "S", "I": 5 },
          "PortfolioValue": { "T": "M", "I": 6 },
          "PortfolioReference": { "T": "S", "I": 7 },
          "PortfolioTypeName": { "T": "S", "I": 8 },
          "PortfolioStatusName": { "T": "S", "I": 9 },
          "ClientCurrencyISOCode": { "T": "S", "I": 10 },
          "PortfolioCurrencyISOCode": { "T": "S", "I": 11 },
          "RiskProfileDescription": { "T": "S", "I": 12 },
          "BenchmarkName": { "T": "S", "I": 13 },
          "InceptionDate": { "T": "DT", "I": 14 },
          "SourceOrganisation": { "T": "S", "I": 15 },
          "GeometricPerformance": { "T": "F", "I": 16 },
          "HoldingValue": { "T": "M", "I": 17 },
          "PendingValue": { "T": "M", "I": 18 },
          "CashValue": { "T": "M", "I": 19 },
          "CapitalIntroduced": { "T": "M", "I": 20 },
          "CapitalWithdrawn": { "T": "M", "I": 21 },
          "FeesAndExpensesCharged": { "T": "M", "I": 22 },
          "RealisedProfitLoss": { "T": "M", "I": 23 },
          "MovementInUnrealisedGainLoss": { "T": "M", "I": 24 },
          "ClientUpper": { "T": "S", "I": 25 },
          "PortfolioUpper": { "T": "S", "I": 26 },
          "RowNo": { "T": "I", "I": 27 }
        },
        "Rows": [
          ["61", "76", "AM-4202GPD", "563931.8247", "AM-4202GPD", "Balanced GBP", "232025.0759", "AM-4202GPD006", "Active Balanced GBP", "Training", "GBP", "GBP", "Medium Risk", "Balanced Benchmark GBP", "2005-01-01", "TAM Asset Management", "138.631", "226096.9420", "0.0000", "5928.1339", "140630.9100", "-37130.9100", "-31610.0600", "93599.4200", "61673.8300", "£", "£", "1"],
          ["61", "77", "AM-4202GPD", "563931.8247", "AM-4202GPD", "Growth GBP", "331906.7488", "AM-4202GPD007", "Active Growth GBP", "Training", "GBP", "GBP", "Medium / High Risk", "Growth Benchmark GBP", "2005-01-01", "TAM Asset Management", "296.735", "330051.8088", "0.0000", "1854.9400", "123248.6900", "-48558.4600", "-32605.3700", "175567.8800", "107958.9400", "£", "£", "2"]
        ],
        "RowCount": 2
      }
    },
    "Commentary": {
      "Data": {
        "ColumnCount": 3,
        "ColumnInfo": {
          "EffectiveDate": { "T": "DT", "I": 0 },
          "Title": { "T": "S", "I": 1 },
          "CommentaryText": { "T": "S", "I": 2 }
        },
        "Rows": [
          [
            "2026-07-30",
            "Market Update: Volatility Creates Opportunity, Not Just Risk",
            "Markets have experienced increased volatility this week as investors digest a more cautious Federal Reserve, rising bond yields, escalating tensions in the Middle East and another busy round of corporate earnings. While technology shares have remained under pressure, performance across markets has been far more mixed, highlighting the benefits of diversification. Energy and commodity-related assets have strengthened as oil prices moved higher, whilst many companies continue to report resilient earnings despite an uncertain macroeconomic backdrop. For diversified multi-asset portfolios, these offsetting influences help reduce reliance on any single sector or market theme. At TAM, we continue to monitor developments closely and assess whether changing market conditions present opportunities to enhance long-term returns. Whilst periods of uncertainty can feel uncomfortable, they are also when disciplined investment processes and broad diversification tend to demonstrate their greatest value."
          ]
        ],
        "RowCount": 1
      }
    },
    "Valuation": {
      "Data": {
        "ColumnCount": 30,
        "ColumnInfo": {
          "GroupBy": { "T": "S", "I": 0 },
          "Grouped": { "T": "S", "I": 1 },
          "GroupDescription": { "T": "S", "I": 2 },
          "DisplayOrder": { "T": "I", "I": 3 },
          "GroupID": { "T": "I", "I": 4 },
          "PortfolioID": { "T": "I", "I": 5 },
          "ValuationDate": { "T": "DT", "I": 6 },
          "AssetType": { "T": "S", "I": 7 },
          "AssetID": { "T": "I", "I": 8 },
          "AssetName": { "T": "S", "I": 9 },
          "SecurityID": { "T": "I", "I": 10 },
          "LocalCurrencyISOCode": { "T": "S", "I": 11 },
          "TotalAmount": { "T": "M", "I": 12 },
          "PendingAmount": { "T": "M", "I": 13 },
          "AveragePrice": { "T": "M", "I": 14 },
          "CleanPrice": { "T": "M", "I": 15 },
          "DateOfPrice": { "T": "DT", "I": 16 },
          "SecurityTypeName": { "T": "S", "I": 17 },
          "AssetClassName": { "T": "S", "I": 18 },
          "BookCostTotalInValuation": { "T": "M", "I": 19 },
          "MarketValueTotalInLocal": { "T": "M", "I": 20 },
          "MarketValueTotalInValuation": { "T": "M", "I": 21 },
          "UnrealisedGainLossInValuation": { "T": "M", "I": 22 },
          "PercentageGainLoss": { "T": "M", "I": 23 },
          "PercentageTotalPortfolio": { "T": "M", "I": 24 },
          "ValuationID": { "T": "I", "I": 25 },
          "RiskCurrencyName": { "T": "S", "I": 26 },
          "RiskCountryName": { "T": "S", "I": 27 },
          "ISIN": { "T": "S", "I": 28 },
          "SEDOL": { "T": "S", "I": 29 }
        },
        "Rows": [
          ["Risk Sector", "Bond", "Risk Sector", "1000", "1", "76", "2026-07-30", "H", "241538", "Capital Group Global Corporate Bond Fund Zh Acc GBP", "3818", "GBP", "1060.4500", "0.0000", "8.2054", "9.5482", "2026-07-30", "UK Unit Trusts - GBP 2", "Unitised/Collectives", "8701.4600", "10125.3887", "10125.3887", "1423.9287", "16.3642", "4.3639", "193484", "Mixed", "Global", "LU2240840996", "BMH5TK4"]
        ],
        "RowCount": 1
      }
    },
    "RecentTransactions": {
      "Data": {
        "ColumnCount": 9,
        "ColumnInfo": {
          "TransactionDate": { "T": "DT", "I": 0 },
          "CashTransactionTypeName": { "T": "S", "I": 1 },
          "TransactionValue": { "T": "M", "I": 2 },
          "TransactionDescription": { "T": "S", "I": 3 },
          "CreditAmount": { "T": "M", "I": 4 },
          "DebitAmount": { "T": "M", "I": 5 },
          "CurrencyISOCode": { "T": "S", "I": 6 },
          "CashAccountName": { "T": "S", "I": 7 },
          "CalculatedValue": { "T": "M", "I": 8 }
        },
        "Rows": [
          ["2024-02-29", "Gross Dividend Received", "0.3000", "Dividend received from JP Morgan in the amount of GBP 0.0097 per share on a holding of 31.14 Global Healthcare C Dis GBP equalling GBP 0.30", "0.3000", "", "GBP", "GBP Income Account", "0.3000"],
          ["2024-02-15", "Gross Dividend Received", "267.3900", "Dividend received from SSGA SPDR in the amount of GBP 0.2682 per share on a holding of 997 BB Barclays Global Aggregate Bond ETF Dist GBP equalling GBP 267.39", "267.3900", "", "GBP", "GBP Income Account", "267.3900"],
          ["2024-02-15", "Gross Dividend Received", "80.4300", "Dividend received from SSGA SPDR in the amount of GBP 1.0870 per share on a holding of 74 Bloomberg Barclays US Treasury UCITS ETF GBP equalling GBP 80.43", "80.4300", "", "GBP", "GBP Income Account", "80.4300"],
          ["2023-08-16", "Gross Dividend Received", "237.6300", "Dividend received from SSGA SPDR in the amount of GBP 0.2384 per share on a holding of 997 BB Barclays Global Aggregate Bond ETF Dist GBP equalling GBP 237.63", "237.6300", "", "GBP", "GBP Income Account", "237.6300"],
          ["2023-08-16", "Gross Dividend Received", "68.1100", "Dividend received from SSGA SPDR in the amount of GBP 0.9204 per share on a holding of 74 Bloomberg Barclays US Treasury UCITS ETF GBP equalling GBP 68.11", "68.1100", "", "GBP", "GBP Income Account", "68.1100"],
          ["2023-02-15", "Gross Dividend Received", "187.2700", "Dividend received from SSGA SPDR in the amount of GBP 0.1878 per share on a holding of 997 BB Barclays Gbl Agg Bnd ETF Dist equalling GBP 187.27", "187.2700", "", "GBP", "GBP Income Account", "187.2700"],
          ["2022-12-30", "Gross Dividend Received", "119.4000", "Dividend received from iShares in the amount of GBP 0.0498 per share on a holding of 2,398 Core FTSE 100 ETF Inc GBP equalling GBP 119.40", "119.4000", "", "GBP", "GBP Income Account", "119.4000"],
          ["2022-09-28", "Gross Dividend Received", "211.4500", "Dividend received from iShares in the amount of GBP 0.0882 per share on a holding of 2,398 Core FTSE 100 ETF Inc GBP equalling GBP 211.45", "211.4500", "", "GBP", "GBP Income Account", "211.4500"],
          ["2022-09-28", "Gross Dividend Received", "-0.0400", "Dividend adjustment for S&P UK Dividend Aristocrats ETF Inc GBP equalling GBP -0.04", "-0.0400", "", "GBP", "GBP Income Account", "-0.0400"],
          ["2022-03-23", "Gross Dividend Received", "116.6800", "Dividend received from SSGA SPDR in the amount of GBP 0.1337 per share on a holding of 873 S&P UK Dividend Aristocrats ETF Inc GBP equalling GBP 116.68", "116.6800", "", "GBP", "GBP Income Account", "116.6800"]
        ],
        "RowCount": 10
      }
    },
    "RecentTrades": {
      "Data": {
        "ColumnCount": 16,
        "ColumnInfo": {
          "TradeDate": { "T": "DT", "I": 0 },
          "SecurityTradeTypeName": { "T": "S", "I": 1 },
          "TradeDescription": { "T": "S", "I": 2 },
          "Price": { "T": "F", "I": 3 },
          "TradedAmount": { "T": "M", "I": 4 },
          "TradeValue": { "T": "M", "I": 5 },
          "SecurityTradeStatusName": { "T": "S", "I": 6 },
          "SecurityShortName": { "T": "S", "I": 7 },
          "SEDOL": { "T": "S", "I": 8 },
          "ISIN": { "T": "S", "I": 9 },
          "PricingFactor": { "T": "I", "I": 10 },
          "CurrencyISOCode": { "T": "S", "I": 11 },
          "UpperMnemonic": { "T": "S", "I": 12 },
          "LowerMnemonic": { "T": "S", "I": 13 },
          "Signofmovement": { "T": "I", "I": 14 },
          "CalculatedAmount": { "T": "M", "I": 15 }
        },
        "Rows": [
          ["2023-03-16", "Sell", "Sell of 205 Xtrackers S&P 500 Equal Weight UCITS ETF 1C GBP in GBP at 6,103p", "6103", "205.0000", "12431.1500", "Reconciled", "Xtrackers S&P 500 Eq Wt ETF 1C GBP", "BNGMZY9", "IE00BLNMYC90", "100", "GBP", "£", "p", "-1", "-205.0000"],
          ["2023-03-16", "Buy", "Buy of 461 JP Morgan US Research Enhanced Index Equity UCITS ETF GBP Acc at 3,140.5p", "3140.5", "461.0000", "14557.7000", "Reconciled", "JPM US Enhd Eq Idx ETF Acc GBP", "BF2F6L0", "IE00BF4G7076", "100", "GBP", "£", "p", "1", "461.0000"],
          ["2023-03-13", "Buy", "Buy of 74 SSGA SPDR Bloomberg Barclays US Treasury ETF GBP at £81.10", "81.1", "74.0000", "6061.4100", "Reconciled", "SPDR Blm Brc US Trsy ETF Acc GBP", "B6WFJ96", "IE00B44CND37", "1", "GBP", "£", "p", "1", "74.0000"],
          ["2023-03-09", "Buy", "Buy of 3.3425 Amundi Volatility World I2 Acc GBP at £1,304.33", "1304.33", "3.3425", "4403.3200", "Reconciled", "Amundi Volatility World I2 Acc GBP", "BK77X59", "LU1897298391", "1", "GBP", "£", "p", "1", "3.3425"],
          ["2023-03-08", "Sell", "Sell of 461.51 GAM Star Credit Opportunities GBP Institutional Acc at £17.0084", "17.0084", "461.5100", "7771.0500", "Reconciled", "GAM Star Cr Opp GBP Inst Acc", "B510J17", "IE00B510J173", "1", "GBP", "£", "p", "-1", "-461.5100"],
          ["2023-02-06", "Buy", "Buy of 461.51 GAM Star Credit Opportunities GBP Institutional Acc at £17.4186", "17.4186", "461.5100", "8118.8200", "Reconciled", "GAM Star Cr Opp GBP Inst Acc", "B510J17", "IE00B510J173", "1", "GBP", "£", "p", "1", "461.5100"],
          ["2023-02-06", "Sell", "Sell of 44.42 Fulcrum Diversified Core Absolute Return Fund C GBP at 12,066p", "12066", "44.4200", "5354.3600", "Reconciled", "Fulcrum Div Abs Ret Fund C Acc GBP", "BRTNY84", "GB00BRTNY847", "100", "GBP", "£", "p", "-1", "-44.4200"],
          ["2023-02-06", "Buy", "Buy of 96.1886 Jupiter Gold & Silver U2 GBP Acc at £18.5719", "18.5719", "96.1886", "1804.2700", "Reconciled", "Jupiter Gold and Silver U2 Acc GBP", "BYVJRK2", "IE00BYVJRK24", "1", "GBP", "£", "p", "1", "96.1886"],
          ["2023-02-06", "Sell", "Sell of 164 iShares Physical Silver ETC GBP at 1,785.5p", "1785.5", "164.0000", "2898.9400", "Reconciled", "iShares Physical Silver ETC GBP", "B425ZM7", "IE00B4NCWG09", "100", "GBP", "£", "p", "-1", "-164.0000"],
          ["2023-01-20", "Sell", "Sell of 13.8456 JP Morgan Global Healthcare C Dis GBP at £126.51", "126.51", "13.8456", "1734.0900", "Reconciled", "JPM Global Healthcare C Dis GBP", "B8JDSY5", "LU0847330163", "1", "GBP", "£", "p", "-1", "-13.8456"]
        ],
        "RowCount": 10
      }
    },
    "Exposure": {
      "Data": {
        "ColumnCount": 2,
        "ColumnInfo": {
          "Name": { "T": "S", "I": 0 },
          "Value": { "T": "F", "I": 1 }
        },
        "Rows": [
          ["Absolute Return", "21263.9835"],
          ["Bond", "60790.9922"],
          ["Cash Accounts", "5928.13394"],
          ["Commodity", "13358.384"],
          ["Equity", "130683.5823"]
        ],
        "RowCount": 5
      }
    },
    "PortfolioBenchmark": {
      "Data": {
        "ColumnCount": 11,
        "ColumnInfo": {
          "DateOfValue": { "T": "DT", "I": 0 },
          "BenchmarkPerformance": { "T": "M", "I": 1 },
          "ClosingMarketValue": { "T": "M", "I": 2 },
          "ApproximatePerformance": { "T": "M", "I": 3 },
          "GeometricPerformance": { "T": "M", "I": 4 },
          "CapitalIntroduced": { "T": "M", "I": 5 },
          "CapitalWithdrawn": { "T": "M", "I": 6 },
          "FeesAndExpensesCharged": { "T": "M", "I": 7 },
          "IncomeReceived": { "T": "M", "I": 8 },
          "ThirdPartyFees": { "T": "M", "I": 9 },
          "BenchmarkValue": { "T": "F", "I": 10 }
        },
        "Rows": [
          ["2005-01-15", "0.3035", "98944.5300", "-1.0552", "-1.0555", "100000.0000", "0.0000", "0.0000", "0.0000", "0.0000", "1054.293"],
          ["2005-01-30", "0.2616", "99243.9800", "0.3025", "-0.7560", "0.0000", "0.0000", "0.0000", "0.0000", "0.0000", "1053.852"],
          ["2005-02-14", "2.6696", "101539.4500", "2.2952", "1.5394", "0.0000", "0.0000", "125.0000", "0.0000", "0.0000", "1079.163"],
          ["2005-03-31", "0.3351", "101069.4800", "-0.1709", "1.0695", "0.0000", "0.0000", "126.8100", "0.0000", "0.0000", "1054.625"],
          ["2005-06-29", "3.7992", "101937.6600", "0.6665", "1.9377", "0.0000", "0.0000", "0.0000", "0.0000", "0.0000", "1091.036"],
          ["2005-09-27", "6.9324", "105442.0000", "0.1577", "5.4420", "0.0000", "0.0000", "0.0000", "0.0000", "0.0000", "1123.969"],
          ["2005-12-26", "9.5587", "108747.7500", "0.8139", "8.7478", "0.0000", "0.0000", "0.0000", "0.0000", "0.0000", "1151.574"],
          ["2006-03-26", "13.8405", "116308.6800", "2.3119", "16.3087", "0.0000", "0.0000", "0.0000", "0.0000", "0.0000", "1196.581"]
        ],
        "RowCount": 8
      }
    }
  }
};

const tickers = [
  { symbol: "XAUUSD", price: "2,341.50", change: "+1.2%", bull: true },
  { symbol: "XAGUSD", price: "27.84", change: "-0.4%", bull: false },
  { symbol: "USOIL", price: "82.34", change: "+2.1%", bull: true },
  { symbol: "BTC/USD", price: "67,420", change: "+3.4%", bull: true },
  { symbol: "ETH/USD", price: "3,521", change: "+1.8%", bull: true },
  { symbol: "EUR/USD", price: "1.0842", change: "-0.2%", bull: false },
  { symbol: "GBP/USD", price: "1.2615", change: "+0.5%", bull: true },
  { symbol: "USD/JPY", price: "151.24", change: "-0.3%", bull: false },
  { symbol: "SOL/USD", price: "182.30", change: "+4.2%", bull: true },
  { symbol: "AUD/USD", price: "0.6534", change: "-0.1%", bull: false },
  { symbol: "USD/CAD", price: "1.3621", change: "+0.2%", bull: true },
  { symbol: "BNB/USD", price: "594.20", change: "+2.6%", bull: true },
];

function TickerTape() {
  const doubled = [...tickers, ...tickers];

  return (
    <div
      className="w-full overflow-hidden border-b"
      style={{
        background: "oklch(0.06 0.02 265)",
        borderColor: "oklch(0.82 0.22 155 / 0.2)",
        position: "relative",
        zIndex: 50,
      }}
    >
      <div className="ticker-animate flex items-center gap-0 py-2">
        {doubled.map((t, i) => (
          <span
            key={`${t.symbol}-${i}`}
            className="flex items-center gap-1.5 px-4 shrink-0"
          >
            <span
              className="font-mono text-xs font-semibold"
              style={{ color: "oklch(0.75 0.08 265)" }}
            >
              {t.symbol}
            </span>
            <span
              className="font-mono text-xs"
              style={{ color: "oklch(0.85 0.05 265)" }}
            >
              {t.price}
            </span>
            <span
              className="font-mono text-xs font-bold"
              style={{
                color: t.bull ? "oklch(0.82 0.22 155)" : "oklch(0.65 0.26 20)",
              }}
            >
              {t.change}
            </span>
            <span style={{ color: "oklch(0.4 0.02 265)", marginLeft: "8px" }}>
              ||
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default TickerTape;

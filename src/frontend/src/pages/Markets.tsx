import {
  BarChart2,
  Bitcoin,
  Droplets,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  high: number;
  low: number;
  volume: string;
  category: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

const initialMarkets: MarketData[] = [
  {
    symbol: "XAUUSD",
    name: "Gold / USD",
    price: 2341.5,
    change: 1.2,
    high: 2358.0,
    low: 2312.4,
    volume: "$128B",
    category: "Commodity",
    icon: BarChart2,
  },
  {
    symbol: "XAGUSD",
    name: "Silver / USD",
    price: 27.84,
    change: -0.4,
    high: 28.42,
    low: 27.56,
    volume: "$14B",
    category: "Commodity",
    icon: BarChart2,
  },
  {
    symbol: "USOIL",
    name: "US Crude Oil",
    price: 82.34,
    change: 2.1,
    high: 83.4,
    low: 80.2,
    volume: "$56B",
    category: "Commodity",
    icon: Droplets,
  },
  {
    symbol: "BTC/USD",
    name: "Bitcoin / USD",
    price: 67420,
    change: 3.4,
    high: 68200,
    low: 65100,
    volume: "$42B",
    category: "Crypto",
    icon: Bitcoin,
  },
  {
    symbol: "ETH/USD",
    name: "Ethereum / USD",
    price: 3521,
    change: 1.8,
    high: 3580,
    low: 3440,
    volume: "$18B",
    category: "Crypto",
    icon: Bitcoin,
  },
  {
    symbol: "EUR/USD",
    name: "Euro / USD",
    price: 1.0842,
    change: -0.2,
    high: 1.0884,
    low: 1.081,
    volume: "$94B",
    category: "Forex",
    icon: TrendingUp,
  },
  {
    symbol: "GBP/USD",
    name: "Pound / USD",
    price: 1.2615,
    change: 0.5,
    high: 1.266,
    low: 1.254,
    volume: "$32B",
    category: "Forex",
    icon: TrendingUp,
  },
  {
    symbol: "USD/JPY",
    name: "USD / Yen",
    price: 151.24,
    change: -0.3,
    high: 151.9,
    low: 150.6,
    volume: "$78B",
    category: "Forex",
    icon: TrendingDown,
  },
  {
    symbol: "SOL/USD",
    name: "Solana / USD",
    price: 182.3,
    change: 4.2,
    high: 188.0,
    low: 175.4,
    volume: "$6B",
    category: "Crypto",
    icon: Bitcoin,
  },
];

const categories = ["All", "Forex", "Commodity", "Crypto"];

function PriceCard({ m, index }: { m: MarketData; index: number }) {
  const [price, setPrice] = useState(m.price);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    const interval = setInterval(
      () => {
        const delta = (Math.random() - 0.5) * m.price * 0.001;
        setPrice((p) => {
          const newP = Math.max(0, p + delta);
          setFlash(delta > 0 ? "up" : "down");
          setTimeout(() => setFlash(null), 400);
          return newP;
        });
      },
      2000 + Math.random() * 3000,
    );
    return () => clearInterval(interval);
  }, [m.price]);

  const bull = m.change >= 0;
  const decimals = m.price < 10 ? 4 : m.price < 1000 ? 2 : 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl relative overflow-hidden"
      style={{
        background:
          flash === "up"
            ? "oklch(0.82 0.22 155 / 0.08)"
            : flash === "down"
              ? "oklch(0.65 0.26 20 / 0.08)"
              : "oklch(0.10 0.025 265)",
        border: `1px solid ${bull ? "oklch(0.82 0.22 155 / 0.25)" : "oklch(0.65 0.26 20 / 0.25)"}`,
        transition: "background 0.4s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div
            className="font-display font-bold text-lg"
            style={{ color: "oklch(0.9 0.02 265)" }}
          >
            {m.symbol}
          </div>
          <div
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.55 0.04 265)" }}
          >
            {m.name}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{
              background: "oklch(0.68 0.22 245 / 0.12)",
              color: "oklch(0.68 0.22 245)",
              border: "1px solid oklch(0.68 0.22 245 / 0.25)",
            }}
          >
            {m.category}
          </span>
        </div>
      </div>

      <div
        className="font-mono font-bold text-2xl mb-1 transition-colors duration-400"
        style={{
          color:
            flash === "up"
              ? "oklch(0.82 0.22 155)"
              : flash === "down"
                ? "oklch(0.65 0.26 20)"
                : "oklch(0.92 0.02 265)",
        }}
      >
        {price.toFixed(decimals)}
      </div>

      <div className="flex items-center gap-1 mb-4">
        {bull ? (
          <TrendingUp size={14} style={{ color: "oklch(0.82 0.22 155)" }} />
        ) : (
          <TrendingDown size={14} style={{ color: "oklch(0.65 0.26 20)" }} />
        )}
        <span
          className="text-sm font-semibold"
          style={{
            color: bull ? "oklch(0.82 0.22 155)" : "oklch(0.65 0.26 20)",
          }}
        >
          {bull ? "+" : ""}
          {m.change}%
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "High", value: m.high.toFixed(decimals) },
          { label: "Low", value: m.low.toFixed(decimals) },
          { label: "Vol", value: m.volume },
        ].map((d) => (
          <div key={d.label}>
            <div className="text-xs" style={{ color: "oklch(0.45 0.03 265)" }}>
              {d.label}
            </div>
            <div
              className="font-mono text-xs font-semibold mt-0.5"
              style={{ color: "oklch(0.7 0.04 265)" }}
            >
              {d.value}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Markets() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All"
      ? initialMarkets
      : initialMarkets.filter((m) => m.category === filter);

  return (
    <div className="relative pt-28 pb-20 px-4" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "oklch(0.68 0.22 245 / 0.1)",
              border: "1px solid oklch(0.68 0.22 245 / 0.3)",
              color: "oklch(0.68 0.22 245)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "oklch(0.68 0.22 245)" }}
            />
            LIVE MARKET DATA
          </div>
          <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
            <span style={{ color: "oklch(0.92 0.02 265)" }}>Market </span>
            <span className="gradient-text-bull">Overview</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(0.6 0.04 265)" }}
          >
            Real-time pricing across Forex, Commodities and Crypto markets.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              data-ocid={`markets.${cat.toLowerCase()}.tab`}
              onClick={() => setFilter(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background:
                  filter === cat
                    ? "oklch(0.82 0.22 155)"
                    : "oklch(0.12 0.02 265)",
                color:
                  filter === cat
                    ? "oklch(0.07 0.02 265)"
                    : "oklch(0.65 0.04 265)",
                border:
                  filter === cat ? "none" : "1px solid oklch(0.2 0.02 265)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Market grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m, i) => (
            <PriceCard key={m.symbol} m={m} index={i} />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs mt-12"
          style={{ color: "oklch(0.4 0.03 265)" }}
        >
          * Prices shown are indicative and for illustration purposes. Actual
          trading prices may vary. Past performance is not indicative of future
          results.
        </motion.p>
      </div>
    </div>
  );
}

export default Markets;

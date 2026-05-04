import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { stockApi } from '../services/stockApi';

const MOCK_WATCHLIST = [
    { ticker: 'AAPL', name: 'Apple Inc.', price: 189.43, change: +2.41, pctChange: +1.29 },
    { ticker: 'MSFT', name: 'Microsoft', price: 421.55, change: +3.21, pctChange: +0.77 },
    { ticker: 'NVDA', name: 'NVIDIA Corp.', price: 789.12, change: +12.45, pctChange: +1.60 },
    { ticker: 'TSLA', name: 'Tesla Inc.', price: 218.71, change: -5.32, pctChange: -2.37 },
    { ticker: 'AMZN', name: 'Amazon.com', price: 185.07, change: +1.88, pctChange: +1.03 },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 157.32, change: -0.96, pctChange: -0.61 },
    { ticker: 'META', name: 'Meta Platforms', price: 501.80, change: +7.61, pctChange: +1.54 },
    { ticker: 'JPM', name: 'JPMorgan Chase', price: 196.42, change: +0.53, pctChange: +0.27 },
];

const MOCK_OVERNIGHT = [
    { name: 'S&P 500', value: '5,234.18', change: '+0.62%', up: true },
    { name: 'NASDAQ', value: '16,410.29', change: '+0.85%', up: true },
    { name: 'DOW', value: '39,127.14', change: '-0.12%', up: false },
    { name: '10Y YIELD', value: '4.312%', change: '+0.03', up: true },
];

export default function StockWatchlist() {
    const [activeTab, setActiveTab] = useState('watchlist');

    return (
        <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 pb-32">
            {/* Header */}
            <section className="space-y-2 relative select-none">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                    <h1 className="text-3xl font-extrabold tracking-tight font-display text-on-surface">Market Insights</h1>
                </div>
                <p className="text-on-surface-variant font-semibold ml-4.5 text-sm uppercase tracking-wider opacity-85">Trading Strategy</p>
            </section>

            {/* Tabs */}
            <div className="bg-surface border border-outline-variant/60 p-1.5 rounded-[1.5rem] flex gap-1.5 select-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <button
                    onClick={() => setActiveTab('watchlist')}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm font-display transition-all hover:scale-102 active:scale-95 ${activeTab === 'watchlist' ? 'bg-primary text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.39)]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'}`}
                >
                    My Watchlist
                </button>
                <button
                    onClick={() => setActiveTab('market')}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm font-display transition-all hover:scale-102 active:scale-95 ${activeTab === 'market' ? 'bg-primary text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.39)]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'}`}
                >
                    Market Data
                </button>
            </div>

            {activeTab === 'watchlist' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Watchlist Grid */}
                    <section className="lg:col-span-2 space-y-5">
                        {MOCK_WATCHLIST.map((stock) => (
                            <Link
                                to={`/stock-detail/${stock.ticker}`}
                                key={stock.ticker}
                                className="group flex justify-between items-center p-6 bg-surface border border-outline-variant/60 rounded-[2rem] hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.08)] relative overflow-hidden"
                            >
                                <div className="flex items-center gap-4 z-10 relative">
                                    <div className="w-12 h-12 bg-surface-container-high rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                                        <span className="text-on-surface font-extrabold text-xl font-display group-hover:text-primary">{stock.ticker.substring(0, 2)}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-lg text-on-surface font-display group-hover:text-primary transition-colors">{stock.ticker}</h3>
                                        <span className="text-xs text-on-surface-variant font-bold opacity-80">{stock.name}</span>
                                    </div>
                                </div>
                                <div className="text-right z-10 relative">
                                    <div className="font-extrabold text-base tabular-nums font-display text-on-surface">${stock.price.toFixed(2)}</div>
                                    <div className={`text-xs font-extrabold tabular-nums mt-0.5 ${stock.change >= 0 ? 'text-primary' : 'text-error'}`}>
                                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.pctChange.toFixed(2)}%)
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </section>

                    {/* Portfolio Insights */}
                    <section className="bg-surface border border-outline-variant/60 rounded-[2rem] p-6 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-primary/20 transition-all duration-300 select-none">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
                            <h2 className="text-lg font-bold tracking-tight font-display text-on-surface">Portfolio Insights</h2>
                        </div>
                        <p className="text-on-surface-variant leading-relaxed text-sm font-medium">
                            Your watchlist is currently 82% correlated with the S&P 500 Index. Diversification into alternative asset classes might be recommended to reduce systematic risk exposure.
                        </p>
                    </section>
                </div>
            )}

            {activeTab === 'market' && (
                <div className="grid grid-cols-1 gap-8">
                    {/* Overnight Data */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 select-none">
                            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                            <h2 className="text-xl font-bold tracking-tight font-display text-on-surface">Overnight Data</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 select-none">
                            {MOCK_OVERNIGHT.map((idx) => (
                                <div key={idx.name} className="bg-surface border border-outline-variant/60 rounded-[2rem] p-6 hover:-translate-y-1 hover:border-primary/25 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                                    <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1 opacity-80">{idx.name}</div>
                                    <div className="text-2xl font-extrabold tabular-nums text-on-surface font-display">{idx.value}</div>
                                    <div className={`text-xs font-extrabold tabular-nums mt-0.5 ${idx.up ? 'text-primary' : 'text-error'}`}>
                                        {idx.change}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* News */}
                    <section className="bg-surface border border-outline-variant/60 rounded-[2rem] p-6 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-primary/20 transition-all duration-300 select-none">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
                            <h2 className="text-xl font-bold tracking-tight font-display text-on-surface">Market News</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="group cursor-pointer p-3 hover:bg-surface-variant/50 rounded-2xl transition-all duration-200 border border-transparent hover:border-outline-variant/50">
                                <h3 className="font-extrabold text-base leading-snug text-on-surface group-hover:text-primary transition-colors font-display">Tech sector faces potential headwind amid new regulation talks</h3>
                                <span className="text-xs text-on-surface-variant font-semibold mt-1.5 inline-block">Wall Street Journal • 2h ago</span>
                            </div>
                            <div className="group cursor-pointer p-3 hover:bg-surface-variant/50 rounded-2xl transition-all duration-200 border border-transparent hover:border-outline-variant/50">
                                <h3 className="font-extrabold text-base leading-snug text-on-surface group-hover:text-primary transition-colors font-display">Federal Reserve signals cautious approach to rate adjustments</h3>
                                <span className="text-xs text-on-surface-variant font-semibold mt-1.5 inline-block">Bloomberg • 5h ago</span>
                            </div>
                            <div className="group cursor-pointer p-3 hover:bg-surface-variant/50 rounded-2xl transition-all duration-200 border border-transparent hover:border-outline-variant/50">
                                <h3 className="font-extrabold text-base leading-snug text-on-surface group-hover:text-primary transition-colors font-display">Cryptocurrency markets rally as institutional adoption grows</h3>
                                <span className="text-xs text-on-surface-variant font-semibold mt-1.5 inline-block">Reuters • 8h ago</span>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
}

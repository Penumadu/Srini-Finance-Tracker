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
        <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pb-32">
            {/* Header */}
            <section className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="w-[2px] h-6 bg-primary"></div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Market Insights</h1>
                </div>
                <p className="text-on-surface-variant font-medium ml-5">Trading Strategy</p>
            </section>

            {/* Tabs */}
            <div className="bg-surface-container p-1 rounded-xl flex gap-1">
                <button
                    onClick={() => setActiveTab('watchlist')}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all active:scale-95 ${activeTab === 'watchlist' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-variant'}`}
                >
                    My Watchlist
                </button>
                <button
                    onClick={() => setActiveTab('market')}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all active:scale-95 ${activeTab === 'market' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-variant'}`}
                >
                    Market Data
                </button>
            </div>

            {activeTab === 'watchlist' && (
                <>
                    {/* Watchlist Grid */}
                    <section className="space-y-4">
                        {MOCK_WATCHLIST.map((stock) => (
                            <Link
                                to={`/stock-detail/${stock.ticker}`}
                                key={stock.ticker}
                                className="group flex justify-between items-center p-5 bg-surface-container rounded-2xl hover:bg-surface-container-high transition-colors border border-transparent hover:border-outline-variant/20 cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                                        <span className="text-black font-bold text-lg">{stock.ticker.substring(0, 2)}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-base">{stock.ticker}</h3>
                                        <span className="text-xs text-on-surface-variant font-medium">{stock.name}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold tabular-nums">${stock.price.toFixed(2)}</div>
                                    <div className={`text-xs font-bold tabular-nums mt-0.5 ${stock.change >= 0 ? 'text-primary' : 'text-error'}`}>
                                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.pctChange.toFixed(2)}%)
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </section>

                    {/* Portfolio Insights */}
                    <section className="bg-surface-container-low rounded-3xl p-6 sm:p-8 border border-outline-variant/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-[2px] h-6 bg-primary"></div>
                            <h2 className="text-xl font-bold tracking-tight">Portfolio Insights</h2>
                        </div>
                        <p className="text-on-surface-variant leading-relaxed text-sm">
                            Your watchlist is currently 82% correlated with the S&P 500 Index. Diversification into alternative asset classes might be recommended to reduce systematic risk exposure.
                        </p>
                    </section>
                </>
            )}

            {activeTab === 'market' && (
                <>
                    {/* Overnight Data */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-[2px] h-6 bg-primary"></div>
                            <h2 className="text-xl font-bold tracking-tight">Overnight Data</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {MOCK_OVERNIGHT.map((idx) => (
                                <div key={idx.name} className="bg-surface-container rounded-2xl p-5 space-y-2">
                                    <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{idx.name}</div>
                                    <div className="text-xl font-bold tabular-nums">{idx.value}</div>
                                    <div className={`text-xs font-bold tabular-nums ${idx.up ? 'text-primary' : 'text-error'}`}>
                                        {idx.change}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* News */}
                    <section className="bg-surface-container-low rounded-3xl p-6 sm:p-8 border border-outline-variant/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-[2px] h-6 bg-primary"></div>
                            <h2 className="text-xl font-bold tracking-tight">Market News</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="group cursor-pointer">
                                <h3 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors">Tech sector faces potential headwind amid new regulation talks</h3>
                                <span className="text-xs text-on-surface-variant font-medium">Wall Street Journal • 2h ago</span>
                            </div>
                            <div className="group cursor-pointer">
                                <h3 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors">Federal Reserve signals cautious approach to rate adjustments</h3>
                                <span className="text-xs text-on-surface-variant font-medium">Bloomberg • 5h ago</span>
                            </div>
                            <div className="group cursor-pointer">
                                <h3 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors">Cryptocurrency markets rally as institutional adoption grows</h3>
                                <span className="text-xs text-on-surface-variant font-medium">Reuters • 8h ago</span>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </main>
    );
}

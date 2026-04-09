import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function StockDetail() {
    const { symbol } = useParams();
    const displaySymbol = symbol || 'AAPL';
    
    return (
        <main className="pt-24 px-6 max-w-7xl mx-auto space-y-8 pb-32">
            {/* Asset Header Section */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-extrabold tracking-tight">Company Name</h1>
                            <span className="text-on-surface-variant font-medium tracking-widest text-sm uppercase">NASDAQ: {displaySymbol}</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-5xl font-extrabold tracking-tight tabular-nums">$189.43</div>
                    <div className="flex items-center justify-end gap-2 text-primary font-bold mt-1">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        <span>+2.41 (1.29%)</span>
                    </div>
                </div>
            </section>

            {/* Large Historical Line Chart (Simulated) */}
            <section className="w-full h-[400px] bg-surface-container-low rounded-3xl relative overflow-hidden group">
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex gap-4">
                        <button className="px-4 py-1 rounded-full bg-surface-container-highest text-xs font-bold text-on-surface">1D</button>
                        <button className="px-4 py-1 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface">1W</button>
                        <button className="px-4 py-1 rounded-full bg-primary text-on-primary text-xs font-bold">1M</button>
                        <button className="px-4 py-1 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface">3M</button>
                        <button className="px-4 py-1 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface">1Y</button>
                        <button className="px-4 py-1 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface">ALL</button>
                    </div>
                    {/* Chart Line Path Simulation */}
                    <div className="relative flex-grow flex items-end">
                        <svg className="w-full h-64 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
                            <defs>
                                <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#84adff" stopOpacity="0.2"></stop>
                                    <stop offset="100%" stopColor="#84adff" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <path d="M0,150 C100,140 200,180 300,160 C400,140 500,100 600,110 C700,120 800,40 900,60 L1000,20" fill="none" stroke="#84adff" strokeLinecap="round" strokeWidth="4"></path>
                            <path d="M0,150 C100,140 200,180 300,160 C400,140 500,100 600,110 C700,120 800,40 900,60 L1000,20 L1000,200 L0,200 Z" fill="url(#chartFill)"></path>
                        </svg>
                    </div>
                </div>
            </section>

            {/* Bento Grid Layout for Stats and Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Key Statistics */}
                <section className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-[2px] h-6 bg-primary"></div>
                        <h2 className="text-2xl font-bold tracking-tight">Key Statistics</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-outline-variant/10 rounded-2xl overflow-hidden">
                        <div className="bg-surface-container p-6 space-y-1">
                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Market Cap</div>
                            <div className="text-xl font-bold tabular-nums">2.89T</div>
                        </div>
                        <div className="bg-surface-container p-6 space-y-1">
                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">P/E Ratio</div>
                            <div className="text-xl font-bold tabular-nums">29.41</div>
                        </div>
                        <div className="bg-surface-container p-6 space-y-1">
                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Div Yield</div>
                            <div className="text-xl font-bold tabular-nums">0.51%</div>
                        </div>
                        <div className="bg-surface-container p-6 space-y-1">
                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Volume</div>
                            <div className="text-xl font-bold tabular-nums">52.4M</div>
                        </div>
                        <div className="bg-surface-container p-6 space-y-1">
                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">52W High</div>
                            <div className="text-xl font-bold tabular-nums">199.62</div>
                        </div>
                        <div className="bg-surface-container p-6 space-y-1">
                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">52W Low</div>
                            <div className="text-xl font-bold tabular-nums">143.90</div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-[2px] h-6 bg-primary"></div>
                            <h2 className="text-2xl font-bold tracking-tight">About Company</h2>
                        </div>
                        <div className="bg-surface-container-low p-8 rounded-3xl leading-relaxed text-on-surface/80">
                            Information about {displaySymbol} will be integrated from the external API later.
                        </div>
                    </div>
                </section>

                {/* Related News */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-[2px] h-6 bg-primary"></div>
                        <h2 className="text-2xl font-bold tracking-tight">Related News</h2>
                    </div>
                    <div className="space-y-6">
                        <div className="group flex gap-4 cursor-pointer">
                            <div className="flex flex-col justify-center gap-1">
                                <h3 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors">Analysts Revise Price Targets Ahead of Quarterly Earnings</h3>
                                <span className="text-xs text-on-surface-variant font-medium">Wall Street Journal • 8h ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Link to="/add-transaction" className="block text-center w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-extrabold rounded-xl shadow-lg active:scale-[0.98] transition-transform">
                        Trade {displaySymbol}
                    </Link>
                </section>
            </div>
        </main>
    );
}

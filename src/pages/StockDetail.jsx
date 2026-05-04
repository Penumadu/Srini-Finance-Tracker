import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function StockDetail() {
    const { symbol } = useParams();
    const displaySymbol = symbol || 'AAPL';
    
    return (
        <main className="pt-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 pb-32">
            {/* Asset Header Section */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative select-none">
                <div className="absolute top-0 w-full h-[200%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10 pointer-events-none opacity-80 blur-3xl"></div>
                
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-extrabold tracking-tight font-display text-on-surface">Company Name</h1>
                            <span className="text-on-surface-variant font-bold tracking-widest text-xs uppercase opacity-80 mt-1 select-none">NASDAQ: {displaySymbol}</span>
                        </div>
                    </div>
                </div>
                <div className="text-right select-none">
                    <div className="text-5xl font-extrabold tracking-tight tabular-nums font-display text-on-surface select-none">$189.43</div>
                    <div className="flex items-center justify-end gap-2 text-primary font-extrabold mt-1 text-sm font-display select-none">
                        <span className="material-symbols-outlined text-base">trending_up</span>
                        <span>+2.41 (1.29%)</span>
                    </div>
                </div>
            </section>

            {/* Large Historical Line Chart (Simulated) */}
            <section className="w-full h-[400px] bg-surface border border-outline-variant/60 rounded-[2rem] relative overflow-hidden group hover:border-primary/25 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)] select-none">
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
                    <div className="flex gap-1.5 bg-surface-container-low p-1.5 rounded-full border border-outline-variant/50 self-start">
                        <button className="px-4 py-1.5 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-all">1D</button>
                        <button className="px-4 py-1.5 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-all">1W</button>
                        <button className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-md transition-all">1M</button>
                        <button className="px-4 py-1.5 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-all">3M</button>
                        <button className="px-4 py-1.5 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-all">1Y</button>
                        <button className="px-4 py-1.5 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-all">ALL</button>
                    </div>
                    {/* Chart Line Path Simulation */}
                    <div className="relative flex-grow flex items-end z-10">
                        <svg className="w-full h-64 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
                            <defs>
                                <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25"></stop>
                                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <path d="M0,150 C100,140 200,180 300,160 C400,140 500,100 600,110 C700,120 800,40 900,60 L1000,20" fill="none" stroke="#2563eb" strokeLinecap="round" strokeWidth="4" className="filter drop-shadow-[0_4px_12px_rgba(37,99,235,0.3)]"></path>
                            <path d="M0,150 C100,140 200,180 300,160 C400,140 500,100 600,110 C700,120 800,40 900,60 L1000,20 L1000,200 L0,200 Z" fill="url(#chartFill)"></path>
                        </svg>
                    </div>
                </div>
            </section>

            {/* Bento Grid Layout for Stats and Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Key Statistics */}
                <section className="lg:col-span-2 space-y-8 select-none">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                        <h2 className="text-2xl font-bold tracking-tight font-display text-on-surface">Key Statistics</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        <div className="bg-surface border border-outline-variant/60 p-6 rounded-[2rem] hover:-translate-y-1 hover:border-primary/25 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-80">Market Cap</div>
                            <div className="text-2xl font-extrabold tabular-nums text-on-surface font-display mt-1">2.89T</div>
                        </div>
                        <div className="bg-surface border border-outline-variant/60 p-6 rounded-[2rem] hover:-translate-y-1 hover:border-primary/25 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-80">P/E Ratio</div>
                            <div className="text-2xl font-extrabold tabular-nums text-on-surface font-display mt-1">29.41</div>
                        </div>
                        <div className="bg-surface border border-outline-variant/60 p-6 rounded-[2rem] hover:-translate-y-1 hover:border-primary/25 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-80">Div Yield</div>
                            <div className="text-2xl font-extrabold tabular-nums text-on-surface font-display mt-1">0.51%</div>
                        </div>
                        <div className="bg-surface border border-outline-variant/60 p-6 rounded-[2rem] hover:-translate-y-1 hover:border-primary/25 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-80">Volume</div>
                            <div className="text-2xl font-extrabold tabular-nums text-on-surface font-display mt-1">52.4M</div>
                        </div>
                        <div className="bg-surface border border-outline-variant/60 p-6 rounded-[2rem] hover:-translate-y-1 hover:border-primary/25 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-80">52W High</div>
                            <div className="text-2xl font-extrabold tabular-nums text-on-surface font-display mt-1">199.62</div>
                        </div>
                        <div className="bg-surface border border-outline-variant/60 p-6 rounded-[2rem] hover:-translate-y-1 hover:border-primary/25 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-80">52W Low</div>
                            <div className="text-2xl font-extrabold tabular-nums text-on-surface font-display mt-1">143.90</div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="space-y-4 select-none">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
                            <h2 className="text-xl font-bold tracking-tight font-display text-on-surface">About Company</h2>
                        </div>
                        <div className="bg-surface border border-outline-variant/60 rounded-[2rem] p-6 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-medium text-sm leading-relaxed text-on-surface-variant select-none hover:border-primary/20 transition-all duration-300">
                            Information about {displaySymbol} will be integrated from the external API later.
                        </div>
                    </div>
                </section>

                {/* Related News & Action Button */}
                <section className="space-y-8 select-none">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
                            <h2 className="text-xl font-bold tracking-tight font-display text-on-surface">Related News</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="group flex gap-4 cursor-pointer p-3 hover:bg-surface-variant/50 rounded-2xl transition-all duration-200 border border-transparent hover:border-outline-variant/50">
                                <div className="flex flex-col justify-center gap-1 select-none">
                                    <h3 className="font-extrabold text-base leading-snug text-on-surface group-hover:text-primary transition-colors font-display">Analysts Revise Price Targets Ahead of Quarterly Earnings</h3>
                                    <span className="text-xs text-on-surface-variant font-semibold mt-0.5 opacity-80 select-none">Wall Street Journal • 8h ago</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Link to="/add-transaction" className="flex flex-col items-center justify-center py-5 bg-primary text-white font-bold font-display text-base rounded-[1.5rem] shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:bg-blue-700 active:scale-95 transition-all duration-300 uppercase select-none text-center tracking-wide">
                        Trade {displaySymbol}
                    </Link>
                </section>
            </div>
        </main>
    );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../services/db';

export default function PortfolioOverview({ user }) {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const ports = await db.portfolios.getAll(user.uid);
                setPortfolios(ports);
            } catch (e) {
                console.error(e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [user]);

    const totalBalance = portfolios.reduce((sum, p) => sum + (p.balance || 0), 0);

    if (loading) {
        return (
            <main className="pt-24 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center h-64 gap-4">
                <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <p className="text-on-surface-variant text-sm">Loading portfolios...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="pt-24 px-6 max-w-2xl mx-auto pb-32">
                <div className="bg-surface-container-low rounded-3xl p-10 border border-outline-variant/10 text-center space-y-6">
                    <div className="w-16 h-16 bg-error/10 text-error rounded-2xl flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-4xl">cloud_off</span>
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-on-surface">Connection Error</h2>
                    <p className="text-on-surface-variant">{error}</p>
                    <button onClick={() => window.location.reload()} className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-black rounded-xl hover:brightness-110 active:scale-95 transition-all">
                        RETRY
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 pb-32">
            {/* Global Net Worth Header */}
            <section className="flex flex-col items-center justify-center py-16 space-y-5 relative">
                <div className="absolute top-0 w-full h-[150%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10 pointer-events-none rounded-[50%] opacity-80 blur-3xl"></div>

                <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 px-4 py-2 rounded-full border border-primary/20 backdrop-blur-md">
                    Global Net Worth
                </span>

                <div className="flex items-baseline gap-2 tabular-nums font-display select-none">
                    <span className="text-4xl text-on-surface-variant font-medium select-none">$</span>
                    <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight text-on-surface">
                        {Math.abs(totalBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h1>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-10">
                    {/* Wealth Progression Chart */}
                    <section className="bg-surface border border-outline-variant/60 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group hover:border-primary/20 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold tracking-tight font-display text-on-surface">Wealth Progression</h2>
                            <div className="flex gap-1.5 bg-surface-container-low p-1.5 rounded-full border border-outline-variant/50">
                                <button className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-md hover:scale-105 transition-all">1M</button>
                                <button className="px-4 py-1.5 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-variant hover:scale-105 transition-all">3M</button>
                                <button className="px-4 py-1.5 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-variant hover:scale-105 transition-all">1Y</button>
                                <button className="px-4 py-1.5 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-variant hover:scale-105 transition-all">ALL</button>
                            </div>
                        </div>
                        <div className="w-full h-52 flex items-end relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none rounded-2xl"></div>
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
                                <defs>
                                    <linearGradient id="overviewChartFill" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3"></stop>
                                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                <path d="M0,180 C80,170 160,160 240,140 C320,120 400,100 480,90 C560,80 640,70 720,55 C800,40 880,30 960,25 L1000,20" fill="none" stroke="#4f46e5" strokeLinecap="round" strokeWidth="3.5" className="filter drop-shadow-[0_4px_12px_rgba(79,70,229,0.5)]"></path>
                                <path d="M0,180 C80,170 160,160 240,140 C320,120 400,100 480,90 C560,80 640,70 720,55 C800,40 880,30 960,25 L1000,20 L1000,200 L0,200 Z" fill="url(#overviewChartFill)"></path>
                            </svg>
                        </div>
                    </section>

                    {/* Active Portfolios */}
                    <section className="space-y-6">
                        <div className="flex justify-between items-end">
                            <div className="flex items-center gap-3 select-none">
                                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                                <h2 className="text-2xl font-bold tracking-tight font-display text-on-surface">Active Portfolios</h2>
                            </div>
                            <Link to="/create-portfolio" className="flex items-center gap-1.5 text-primary text-sm font-bold hover:text-primary-container transition-all group bg-primary/5 px-4 py-2 rounded-full border border-primary/20 hover:bg-primary/10">
                                <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">add</span>
                                New
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            {portfolios.map((port, i) => (
                                <Link to={`/portfolio/${port.id}`} key={port.id} className="group block bg-surface border border-outline-variant/60 rounded-[2rem] p-6 sm:p-8 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 relative overflow-hidden cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.08)]">
                                    <div className="flex justify-between items-start mb-8 z-10 relative">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                                                <span className="material-symbols-outlined text-primary text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg tracking-tight font-display text-on-surface group-hover:text-primary transition-colors">{port.name}</h3>
                                                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">{port.currency || 'USD'}</span>
                                            </div>
                                        </div>
                                        <Link to={`/edit-portfolio/${port.id}`} onClick={(e) => e.stopPropagation()} className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors rounded-full">
                                            <span className="material-symbols-outlined text-xl">edit</span>
                                        </Link>
                                    </div>
                                    <div className="flex justify-between items-end z-10 relative">
                                        <div>
                                            <div className="text-xs font-medium text-on-surface-variant mb-1 uppercase tracking-wider">Total Value</div>
                                            <div className="text-3xl font-extrabold tracking-tight tabular-nums font-display text-on-surface">
                                                ${(port.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </div>
                                        </div>
                                        <div className="flex items-center text-primary text-sm font-bold group-hover:translate-x-1 transition-transform duration-300">
                                            Manage <span className="material-symbols-outlined text-lg ml-1">arrow_forward</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    {/* Quick Market Intel */}
                    <section className="bg-surface border border-outline-variant/60 rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-primary/20 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-5 select-none">
                            <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
                            <h2 className="text-lg font-bold tracking-tight font-display text-on-surface">Market Intel</h2>
                        </div>
                        <p className="text-on-surface-variant leading-relaxed text-sm font-medium">
                            Yield curve inversion moderates. Sovereign debt remains the cornerstone of your current liquidity strategy. Diversification across multi-currency portfolios is recommended.
                        </p>
                    </section>

                    {/* Stock Overview Banner */}
                    <section className="bg-primary/5 border border-primary/20 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group shadow-[0_8px_30px_rgb(37,99,235,0.06)] hover:border-primary/30 transition-all duration-300 select-none">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
                        <h3 className="text-base font-bold font-display text-on-surface mb-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-xl text-primary" style={{fontVariationSettings: "'FILL' 1"}}>trending_up</span>
                            Market Watch
                        </h3>
                        <p className="text-sm font-medium text-on-surface-variant leading-relaxed mb-6">
                            Monitor live stocks, review indices performance, and track assets effortlessly in the watchlist.
                        </p>
                        <Link to="/watchlist" className="inline-flex items-center gap-2 py-3 px-5 bg-primary text-white font-bold text-sm rounded-xl shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:bg-blue-700 active:scale-95 transition-all duration-300">
                            Explore Watchlist <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </section>
                </div>
            </div>
        </main>
    );
}

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
        <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 pb-32">
            {/* Global Net Worth Header */}
            <section className="flex flex-col items-center justify-center py-12 space-y-4 relative">
                <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10 pointer-events-none rounded-[50%] opacity-50 blur-3xl"></div>

                <span className="text-xs font-extrabold tracking-[0.3em] text-primary uppercase bg-primary/10 px-5 py-2 rounded-full border border-primary/20">
                    Global Net Worth
                </span>

                <div className="flex items-baseline gap-2 tabular-nums">
                    <span className="text-4xl text-on-surface-variant font-light">$</span>
                    <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-on-surface">
                        {Math.abs(totalBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h1>
                </div>
            </section>

            {/* Wealth Progression Chart */}
            <section className="bg-surface-container-low rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold tracking-tight">Wealth Progression</h2>
                    <div className="flex gap-2">
                        <button className="px-4 py-1.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-[0_0_16px_rgba(132,173,255,0.4)]">1M</button>
                        <button className="px-4 py-1.5 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors">3M</button>
                        <button className="px-4 py-1.5 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors">1Y</button>
                        <button className="px-4 py-1.5 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors">ALL</button>
                    </div>
                </div>
                <div className="w-full h-48 flex items-end">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
                        <defs>
                            <linearGradient id="overviewChartFill" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#84adff" stopOpacity="0.25"></stop>
                                <stop offset="100%" stopColor="#84adff" stopOpacity="0"></stop>
                            </linearGradient>
                        </defs>
                        <path d="M0,180 C80,170 160,160 240,140 C320,120 400,100 480,90 C560,80 640,70 720,55 C800,40 880,30 960,25 L1000,20" fill="none" stroke="#84adff" strokeLinecap="round" strokeWidth="3"></path>
                        <path d="M0,180 C80,170 160,160 240,140 C320,120 400,100 480,90 C560,80 640,70 720,55 C800,40 880,30 960,25 L1000,20 L1000,200 L0,200 Z" fill="url(#overviewChartFill)"></path>
                    </svg>
                </div>
            </section>

            {/* Active Portfolios */}
            <section className="space-y-6">
                <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3">
                        <div className="w-[2px] h-6 bg-primary"></div>
                        <h2 className="text-2xl font-bold tracking-tight">Active Portfolios</h2>
                    </div>
                    <Link to="/create-portfolio" className="flex items-center gap-1 text-primary text-sm font-bold hover:text-primary-container transition-colors">
                        <span className="material-symbols-outlined text-lg">add</span>
                        New
                    </Link>
                </div>

                <div className="space-y-4">
                    {portfolios.map((port, i) => (
                        <Link to={`/portfolio/${port.id}`} key={port.id} className="group block bg-surface-container rounded-3xl p-6 sm:p-8 hover:bg-surface-container-high transition-colors border border-transparent hover:border-outline-variant/20 relative overflow-hidden cursor-pointer">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-surface-container-highest rounded-2xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-lg tracking-tight">{port.name}</h3>
                                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{port.currency || 'USD'}</span>
                                    </div>
                                </div>
                                <Link to={`/edit-portfolio/${port.id}`} onClick={(e) => e.stopPropagation()} className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-xl hover:bg-surface-variant">
                                    <span className="material-symbols-outlined text-xl">edit</span>
                                </Link>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-sm font-medium text-on-surface-variant mb-1">Total Value</div>
                                    <div className="text-3xl font-black tracking-tight tabular-nums">
                                        ${(port.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Market Intel */}
            <section className="bg-surface-container-low rounded-3xl p-6 sm:p-8 border border-outline-variant/10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-[2px] h-6 bg-primary"></div>
                    <h2 className="text-xl font-bold tracking-tight">Market Intel</h2>
                </div>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                    Yield curve inversion moderates. Sovereign debt remains the cornerstone of your current liquidity strategy. Diversification across multi-currency portfolios is recommended.
                </p>
            </section>
        </main>
    );
}

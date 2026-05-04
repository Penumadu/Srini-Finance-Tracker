import React, { useEffect, useState } from 'react';
import db from '../services/db';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db as firestore } from '../firebase';

export default function PortfolioDetail({ user }) {
    const { id: portfolioId } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            if (!user || !portfolioId) return;
            setLoading(true);
            setError(null);
            try {
                // Fetch the specific portfolio by ID
                const portSnap = await getDoc(doc(firestore, "portfolios", portfolioId));
                if (portSnap.exists()) {
                    const portData = { id: portSnap.id, ...portSnap.data() };
                    setPortfolio(portData);

                    const txns = await db.transactions.getAll(portData.id);
                    txns.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setTransactions(txns);
                }
            } catch (e) {
                console.error("Failed to load portfolio:", e);
                setError(e.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [user, portfolioId]);

    if (loading) {
        return (
            <main className="pt-24 px-6 max-w-7xl mx-auto flex flex-col justify-center items-center h-64 gap-4">
                <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <p className="text-on-surface-variant text-sm">Connecting to database...</p>
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
                    <h2 className="text-2xl font-extrabold tracking-tight text-on-surface">Firestore Not Ready</h2>
                    <p className="text-on-surface-variant leading-relaxed">
                        Your Firebase Firestore database hasn't been created yet. Follow these steps:
                    </p>
                    <ol className="text-left text-on-surface-variant space-y-3 text-sm">
                        <li className="flex gap-3 items-start">
                            <span className="bg-primary text-on-primary w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">1</span>
                            <span>Go to <a href="https://console.firebase.google.com/project/finance-tracker-ef802/firestore" target="_blank" rel="noopener noreferrer" className="text-primary underline font-bold">Firebase Console → Firestore</a></span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="bg-primary text-on-primary w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">2</span>
                            <span>Click <strong className="text-on-surface">"Create database"</strong></span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="bg-primary text-on-primary w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">3</span>
                            <span>Select <strong className="text-on-surface">"Start in test mode"</strong> and pick any region</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="bg-primary text-on-primary w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">4</span>
                            <span>Come back here and click the button below</span>
                        </li>
                    </ol>
                    <button onClick={() => window.location.reload()} className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-black rounded-xl hover:brightness-110 active:scale-95 transition-all mt-4">
                        RETRY CONNECTION
                    </button>
                    <p className="text-xs text-outline mt-2">Error: {error}</p>
                </div>
            </main>
        );
    }

    if (!portfolio) {
        return (
            <main className="pt-24 px-6 max-w-7xl mx-auto flex justify-center items-center h-64 text-on-surface-variant">
                No portfolio data found.
            </main>
        );
    }

    // Determine recent holdings uniquely by grouping transactions.
    const holdings = transactions.reduce((acc, curr) => {
        if (!acc[curr.ticker]) acc[curr.ticker] = { ticker: curr.ticker, shares: 0 };
        acc[curr.ticker].shares += curr.type === 'buy' ? Number(curr.shares) : -Number(curr.shares);
        return acc;
    }, {});
    const activeHoldings = Object.values(holdings).filter(h => h.shares > 0);

    return (
        <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 pb-32">
            <section className="flex flex-col items-center justify-center py-14 space-y-4 relative select-none">
                <div className="absolute top-0 w-full h-[150%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10 pointer-events-none rounded-[50%] opacity-80 blur-3xl"></div>
                
                <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 px-4 py-2 rounded-full border border-primary/20 backdrop-blur-md">
                    {portfolio.name}
                </span>

                <div className="flex items-baseline gap-2 tabular-nums font-display select-none">
                    <span className="text-4xl text-on-surface-variant font-medium select-none">$</span>
                    <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight text-on-surface">
                        {portfolio.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h1>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-10">
                    {/* Performance History */}
                    <section className="bg-surface border border-outline-variant/60 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group hover:border-primary/20 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h2 className="text-xl font-bold tracking-tight font-display text-on-surface">Performance History</h2>
                            <div className="flex gap-1.5 bg-surface-container-low p-1.5 rounded-full border border-outline-variant/50">
                                <button className="px-4 py-1.5 rounded-full text-xs font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-all">1D</button>
                                <button className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-md transition-all">1W</button>
                            </div>
                        </div>

                        <div className="w-full h-64 relative z-10 flex items-end">
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
                                <defs>
                                    <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25"></stop>
                                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                <path d="M0,150 C100,160 200,140 300,100 C400,60 500,80 600,70 C700,60 800,90 900,40 L1000,20" fill="none" stroke="#2563eb" strokeLinecap="round" strokeWidth="4" className="filter drop-shadow-[0_4px_12px_rgba(37,99,235,0.3)]"></path>
                                <path d="M0,150 C100,160 200,140 300,100 C400,60 500,80 600,70 C700,60 800,90 900,40 L1000,20 L1000,200 L0,200 Z" fill="url(#chartFill)"></path>
                            </svg>
                        </div>
                    </section>

                    {/* Active Holdings */}
                    <section className="space-y-6">
                         <div className="flex items-center gap-3 select-none">
                            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                            <h2 className="text-2xl font-bold tracking-tight font-display text-on-surface">Active Holdings</h2>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                             {activeHoldings.length === 0 ? (
                                 <div className="col-span-2 text-on-surface-variant p-8 text-center bg-surface-container-low rounded-[2rem] border border-outline-variant/60 font-medium shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                                     No active holdings. Add a transaction to see it here.
                                 </div>
                             ) : activeHoldings.map((h, i) => (
                                 <Link to={`/stock-detail/${h.ticker}`} key={i} className="group flex flex-col justify-between p-6 bg-surface border border-outline-variant/60 rounded-[2rem] hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 cursor-pointer relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.08)]">
                                    <div className="flex justify-between items-start mb-8 z-10 relative">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-12 h-12 bg-surface-container-high rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                                                <div className="text-on-surface font-extrabold text-xl font-display group-hover:text-primary">{h.ticker.substring(0, 1)}</div>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg font-display text-on-surface group-hover:text-primary transition-colors">{h.ticker}</h3>
                                                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">{h.shares} Shares</span>
                                            </div>
                                        </div>
                                        <div className="p-1 text-primary group-hover:translate-x-1 transition-transform duration-300">
                                            <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                        </div>
                                    </div>
                                 </Link>
                             ))}
                         </div>
                    </section>
                </div>

                <div className="space-y-8">
                     <Link to={`/add-transaction/${portfolioId}`} className="flex flex-col items-center justify-center py-5 bg-primary text-white font-bold text-base rounded-[1.5rem] shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:bg-blue-700 active:scale-95 transition-all duration-300 text-center select-none font-display tracking-wide uppercase">
                        <span className="material-symbols-outlined mb-1 text-2xl">add</span>
                        New Transaction
                    </Link>

                    {/* Ledger section */}
                    <section className="bg-surface border border-outline-variant/60 rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-primary/20 transition-all duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold tracking-tight font-display text-on-surface">Recent Ledger</h2>
                        </div>
                        <div className="space-y-4">
                            {transactions.length === 0 ? (
                                <div className="text-on-surface-variant text-sm text-center py-4 font-medium">No recent transactions.</div>
                            ) : transactions.slice(0, 5).map(txn => (
                                <div key={txn.id} className="flex justify-between items-center group cursor-pointer hover:bg-surface-variant/50 p-3 rounded-2xl transition-all duration-200 border border-transparent hover:border-outline-variant/50">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-11 h-11 ${txn.type === 'buy' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface-container-high text-on-surface border border-outline-variant/60'} rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105`}>
                                            <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>{txn.type === 'buy' ? 'call_made' : 'call_received'}</span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm tracking-wide text-on-surface font-display group-hover:text-primary transition-colors">{txn.ticker}</div>
                                            <div className="text-xs text-on-surface-variant font-medium mt-0.5 capitalize">{txn.type} • {new Date(txn.date).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-base tabular-nums tracking-wide text-on-surface font-display">${Number(txn.price).toFixed(2)}</div>
                                        <div className={`text-xs ${txn.type === 'buy' ? 'text-primary' : 'text-on-surface-variant'} font-bold tabular-nums mt-0.5`}>
                                            {txn.type === 'buy' ? '+' : '-'}{txn.shares}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

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
        <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pb-32">
            <section className="flex flex-col items-center justify-center py-10 space-y-3 relative">
                <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10 pointer-events-none rounded-[50%] opacity-50 blur-3xl"></div>
                
                <span className="text-sm font-bold tracking-widest text-primary uppercase bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                    {portfolio.name}
                </span>

                <div className="flex items-baseline gap-2 tabular-nums">
                    <span className="text-4xl text-on-surface-variant font-light">$</span>
                    <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-on-surface">
                        {portfolio.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h1>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-surface-container-low rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h2 className="text-xl font-bold tracking-tight">Performance History</h2>
                            <div className="flex gap-2">
                                <button className="px-4 py-1.5 rounded-full bg-surface-container-highest text-xs font-bold text-on-surface">1D</button>
                                <button className="px-4 py-1.5 rounded-full bg-primary text-on-primary text-xs font-bold">1W</button>
                            </div>
                        </div>

                        <div className="w-full h-64 relative z-10 flex items-end">
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
                                <defs>
                                    <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#84adff" stopOpacity="0.3"></stop>
                                        <stop offset="100%" stopColor="#84adff" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                <path d="M0,150 C100,160 200,140 300,100 C400,60 500,80 600,70 C700,60 800,90 900,40 L1000,20" fill="none" stroke="#84adff" strokeLinecap="round" strokeWidth="4"></path>
                                <path d="M0,150 C100,160 200,140 300,100 C400,60 500,80 600,70 C700,60 800,90 900,40 L1000,20 L1000,200 L0,200 Z" fill="url(#chartFill)"></path>
                            </svg>
                        </div>
                    </section>

                    <section className="space-y-6">
                         <div className="flex justify-between items-end">
                            <h2 className="text-2xl font-bold tracking-tight">Active Holdings</h2>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             {activeHoldings.length === 0 ? (
                                 <div className="col-span-2 text-on-surface-variant p-6 text-center bg-surface-container rounded-2xl">
                                     No active holdings. Add a transaction to see it here.
                                 </div>
                             ) : activeHoldings.map((h, i) => (
                                 <Link to={`/stock-detail/${h.ticker}`} key={i} className="group flex flex-col justify-between p-6 bg-surface-container rounded-3xl hover:bg-surface-container-high transition-colors cursor-pointer border border-transparent hover:border-outline-variant/30 relative overflow-hidden">
                                    <div className="flex justify-between items-start mb-6 z-10">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                                                <div className="text-black font-bold text-xl">{h.ticker.substring(0, 1)}</div>
                                            </div>
                                            <div>
                                                <h3 className="font-extrabold text-lg">{h.ticker}</h3>
                                                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{h.shares} Shares</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                                 </Link>
                             ))}
                         </div>
                    </section>
                </div>

                <div className="space-y-8">
                     <Link to={`/add-transaction/${portfolioId}`} className="flex flex-col items-center justify-center py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-black text-lg rounded-2xl shadow-[0_0_40px_rgba(132,173,255,0.15)] hover:shadow-[0_0_60px_rgba(132,173,255,0.25)] hover:brightness-110 active:scale-95 transition-all text-center">
                        <span className="material-symbols-outlined mb-1">add</span>
                        NEW TRANSACTION
                    </Link>

                    <section className="bg-surface-container-low rounded-3xl p-6 sm:p-8 border border-outline-variant/10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold tracking-tight">Recent Ledger</h2>
                        </div>
                        <div className="space-y-6">
                            {transactions.length === 0 ? (
                                <div className="text-on-surface-variant text-sm text-center">No recent transactions.</div>
                            ) : transactions.slice(0, 5).map(txn => (
                                <div key={txn.id} className="flex justify-between items-center group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 ${txn.type === 'buy' ? 'bg-primary/10 text-primary' : 'bg-surface-container-highest text-on-surface'} rounded-xl flex items-center justify-center`}>
                                            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>{txn.type === 'buy' ? 'call_made' : 'call_received'}</span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm tracking-wide">{txn.ticker}</div>
                                            <div className="text-xs text-on-surface-variant font-medium mt-0.5 capitalize">{txn.type} • {new Date(txn.date).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-sm tabular-nums tracking-wide">${Number(txn.price).toFixed(2)}</div>
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

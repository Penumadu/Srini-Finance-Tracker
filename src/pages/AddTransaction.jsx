import React, { useState } from 'react';
import db from '../services/db';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddTransaction({ user }) {
    const navigate = useNavigate();
    const { portfolioId: urlPortfolioId } = useParams();
    const [action, setAction] = useState('buy');
    const [ticker, setTicker] = useState('');
    const [shares, setShares] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);

    const estimatedTotal = (Number(shares) * Number(price)) || 0;

    const handleSubmit = async () => {
        if (!ticker || !shares || !price || !user) {
            alert('Please fill out all required fields.');
            return;
        }

        setLoading(true);
        try {
            let portfolioId = urlPortfolioId;
            if (!portfolioId) {
                const portfolios = await db.portfolios.getAll(user.uid);
                portfolioId = portfolios.length > 0 ? portfolios[0].id : null;
            }

            const transaction = {
                portfolioId,
                type: action,
                ticker: ticker.toUpperCase(),
                shares: Number(shares),
                price: Number(price),
                date: date || new Date().toISOString()
            };

            await db.transactions.add(transaction);
            navigate(portfolioId ? `/portfolio/${portfolioId}` : '/');
        } catch (e) {
            console.error(e);
            alert("Failed to submit transaction.");
            setLoading(false);
        }
    };

    return (
        <main className="pt-24 px-6 max-w-2xl mx-auto pb-32">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-1 h-10 bg-primary rounded-full"></div>
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Log Transaction</h2>
                    <p className="text-on-surface-variant text-sm mt-1">Record a new asset movement in your portfolio.</p>
                </div>
            </div>

            <div className="space-y-8">
                <section className="bg-surface-container p-1 rounded-xl flex gap-1">
                    <button 
                        onClick={() => setAction('buy')}
                        className={`flex-1 py-4 px-6 rounded-lg font-bold transition-all active:scale-95 ${action === 'buy' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-variant'}`}
                    >
                        Buy
                    </button>
                    <button 
                        onClick={() => setAction('sell')}
                        className={`flex-1 py-4 px-6 rounded-lg font-bold transition-all active:scale-95 ${action === 'sell' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-variant'}`}
                    >
                        Sell
                    </button>
                </section>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="group">
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Asset Search</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
                            <input value={ticker} onChange={e => setTicker(e.target.value)} className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:bg-surface-bright transition-all" placeholder="Ticker or Company Name" type="text" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Shares</label>
                            <input value={shares} onChange={e => setShares(e.target.value)} className="w-full bg-surface-container-high border-none rounded-xl py-4 px-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:bg-surface-bright transition-all font-mono" placeholder="0.00" type="number" step="0.0001" min="0" />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Price per Share</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline">$</span>
                                <input value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-8 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:bg-surface-bright transition-all font-mono" placeholder="0.00" type="number" step="0.01" min="0" />
                            </div>
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Transaction Date</label>
                        <input value={date} onChange={e => setDate(e.target.value)} className="w-full bg-surface-container-high border-none rounded-xl py-4 px-4 text-on-surface focus:ring-2 focus:ring-primary focus:bg-surface-bright transition-all" type="date" />
                    </div>

                    <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 mt-10">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-on-surface-variant">Estimated Total</span>
                            <span className="text-xs bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-bold">USD</span>
                        </div>
                        <div className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter tabular-nums">
                            ${estimatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="mt-4 pt-4 border-t border-outline-variant/10 flex justify-between text-xs text-on-surface-variant">
                            <span>Commission Fee (Est.)</span>
                            <span>$0.00</span>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button className="w-full py-5 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-black text-lg shadow-[0_0_48px_rgba(132,173,255,0.15)] hover:brightness-110 active:scale-95 transition-all" type="submit">
                            CONFIRM TRANSACTION
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

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
        <main className="pt-24 px-4 sm:px-6 max-w-2xl mx-auto pb-32">
            <div className="flex items-center gap-4 mb-10 select-none">
                <div className="w-1.5 h-10 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-on-surface font-outfit">Log Transaction</h2>
                    <p className="text-on-surface-variant text-sm mt-1">Record a new asset movement in your portfolio.</p>
                </div>
            </div>

            <div className="space-y-8 select-none">
                <section className="bg-surface-container-low/60 backdrop-blur-md p-1.5 rounded-2xl flex gap-1.5 border border-outline-variant/15 shadow-md">
                    <button 
                        onClick={() => setAction('buy')}
                        className={`flex-1 py-3 px-6 rounded-xl font-bold font-outfit transition-all hover:scale-102 active:scale-95 ${action === 'buy' ? 'bg-primary text-on-primary shadow-[0_4px_16px_rgba(79,70,229,0.3)]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40'}`}
                    >
                        Buy
                    </button>
                    <button 
                        onClick={() => setAction('sell')}
                        className={`flex-1 py-3 px-6 rounded-xl font-bold font-outfit transition-all hover:scale-102 active:scale-95 ${action === 'sell' ? 'bg-primary text-on-primary shadow-[0_4px_16px_rgba(79,70,229,0.3)]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40'}`}
                    >
                        Sell
                    </button>
                </section>

                <form className="space-y-6 select-none" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="group">
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1 opacity-80 select-none">Asset Search</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
                            <input value={ticker} onChange={e => setTicker(e.target.value)} className="w-full bg-surface-container-low/50 backdrop-blur-md border border-outline-variant/20 rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:border-primary/40 focus:bg-surface-container/60 transition-all font-outfit text-base font-bold select-none outline-none" placeholder="Ticker or Company Name" type="text" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1 opacity-80">Shares</label>
                            <input value={shares} onChange={e => setShares(e.target.value)} className="w-full bg-surface-container-low/50 backdrop-blur-md border border-outline-variant/20 rounded-2xl py-4 px-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:border-primary/40 focus:bg-surface-container/60 transition-all font-outfit text-base font-bold outline-none select-none" placeholder="0.00" type="number" step="0.0001" min="0" />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1 opacity-80">Price per Share</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline font-outfit">$</span>
                                <input value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-surface-container-low/50 backdrop-blur-md border border-outline-variant/20 rounded-2xl py-4 pl-8 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:border-primary/40 focus:bg-surface-container/60 transition-all font-outfit text-base font-bold outline-none select-none" placeholder="0.00" type="number" step="0.01" min="0" />
                            </div>
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1 opacity-80">Transaction Date</label>
                        <input value={date} onChange={e => setDate(e.target.value)} className="w-full bg-surface-container-low/50 backdrop-blur-md border border-outline-variant/20 rounded-2xl py-4 px-4 text-on-surface focus:ring-2 focus:ring-primary focus:border-primary/40 focus:bg-surface-container/60 transition-all font-outfit text-base font-bold outline-none select-none" type="date" />
                    </div>

                    <div className="bg-surface-container-low/40 border border-outline-variant/15 backdrop-blur-md p-7 rounded-3xl mt-10 shadow-lg relative overflow-hidden group hover:border-primary/20 transition-all duration-300">
                        <div className="flex justify-between items-center mb-4 relative z-10">
                            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-80 select-none">Estimated Total</span>
                            <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full font-bold font-outfit select-none">USD</span>
                        </div>
                        <div className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter tabular-nums font-outfit relative z-10 select-none">
                            ${estimatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="mt-4 pt-4 border-t border-outline-variant/10 flex justify-between text-xs text-on-surface-variant font-bold opacity-80 relative z-10">
                            <span>Commission Fee (Est.)</span>
                            <span>$0.00</span>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                    </div>

                    <div className="pt-6">
                        <button className="w-full py-5 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-black font-outfit text-base shadow-[0_4px_24px_rgba(79,70,229,0.3)] hover:shadow-[0_4px_36px_rgba(79,70,229,0.45)] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-300 uppercase select-none" type="submit">
                            Confirm Transaction
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

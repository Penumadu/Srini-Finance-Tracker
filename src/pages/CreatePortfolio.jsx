import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db as firestore } from '../firebase';

const currencies = [
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'GBP', symbol: '£', label: 'British Pound' },
];

export default function CreatePortfolio({ user }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!name.trim() || !user) return;
        setLoading(true);
        try {
            await addDoc(collection(firestore, "portfolios"), {
                name: name.trim(),
                currency,
                balance: 0,
                userId: user.uid,
            });
            navigate('/');
        } catch (e) {
            console.error(e);
            alert("Failed to create portfolio.");
            setLoading(false);
        }
    };

    return (
        <main className="pt-24 px-4 sm:px-6 max-w-2xl mx-auto pb-40">
            {/* Editorial Header */}
            <div className="mb-12 select-none">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-1.5 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-on-surface font-outfit">Create Portfolio</h1>
                </div>
                <p className="text-on-surface-variant font-medium text-sm">
                    Refine your wealth structure. Define naming and valuation standards for your architectural blueprint.
                </p>
            </div>

            <section className="space-y-10 select-none">
                {/* Form Card */}
                <div className="bg-surface-container-low/60 border border-outline-variant/15 backdrop-blur-md p-7 rounded-3xl space-y-8 shadow-lg">
                    {/* Portfolio Name */}
                    <div className="space-y-3">
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1 opacity-80 select-none">Portfolio Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-2xl px-4 py-4 text-on-surface focus:ring-2 focus:ring-primary focus:border-primary/40 focus:bg-surface-container/60 transition-all font-outfit font-bold text-lg placeholder:text-outline outline-none select-none"
                            type="text"
                            placeholder="e.g. Retirement Fund"
                        />
                        <p className="text-xs text-on-surface-variant ml-1 font-medium opacity-80">A unique identifier for this asset collection.</p>
                    </div>

                    {/* Currency Selection */}
                    <div className="space-y-3">
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1 opacity-80 select-none">Base Currency</label>
                        <div className="grid grid-cols-4 gap-4 select-none">
                            {currencies.map((cur) => (
                                <button
                                    key={cur.code}
                                    onClick={() => setCurrency(cur.code)}
                                    className={`border border-outline-variant/15 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:scale-103 active:scale-95 ${
                                        currency === cur.code
                                            ? 'bg-primary/10 text-primary border-primary/40 ring-2 ring-primary/20 shadow-md'
                                            : 'bg-surface-container-low/50 hover:bg-surface-variant/40 text-on-surface-variant hover:text-on-surface'
                                    }`}
                                >
                                    <span className="text-2xl font-bold font-outfit tabular-nums">{cur.symbol}</span>
                                    <span className="text-xs font-bold tracking-widest uppercase font-outfit">{cur.code}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-gradient-to-br from-surface-container-low/80 to-surface-container/60 border border-outline-variant/20 backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-xl hover:border-primary/25 transition-all duration-300 select-none">
                    <h3 className="text-lg font-bold mb-3 text-primary tracking-tight font-outfit">Architectural Standard</h3>
                    <p className="text-sm leading-relaxed text-on-surface-variant font-medium">
                        Your base currency defines the lens through which all global assets are analyzed. Conversions are calculated using real-time institutional feeds.
                    </p>
                </div>
            </section>

            {/* Action Bar */}
            <div className="fixed bottom-24 left-0 w-full px-6 flex justify-center z-40 select-none">
                <div className="w-full max-w-2xl flex gap-4">
                    <button onClick={() => navigate(-1)} className="flex-1 py-4 bg-surface-container-low/80 backdrop-blur-md text-on-surface font-extrabold font-outfit rounded-2xl hover:bg-surface-variant/60 border border-outline-variant/15 hover:border-primary/25 active:scale-95 transition-all">
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        disabled={loading || !name.trim()}
                        className="flex-[2] py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-extrabold font-outfit rounded-2xl shadow-[0_4px_16px_rgba(79,70,229,0.3)] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Portfolio'}
                    </button>
                </div>
            </div>
        </main>
    );
}

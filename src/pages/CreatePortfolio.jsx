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
        <main className="pt-24 px-6 max-w-2xl mx-auto pb-40">
            {/* Editorial Header */}
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-0.5 h-8 bg-primary"></div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Create Portfolio</h1>
                </div>
                <p className="text-on-surface-variant font-medium">
                    Refine your wealth structure. Define naming and valuation standards for your architectural blueprint.
                </p>
            </div>

            <section className="space-y-10">
                {/* Form Card */}
                <div className="bg-surface p-8 rounded-xl space-y-8">
                    {/* Portfolio Name */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold tracking-widest uppercase text-on-surface-variant">Portfolio Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-surface-container-high border-none rounded-md px-4 py-4 text-on-surface focus:bg-surface-bright focus:ring-1 focus:ring-primary/20 transition-all font-medium text-lg placeholder:text-outline"
                            type="text"
                            placeholder="e.g. Retirement Fund"
                        />
                        <p className="text-xs text-on-surface-variant ml-1">A unique identifier for this asset collection.</p>
                    </div>

                    {/* Currency Selection */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold tracking-widest uppercase text-on-surface-variant">Base Currency</label>
                        <div className="grid grid-cols-4 gap-4">
                            {currencies.map((cur) => (
                                <button
                                    key={cur.code}
                                    onClick={() => setCurrency(cur.code)}
                                    className={`border-none rounded-md p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                                        currency === cur.code
                                            ? 'bg-surface-container-highest text-primary ring-1 ring-primary/30'
                                            : 'bg-surface-container-high hover:bg-surface-variant text-on-surface-variant'
                                    }`}
                                >
                                    <span className="text-2xl font-bold tabular-nums">{cur.symbol}</span>
                                    <span className="text-xs font-extrabold tracking-widest uppercase">{cur.code}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-surface-container-low rounded-xl p-8">
                    <h3 className="text-xl font-bold mb-3 text-primary tracking-tight">Architectural Standard</h3>
                    <p className="text-sm leading-relaxed text-on-surface-variant">
                        Your base currency defines the lens through which all global assets are analyzed. Conversions are calculated using real-time institutional feeds.
                    </p>
                </div>
            </section>

            {/* Action Bar */}
            <div className="fixed bottom-24 left-0 w-full px-6 flex justify-center z-40">
                <div className="w-full max-w-2xl flex gap-4">
                    <button onClick={() => navigate(-1)} className="flex-1 py-4 bg-surface-container-high text-on-surface font-bold rounded-md hover:bg-surface-variant active:scale-95 transition-all">
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        disabled={loading || !name.trim()}
                        className="flex-[2] py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-extrabold rounded-md shadow-lg shadow-primary/10 active:scale-95 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Portfolio'}
                    </button>
                </div>
            </div>
        </main>
    );
}

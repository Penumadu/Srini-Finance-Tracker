import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db as firestore } from '../firebase';

const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
];

export default function EditPortfolio({ user }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const snap = await getDoc(doc(firestore, "portfolios", id));
                if (snap.exists()) {
                    const data = snap.data();
                    setName(data.name || '');
                    setCurrency(data.currency || 'USD');
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleSave = async () => {
        if (!name.trim()) return;
        setSaving(true);
        try {
            await updateDoc(doc(firestore, "portfolios", id), { name: name.trim(), currency });
            navigate('/');
        } catch (e) {
            console.error(e);
            alert("Failed to save.");
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <main className="pt-24 px-6 max-w-7xl mx-auto flex justify-center items-center h-64">
                <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </main>
        );
    }

    return (
        <main className="pt-24 px-4 sm:px-6 max-w-2xl mx-auto pb-40">
            {/* Editorial Header */}
            <div className="mb-12 select-none">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-1.5 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-on-surface font-outfit">Edit Portfolio</h1>
                </div>
                <p className="text-on-surface-variant font-medium text-sm">Modify your architectural asset structure and valuation settings.</p>
            </div>

            <section className="space-y-10 select-none">
                <div className="bg-surface-container-low/60 border border-outline-variant/15 backdrop-blur-md p-7 rounded-3xl space-y-8 shadow-lg">
                    {/* Portfolio Name Input */}
                    <div className="space-y-3">
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1 opacity-80 select-none">Portfolio Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-2xl px-4 py-4 text-on-surface focus:ring-2 focus:ring-primary focus:border-primary/40 focus:bg-surface-container/60 transition-all font-outfit font-bold text-lg outline-none select-none"
                            type="text"
                        />
                    </div>

                    {/* Currency Selection */}
                    <div className="space-y-3">
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1 opacity-80 select-none">Base Currency</label>
                        <div className="grid grid-cols-3 gap-4 select-none">
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

                {/* Architectural Standard Info Box */}
                <div className="bg-gradient-to-br from-surface-container-low/80 to-surface-container/60 border border-outline-variant/20 backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-xl hover:border-primary/25 transition-all duration-300 select-none">
                    <h3 className="text-lg font-bold mb-3 text-primary tracking-tight font-outfit">Architectural Standard</h3>
                    <p className="text-sm leading-relaxed text-on-surface-variant font-medium">
                        All ledger entries comply with the Sovereign high-liquidity protocol. Changing the base currency will trigger a re-valuation of all underlying assets based on the current GMT market close rates.
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
                        onClick={handleSave}
                        disabled={saving || !name.trim()}
                        className="flex-[2] py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-extrabold font-outfit rounded-2xl shadow-[0_4px_16px_rgba(79,70,229,0.3)] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </main>
    );
}

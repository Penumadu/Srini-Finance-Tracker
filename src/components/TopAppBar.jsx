import React from 'react';

export default function TopAppBar({ title }) {
    return (
        <header className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl flex justify-between items-center px-6 py-4 w-full">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
                    <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsL7HLTdu13eLXHDV-ii1q8tm3rjMvWgqXsqoK9KHYbcs7BvEnmNFYJyghGovwvIPGGzLcbnZky75yXyCq2Dl5V3zP1g0HumzFk-azIDRQE_RPiSWfFj7bzBiahcl-FIOpKt4QMA88Zv7TooHw_Cx9JUosu7q_jrkNJoX9Z7l2jB_1eAqHTOQG0iNY6JA3Q00suluQcfQt9qS0c-3U21OPQkwsLc2VxZVQ_xxWSHWCFTXOT2s29zbnCeIfR2Huzxrzi0cGjK4_iw3m" />
                </div>
                <span className="font-headline text-xl font-bold text-slate-50 tracking-tighter">{title || 'Sovereign Ledger'}</span>
            </div>
            <div className="flex items-center gap-4">
                <button className="text-slate-400 hover:bg-slate-800/50 transition-colors active:scale-95 duration-200 p-2 rounded-full">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>search</span>
                </button>
            </div>
        </header>
    );
}

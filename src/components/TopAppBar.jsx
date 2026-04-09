import React from 'react';

export default function TopAppBar({ title }) {
    return (
        <header className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl flex justify-between items-center px-6 py-4 w-full">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img alt="Srini Penumadu Logo" className="w-full h-full object-cover" src="/logo.png" />
                </div>
                <span className="font-headline text-xl font-bold text-slate-50 tracking-tighter">{title || 'Srini Finance Tracker'}</span>
            </div>
            <div className="flex items-center gap-4">
                <button className="text-slate-400 hover:bg-slate-800/50 transition-colors active:scale-95 duration-200 p-2 rounded-full">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>search</span>
                </button>
            </div>
        </header>
    );
}


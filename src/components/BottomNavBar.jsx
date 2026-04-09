import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BottomNavBar() {
    return (
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-8 pt-4 bg-slate-950/80 backdrop-blur-2xl rounded-t-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
            <NavLink to="/" className={({ isActive }) => `flex flex-col items-center justify-center gap-1 transition-all active:scale-90 duration-300 ${isActive ? 'text-blue-400' : 'text-slate-500 hover:text-blue-300'}`}>
                {({ isActive }) => (
                    <>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>home</span>
                        <span className="font-headline text-[11px] font-semibold uppercase tracking-widest">Home</span>
                    </>
                )}
            </NavLink>
            <NavLink to="/create-portfolio" className={({ isActive }) => `flex flex-col items-center justify-center gap-1 transition-all active:scale-90 duration-300 ${isActive ? 'text-blue-400' : 'text-slate-500 hover:text-blue-300'}`}>
                {({ isActive }) => (
                    <>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>account_balance_wallet</span>
                        <span className="font-headline text-[11px] font-semibold uppercase tracking-widest">Portfolios</span>
                    </>
                )}
            </NavLink>
            <NavLink to="/watchlist" className={({ isActive }) => `flex flex-col items-center justify-center gap-1 transition-all active:scale-90 duration-300 ${isActive ? 'text-blue-400' : 'text-slate-500 hover:text-blue-300'}`}>
                {({ isActive }) => (
                    <>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>monitoring</span>
                        <span className="font-headline text-[11px] font-semibold uppercase tracking-widest">Markets</span>
                    </>
                )}
            </NavLink>
        </nav>
    );
}

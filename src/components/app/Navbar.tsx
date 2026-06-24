"use client";

import React from "react";
import { useApp } from "../providers/Providers";
import { Sparkles, PawPrint, User as UserIcon, BellRing, Camera, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { user, pet, clan, activeTab, setActiveTab, isSimultaneousActive } = useApp();

  return (
    <>
      <AnimatePresence>
        {user && isSimultaneousActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full bg-gradient-to-r from-fire via-neon-pink to-neon-purple px-4 py-2.5 text-center shadow-[0_0_20px_rgba(255,85,0,0.8)] z-50 flex items-center justify-between"
          >
            <div className="flex items-center space-x-2 text-white font-black text-xs">
              <BellRing className="h-4 w-4 animate-bounce" />
              <span>⚠️ 2 MINUTOS PARA O INSTANT SIMULTÂNEO!</span>
            </div>
            <button
              onClick={() => setActiveTab("camera")}
              className="rounded-full bg-dark-bg px-3 py-1 text-[11px] font-black text-fire-light hover:scale-105 transition-all flex items-center space-x-1 shadow-sm"
            >
              <Camera className="h-3.5 w-3.5" />
              <span>Capturar ⚡️</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-dark-bg/85 px-4 py-3 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <div onClick={() => setActiveTab("feed")} className="cursor-pointer flex items-center space-x-2 select-none group">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-fire via-fire-glow to-neon-purple p-0.5 shadow-[0_0_15px_rgba(255,85,0,0.4)] group-hover:scale-105 transition-transform">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-dark-bg">
                <Sparkles className="h-4 w-4 text-fire-light animate-pulse" />
              </div>
            </div>
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-xl font-black tracking-tight text-transparent">
              Instants
            </span>
          </div>

          <div className="flex items-center space-x-2.5">
            {clan.isPerfectDay && (
              <span className="flex items-center space-x-1 rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-1 text-[10px] font-black text-amber-300">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
                <span className="hidden sm:inline">Dia Perfeito 💯</span>
              </span>
            )}

            {user && pet && (
              <button
                onClick={() => setActiveTab("pet")}
                className="flex items-center space-x-1.5 rounded-full bg-fire/15 border border-fire/30 px-3 py-1 text-xs font-black text-fire-light transition-all hover:scale-105"
              >
                <PawPrint className="h-3.5 w-3.5 text-fire" />
                <span>{pet.name}</span>
              </button>
            )}

            <button onClick={() => setActiveTab("profile")} className="relative h-9 w-9 overflow-hidden rounded-full border border-white/20 bg-dark-card active:scale-95">
              {user ? <img src={user.image} alt={user.name} className="h-full w-full object-cover" /> : <UserIcon className="h-5 w-5 text-neutral-400 mx-auto mt-2" />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

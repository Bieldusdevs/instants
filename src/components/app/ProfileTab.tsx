"use client";

import React, { useState } from "react";
import { useApp } from "../providers/Providers";
import { Flame, Sparkles, LogOut, Grid, ShieldCheck, Calendar, Trophy, Edit3, Users, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProfileTab() {
  const { user, logout, instants, updateUserBio } = useApp();
  const [showEditBioModal, setShowEditBioModal] = useState(false);
  const [bioInput, setBioInput] = useState(user?.bio || "");

  const myInstants = instants.filter((i: any) => i.userId === user?.id || i.userName === user?.name);
  const retentionCalendar = [true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true];

  const handleSaveBio = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserBio(bioInput);
    setShowEditBioModal(false);
  };

  return (
    <div className="mx-auto max-w-md pb-24 pt-4 px-3 space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-dark-card border border-white/10 p-6 shadow-2xl backdrop-blur-xl text-center space-y-4">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-fire/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto h-24 w-24 rounded-full p-1 bg-gradient-to-tr from-fire via-neon-purple to-neon-cyan shadow-[0_0_25px_rgba(255,85,0,0.4)]">
          <img src={user?.image} alt={user?.name} className="h-full w-full rounded-full object-cover bg-dark-bg" />
        </div>

        <div>
          <h2 className="text-xl font-black text-white flex items-center justify-center space-x-1.5">
            <span>{user?.name}</span>
            <ShieldCheck className="h-5 w-5 text-neon-cyan" />
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">{user?.handle}</p>
        </div>

        {/* SEGUIDORES & BIO */}
        <div className="space-y-2 pt-1">
          <div className="flex justify-center items-center space-x-6 text-xs">
            <div>
              <span className="font-black text-white text-base block">{user?.followersCount || 1240}</span>
              <span className="text-[10px] text-neutral-400 uppercase font-bold">Seguidores</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <span className="font-black text-white text-base block">{user?.followingCount || 480}</span>
              <span className="text-[10px] text-neutral-400 uppercase font-bold">Seguindo</span>
            </div>
          </div>

          <p className="text-xs text-neutral-200 italic max-w-xs mx-auto pt-1 leading-relaxed">
            "{user?.bio || 'Entusiasta cibernético no Instants ✨'}"
          </p>

          <button
            onClick={() => { setBioInput(user?.bio || ""); setShowEditBioModal(true); }}
            className="inline-flex items-center space-x-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 text-[11px] font-bold text-neutral-300 transition-all"
          >
            <Edit3 className="h-3 w-3 text-neon-cyan" />
            <span>Editar Bio</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
          <div className="rounded-2xl bg-dark-elevated p-2.5 border border-white/5">
            <div className="flex items-center justify-center space-x-1 text-fire font-black text-sm">
              <Flame className="h-3.5 w-3.5 fill-fire" />
              <span>{user?.streak}</span>
            </div>
            <p className="text-[9px] text-neutral-400 uppercase mt-0.5 font-bold">Foguinho 🔥</p>
          </div>

          <div className="rounded-2xl bg-dark-elevated p-2.5 border border-white/5">
            <p className="text-white font-black text-sm">{user?.instantsCount}</p>
            <p className="text-[9px] text-neutral-400 uppercase mt-0.5 font-bold">Instants</p>
          </div>

          <div className="rounded-2xl bg-dark-elevated p-2.5 border border-white/5">
            <p className="text-neon-purple font-black text-sm">Nvl 8</p>
            <p className="text-[9px] text-neutral-400 uppercase mt-0.5 font-bold">Vibe Cyber</p>
          </div>
        </div>

        <div className="pt-1">
          <button onClick={logout} className="flex items-center justify-center space-x-2 w-full rounded-xl bg-red-500/10 border border-red-500/30 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all">
            <LogOut className="h-4 w-4" />
            <span>Sair do Aplicativo</span>
          </button>
        </div>
      </div>

      {/* MODAL EDITAR BIO */}
      <AnimatePresence>
        {showEditBioModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-6 flex flex-col justify-center text-left">
            <form onSubmit={handleSaveBio} className="space-y-4 bg-dark-card p-5 rounded-3xl border border-neon-cyan shadow-2xl">
              <div className="flex items-center justify-between"><h4 className="text-sm font-black text-neon-cyan">Editar Bio do Perfil ✏️</h4><button type="button" onClick={() => setShowEditBioModal(false)}><X className="h-4 w-4 text-neutral-400" /></button></div>
              <p className="text-[11px] text-neutral-300">Conte pro mundo quem você é no universo cibernético do Instants!</p>
              <textarea maxLength={120} placeholder="Escreva sua bio..." value={bioInput} onChange={(e) => setBioInput(e.target.value)} className="w-full h-24 rounded-xl bg-dark-elevated border border-white/15 p-3 text-xs text-white placeholder-neutral-500 focus:border-neon-cyan focus:outline-hidden" />
              <div className="flex justify-between text-[10px] text-neutral-500"><span>Emojis permitidos 🪐⚡️</span><span>{bioInput.length}/120</span></div>
              <button type="submit" className="w-full rounded-2xl bg-neon-cyan py-3 text-xs font-black text-dark-bg shadow-[0_0_15px_#00f0ff]">Salvar Nova Bio ✨</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CALENDÁRIO */}
      <div className="rounded-3xl bg-dark-card border border-white/10 p-5 space-y-3 shadow-xl text-left">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-neutral-300 flex items-center space-x-1.5"><Calendar className="h-4 w-4 text-emerald-400" /><span>Calendário de Ofensiva</span></h3>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">🔥 28/30 Dias</span>
        </div>
        <div className="grid grid-cols-10 gap-2 pt-1">
          {retentionCalendar.map((active, idx) => (
            <div key={idx} className={`aspect-square rounded-md flex items-center justify-center text-[9px] font-mono font-bold ${active ? "bg-emerald-500 text-dark-bg font-black" : "bg-white/5 text-neutral-600"}`}>{idx + 1}</div>
          ))}
        </div>
      </div>

      {/* GALERIA */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-extrabold text-white flex items-center space-x-1.5"><Grid className="h-4 w-4 text-neon-cyan" /><span>Minha Galeria ✨</span></h3>
          <span className="text-xs text-neutral-400">{myInstants.length} salvos</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {myInstants.map((inst: any) => (
            <motion.div key={inst.id} whileHover={{ scale: 1.03 }} className="aspect-4/5 overflow-hidden rounded-2xl bg-dark-card border border-white/10 shadow-lg"><img src={inst.mediaUrl} alt={inst.caption} className="h-full w-full object-cover" /></motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useApp } from "../providers/Providers";
import { Sparkles, Utensils, Shirt, Users, Dna, Star, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Pet3D } from "../canvas/Pet3D";

export function PetTab() {
  const { pet, feedPet, playPet, cleanPet, sleepPet, updatePetStyle, chats, sendPetInvite, breedPets } = useApp();
  const [activeMenu, setActiveMenu] = useState<"care" | "style" | "coop" | "breed">("care");
  const [hybridName, setHybridName] = useState("");

  const handleActionConfetti = () => {
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.5 }, colors: ["#ff5500", "#00f0ff", "#ff007f"] });
  };

  const handleBreed = (targetType: any) => {
    confetti({ particleCount: 100, spread: 90, origin: { y: 0.4 }, colors: ["#8a2be2", "#00f0ff", "#ffd700"] });
    breedPets(targetType, hybridName || "Quimera Cósmica");
    setHybridName("");
  };

  return (
    <div className="mx-auto max-w-md pb-28 pt-3 px-3 space-y-4 text-center">
      {/* Top Banner Status */}
      <div className="rounded-2xl bg-dark-card border border-white/10 p-3 shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {pet.owners.map((owner: any, idx: number) => (
              <img key={idx} src={owner.avatar} alt={owner.name} className="h-8 w-8 rounded-full border-2 border-dark-card object-cover" />
            ))}
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold text-white flex items-center space-x-1">
              <span>{pet.name}</span>
              {pet.rarity === "cosmic" && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
            </h4>
            <p className="text-[10px] text-neon-cyan font-medium">
              {pet.rarity === "cosmic" ? "🪐 Mascote 3D Cósmico Raro" : "🐾 Tamagotchi 3D Co-op"}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-fire/20 border border-fire/40 px-2.5 py-1 text-xs font-black text-fire-light">
          Nvl {pet.level}
        </span>
      </div>

      {/* ARENA CENTRAL DO PET EM THREE.JS 3D */}
      <div className="relative aspect-square w-full rounded-3xl bg-gradient-to-b from-dark-elevated via-dark-card to-dark-bg border border-white/15 p-4 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#ff5500_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

        <div className="absolute top-3 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
          <span className="text-[9px] uppercase font-black tracking-widest text-neutral-400 bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
            Arraste para rotacionar 3D
          </span>
          <span className="text-xs">
            {pet.hat === "crown" && "👑"}
            {pet.glasses === "cyber" && "🕶️"}
          </span>
        </div>

        {/* MOTOR GRÁFICO R3F / THREE.JS */}
        <div className="h-full w-full">
          <Pet3D pet={pet} />
        </div>

        {/* Barras de Status Vitais */}
        <div className="absolute bottom-3 left-3 right-3 grid grid-cols-4 gap-1 bg-black/70 backdrop-blur-xl p-2.5 rounded-2xl border border-white/10 z-10">
          <div><p className="text-[9px] uppercase font-bold text-neutral-400">Fome</p><div className="h-1.5 w-full bg-white/10 rounded-full mt-1 overflow-hidden"><div className="h-full bg-amber-500" style={{ width: `${pet.hunger}%` }} /></div></div>
          <div><p className="text-[9px] uppercase font-bold text-neutral-400">Amor</p><div className="h-1.5 w-full bg-white/10 rounded-full mt-1 overflow-hidden"><div className="h-full bg-neon-pink" style={{ width: `${pet.happiness}%` }} /></div></div>
          <div><p className="text-[9px] uppercase font-bold text-neutral-400">Higiene</p><div className="h-1.5 w-full bg-white/10 rounded-full mt-1 overflow-hidden"><div className="h-full bg-neon-cyan" style={{ width: `${pet.hygiene}%` }} /></div></div>
          <div><p className="text-[9px] uppercase font-bold text-neutral-400">Energia</p><div className="h-1.5 w-full bg-white/10 rounded-full mt-1 overflow-hidden"><div className="h-full bg-emerald-400" style={{ width: `${pet.energy}%` }} /></div></div>
        </div>
      </div>

      {/* Selector de Abas do Pet */}
      <div className="flex justify-center space-x-1.5 bg-dark-card p-1 rounded-2xl border border-white/10">
        {[
          { id: "care", label: "Cuidar 🍗" },
          { id: "style", label: "Roupas 3D 🎩" },
          { id: "breed", label: "Breeding 🧬" },
          { id: "coop", label: "Co-op 💌" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveMenu(m.id as any)}
            className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${
              activeMenu === m.id ? "bg-fire text-white shadow-md scale-105" : "text-neutral-400 hover:text-white"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeMenu === "care" && (
          <motion.div key="care" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-3">
            <button onClick={() => { feedPet(); handleActionConfetti(); }} className="flex items-center space-x-3 rounded-2xl bg-dark-card border border-amber-500/30 p-3.5 hover:bg-amber-500/10 transition-all"><div className="rounded-xl bg-amber-500/20 p-2 text-xl">🍎</div><div className="text-left"><p className="text-xs font-bold text-white">Comida</p><p className="text-[10px] text-neutral-400">+25 XP</p></div></button>
            <button onClick={() => { playPet(); handleActionConfetti(); }} className="flex items-center space-x-3 rounded-2xl bg-dark-card border border-neon-pink/30 p-3.5 hover:bg-neon-pink/10 transition-all"><div className="rounded-xl bg-neon-pink/20 p-2 text-xl">🎾</div><div className="text-left"><p className="text-xs font-bold text-white">Brincar</p><p className="text-[10px] text-neutral-400">+20 XP</p></div></button>
            <button onClick={() => { cleanPet(); handleActionConfetti(); }} className="flex items-center space-x-3 rounded-2xl bg-dark-card border border-neon-cyan/30 p-3.5 hover:bg-neon-cyan/10 transition-all"><div className="rounded-xl bg-neon-cyan/20 p-2 text-xl">🧼</div><div className="text-left"><p className="text-xs font-bold text-white">Banho</p><p className="text-[10px] text-neutral-400">+30 Higiene</p></div></button>
            <button onClick={() => { sleepPet(); handleActionConfetti(); }} className="flex items-center space-x-3 rounded-2xl bg-dark-card border border-emerald-500/30 p-3.5 hover:bg-emerald-500/10 transition-all"><div className="rounded-xl bg-emerald-500/20 p-2 text-xl">💤</div><div className="text-left"><p className="text-xs font-bold text-white">Dormir</p><p className="text-[10px] text-neutral-400">100% Energia</p></div></button>
          </motion.div>
        )}

        {activeMenu === "style" && (
          <motion.div key="style" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 bg-dark-card p-4 rounded-2xl border border-white/10 text-left">
            <div><p className="text-xs font-extrabold text-white mb-2">Malhas 3D de Cabeça</p><div className="flex space-x-2">{[{ id: "none", label: "Nenhum" }, { id: "crown", label: "Coroa Metálica 👑" }, { id: "wizard", label: "Mago 🎩" }, { id: "cap", label: "Boné 🧢" }].map((i) => (<button key={i.id} onClick={() => updatePetStyle("hat", i.id)} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${pet.hat === i.id ? "bg-fire text-white shadow-md" : "bg-dark-elevated text-neutral-300"}`}>{i.label}</button>))}</div></div>
            <div><p className="text-xs font-extrabold text-white mb-2">Visores 3D de Olhos</p><div className="flex space-x-2">{[{ id: "none", label: "Nenhum" }, { id: "cyber", label: "Visor Neon 🕶️" }, { id: "thug", label: "Pixel 👓" }].map((i) => (<button key={i.id} onClick={() => updatePetStyle("glasses", i.id)} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${pet.glasses === i.id ? "bg-fire text-white shadow-md" : "bg-dark-elevated text-neutral-300"}`}>{i.label}</button>))}</div></div>
          </motion.div>
        )}

        {activeMenu === "breed" && (
          <motion.div key="breed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 bg-dark-card p-5 rounded-2xl border border-neon-purple/40 text-left shadow-xl">
            <div className="flex items-center space-x-2 text-neon-purple font-black text-sm"><Dna className="h-5 w-5 animate-spin" /><span>Laboratório Cibernético de Breeding 3D 🧬</span></div>
            <p className="text-xs text-neutral-300">Fundir malhas 3D para gerar filhotes raros e quimeras cósmicas!</p>
            <input type="text" placeholder="Nome do filhote (Ex: Neo-Alien)" value={hybridName} onChange={(e) => setHybridName(e.target.value)} className="w-full rounded-xl bg-dark-elevated border border-white/15 px-3 py-2.5 text-xs text-white" />
            <div className="grid grid-cols-2 gap-2.5"><button onClick={() => handleBreed("alien")} className="rounded-2xl bg-neon-purple/30 border border-neon-purple p-3 text-center"><span className="text-2xl block mb-1">👽</span><span className="text-xs font-bold text-white">Cruzar Alien</span></button><button onClick={() => handleBreed("phoenix")} className="rounded-2xl bg-fire/30 border border-fire p-3 text-center"><span className="text-2xl block mb-1">🔥🦅</span><span className="text-xs font-bold text-white">Cruzar Fênix</span></button></div>
          </motion.div>
        )}

        {activeMenu === "coop" && (
          <motion.div key="coop" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 bg-dark-card p-4 rounded-2xl border border-white/10 text-left">
            <h4 className="text-xs font-black text-white">Convidar Dupla Co-op 💌</h4>
            <div className="space-y-2">{chats.map((chat: any) => (<div key={chat.id} className="flex items-center justify-between rounded-xl bg-dark-elevated p-2.5"><span className="text-xs text-white">{chat.name}</span><button onClick={() => { sendPetInvite(chat.id, pet.name, pet.type); alert("Convite Tamagotchi 3D enviado!"); }} className="rounded-lg bg-fire px-2.5 py-1 text-xs font-bold text-white">Convidar</button></div>))}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

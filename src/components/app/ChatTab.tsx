"use client";

import React, { useState } from "react";
import { useApp } from "../providers/Providers";
import { Flame, Send, ArrowLeft, Eye, Clock, Film, Mic, Bomb, Egg, Sparkles, X, Play, UserPlus, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ELEMENTAL_PETS } from "@/data/elementalPets";

export function ChatTab() {
  const { user, setUser, chats, selectedChatId, setSelectedChatId, sendMessage, sendGameInvite, sendPetInvite, sendVoiceMessage, sendSecretViewOnce, viewSecretMessage, reactToMessage, triggerAiMemory, sendTimeCapsule, voteInGuessPicGame, revealGuessPicAuthor, startNewChatWith } = useApp();
  const [inputText, setInputText] = useState("");
  const [newFriendHandle, setNewFriendHandle] = useState("");
  
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [showCapsuleModal, setShowCapsuleModal] = useState(false);
  const [showPetInviteModal, setShowPetInviteModal] = useState(false);
  
  const [secretText, setSecretText] = useState("");
  const [capTitle, setCapTitle] = useState("");
  const [capSecret, setCapSecret] = useState("");
  const [capDays, setCapDays] = useState(30);
  const [petInviteName, setPetInviteName] = useState("");
  const [petInviteType, setPetInviteType] = useState<any>("foguinho");
  const [reactingMsgId, setReactingMsgId] = useState<string | null>(null);

  const activeChat = chats.find((c: any) => c.id === selectedChatId);

  const handleSend = () => {
    if (!inputText.trim() || !selectedChatId) return;
    sendMessage(selectedChatId, inputText);
    setInputText("");
  };

  const handleSendSecretSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretText.trim() || !selectedChatId) return;
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    sendSecretViewOnce(selectedChatId, secretText);
    setShowSecretModal(false); setSecretText("");
  };

  const handleSendCapsuleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!capTitle.trim() || !selectedChatId) return;
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    sendTimeCapsule(selectedChatId, capTitle, capSecret || "Lembrança selada pro nosso futuro!", capDays);
    setShowCapsuleModal(false); setCapTitle(""); setCapSecret("");
  };

  const handleSendPetInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petInviteName.trim() || !selectedChatId) return;
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
    sendPetInvite(selectedChatId, petInviteName, petInviteType);
    setShowPetInviteModal(false);
  };

  const handleSendVoice = () => {
    if (!selectedChatId) return;
    confetti({ particleCount: 20, spread: 40, origin: { y: 0.7 } });
    sendVoiceMessage(selectedChatId, Math.floor(Math.random() * 10) + 5);
  };

  const handleAcceptPetInvite = (pName: string) => {
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.4 }, colors: ["#ff5500", "#00f0ff", "#ffd700"] });
    alert(`🥚💥 PARABÉNS! O ovo elemental 3D rachou!\n\nO mascote "${pName}" nasceu para você e ${activeChat?.name || "seu amigo"} cuidarem em dupla! Acesse a aba 'Mascotes' para alimentá-lo.`);
    if (user) {
      const next = { ...user, petId: "pet-my-1" };
      setUser(next);
      localStorage.setItem("instants_u_v7", JSON.stringify(next));
    }
  };

  const handleStartNewFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendHandle.trim()) return;
    startNewChatWith(newFriendHandle);
    setNewFriendHandle("");
  };

  const reactionEmojis = ["❤️", "🔥", "🚀", "💩", "⚡️", "💜"];

  return (
    <div className="mx-auto max-w-md pb-24 pt-2 px-3 min-h-[80vh]">
      <AnimatePresence mode="wait">
        {!activeChat ? (
          <motion.div key="chat-list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-black text-white">Mensagens Privadas 💬</h2>
              <span className="text-xs font-bold text-neutral-400">{chats.length} conexões</span>
            </div>

            {/* ADICIONAR NOVO AMIGO AO CHAT */}
            <form onSubmit={handleStartNewFriend} className="rounded-2xl bg-dark-card border border-fire/40 p-3 shadow-lg flex items-center space-x-2">
              <input
                type="text"
                placeholder="Conectar com @handle (Ex: sofia.neon)"
                value={newFriendHandle}
                onChange={(e) => setNewFriendHandle(e.target.value)}
                className="flex-1 rounded-xl bg-dark-elevated border border-white/10 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-fire"
              />
              <button type="submit" className="rounded-xl bg-fire px-3 py-2 text-xs font-black text-white hover:bg-fire-glow shadow-sm shrink-0 flex items-center space-x-1">
                <UserPlus className="h-3.5 w-3.5" />
                <span>Conectar</span>
              </button>
            </form>

            {chats.length === 0 ? (
              <div className="rounded-3xl bg-dark-card/60 border border-white/5 p-8 text-center space-y-3">
                <MessageCircle className="h-10 w-10 text-neutral-500 mx-auto" />
                <p className="text-sm font-bold text-white">Sua caixa de mensagens está limpa!</p>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">Digite o @handle de um amigo acima e clique em 'Conectar' para abrirem um chat privado criptografado.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {chats.map((chat: any) => (
                  <motion.div
                    key={chat.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedChatId(chat.id)}
                    className="cursor-pointer overflow-hidden rounded-2xl p-3.5 shadow-xl backdrop-blur-md flex items-center justify-between transition-colors border bg-dark-card border-white/10 hover:border-white/20"
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className="relative shrink-0">
                        <img src={chat.avatar} alt={chat.name} className="h-12 w-12 rounded-full object-cover border border-white/10" />
                        {chat.isOnline && <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-dark-card" />}
                      </div>
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="flex items-center space-x-1.5">
                          <h3 className="text-sm font-bold text-white truncate">{chat.name}</h3>
                          <span className="rounded-full bg-neon-pink/20 border border-neon-pink/40 px-1.5 py-0.5 text-[9px] font-black text-neon-pink">Nvl {chat.friendshipLevel || 1} 💖</span>
                        </div>
                        <p className="text-xs text-neutral-400 truncate mt-0.5">{chat.lastMessage}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0 space-y-1">
                      <span className="flex items-center space-x-1 rounded-full bg-fire/15 border border-fire/30 px-2 py-0.5 text-[11px] font-black text-fire-light">
                        <Flame className="h-3 w-3 fill-fire text-fire animate-fire-flicker" />
                        <span>{chat.streak}d</span>
                      </span>
                      <span className="text-[10px] text-neutral-500">{chat.lastMessageTime}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div key="chat-room" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col h-[78vh] bg-dark-card/60 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl relative">
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-dark-card/95">
              <div className="flex items-center space-x-2">
                <button onClick={() => setSelectedChatId(null)} className="rounded-full p-1 text-neutral-300 hover:bg-white/10"><ArrowLeft className="h-5 w-5" /></button>
                <img src={activeChat.avatar} alt={activeChat.name} className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <div className="flex items-center space-x-1">
                    <h3 className="text-xs font-bold text-white">{activeChat.name}</h3>
                    <span className="text-[10px] text-neon-pink font-black">Nvl {activeChat.friendshipLevel} 💖</span>
                  </div>
                  <p className="text-[9px] text-emerald-400 font-medium">Conectado SSL ✨</p>
                </div>
              </div>

              {!user?.petId && (
                <button
                  onClick={() => setShowPetInviteModal(true)}
                  className="flex items-center space-x-1 rounded-xl bg-gradient-to-r from-fire to-amber-500 px-2.5 py-1.5 text-[10px] font-black text-dark-bg shadow-md animate-bounce"
                >
                  <Egg className="h-3.5 w-3.5" />
                  <span>Criar Pet Dupla 🥚</span>
                </button>
              )}

              <button onClick={() => triggerAiMemory(activeChat.id)} className="flex items-center space-x-1 rounded-xl bg-neon-purple/20 border border-neon-purple/40 px-2 py-1 text-[10px] font-black text-neon-purple ml-1">
                <Film className="h-3.5 w-3.5 animate-spin" />
                <span>IA Vídeo</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeChat?.messages?.map((msg: any) => (
                <div key={msg.id} className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"} relative group`}>
                  <div
                    onClick={() => setReactingMsgId(reactingMsgId === msg.id ? null : msg.id)}
                    className={`cursor-pointer max-w-[85%] rounded-2xl p-3 text-xs shadow-md transition-transform ${
                      msg.isMe ? "bg-gradient-to-tr from-fire to-fire-glow text-white rounded-br-xs font-medium" : "bg-dark-elevated border border-white/10 text-neutral-200 rounded-bl-xs"
                    }`}
                  >
                    {msg.petInvite && (
                      <div className="rounded-2xl bg-black/80 p-4 border-2 border-fire space-y-2.5 text-center min-w-[210px] my-1 shadow-xl">
                        <span className="text-4xl block animate-bounce">🥚🐣</span>
                        <p className="text-xs font-black text-fire-light uppercase tracking-wider">Convite Tamagotchi em Dupla</p>
                        <p className="text-[11px] text-neutral-200">
                          <strong>{msg.petInvite.senderName || activeChat?.name || "Amigo"}</strong> te convidou para chocarem e cuidarem juntos do mascote 3D elemental <strong>"{msg.petInvite.petName}"</strong>!
                        </p>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAcceptPetInvite(msg.petInvite.petName); }}
                          className="w-full rounded-xl bg-gradient-to-r from-fire to-amber-400 py-2.5 text-xs font-black text-dark-bg shadow-[0_0_15px_#ff5500] hover:scale-105 transition-all block mt-2"
                        >
                          ACEITAR & NASCER PET 3D 🐾✨
                        </button>
                      </div>
                    )}

                    {msg.gameInvite && msg.gameInvite.gameType === "guess_pic" && (
                      <div className="rounded-2xl bg-black/85 p-3.5 border border-neon-cyan space-y-3 text-center min-w-[230px] my-1">
                        <div className="flex items-center justify-center space-x-1 text-neon-cyan font-black text-xs">
                          <Eye className="h-4 w-4 animate-bounce" />
                          <span>Quem Tirou a Foto? 🕵️‍♂️📸</span>
                        </div>
                        <p className="text-[10px] text-neutral-300">Olhe a foto abaixo e adivinhe quem do squad disparou!</p>

                        <div className="relative aspect-square rounded-xl overflow-hidden border border-white/20">
                          <img src={msg.gameInvite.photoUrl || "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80"} alt="Guess Pic" className="w-full h-full object-cover" />
                        </div>

                        {msg.gameInvite.status !== "finished" ? (
                          <div className="space-y-1.5">
                            <div className="grid grid-cols-2 gap-1.5">
                              {["Sofia Neon", "Alex Cyber", "Lucas Shader", "Bia Cyber"].map((candidate) => {
                                const votesCount = Object.values(msg.gameInvite.votes || {}).filter((v) => v === candidate).length;
                                return (
                                  <button
                                    key={candidate}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      confetti({ particleCount: 15, spread: 30, origin: { y: 0.6 } });
                                      voteInGuessPicGame(activeChat.id, msg.gameInvite.id, candidate);
                                    }}
                                    className="p-2 rounded-xl bg-dark-card hover:bg-neon-cyan hover:text-dark-bg border border-white/10 text-[10px] font-black transition-all flex justify-between items-center"
                                  >
                                    <span className="truncate">{candidate.split(" ")[0]}</span>
                                    {votesCount > 0 && <span className="bg-fire px-1.5 rounded-full text-white text-[9px]">{votesCount}</span>}
                                  </button>
                                );
                              })}
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
                                revealGuessPicAuthor(activeChat.id, msg.gameInvite.id);
                              }}
                              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-fire py-2 text-[11px] font-black text-dark-bg shadow-md mt-2 block"
                            >
                              Revelar Resposta & XP 🏆
                            </button>
                          </div>
                        ) : (
                          <div className="rounded-xl bg-emerald-500/20 border border-emerald-500 p-2.5 text-center space-y-1">
                            <p className="text-[10px] text-emerald-300 font-bold">🎯 RESPOSTA REVELADA:</p>
                            <p className="text-xs font-black text-white">{msg.gameInvite.revealedAuthor}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {msg.mediaType === "voice" && msg.voiceMessage && (
                      <div className="flex items-center space-x-2 py-1 min-w-[150px]"><button onClick={() => alert("▶️ Áudio")} className="p-1.5 bg-white/20 rounded-full"><Play className="h-3.5 w-3.5 fill-white" /></button><span className="font-mono text-[10px]">{msg.voiceMessage.duration}s</span></div>
                    )}

                    {msg.mediaType === "secret_once" && msg.secretMessage && (
                      <div className="p-2.5 bg-black/70 border border-red-500 rounded-xl text-center"><p className="text-[10px] text-red-400 font-black">💣 Secreta (1x)</p><button onClick={() => { alert(`💣 "${msg.secretMessage.text}"`); viewSecretMessage(activeChat.id, msg.id); }} className="mt-1 px-2 py-1 bg-red-500/30 text-[10px] rounded text-white font-black">Abrir</button></div>
                    )}

                    {msg.mediaUrl && msg.mediaType !== "secret_once" && !msg.timeCapsule && !msg.gameInvite && (
                      <div className="mb-2 overflow-hidden rounded-xl border border-white/20"><img src={msg.mediaUrl} alt="sent" className="w-full max-h-48 object-cover" /></div>
                    )}

                    {msg.text && <p className="leading-relaxed">{msg.text}</p>}
                  </div>

                  {reactingMsgId === msg.id && (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="absolute -top-10 z-50 flex space-x-1 bg-dark-card p-1.5 rounded-full border border-white/20 shadow-2xl">
                      {reactionEmojis.map((emj) => (<button key={emj} onClick={() => { reactToMessage(activeChat.id, msg.id, emj); setReactingMsgId(null); }} className="p-1 text-base">{emj}</button>))}
                    </motion.div>
                  )}
                  <span className="text-[8px] text-neutral-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-white/10 bg-dark-card/95 space-y-2">
              <div className="flex items-center space-x-1.5">
                <button onClick={handleSendVoice} className="p-2 rounded-xl bg-neon-purple/20 text-neon-purple font-black text-xs"><Mic className="h-4 w-4" /></button>
                <button onClick={() => setShowSecretModal(true)} className="p-2 rounded-xl bg-red-500/20 text-red-400 font-black text-xs"><Bomb className="h-4 w-4" /></button>
                <button onClick={() => setShowCapsuleModal(true)} className="p-2 rounded-xl bg-amber-500/20 text-amber-400 font-black text-xs"><Clock className="h-4 w-4" /></button>
                
                <button
                  onClick={() => sendGameInvite(activeChat.id, "guess_pic", "Quem Tirou a Foto? 🕵️‍♂️📸")}
                  className="flex items-center space-x-1 rounded-xl bg-neon-cyan/20 border border-neon-cyan/40 px-2.5 py-2 text-xs font-black text-neon-cyan hover:bg-neon-cyan/30"
                  title="Mandar Desafio: Quem Tirou a Foto?"
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Foto Jogo</span>
                </button>

                <input type="text" placeholder="Escreva..." value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} className="flex-1 rounded-xl bg-dark-elevated border border-white/15 px-3 py-2 text-xs text-white focus:outline-hidden" />
                <button onClick={handleSend} className="rounded-xl bg-fire p-2 text-white"><Send className="h-4 w-4" /></button>
              </div>
            </div>

            <AnimatePresence>
              {showPetInviteModal && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/95 p-5 flex flex-col justify-center text-left">
                  <form onSubmit={handleSendPetInviteSubmit} className="space-y-3.5 bg-dark-card p-5 rounded-3xl border-2 border-fire shadow-2xl overflow-hidden">
                    <div className="flex justify-between"><h4 className="text-sm font-black text-fire flex items-center space-x-1"><Egg className="h-4 w-4" /><span>Escolher Pet Dupla 3D 🥚</span></h4><button type="button" onClick={() => setShowPetInviteModal(false)}><X className="h-4 w-4 text-neutral-400" /></button></div>
                    <p className="text-[10px] text-neutral-300">Escolha o Mascote Elemental 3D que você e {activeChat?.name || "Amigo"} chocarão e cuidarão juntos:</p>
                    
                    <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                      {ELEMENTAL_PETS.map((p) => (
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => { setPetInviteType(p.id); setPetInviteName(p.name.split(" ")[0]); }}
                          className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            petInviteType === p.id ? "bg-fire/20 border-fire shadow-md scale-102" : "bg-dark-elevated border-white/10 opacity-75"
                          }`}
                        >
                          <div className="flex justify-between items-center w-full">
                            <span className="text-xs font-black text-white">{p.name}</span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: p.color, color: "#111" }}>{p.badge}</span>
                          </div>
                          <p className="text-[9px] text-neutral-300 mt-1 line-clamp-2 leading-tight">{p.personality}</p>
                        </button>
                      ))}
                    </div>

                    <input type="text" required placeholder="Dê um apelido ao mascote (Ex: Igneous)" value={petInviteName} onChange={(e) => setPetInviteName(e.target.value)} className="w-full bg-dark-elevated rounded-xl p-2.5 text-xs text-white" />
                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-fire to-amber-500 rounded-xl text-dark-bg font-black text-xs shadow-lg">Enviar Convite Elemental 💌</button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showSecretModal && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/90 p-6 flex flex-col justify-center"><form onSubmit={(e) => { e.preventDefault(); sendSecretViewOnce(activeChat.id, secretText); setShowSecretModal(false); }} className="space-y-4 bg-dark-card p-5 rounded-3xl border border-red-500"><div className="flex justify-between"><h4 className="text-sm font-black text-red-400">View Once 💣</h4><button type="button" onClick={() => setShowSecretModal(false)}><X className="h-4 w-4" /></button></div><textarea required placeholder="Segredo..." value={secretText} onChange={(e) => setSecretText(e.target.value)} className="w-full h-20 bg-dark-elevated rounded-xl p-3 text-xs text-white" /><button type="submit" className="w-full py-3 bg-red-500 rounded-xl text-white font-black text-xs">Enviar 1x</button></form></motion.div>)}
            </AnimatePresence>

            <AnimatePresence>
              {showCapsuleModal && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/90 p-6 flex flex-col justify-center"><form onSubmit={(e) => { e.preventDefault(); sendTimeCapsule(activeChat.id, capTitle, capSecret, capDays); setShowCapsuleModal(false); }} className="space-y-4 bg-dark-card p-5 rounded-3xl border border-amber-500"><div className="flex justify-between"><h4 className="text-sm font-black text-amber-400">Cápsula ⏳</h4><button type="button" onClick={() => setShowCapsuleModal(false)}><X className="h-4 w-4" /></button></div><input type="text" required placeholder="Título..." value={capTitle} onChange={(e) => setCapTitle(e.target.value)} className="w-full bg-dark-elevated rounded-xl p-2.5 text-xs text-white" /><textarea placeholder="Mensagem..." value={capSecret} onChange={(e) => setCapSecret(e.target.value)} className="w-full h-16 bg-dark-elevated rounded-xl p-3 text-xs text-white" /><button type="submit" className="w-full py-3 bg-amber-500 rounded-xl text-dark-bg font-black text-xs">Trancar & Enviar 🔒</button></form></motion.div>)}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useApp } from "../providers/Providers";
import { Flame, Send, Camera, ArrowLeft, CheckCheck, Gamepad2, Play, Trophy, X, Lock, Bomb, Eye, Clock, Film, Mic, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function ChatTab() {
  const { chats, selectedChatId, setSelectedChatId, sendMessage, sendGameInvite, sendVoiceMessage, sendSecretViewOnce, viewSecretMessage, reactToMessage, triggerAiMemory, sendTimeCapsule, voteInGuessPicGame, revealGuessPicAuthor } = useApp();
  const [inputText, setInputText] = useState("");
  
  const [showGameDrawer, setShowGameDrawer] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [showCapsuleModal, setShowCapsuleModal] = useState(false);
  
  const [secretText, setSecretText] = useState("");
  const [capTitle, setCapTitle] = useState("");
  const [capSecret, setCapSecret] = useState("");
  const [capDays, setCapDays] = useState(30);
  const [reactingMsgId, setReactingMsgId] = useState<string | null>(null);

  // Mini Jogo Arena
  const [activeMiniGame, setActiveMiniGame] = useState<string | null>(null);
  const [gameScoreMe, setGameScoreMe] = useState(0);
  const [gameScoreFriend, setGameScoreFriend] = useState(0);

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

  const handleSendVoice = () => {
    if (!selectedChatId) return;
    confetti({ particleCount: 20, spread: 40, origin: { y: 0.7 } });
    sendVoiceMessage(selectedChatId, Math.floor(Math.random() * 10) + 5);
  };

  const handleStartGame = (gameType: any, gameName: string) => {
    if (!selectedChatId) return;
    sendGameInvite(selectedChatId, gameType, gameName);
    setShowGameDrawer(false);
    if (gameType !== "guess_pic" && gameType !== "quiz") {
      setActiveMiniGame(gameType); setGameScoreMe(0); setGameScoreFriend(0);
    }
  };

  const handlePlayMiniGameStep = () => {
    setGameScoreMe((prev) => prev + 1);
    if (Math.random() > 0.4) setGameScoreFriend((prev) => prev + 1);
    confetti({ particleCount: 15, spread: 30, origin: { y: 0.6 }, colors: ["#00f0ff"] });
  };

  const gamesList = [
    { type: "guess_pic", name: "Quem Mandou a Foto? 🕵️‍♂️📸", desc: "Votação funcional anônima" },
    { type: "quiz", name: "Quiz Besties ❓🧠", desc: "Perguntas exclusivas sobre vocês" },
    { type: "pingpong", name: "Ping Pong Neon 🏓", desc: "Rebata a bola em velocidade turbo" },
    { type: "soccer", name: "Pênalti Master ⚽️", desc: "Chute no ângulo" },
    { type: "space", name: "Guerra Espacial 🚀👾", desc: "Destrua naves invasoras" },
  ];

  const reactionEmojis = ["❤️", "🔥", "🚀", "💩", "⚡️", "💜"];

  return (
    <div className="mx-auto max-w-md pb-24 pt-2 px-3 min-h-[80vh]">
      <AnimatePresence mode="wait">
        {!activeChat ? (
          <motion.div key="chat-list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-black text-white">Mensagens & Salas 🎉💬</h2>
              <span className="text-xs font-bold text-neutral-400">{chats.length} chats ativos</span>
            </div>

            <div className="space-y-2.5">
              {chats.map((chat: any) => (
                <motion.div
                  key={chat.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`cursor-pointer overflow-hidden rounded-2xl p-3.5 shadow-xl backdrop-blur-md flex items-center justify-between transition-colors border ${
                    chat.isTemporaryRoom ? "bg-gradient-to-r from-neon-pink/20 to-dark-card border-neon-pink/50" : "bg-dark-card border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="relative shrink-0">
                      <img src={chat.avatar} alt={chat.name} className="h-12 w-12 rounded-full object-cover border border-white/10" />
                      {chat.isOnline && <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-dark-card" />}
                    </div>
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center space-x-1.5">
                        <h3 className="text-sm font-bold text-white truncate">{chat.name}</h3>
                        {chat.isTemporaryRoom ? (
                          <span className="rounded-full bg-neon-pink px-1.5 py-0.5 text-[8px] font-black text-white">⏳ {chat.roomExpiresIn}</span>
                        ) : (
                          <span className="rounded-full bg-neon-pink/20 border border-neon-pink/40 px-1.5 py-0.5 text-[9px] font-black text-neon-pink">Nvl {chat.friendshipLevel || 1} 💖</span>
                        )}
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
          </motion.div>
        ) : (
          <motion.div key="chat-room" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col h-[78vh] bg-dark-card/60 rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl relative">
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-dark-card/95">
              <div className="flex items-center space-x-2.5">
                <button onClick={() => { setSelectedChatId(null); setActiveMiniGame(null); }} className="rounded-full p-1 text-neutral-300 hover:bg-white/10"><ArrowLeft className="h-5 w-5" /></button>
                <img src={activeChat.avatar} alt={activeChat.name} className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <div className="flex items-center space-x-1">
                    <h3 className="text-xs font-bold text-white">{activeChat.name}</h3>
                    {activeChat.isTemporaryRoom ? <span className="text-[9px] bg-neon-pink px-1 rounded text-white font-black">Festa 🪩</span> : <span className="text-[10px] text-neon-pink font-black">Nvl {activeChat.friendshipLevel} 💖</span>}
                  </div>
                  <p className="text-[9px] text-emerald-400 font-medium">Ranking Besties Privado 🏆</p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button onClick={() => triggerAiMemory(activeChat.id)} className="flex items-center space-x-1 rounded-xl bg-neon-purple/20 border border-neon-purple/40 px-2 py-1 text-[10px] font-black text-neon-purple hover:scale-105">
                  <Film className="h-3.5 w-3.5 animate-spin" />
                  <span>IA Vídeo</span>
                </button>
              </div>
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
                    {/* JOGO FUNCIONAL: QUEM MANDOU A FOTO? */}
                    {msg.gameInvite && msg.gameInvite.gameType === "guess_pic" && (
                      <div className="rounded-2xl bg-black/80 p-3.5 border border-neon-cyan space-y-3 text-center min-w-[230px] my-1">
                        <div className="flex items-center justify-center space-x-1 text-neon-cyan font-black text-xs">
                          <Eye className="h-4 w-4 animate-bounce" />
                          <span>Votação: Quem Mandou a Foto? 🕵️‍♂️📸</span>
                        </div>

                        {/* Foto Anônima Borrada vs Revelada */}
                        <div className="relative aspect-square rounded-xl overflow-hidden border border-white/20">
                          <img
                            src={msg.gameInvite.anonPhotoUrl}
                            alt="Anon Pic"
                            className={`w-full h-full object-cover transition-all duration-700 ${
                              msg.gameInvite.status === "finished" ? "blur-none brightness-100 scale-105" : "blur-md brightness-75 select-none"
                            }`}
                          />
                          {msg.gameInvite.status !== "finished" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-[10px] font-black tracking-widest text-white uppercase">
                              🔒 Foto Anônima Sorteada
                            </div>
                          )}
                        </div>

                        {/* Área de Votos ao Vivo */}
                        {msg.gameInvite.status !== "finished" ? (
                          <div className="space-y-1.5">
                            <p className="text-[10px] text-neutral-300 font-bold">Vote em quem você acha que tirou essa foto:</p>
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
                              Encerrar Votação & Revelar Autor 👁️
                            </button>
                          </div>
                        ) : (
                          <div className="rounded-xl bg-emerald-500/20 border border-emerald-500 p-2.5 text-center space-y-1 animate-pulse">
                            <p className="text-[10px] text-emerald-300 font-bold">🏆 AUTOR REVELADO COM SUCESSO:</p>
                            <p className="text-xs font-black text-white">{msg.gameInvite.revealedAuthor}</p>
                            <p className="text-[9px] text-neutral-300">+300 XP distribuídos para quem acertou!</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* QUIZ FUNCIONAL */}
                    {msg.gameInvite && msg.gameInvite.gameType === "quiz" && (
                      <div className="rounded-2xl bg-dark-bg/90 p-3.5 border border-neon-purple space-y-2 text-center min-w-[210px] my-1">
                        <p className="text-neon-purple font-black text-xs">❓ Quiz Besties</p>
                        <p className="text-xs font-bold text-white">{msg.gameInvite.question}</p>
                        <div className="space-y-1 pt-1">
                          {msg.gameInvite.options?.map((opt: string, i: number) => (
                            <button key={i} onClick={(e) => { e.stopPropagation(); confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } }); alert("Acertou em cheio! +100 XP de amizade"); }} className="w-full p-2 rounded-xl bg-dark-card hover:bg-neon-purple text-xs font-black text-left">{opt}</button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CÁPSULA */}
                    {msg.timeCapsule && (
                      <div className="rounded-xl bg-black/60 p-3 border border-amber-500 text-center min-w-[190px] my-1"><p className="text-amber-400 font-black text-xs">🔒 Cápsula Selada ({msg.timeCapsule.unlockDate})</p><p className="text-xs font-bold text-white mt-1">{msg.timeCapsule.title}</p></div>
                    )}

                    {msg.mediaUrl && !msg.timeCapsule && msg.mediaType !== "ai_memory" && (
                      <div className="mb-2 overflow-hidden rounded-xl border border-white/20"><img src={msg.mediaUrl} alt="sent" className="w-full max-h-48 object-cover" /></div>
                    )}

                    {msg.text && <p className="leading-relaxed">{msg.text}</p>}
                  </div>

                  {/* Popover Emojis */}
                  <AnimatePresence>
                    {reactingMsgId === msg.id && (
                      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="absolute -top-10 z-50 flex items-center space-x-1 bg-dark-card p-1.5 rounded-full border border-white/20 shadow-2xl">
                        {reactionEmojis.map((emj) => (<button key={emj} onClick={() => { reactToMessage(activeChat.id, msg.id, emj); setReactingMsgId(null); }} className="p-1 text-base hover:scale-125">{emj}</button>))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="text-[8px] text-neutral-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* OVERLAY MINI JOGO */}
            <AnimatePresence>
              {activeMiniGame && (
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="absolute inset-x-0 bottom-0 top-12 z-50 bg-dark-bg/95 p-4 flex flex-col justify-between border-t border-neon-cyan">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2"><h4 className="text-xs font-black text-neon-cyan">Arena Duelo</h4><button onClick={() => setActiveMiniGame(null)}><X className="h-5 w-5" /></button></div>
                  <div className="text-center space-y-4 my-auto"><p className="text-4xl font-black text-white">{gameScoreMe} VS {gameScoreFriend}</p><button onClick={handlePlayMiniGameStep} className="w-full py-4 rounded-2xl bg-neon-cyan text-dark-bg font-black text-base">JOGAR ⚡️ (+1 pt)</button></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom bar */}
            <div className="p-3 border-t border-white/10 bg-dark-card/95 space-y-2">
              <div className="flex items-center space-x-1.5">
                <button onClick={handleSendVoice} className="p-2 rounded-xl bg-neon-purple/20 text-neon-purple font-black text-xs" title="Áudio Rápido"><Mic className="h-4 w-4" /></button>
                <button onClick={() => setShowSecretModal(true)} className="p-2 rounded-xl bg-red-500/20 text-red-400 font-black text-xs" title="View Once"><Bomb className="h-4 w-4" /></button>
                <button onClick={() => setShowCapsuleModal(true)} className="p-2 rounded-xl bg-amber-500/20 text-amber-400 font-black text-xs" title="Cápsula"><Clock className="h-4 w-4" /></button>
                <button onClick={() => setShowGameDrawer(!showGameDrawer)} className="p-2 rounded-xl bg-neon-cyan/20 text-neon-cyan font-black text-xs"><Gamepad2 className="h-4 w-4" /></button>
                <input type="text" placeholder="Escreva..." value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} className="flex-1 rounded-xl bg-dark-elevated border border-white/15 px-3 py-2 text-xs text-white focus:outline-hidden" />
                <button onClick={handleSend} className="rounded-xl bg-fire p-2 text-white"><Send className="h-4 w-4" /></button>
              </div>

              <AnimatePresence>
                {showGameDrawer && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {gamesList.map((g) => (<button key={g.type} onClick={() => handleStartGame(g.type, g.name)} className="rounded-xl bg-dark-elevated p-2 border border-white/10 text-left hover:border-neon-cyan"><span className="text-xs font-bold text-white block">{g.name}</span><span className="text-[9px] text-neutral-400">{g.desc}</span></button>))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* MODAIS GERAIS */}
            <AnimatePresence>
              {showSecretModal && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/90 p-6 flex flex-col justify-center"><form onSubmit={(e) => { e.preventDefault(); sendSecretViewOnce(activeChat.id, secretText); setShowSecretModal(false); }} className="space-y-4 bg-dark-card p-5 rounded-3xl border border-red-500"><div className="flex justify-between"><h4 className="text-sm font-black text-red-400">Mensagem Secreta 1x 💣</h4><button type="button" onClick={() => setShowSecretModal(false)}><X className="h-4 w-4" /></button></div><textarea required placeholder="Segredo..." value={secretText} onChange={(e) => setSecretText(e.target.value)} className="w-full h-20 bg-dark-elevated rounded-xl p-3 text-xs text-white" /><button type="submit" className="w-full py-3 bg-red-500 rounded-xl text-white font-black text-xs">Enviar View Once</button></form></motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showCapsuleModal && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/90 p-6 flex flex-col justify-center"><form onSubmit={(e) => { e.preventDefault(); sendTimeCapsule(activeChat.id, capTitle, capSecret, capDays); setShowCapsuleModal(false); }} className="space-y-4 bg-dark-card p-5 rounded-3xl border border-amber-500"><div className="flex justify-between"><h4 className="text-sm font-black text-amber-400">Cápsula do Tempo ⏳</h4><button type="button" onClick={() => setShowCapsuleModal(false)}><X className="h-4 w-4" /></button></div><input type="text" required placeholder="Título..." value={capTitle} onChange={(e) => setCapTitle(e.target.value)} className="w-full bg-dark-elevated rounded-xl p-2.5 text-xs text-white" /><textarea placeholder="Mensagem..." value={capSecret} onChange={(e) => setCapSecret(e.target.value)} className="w-full h-16 bg-dark-elevated rounded-xl p-3 text-xs text-white" /><div className="flex space-x-2"><button type="button" onClick={() => setCapDays(30)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${capDays === 30 ? "bg-amber-500 text-dark-bg" : "bg-dark-elevated"}`}>1 Mês</button><button type="button" onClick={() => setCapDays(365)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${capDays === 365 ? "bg-amber-500 text-dark-bg" : "bg-dark-elevated"}`}>1 Ano</button></div><button type="submit" className="w-full py-3 bg-amber-500 rounded-xl text-dark-bg font-black text-xs">Selar & Enviar 🔒</button></form></motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

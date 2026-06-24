"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Instant, FriendChat, User, Pet, GameInvite, Clan } from "@/types";
import { CURRENT_USER_MOCK, INITIAL_INSTANTS, INITIAL_FRIENDS_CHATS, INITIAL_MY_PET, INITIAL_CLAN } from "@/data/mockData";

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  pet: Pet;
  setPet: React.Dispatch<React.SetStateAction<Pet>>;
  clan: Clan;
  setClan: React.Dispatch<React.SetStateAction<Clan>>;
  instants: Instant[];
  chats: FriendChat[];
  activeTab: "feed" | "camera" | "pet" | "chat" | "clan" | "profile";
  setActiveTab: (tab: "feed" | "camera" | "pet" | "chat" | "clan" | "profile") => void;
  isSimultaneousActive: boolean;
  setIsSimultaneousActive: (active: boolean) => void;
  addInstant: (mediaUrl: string, caption: string, mediaType?: "image" | "video") => void;
  likeInstant: (id: string) => void;
  replyWithPhotoOnly: (instantId: string, photoUrl: string) => void;
  sendMessage: (friendId: string, text?: string, mediaUrl?: string) => void;
  sendGameInvite: (friendId: string, gameType: GameInvite["gameType"], gameName: string) => void;
  sendPetInvite: (friendId: string, petName: string, petType: Pet["type"]) => void;
  sendVoiceMessage: (friendId: string, duration: number) => void;
  sendSecretViewOnce: (friendId: string, text: string) => void;
  viewSecretMessage: (friendId: string, msgId: string) => void;
  reactToMessage: (friendId: string, msgId: string, emoji: string) => void;
  sendTimeCapsule: (friendId: string, title: string, secretText: string, days: number) => void;
  triggerAiMemory: (friendId: string) => void;
  breedPets: (friendPetType: Pet["type"], name: string) => void;
  claimClanMission: (missionId: string) => void;
  updateUserBio: (bio: string) => void;
  toggleFollowUser: (friendId: string) => void;
  voteInGuessPicGame: (friendId: string, inviteId: string, votedName: string) => void;
  revealGuessPicAuthor: (friendId: string, inviteId: string) => void;
  feedPet: () => void;
  playPet: () => void;
  cleanPet: () => void;
  sleepPet: () => void;
  updatePetStyle: (slot: "hat" | "glasses" | "accessory", value: string) => void;
  registerAccount: (name: string, handle: string, petName: string, petType: Pet["type"]) => void;
  loginAccount: (handle: string) => void;
  logout: () => void;
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp deve ser usado dentro de um AppProvider");
  }
  return context;
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pet, setPet] = useState<Pet>(INITIAL_MY_PET);
  const [clan, setClan] = useState<Clan>(INITIAL_CLAN);
  const [instants, setInstants] = useState<Instant[]>(INITIAL_INSTANTS);
  const [chats, setChats] = useState<FriendChat[]>(INITIAL_FRIENDS_CHATS);
  const [activeTab, setActiveTab] = useState<"feed" | "camera" | "pet" | "chat" | "clan" | "profile">("feed");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isSimultaneousActive, setIsSimultaneousActive] = useState(true);

  useEffect(() => {
    const u = localStorage.getItem("instants_u_v6");
    if (u) try { setUser(JSON.parse(u)); } catch (e) {}
  }, []);

  const saveUser = (u: User | null) => {
    if (u) localStorage.setItem("instants_u_v6", JSON.stringify(u));
  };

  const registerAccount = (name: string, handle: string, petName: string, petType: Pet["type"]) => {
    const newUser: User = { ...CURRENT_USER_MOCK, name: name || "Alex Cyber", handle: handle.startsWith("@") ? handle : `@${handle}` };
    const newPet: Pet = { ...INITIAL_MY_PET, name: petName || "Byte", type: petType || "dragon", owners: [{ name: newUser.name, avatar: newUser.image }], isShared: false };
    setUser(newUser); setPet(newPet); saveUser(newUser);
  };

  const loginAccount = (handle: string) => {
    const defaultName = handle ? handle.replace("@", "").toUpperCase() : "Alex Cyber";
    const loggedUser: User = { ...CURRENT_USER_MOCK, name: defaultName, handle: handle.startsWith("@") ? handle : `@${handle || "alex.instants"}` };
    setUser(loggedUser); saveUser(loggedUser);
  };

  const logout = () => { setUser(null); localStorage.removeItem("instants_u_v6"); };

  const updateUserBio = (bio: string) => {
    if (!user) return;
    const next = { ...user, bio };
    setUser(next); saveUser(next);
  };

  const toggleFollowUser = (friendId: string) => {
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? {
      ...chat,
      isFollowing: !chat.isFollowing,
      followersCount: !chat.isFollowing ? (chat.followersCount || 100) + 1 : (chat.followersCount || 100) - 1
    } : chat));
    if (user) {
      const next = { ...user, followingCount: user.followingCount + 1 };
      setUser(next); saveUser(next);
    }
  };

  const voteInGuessPicGame = (friendId: string, inviteId: string, votedName: string) => {
    if (!user) return;
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? {
      ...chat,
      messages: chat.messages.map((m: any) => m.gameInvite && m.gameInvite.id === inviteId ? {
        ...m,
        gameInvite: { ...m.gameInvite, votes: { ...(m.gameInvite.votes || {}), [user.id]: votedName } }
      } : m)
    } : chat));
  };

  const revealGuessPicAuthor = (friendId: string, inviteId: string) => {
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? {
      ...chat,
      messages: chat.messages.map((m: any) => m.gameInvite && m.gameInvite.id === inviteId ? {
        ...m,
        gameInvite: { ...m.gameInvite, status: "finished" as const, revealedAuthor: "Sofia Neon (Anônimo Sorteado 👁️✨)" }
      } : m)
    } : chat));
  };

  const feedPet = () => { setPet((p: any) => ({ ...p, hunger: Math.min(100, p.hunger + 25), xp: p.xp + 15 })); };
  const playPet = () => { setPet((p: any) => ({ ...p, happiness: Math.min(100, p.happiness + 25), energy: Math.max(0, p.energy - 10), xp: p.xp + 20 })); };
  const cleanPet = () => { setPet((p: any) => ({ ...p, hygiene: Math.min(100, p.hygiene + 30), xp: p.xp + 10 })); };
  const sleepPet = () => { setPet((p: any) => ({ ...p, energy: 100 })); };
  const updatePetStyle = (slot: any, value: string) => { setPet((p: any) => ({ ...p, [slot]: value })); };

  const breedPets = (friendPetType: any, newName: string) => {
    setPet((p: any) => ({ ...p, name: newName || "Quimera Cósmica", type: "alien", level: p.level + 2, rarity: "cosmic" as const }));
  };

  const claimClanMission = (missionId: string) => {
    setClan((cl: any) => ({ ...cl, xp: cl.xp + 800, level: cl.level + 1, missions: cl.missions.map((m: any) => m.id === missionId ? { ...m, completed: true } : m) }));
  };

  const addInstant = (mediaUrl: string, caption: string, mediaType: "image" | "video" = "image") => {
    if (!user) return;
    const newInst: Instant = {
      id: `inst-${Date.now()}`, userId: user.id, userName: user.name, userHandle: user.handle, userImage: user.image,
      mediaUrl, mediaType, caption, createdAt: "agora mesmo", timestamp: Date.now(), likes: 0, hasLiked: false, streakDays: user.streak + 1, location: "BeReal Story ✨", repliesCount: 0, reactions: []
    };
    const updatedUser = { ...user, streak: user.streak + 1, instantsCount: user.instantsCount + 1 };
    setUser(updatedUser);
    setIsSimultaneousActive(false);
    setPet((p: any) => ({ ...p, hunger: 100, happiness: 100 }));
    setInstants((prev: any) => [newInst, ...prev]);
  };

  const likeInstant = (id: string) => {
    setInstants((prev: any) => prev.map((inst: any) => inst.id === id ? { ...inst, hasLiked: !inst.hasLiked, likes: !inst.hasLiked ? inst.likes + 1 : inst.likes - 1 } : inst));
  };

  const replyWithPhotoOnly = (instantId: string, photoUrl: string) => {
    setInstants((prev: any) => prev.map((inst: any) => inst.id === instantId ? { ...inst, repliesCount: inst.repliesCount + 1 } : inst));
    const target = instants.find((i: any) => i.id === instantId);
    if (target) sendMessage(target.userId, "📸 Resposta com Foto Instantânea!", photoUrl);
  };

  const sendMessage = (friendId: string, text?: string, mediaUrl?: string) => {
    if (!user) return;
    const newMsg = { id: `msg-${Date.now()}`, senderId: user.id, text, mediaUrl, mediaType: mediaUrl ? ("image" as const) : undefined, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isMe: true };
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? { ...chat, lastMessage: text || "📸 Mídia enviada", lastMessageTime: "Agora", messages: [...chat.messages, newMsg] } : chat));
  };

  const sendVoiceMessage = (friendId: string, duration: number) => {
    if (!user) return;
    const voiceMsg = {
      id: `msg-v-${Date.now()}`, senderId: user.id, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isMe: true, mediaType: "voice" as const,
      voiceMessage: { id: `v-${Date.now()}`, duration, waves: [30, 60, 90, 100, 40, 20, 80, 95, 50, 40, 70, 80, 20] }
    };
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? { ...chat, lastMessage: `🎤 Áudio rápido (${duration}s)`, lastMessageTime: "Agora", messages: [...chat.messages, voiceMsg] } : chat));
  };

  const sendSecretViewOnce = (friendId: string, text: string) => {
    if (!user) return;
    const secMsg = {
      id: `msg-sec-${Date.now()}`, senderId: user.id, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isMe: true, mediaType: "secret_once" as const,
      secretMessage: { id: `sec-${Date.now()}`, text, viewed: false }
    };
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? { ...chat, lastMessage: `💣👁️ Mensagem Secreta Única`, lastMessageTime: "Agora", messages: [...chat.messages, secMsg] } : chat));
  };

  const viewSecretMessage = (friendId: string, msgId: string) => {
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? {
      ...chat,
      messages: chat.messages.map((m: any) => m.id === msgId && m.secretMessage ? { ...m, secretMessage: { ...m.secretMessage, viewed: true } } : m)
    } : chat));
  };

  const reactToMessage = (friendId: string, msgId: string, emoji: string) => {
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? {
      ...chat,
      messages: chat.messages.map((m: any) => m.id === msgId ? { ...m, reactions: [...(m.reactions || []), { emoji, count: 1 }] } : m)
    } : chat));
  };

  const sendGameInvite = (friendId: string, gameType: any, gameName: string) => {
    if (!user) return;
    const inviteMsg = {
      id: `msg-game-${Date.now()}`, senderId: user.id, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isMe: true,
      gameInvite: {
        id: `inv-${Date.now()}`, gameType, gameName, senderName: user.name, status: "active" as const, myScore: 0, friendScore: 0,
        question: gameType === "quiz" ? "Qual é o mascote do nosso Clã?" : undefined,
        options: gameType === "quiz" ? ["Quasar 🐲", "Byte 🐱", "Fênix 🔥"] : undefined,
        anonPhotoUrl: gameType === "guess_pic" ? "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80" : undefined,
        votes: gameType === "guess_pic" ? {} : undefined
      }
    };
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? { ...chat, lastMessage: `🎮 Jogo funcional: ${gameName}`, lastMessageTime: "Agora", messages: [...chat.messages, inviteMsg] } : chat));
  };

  const sendPetInvite = (friendId: string, petName: string, petType: Pet["type"]) => {
    if (!user) return;
    const inviteMsg = { id: `msg-pet-${Date.now()}`, senderId: user.id, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isMe: true, petInvite: { petName, petType, status: "pending" as const } };
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? { ...chat, lastMessage: `💌 Convite Tamagotchi: ${petName}`, lastMessageTime: "Agora", messages: [...chat.messages, inviteMsg] } : chat));
  };

  const sendTimeCapsule = (friendId: string, title: string, secretText: string, days: number) => {
    if (!user) return;
    const capMsg = { id: `msg-cap-${Date.now()}`, senderId: user.id, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isMe: true, timeCapsule: { id: `c-${Date.now()}`, title, unlockDate: `Daqui a ${days} dias`, unlockTimestamp: Date.now() + days * 864e5, isUnlocked: false, secretText } };
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? { ...chat, lastMessage: `⏳🔒 Cápsula selada`, lastMessageTime: "Agora", messages: [...chat.messages, capMsg] } : chat));
  };

  const triggerAiMemory = (friendId: string) => {
    const aiMsg = { id: `msg-ai-${Date.now()}`, senderId: friendId, mediaType: "ai_memory" as const, mediaUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80", timestamp: "Agora", isMe: false };
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? { ...chat, lastMessage: `🎞️✨ Memórias IA prontas`, lastMessageTime: "Agora", messages: [...chat.messages, aiMsg] } : chat));
  };

  return (
    <AppContext.Provider
      value={{
        user, setUser, pet, setPet, clan, setClan, instants, chats, activeTab, setActiveTab, isSimultaneousActive, setIsSimultaneousActive,
        addInstant, likeInstant, replyWithPhotoOnly, sendMessage, sendGameInvite, sendPetInvite, sendVoiceMessage, sendSecretViewOnce, viewSecretMessage, reactToMessage, sendTimeCapsule, triggerAiMemory, breedPets, claimClanMission,
        updateUserBio, toggleFollowUser, voteInGuessPicGame, revealGuessPicAuthor,
        feedPet, playPet, cleanPet, sleepPet, updatePetStyle, registerAccount, loginAccount, logout, selectedChatId, setSelectedChatId
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Instant, FriendChat, User, Pet, GameInvite, Clan } from "@/types";
import { CURRENT_USER_MOCK, INITIAL_INSTANTS, INITIAL_FRIENDS_CHATS, INITIAL_MY_PET, INITIAL_CLAN } from "@/data/mockData";

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  pet: Pet | null;
  setPet: React.Dispatch<React.SetStateAction<Pet | null>>;
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
  sendPetInvite: (friendId: string, petName: string, petType: any) => void;
  sendVoiceMessage: (friendId: string, duration: number) => void;
  sendSecretViewOnce: (friendId: string, text: string) => void;
  viewSecretMessage: (friendId: string, msgId: string) => void;
  reactToMessage: (friendId: string, msgId: string, emoji: string) => void;
  sendTimeCapsule: (friendId: string, title: string, secretText: string, days: number) => void;
  triggerAiMemory: (friendId: string) => void;
  breedPets: (friendPetType: any, name: string) => void;
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
  logout: () => void;
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
  startNewChatWith: (handle: string) => void;
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
  const [pet, setPet] = useState<Pet | null>(INITIAL_MY_PET);
  const [clan, setClan] = useState<Clan>(INITIAL_CLAN);
  const [instants, setInstants] = useState<Instant[]>(INITIAL_INSTANTS);
  const [chats, setChats] = useState<FriendChat[]>(INITIAL_FRIENDS_CHATS);
  const [activeTab, setActiveTab] = useState<"feed" | "camera" | "pet" | "chat" | "clan" | "profile">("feed");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isSimultaneousActive, setIsSimultaneousActive] = useState(true);

  useEffect(() => {
    const u = localStorage.getItem("instants_u_v7");
    if (u) {
      try {
        const parsed = JSON.parse(u);
        setUser(parsed);
        if (parsed.instantsCount === 0 && parsed.followersCount === 0) {
          setChats([]);
          setInstants([]);
          setPet(null);
        }
      } catch (e) {}
    }
  }, []);

  // Monitora se logou/cadastrou conta limpa
  useEffect(() => {
    if (user) {
      localStorage.setItem("instants_u_v7", JSON.stringify(user));
      if (user.instantsCount === 0 && user.followersCount === 0) {
        setChats([]);
        setInstants([]);
        setPet(null);
      }
    }
  }, [user?.id]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("instants_u_v7");
  };

  const startNewChatWith = (handleStr: string) => {
    if (!handleStr.trim() || !user) return;
    const cleanH = handleStr.startsWith("@") ? handleStr : `@${handleStr}`;
    const newFriendId = `friend-${Date.now()}`;
    const newChatRecord: FriendChat = {
      id: newFriendId,
      name: cleanH.replace("@", "").toUpperCase(),
      handle: cleanH,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      streak: 1,
      friendshipLevel: 1,
      friendshipXp: 0,
      achievements: [],
      lastMessage: "Nova amizade conectada ✨",
      lastMessageTime: "Agora",
      unreadCount: 0,
      isOnline: true,
      messages: []
    };
    setChats((prev) => [newChatRecord, ...prev]);
    setSelectedChatId(newFriendId);
  };

  const updateUserBio = (bio: string) => {
    if (!user) return;
    setUser({ ...user, bio });
  };

  const toggleFollowUser = (friendId: string) => {
    if (!user) return;
    setUser({ ...user, followingCount: (user.followingCount || 0) + 1 });
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
        gameInvite: { ...m.gameInvite, status: "finished" as const, revealedAuthor: "Sofia Neon (Sorteado 👁️✨)" }
      } : m)
    } : chat));
  };

  const feedPet = () => { if (pet) setPet((p: any) => ({ ...p, hunger: Math.min(100, p.hunger + 25), xp: p.xp + 15 })); };
  const playPet = () => { if (pet) setPet((p: any) => ({ ...p, happiness: Math.min(100, p.happiness + 25), energy: Math.max(0, p.energy - 10), xp: p.xp + 20 })); };
  const cleanPet = () => { if (pet) setPet((p: any) => ({ ...p, hygiene: Math.min(100, p.hygiene + 30), xp: p.xp + 10 })); };
  const sleepPet = () => { if (pet) setPet((p: any) => ({ ...p, energy: 100 })); };
  const updatePetStyle = (slot: any, value: string) => { if (pet) setPet((p: any) => ({ ...p, [slot]: value })); };

  const breedPets = (friendPetType: any, newName: string) => {
    if (pet) setPet((p: any) => ({ ...p, name: newName || "Quimera Cósmica", type: "cristalino", level: p.level + 2, rarity: "cosmic" as const }));
  };

  const claimClanMission = (missionId: string) => {
    setClan((cl: any) => ({ ...cl, xp: cl.xp + 800, level: cl.level + 1, missions: cl.missions.map((m: any) => m.id === missionId ? { ...m, completed: true } : m) }));
  };

  const addInstant = (mediaUrl: string, caption: string, mediaType: "image" | "video" = "image") => {
    if (!user) return;
    const newInst: Instant = {
      id: `inst-${Date.now()}`, userId: user.id, userName: user.name, userHandle: user.handle, userImage: user.image,
      mediaUrl, mediaType, caption, createdAt: "agora mesmo", timestamp: Date.now(), likes: 0, hasLiked: false, streakDays: user.streak + 1, location: "Story ✨", repliesCount: 0, reactions: []
    };
    const updatedUser = { ...user, streak: user.streak + 1, instantsCount: (user.instantsCount || 0) + 1 };
    setUser(updatedUser);
    setIsSimultaneousActive(false);
    if (pet) setPet((p: any) => ({ ...p, hunger: 100, happiness: 100 }));
    setInstants((prev: any) => [newInst, ...prev]);
  };

  const likeInstant = (id: string) => {
    setInstants((prev: any) => prev.map((inst: any) => inst.id === id ? { ...inst, hasLiked: !inst.hasLiked, likes: !inst.hasLiked ? inst.likes + 1 : inst.likes - 1 } : inst));
  };

  const replyWithPhotoOnly = (instantId: string, photoUrl: string) => {
    setInstants((prev: any) => prev.map((inst: any) => inst.id === instantId ? { ...inst, repliesCount: inst.repliesCount + 1 } : inst));
    const target = instants.find((i: any) => i.id === instantId);
    if (target) sendMessage(target.userId, "📸 Resposta com Foto!", photoUrl);
  };

  const sendMessage = (friendId: string, text?: string, mediaUrl?: string) => {
    if (!user) return;
    const newMsg = { id: `msg-${Date.now()}`, senderId: user.id, text, mediaUrl, mediaType: mediaUrl ? ("image" as const) : undefined, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isMe: true };
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? { ...chat, lastMessage: text || "📸 Foto enviada", lastMessageTime: "Agora", messages: [...chat.messages, newMsg] } : chat));
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
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? { ...chat, lastMessage: `💣👁️ Secreta Única`, lastMessageTime: "Agora", messages: [...chat.messages, secMsg] } : chat));
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
        photoUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80",
        votes: {}
      }
    };
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? { ...chat, lastMessage: `🎮 Jogo: ${gameName}`, lastMessageTime: "Agora", messages: [...chat.messages, inviteMsg] } : chat));
  };

  const sendPetInvite = (friendId: string, petName: string, petType: any) => {
    if (!user) return;
    const inviteMsg = { id: `msg-pet-${Date.now()}`, senderId: user.id, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isMe: true, petInvite: { petName, petType, status: "pending" as const, id: `pi-${Date.now()}`, senderName: user.name, senderAvatar: user.image } };
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? { ...chat, lastMessage: `💌 Convite Tamagotchi: ${petName}`, lastMessageTime: "Agora", messages: [...chat.messages, inviteMsg] } : chat));
  };

  const sendTimeCapsule = (friendId: string, title: string, secretText: string, days: number) => {
    if (!user) return;
    const capMsg = { id: `msg-cap-${Date.now()}`, senderId: user.id, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isMe: true, timeCapsule: { id: `c-${Date.now()}`, title, unlockDate: `Daqui a ${days} dias`, unlockTimestamp: Date.now() + days * 864e5, isUnlocked: false, secretText } };
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? { ...chat, lastMessage: `⏳🔒 Cápsula selada`, lastMessageTime: "Agora", messages: [...chat.messages, capMsg] } : chat));
  };

  const triggerAiMemory = (friendId: string) => {
    const aiMsg = { id: `msg-ai-${Date.now()}`, senderId: friendId, mediaType: "ai_memory" as const, mediaUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80", timestamp: "Agora", isMe: false };
    setChats((prev: any) => prev.map((chat: any) => chat.id === friendId ? { ...chat, lastMessage: `🎞️✨ Vídeo IA pronto`, lastMessageTime: "Agora", messages: [...chat.messages, aiMsg] } : chat));
  };

  return (
    <AppContext.Provider
      value={{
        user, setUser, pet, setPet, clan, setClan, instants, chats, activeTab, setActiveTab, isSimultaneousActive, setIsSimultaneousActive,
        addInstant, likeInstant, replyWithPhotoOnly, sendMessage, sendGameInvite, sendPetInvite, sendVoiceMessage, sendSecretViewOnce, viewSecretMessage, reactToMessage, sendTimeCapsule, triggerAiMemory, breedPets, claimClanMission,
        updateUserBio, toggleFollowUser, voteInGuessPicGame, revealGuessPicAuthor, logout, selectedChatId, setSelectedChatId, startNewChatWith,
        feedPet, playPet, cleanPet, sleepPet, updatePetStyle
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  streak: number;
  instantsCount: number;
  handle: string;
  phone?: string;
  password?: string;
  petId?: string;
  isMapPrivate?: boolean;
  bio?: string;
  followersCount: number;
  followingCount: number;
  isFollowing?: boolean;
}

export interface Pet {
  id: string;
  name: string;
  type: 'cat' | 'dog' | 'dragon' | 'fox' | 'chimera' | 'alien' | 'phoenix';
  hunger: number;
  happiness: number;
  energy: number;
  hygiene: number;
  level: number;
  xp: number;
  hat: string;
  glasses: string;
  accessory: string;
  owners: { name: string; avatar: string }[];
  isShared: boolean;
  rarity?: 'common' | 'rare' | 'legendary' | 'cosmic';
}

export interface Reaction {
  id: string;
  emoji: string;
  userName: string;
  userImage: string;
}

export interface Instant {
  id: string;
  userId: string;
  userName: string;
  userHandle: string;
  userImage: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: string;
  createdAt: string;
  timestamp: number;
  likes: number;
  hasLiked?: boolean;
  streakDays: number;
  reactions: Reaction[];
  repliesCount: number;
  location?: string;
  coordinates?: { x: number; y: number };
}

export interface TimeCapsule {
  id: string;
  title: string;
  unlockDate: string;
  unlockTimestamp: number;
  isUnlocked: boolean;
  secretText?: string;
  mediaUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  desc: string;
  unlockedAt: string;
}

export interface GameInvite {
  id: string;
  gameType: 'pingpong' | 'soccer' | 'checkers' | 'race' | 'space' | 'quiz' | 'guess_pic';
  gameName: string;
  senderName: string;
  status: 'pending' | 'active' | 'finished';
  myScore: number;
  friendScore: number;
  question?: string;
  options?: string[];
  correctOption?: number;
  anonPhotoUrl?: string;
  revealedAuthor?: string;
  votes?: Record<string, string>; // userId -> nomeVotado
}

export interface SecretMessage {
  id: string;
  text?: string;
  mediaUrl?: string;
  viewed: boolean;
}

export interface VoiceMessage {
  id: string;
  duration: number;
  waves: number[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'instant' | 'ai_memory' | 'voice' | 'secret_once';
  gameInvite?: GameInvite;
  petInvite?: { petName: string; petType: Pet['type']; status: 'pending' | 'accepted' };
  timeCapsule?: TimeCapsule;
  secretMessage?: SecretMessage;
  voiceMessage?: VoiceMessage;
  reactions?: { emoji: string; count: number }[];
  timestamp: string;
  isMe: boolean;
}

export interface FriendChat {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  streak: number;
  friendshipLevel: number;
  friendshipXp: number;
  friendshipPet: Pet;
  achievements: Achievement[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  isTemporaryRoom?: boolean;
  roomExpiresIn?: string;
  activityCalendar?: boolean[];
  messages: ChatMessage[];
  bio?: string;
  followersCount?: number;
  isFollowing?: boolean;
}

export interface ClanMission {
  id: string;
  title: string;
  progress: number;
  total: number;
  rewardXp: number;
  rewardItem?: string;
  completed: boolean;
}

export interface Clan {
  id: string;
  name: string;
  tag: string;
  level: number;
  xp: number;
  mascot: Pet;
  isPerfectDay?: boolean;
  members: { id: string; name: string; handle: string; avatar: string; role: 'Líder' | 'Membro'; weeklyPoints: number; hasPostedToday?: boolean }[];
  missions: ClanMission[];
  unlockedCosmetics: string[];
}

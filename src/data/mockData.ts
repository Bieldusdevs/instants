import { Instant, FriendChat, User, Pet, Clan } from '@/types';

export const CURRENT_USER_MOCK: User = {
  id: 'user-me-123',
  name: 'Alex Cyber',
  handle: '@alex.instants',
  email: 'alex@cyber.io',
  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  streak: 28,
  instantsCount: 142,
  petId: 'pet-my-1',
  isMapPrivate: false,
  bio: 'Criador generativo 3D & entusiasta de café. Explorando o universo do Instants 🪐⚡️',
  followersCount: 1240,
  followingCount: 480
};

export const INITIAL_MY_PET: Pet = {
  id: 'pet-my-1',
  name: 'Byte',
  type: 'dragon',
  hunger: 80,
  happiness: 90,
  energy: 85,
  hygiene: 70,
  level: 8,
  xp: 640,
  hat: 'crown',
  glasses: 'cyber',
  accessory: 'chain',
  owners: [{ name: 'Alex Cyber', avatar: CURRENT_USER_MOCK.image }],
  isShared: false,
  rarity: 'rare'
};

export const INITIAL_CLAN: Clan = {
  id: 'clan-1',
  name: 'Cyber-Samurais',
  tag: '[CYBER]',
  level: 15,
  xp: 4200,
  isPerfectDay: true,
  mascot: {
    id: 'clan-pet-1',
    name: 'Quasar',
    type: 'chimera',
    hunger: 95,
    happiness: 100,
    energy: 90,
    hygiene: 85,
    level: 22,
    xp: 8900,
    hat: 'wizard',
    glasses: 'pixel',
    accessory: 'aura',
    owners: [
      { name: 'Alex Cyber', avatar: CURRENT_USER_MOCK.image },
      { name: 'Sofia Neon', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' },
      { name: 'Lucas Shader', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80' },
      { name: 'Bia Cyber', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' }
    ],
    isShared: true,
    rarity: 'legendary'
  },
  members: [
    { id: 'user-me-123', name: 'Alex Cyber', handle: '@alex.instants', avatar: CURRENT_USER_MOCK.image, role: 'Líder', weeklyPoints: 1450, hasPostedToday: true },
    { id: 'friend-1', name: 'Sofia Neon', handle: '@sofia.vibe', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', role: 'Membro', weeklyPoints: 1320, hasPostedToday: true },
    { id: 'friend-2', name: 'Lucas Shader', handle: '@lucas.glsl', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80', role: 'Membro', weeklyPoints: 980, hasPostedToday: true },
    { id: 'friend-3', name: 'Bia Cyber', handle: '@bia.3d', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', role: 'Membro', weeklyPoints: 850, hasPostedToday: true }
  ],
  missions: [
    { id: 'mis-1', title: 'Todos os 4 membros partilharem Instants hoje', progress: 4, total: 4, rewardXp: 500, rewardItem: 'Coroa Suprema', completed: true },
    { id: 'mis-2', title: 'Vencer 5 duelos de Quiz no Chat', progress: 5, total: 5, rewardXp: 800, rewardItem: 'Aura Cósmica', completed: true },
    { id: 'mis-3', title: 'Alimentar o Mascote Quasar em conjunto', progress: 8, total: 10, rewardXp: 400, completed: false }
  ],
  unlockedCosmetics: ['crown', 'wizard', 'pixel', 'aura', 'chain']
};

export const INITIAL_INSTANTS: Instant[] = [
  {
    id: 'inst-1',
    userId: 'friend-1',
    userName: 'Sofia Neon',
    userHandle: '@sofia.vibe',
    userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Foto simultânea capturada no tempo exato! BeReal vibe ⚡️🪐',
    createdAt: 'há 2 min',
    timestamp: Date.now() - 2 * 60 * 1000,
    likes: 45,
    hasLiked: false,
    streakDays: 19,
    location: 'Tóquio, JP',
    coordinates: { x: 75, y: 35 },
    repliesCount: 4,
    reactions: [
      { id: 'r1', emoji: '🔥', userName: 'Lucas', userImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'inst-2',
    userId: 'friend-2',
    userName: 'Lucas Shader',
    userHandle: '@lucas.glsl',
    userImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Dia Perfeito alcançado com o Clã! Recompensas em dobro 🌟💯',
    createdAt: 'há 45 min',
    timestamp: Date.now() - 45 * 60 * 1000,
    likes: 68,
    hasLiked: true,
    streakDays: 34,
    location: 'Lisboa, PT',
    coordinates: { x: 45, y: 40 },
    repliesCount: 9,
    reactions: []
  }
];

export const INITIAL_FRIENDS_CHATS: FriendChat[] = [
  {
    id: 'friend-1',
    name: 'Sofia Neon',
    handle: '@sofia.vibe',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    streak: 19,
    friendshipLevel: 14,
    friendshipXp: 850,
    friendshipPet: INITIAL_CLAN.mascot,
    bio: 'Artísta digital 3D & Cyber-Tokyo wanderer 🌙✨',
    followersCount: 3420,
    isFollowing: true,
    achievements: [
      { id: 'ach-1', title: 'Dia Perfeito Coletivo', icon: '🌟', desc: 'Postaram juntos no BeReal time exato', unlockedAt: 'Hoje' },
      { id: 'ach-2', title: 'Mestre do Áudio', icon: '🎤', desc: 'Trocaram áudios rápidos de 10 segundos', unlockedAt: 'Ontem' }
    ],
    activityCalendar: [true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    lastMessage: 'Adivinhe quem tirou a foto no chat! 🕵️‍♂️📸',
    lastMessageTime: '12:42',
    unreadCount: 1,
    isOnline: true,
    messages: [
      { id: 'm1', senderId: 'friend-1', text: 'Hey Alex! Viu o ranking de amigos hoje? Estamos no topo 🏆', timestamp: '11:20', isMe: false },
      {
        id: 'm-guess-1',
        senderId: 'friend-1',
        timestamp: '11:30',
        isMe: false,
        gameInvite: {
          id: 'g-guess-1',
          gameType: 'guess_pic',
          gameName: 'Quem Mandou a Foto? 🕵️‍♂️📸',
          senderName: 'Sofia Neon',
          status: 'active',
          myScore: 0,
          friendScore: 0,
          anonPhotoUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80',
          votes: { 'user-me-123': 'Sofia Neon' }
        }
      },
      { id: 'm3', senderId: 'friend-1', text: 'Adivinhe quem tirou a foto no chat! 🕵️‍♂️📸', timestamp: '12:42', isMe: false }
    ]
  }
];

import { Team } from '../types';

export const sampleTeam: Team = {
  id: '1',
  name: 'Team Adversary',
  players: [
    {
      id: 'player1',
      name: 'Enemy Player 1',
      position: 1,
      accountId: '123456789',
      dotabuffUrl: 'https://www.dotabuff.com/players/123456789',
      mostPlayed: [
        { heroId: 'Juggernaut', gamesPlayed: 50, winRate: 60 },
        { heroId: 'Faceless Void', gamesPlayed: 40, winRate: 55 },
        { heroId: 'Anti-Mage', gamesPlayed: 30, winRate: 45 }
      ]
    },
    {
      id: 'player2',
      name: 'Enemy Player 2',
      position: 2,
      accountId: '234567890',
      dotabuffUrl: 'https://www.dotabuff.com/players/234567890',
      mostPlayed: [
        { heroId: 'Invoker', gamesPlayed: 60, winRate: 58 },
        { heroId: 'Storm Spirit', gamesPlayed: 45, winRate: 52 },
        { heroId: 'Queen of Pain', gamesPlayed: 35, winRate: 49 }
      ]
    },
    {
      id: 'player3',
      name: 'Enemy Player 3',
      position: 3,
      accountId: '345678901',
      dotabuffUrl: 'https://www.dotabuff.com/players/345678901',
      mostPlayed: [
        { heroId: 'Axe', gamesPlayed: 55, winRate: 54 },
        { heroId: 'Tidehunter', gamesPlayed: 42, winRate: 51 },
        { heroId: 'Mars', gamesPlayed: 38, winRate: 48 }
      ]
    },
    {
      id: 'player4',
      name: 'Enemy Player 4',
      position: 4,
      accountId: '456789012',
      dotabuffUrl: 'https://www.dotabuff.com/players/456789012',
      mostPlayed: [
        { heroId: 'Rubick', gamesPlayed: 58, winRate: 53 },
        { heroId: 'Earth Spirit', gamesPlayed: 47, winRate: 50 },
        { heroId: 'Mirana', gamesPlayed: 40, winRate: 47 }
      ]
    },
    {
      id: 'player5',
      name: 'Enemy Player 5',
      position: 5,
      accountId: '567890123',
      dotabuffUrl: 'https://www.dotabuff.com/players/567890123',
      mostPlayed: [
        { heroId: 'Crystal Maiden', gamesPlayed: 62, winRate: 56 },
        { heroId: 'Shadow Shaman', gamesPlayed: 48, winRate: 53 },
        { heroId: 'Witch Doctor', gamesPlayed: 43, winRate: 52 }
      ]
    }
  ]
};
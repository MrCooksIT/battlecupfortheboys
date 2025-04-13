import React from 'react';
import { Player } from '../../types';

interface PlayerListProps {
  players: Player[];
  onRemovePlayer: (playerId: string) => void;
  onBanRecommendation: (player: Player) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onRemovePlayer, onBanRecommendation }) => {
  if (players.length === 0) {
    return null;
  }

  return (
    <div>
      {players.map((player) => (
        <div key={player.id}>
          {player.name}
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
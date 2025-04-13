import React from 'react';
import { Team } from '../../types';

interface TeamInfoProps {
  team: Team;
  onSelectedPlayer: (playerId: string) => void;
  selectedPlayerId: string | null;
}

const TeamInfo: React.FC<TeamInfoProps> = ({ team, onSelectedPlayer, selectedPlayerId }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">{team.name}</h3>
    </div>
  );
};

export default TeamInfo;
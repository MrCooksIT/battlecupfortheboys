// src/components/HeroSelector/index.tsx
import React, { useState } from "react";
import { Hero, HeroMetaData } from "../../types";
import { Search } from "lucide-react";

interface HeroSelectorProps {
  heroes: Hero[];
  metaData: HeroMetaData[];
  unavailableHeroes: string[];
  suggestedBans: string[];
  suggestedPicks: string[];
  onHeroSelect: (heroId: string) => void;
  actionType: "ban" | "pick";
}

const HeroSelector: React.FC<HeroSelectorProps> = ({
  heroes,
  metaData,
  unavailableHeroes,
  suggestedBans,
  suggestedPicks,
  onHeroSelect,
  actionType,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHero, setSelectedHero] = useState<string | null>(null);

  const filteredHeroes = heroes.filter(
    (hero) =>
      !unavailableHeroes.includes(hero.id) &&
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getHeroMetaData = (heroId: string) => {
    return metaData.find((data) => data.name === heroId);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search heroes..."
            className="pl-9 pr-2 py-2 border border-gray-700 bg-gray-700 text-white rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Suggested Heroes */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          {actionType === "ban" ? "Suggested Bans" : "Suggested Picks"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {(actionType === "ban" ? suggestedBans : suggestedPicks).map(
            (heroId) => (
              <div
                key={`suggested-${heroId}`}
                className={`px-3 py-1.5 rounded cursor-pointer flex items-center ${
                  actionType === "ban"
                    ? "bg-red-900 hover:bg-red-800"
                    : "bg-green-900 hover:bg-green-800"
                }`}
                onClick={() => onHeroSelect(heroId)}
                onMouseEnter={() => setSelectedHero(heroId)}
                onMouseLeave={() => setSelectedHero(null)}
              >
                {heroId}
                {getHeroMetaData(heroId) && (
                  <span className="ml-1 text-xs">
                    [{getHeroMetaData(heroId)?.tier}]
                  </span>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* All Heroes */}
      <div>
        <h3 className="text-lg font-semibold mb-2">All Heroes</h3>
        <div className="grid grid-cols-6 gap-2 max-h-80 overflow-y-auto">
          {filteredHeroes.map((hero) => {
            const meta = getHeroMetaData(hero.id);
            return (
              <div
                key={hero.id}
                className={`px-2 py-1.5 border border-gray-700 rounded text-center cursor-pointer hover:bg-gray-700 ${
                  meta?.tier === "S"
                    ? "bg-purple-900"
                    : meta?.tier === "A"
                    ? "bg-blue-900"
                    : meta?.tier === "B"
                    ? "bg-green-900"
                    : meta?.tier === "C"
                    ? "bg-yellow-900"
                    : meta?.tier === "D"
                    ? "bg-red-900"
                    : "bg-gray-800"
                }`}
                onClick={() => onHeroSelect(hero.id)}
                onMouseEnter={() => setSelectedHero(hero.id)}
                onMouseLeave={() => setSelectedHero(null)}
              >
                {hero.name}
                {meta && <span className="ml-1 text-xs">[{meta.tier}]</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero Details */}
      {selectedHero && getHeroMetaData(selectedHero) && (
        <div className="mt-4 p-3 border border-gray-700 rounded bg-gray-900">
          <h3 className="font-bold text-lg mb-2">{selectedHero}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <h4 className="font-medium text-sm mb-1">Win Rate</h4>
              <div className="bg-gray-700 rounded-full h-2 w-full">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${getHeroMetaData(selectedHero)?.winRate}%`,
                  }}
                ></div>
              </div>
              <div className="text-xs mt-1 text-gray-400">
                {getHeroMetaData(selectedHero)?.winRate.toFixed(2)}%
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">Pick Rate</h4>
              <div className="bg-gray-700 rounded-full h-2 w-full">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      getHeroMetaData(selectedHero)?.pickRate || 0,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="text-xs mt-1 text-gray-400">
                {getHeroMetaData(selectedHero)?.pickRate.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSelector;

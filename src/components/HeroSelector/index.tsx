// src/components/HeroSelector/index.tsx
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Hero, HeroMetaData } from "../../types";

interface EnhancedHero extends Hero {
  meta?: HeroMetaData;
}

interface HeroSelectorProps {
  heroes: EnhancedHero[];
  unavailableHeroes: string[];
  suggestedBans: string[];
  suggestedPicks: string[];
  onHeroSelect: (heroId: string) => void;
  actionType: "ban" | "pick";
}

const HeroSelector: React.FC<HeroSelectorProps> = ({
  heroes,
  unavailableHeroes,
  suggestedBans,
  suggestedPicks,
  onHeroSelect,
  actionType,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHeroes = heroes.filter(
    (hero) =>
      !unavailableHeroes.includes(hero.id) &&
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentSuggestions =
    actionType === "ban" ? suggestedBans : suggestedPicks;

  return (
    <div>
      <div className="flex mb-4">
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

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">
          {actionType === "ban" ? "Suggested Bans" : "Suggested Picks"}
        </h3>

        <div className="flex flex-wrap gap-2">
          {currentSuggestions.map((heroId) => {
            const hero = heroes.find((h) => h.id === heroId);
            if (!hero) return null;

            return (
              <div
                key={heroId}
                className={`px-3 py-1.5 ${
                  actionType === "ban"
                    ? "bg-red-900 hover:bg-red-800"
                    : "bg-green-900 hover:bg-green-800"
                } rounded-lg cursor-pointer`}
                onClick={() => onHeroSelect(heroId)}
              >
                <div className="flex items-center">
                  <span>{hero.name}</span>
                  {hero.meta && (
                    <span className="ml-1 text-xs">[{hero.meta.tier}]</span>
                  )}
                </div>
              </div>
            );
          })}

          {currentSuggestions.length === 0 && (
            <div className="text-gray-400">No suggestions available</div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">All Heroes</h3>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2 max-h-64 overflow-y-auto p-1">
          {filteredHeroes.map((hero) => (
            <div
              key={hero.id}
              className={`px-2 py-1.5 text-center ${
                hero.meta?.tier === "S"
                  ? "bg-purple-900"
                  : hero.meta?.tier === "A"
                  ? "bg-blue-900"
                  : hero.meta?.tier === "B"
                  ? "bg-green-900"
                  : hero.meta?.tier === "C"
                  ? "bg-yellow-900"
                  : hero.meta?.tier === "D"
                  ? "bg-red-900"
                  : "bg-gray-700"
              } hover:opacity-80 rounded-lg cursor-pointer`}
              onClick={() => onHeroSelect(hero.id)}
            >
              <div>{hero.name}</div>
              {hero.meta && (
                <div className="text-xs">{hero.meta.tier} Tier</div>
              )}
            </div>
          ))}

          {filteredHeroes.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-4">
              No heroes found matching your search
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSelector;

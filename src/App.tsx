import React, { useState, useEffect } from "react";
import "./App.css";
import MetaDataInput from "./components/MetaDataInput";
import PlayerSearch from "./components/PlayerSearch";
import PlayerList from "./components/PlayerList";
import DraftBoard from "./components/DraftBoard";
import HeroSelector from "./components/HeroSelector";
import { HeroMetaData, Player, Hero, TeamSide } from "./types";
import { X, ArrowRight } from 'lucide-react';
// Sample heroes data
const sampleHeroes: Hero[] = [
  { id: "Wraith King", name: "Wraith King", roles: ["Carry"] },
  { id: "Medusa", name: "Medusa", roles: ["Carry", "Mid"] },
  { id: "Juggernaut", name: "Juggernaut", roles: ["Carry"] },
  { id: "Pudge", name: "Pudge", roles: ["Offlane", "Support"] },
  { id: "Invoker", name: "Invoker", roles: ["Mid"] },
  { id: "Axe", name: "Axe", roles: ["Offlane"] },
  { id: "Crystal Maiden", name: "Crystal Maiden", roles: ["Support"] },
  { id: "Sniper", name: "Sniper", roles: ["Carry", "Mid"] },
  { id: "Phantom Assassin", name: "Phantom Assassin", roles: ["Carry"] },
  { id: "Lion", name: "Lion", roles: ["Support"] },
  // Add more heroes as needed
];

function App() {
  const [phase, setPhase] = useState<"setup" | "draft">("setup");
  const [metaData, setMetaData] = useState<HeroMetaData[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [playerTeam, setPlayerTeam] = useState<TeamSide>("radiant");

  // Draft state
  const [radiantBans, setRadiantBans] = useState<(string | null)[]>(
    Array(7).fill(null)
  );
  const [direBans, setDireBans] = useState<(string | null)[]>(
    Array(7).fill(null)
  );
  const [radiantPicks, setRadiantPicks] = useState<(string | null)[]>(
    Array(5).fill(null)
  );
  const [direPicks, setDirePicks] = useState<(string | null)[]>(
    Array(5).fill(null)
  );
  const [currentStep, setCurrentStep] = useState(0);

  // Load meta data from localStorage on component mount
  useEffect(() => {
    const savedMetaData = localStorage.getItem("dotaMetaData");
    if (savedMetaData) {
      try {
        const parsedData = JSON.parse(savedMetaData);
        setMetaData(parsedData);
        console.log("Loaded saved meta data with", parsedData.length, "heroes");
      } catch (error) {
        console.error("Error loading saved meta data", error);
      }
    }
  }, []);

  const handleMetaDataParsed = (data: HeroMetaData[]) => {
    setMetaData(data);
    console.log("Meta data updated with", data.length, "heroes");

    // Save to localStorage for persistence
    localStorage.setItem("dotaMetaData", JSON.stringify(data));
  };

  const handlePlayerFound = (player: Player) => {
    // Check if player already exists
    if (!players.some((p) => p.id === player.id)) {
      setPlayers([...players, player]);
    }
  };

  const handleRemovePlayer = (playerId: string) => {
    setPlayers(players.filter((p) => p.id !== playerId));
    if (selectedPlayer && selectedPlayer.id === playerId) {
      setSelectedPlayer(null);
    }
  };

  const handleBanRecommendation = (player: Player) => {
    setSelectedPlayer(player);
  };

  const makeAction = (heroId: string) => {
    // Get the current action based on draft step
    const draftSequence = [
      { type: "ban", team: "radiant" }, // 1
      { type: "ban", team: "dire" }, // 2
      { type: "ban", team: "radiant" }, // 3
      { type: "ban", team: "dire" }, // 4
      { type: "pick", team: "radiant" }, // 5
      { type: "pick", team: "dire" }, // 6
      { type: "pick", team: "dire" }, // 7
      { type: "pick", team: "radiant" }, // 8
      { type: "ban", team: "radiant" }, // 9
      { type: "ban", team: "dire" }, // 10
      { type: "ban", team: "radiant" }, // 11
      { type: "ban", team: "dire" }, // 12
      { type: "pick", team: "dire" }, // 13
      { type: "pick", team: "radiant" }, // 14
      { type: "pick", team: "radiant" }, // 15
      { type: "pick", team: "dire" }, // 16
      { type: "ban", team: "radiant" }, // 17
      { type: "ban", team: "dire" }, // 18
      { type: "ban", team: "radiant" }, // 19
      { type: "ban", team: "dire" }, // 20
      { type: "pick", team: "radiant" }, // 21
      { type: "pick", team: "dire" }, // 22
      { type: "pick", team: "radiant" }, // 23
      { type: "pick", team: "dire" }, // 24
    ];

    if (currentStep >= draftSequence.length) return;

    const action = draftSequence[currentStep];

    if (action.type === "ban") {
      if (action.team === "radiant") {
        const newBans = [...radiantBans];
        const index = newBans.findIndex((ban) => ban === null);
        if (index !== -1) {
          newBans[index] = heroId;
          setRadiantBans(newBans);
        }
      } else {
        const newBans = [...direBans];
        const index = newBans.findIndex((ban) => ban === null);
        if (index !== -1) {
          newBans[index] = heroId;
          setDireBans(newBans);
        }
      }
    } else if (action.type === "pick") {
      if (action.team === "radiant") {
        const newPicks = [...radiantPicks];
        const index = newPicks.findIndex((pick) => pick === null);
        if (index !== -1) {
          newPicks[index] = heroId;
          setRadiantPicks(newPicks);
        }
      } else {
        const newPicks = [...direPicks];
        const index = newPicks.findIndex((pick) => pick === null);
        if (index !== -1) {
          newPicks[index] = heroId;
          setDirePicks(newPicks);
        }
      }
    }

    setCurrentStep(currentStep + 1);
  };

  const getUnavailableHeroes = () => {
    return [
      ...(radiantBans.filter((ban) => ban !== null) as string[]),
      ...(direBans.filter((ban) => ban !== null) as string[]),
      ...(radiantPicks.filter((pick) => pick !== null) as string[]),
      ...(direPicks.filter((pick) => pick !== null) as string[]),
    ];
  };

  const getSuggestedBans = () => {
    if (selectedPlayer) {
      // If a player is selected, recommend their most played heroes
      return selectedPlayer.mostPlayed
        .sort((a, b) => b.gamesPlayed * b.winRate - a.gamesPlayed * a.winRate)
        .map((h) => h.heroId)
        .filter((heroId) => !getUnavailableHeroes().includes(heroId))
        .slice(0, 5);
    }

    // Default ban recommendations based on meta data
    return metaData
      .filter((h) => h.tier === "S" || h.tier === "A")
      .sort((a, b) => b.winRate - a.winRate)
      .map((h) => h.name)
      .filter((heroId) => !getUnavailableHeroes().includes(heroId))
      .slice(0, 5);
  };

  const getSuggestedPicks = () => {
    // For picks, recommend heroes based on meta data and counters to enemy picks
    const enemyPicks = playerTeam === "radiant" ? direPicks : radiantPicks;
    const availableMetaHeroes = metaData
      .filter((h) => h.tier === "S" || h.tier === "A")
      .sort((a, b) => b.winRate - a.winRate)
      .map((h) => h.name)
      .filter((heroId) => !getUnavailableHeroes().includes(heroId));

    return availableMetaHeroes.slice(0, 5);
  };

  const resetDraft = () => {
    setRadiantBans(Array(7).fill(null));
    setDireBans(Array(7).fill(null));
    setRadiantPicks(Array(5).fill(null));
    setDirePicks(Array(5).fill(null));
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-center text-white">
          Dota 2 Draft Assistant
        </h1>
      </header>

      <main className="max-w-6xl mx-auto">
        {phase === "setup" ? (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg text-white">
              <h2 className="text-xl font-semibold mb-4">Setup</h2>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Choose Your Team</h3>
                <div className="flex gap-4">
                  <button
                    className={`px-6 py-2 rounded ${
                      playerTeam === "radiant" ? "bg-green-600" : "bg-gray-700"
                    }`}
                    onClick={() => setPlayerTeam("radiant")}
                  >
                    Radiant
                  </button>
                  <button
                    className={`px-6 py-2 rounded ${
                      playerTeam === "dire" ? "bg-red-600" : "bg-gray-700"
                    }`}
                    onClick={() => setPlayerTeam("dire")}
                  >
                    Dire
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  {metaData.length > 0 && (
                    <div className="text-green-400">
                      {metaData.length} heroes loaded from meta data
                    </div>
                  )}

                  {players.length > 0 && (
                    <div className="text-blue-400">
                      {players.length} enemy players added
                    </div>
                  )}
                </div>

                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                  onClick={() => setPhase("draft")}
                >
                  Continue to Draft
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <MetaDataInput onMetaDataParsed={handleMetaDataParsed} />

                {metaData.length > 0 && (
                  <div className="bg-gray-800 p-4 rounded-lg mt-4 text-white">
                    <h3 className="text-lg font-semibold mb-3">
                      Meta Data Preview
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {metaData.slice(0, 6).map((hero) => (
                        <div
                          key={hero.name}
                          className={`p-2 rounded-lg ${
                            hero.tier === "S"
                              ? "bg-purple-900"
                              : hero.tier === "A"
                              ? "bg-blue-800"
                              : hero.tier === "B"
                              ? "bg-green-800"
                              : hero.tier === "C"
                              ? "bg-yellow-800"
                              : "bg-red-900"
                          }`}
                        >
                          <div className="font-medium">{hero.name}</div>
                          <div className="text-xs text-gray-300">
                            Tier {hero.tier}
                          </div>
                          <div className="text-xs text-gray-300">
                            Win: {hero.winRate.toFixed(1)}%
                          </div>
                        </div>
                      ))}
                    </div>
                    {metaData.length > 6 && (
                      <div className="text-gray-400 mt-2">
                        ...and {metaData.length - 6} more heroes
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <PlayerSearch onPlayerDataFound={handlePlayerFound} />
                <PlayerList
                  players={players}
                  onRemovePlayer={handleRemovePlayer}
                  onBanRecommendation={handleBanRecommendation}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg text-white flex justify-between items-center">
              <h2 className="text-xl font-semibold">Draft Board</h2>
              <div className="flex space-x-3">
                <button
                  className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                  onClick={resetDraft}
                >
                  Reset Draft
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => setPhase("setup")}
                >
                  Back to Setup
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DraftBoard
                  radiantBans={radiantBans}
                  direBans={direBans}
                  radiantPicks={radiantPicks}
                  direPicks={direPicks}
                  currentStep={currentStep}
                />

                <div className="mt-6 bg-gray-800 p-4 rounded-lg text-white">
                  <h3 className="text-lg font-semibold mb-3">Hero Selection</h3>
                  <HeroSelector
                    heroes={sampleHeroes.map((h) => ({
                      ...h,
                      meta: metaData.find((m) => m.name === h.id),
                    }))}
                    unavailableHeroes={getUnavailableHeroes()}
                    suggestedBans={getSuggestedBans()}
                    suggestedPicks={getSuggestedPicks()}
                    onHeroSelect={makeAction}
                    actionType={
                      currentStep < 24
                        ? currentStep < 4 ||
                          (currentStep > 8 && currentStep < 13) ||
                          (currentStep > 16 && currentStep < 21)
                          ? "ban"
                          : "pick"
                        : "pick"
                    }
                  />
                </div>
              </div>

              <div>
                <div className="bg-gray-800 p-4 rounded-lg text-white">
                  <h3 className="text-lg font-semibold mb-3">Enemy Team</h3>
                  <PlayerList
                    players={players}
                    onRemovePlayer={handleRemovePlayer}
                    onBanRecommendation={handleBanRecommendation}
                  />

                  {selectedPlayer && (
                    <div className="mt-4 border border-yellow-800 p-3 rounded-lg">
                      <h4 className="font-medium flex justify-between">
                        <span>
                          Ban Recommendations for {selectedPlayer.name}
                        </span>
                        <button
                          className="text-gray-400 hover:text-gray-300"
                          onClick={() => setSelectedPlayer(null)}
                        >
                          <X size={16} />
                        </button>
                      </h4>
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {selectedPlayer.mostPlayed
                          .slice(0, 5)
                          .map((hero, idx) => (
                            <div
                              key={idx}
                              className="bg-red-900 hover:bg-red-800 rounded px-3 py-2 cursor-pointer flex justify-between items-center"
                              onClick={() => {
                                if (
                                  currentStep < 24 &&
                                  (currentStep < 4 ||
                                    (currentStep > 8 && currentStep < 13) ||
                                    (currentStep > 16 && currentStep < 21))
                                ) {
                                  makeAction(hero.heroId);
                                }
                              }}
                            >
                              <div>
                                <div className="font-medium">{hero.heroId}</div>
                                <div className="text-xs text-gray-300">
                                  {hero.gamesPlayed} games, {hero.winRate}% win
                                  rate
                                </div>
                              </div>
                              <ArrowRight size={16} className="text-red-400" />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

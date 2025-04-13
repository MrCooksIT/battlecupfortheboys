// src/components/DraftBoard/index.tsx
import React from "react";

interface DraftBoardProps {
  radiantBans: (string | null)[];
  direBans: (string | null)[];
  radiantPicks: (string | null)[];
  direPicks: (string | null)[];
  currentStep: number;
}

const DraftBoard: React.FC<DraftBoardProps> = ({
  radiantBans,
  direBans,
  radiantPicks,
  direPicks,
  currentStep,
}) => {
  // Map current step to the corresponding action
  const draftSequence = [
    { type: "ban", team: "radiant", index: 0 }, // 0
    { type: "ban", team: "dire", index: 0 }, // 1
    { type: "ban", team: "radiant", index: 1 }, // 2
    { type: "ban", team: "dire", index: 1 }, // 3
    { type: "pick", team: "radiant", index: 0 }, // 4
    { type: "pick", team: "dire", index: 0 }, // 5
    { type: "pick", team: "dire", index: 1 }, // 6
    { type: "pick", team: "radiant", index: 1 }, // 7
    { type: "ban", team: "radiant", index: 2 }, // 8
    { type: "ban", team: "dire", index: 2 }, // 9
    { type: "ban", team: "radiant", index: 3 }, // 10
    { type: "ban", team: "dire", index: 3 }, // 11
    { type: "pick", team: "dire", index: 2 }, // 12
    { type: "pick", team: "radiant", index: 2 }, // 13
    { type: "pick", team: "radiant", index: 3 }, // 14
    { type: "pick", team: "dire", index: 3 }, // 15
    { type: "ban", team: "radiant", index: 4 }, // 16
    { type: "ban", team: "dire", index: 4 }, // 17
    { type: "ban", team: "radiant", index: 5 }, // 18
    { type: "ban", team: "dire", index: 5 }, // 19
    { type: "pick", team: "radiant", index: 4 }, // 20
    { type: "pick", team: "dire", index: 4 }, // 21
    // Additional steps if needed
  ];

  // Determine which slot is currently active
  const isActiveSlot = (
    team: "radiant" | "dire",
    type: "ban" | "pick",
    index: number
  ) => {
    if (currentStep >= draftSequence.length) return false;

    const currentAction = draftSequence[currentStep];
    return (
      currentAction.team === team &&
      currentAction.type === type &&
      currentAction.index === index
    );
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white">
      <div className="grid grid-cols-2 gap-6">
        {/* Radiant Side */}
        <div>
          <h3 className="text-center text-xl font-bold mb-4 text-green-400">
            RADIANT
          </h3>

          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Bans</h4>
            <div className="grid grid-cols-7 gap-2">
              {radiantBans.map((ban, index) => (
                <div
                  key={`radiant-ban-${index}`}
                  className={`h-10 text-center ${
                    isActiveSlot("radiant", "ban", index)
                      ? "bg-red-900 border-2 border-yellow-400"
                      : ban
                      ? "bg-red-800"
                      : "bg-gray-700"
                  } rounded-lg flex items-center justify-center text-sm overflow-hidden`}
                >
                  {ban || "-"}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Picks</h4>
            <div className="grid grid-cols-5 gap-2">
              {radiantPicks.map((pick, index) => (
                <div
                  key={`radiant-pick-${index}`}
                  className={`h-14 text-center ${
                    isActiveSlot("radiant", "pick", index)
                      ? "bg-green-900 border-2 border-yellow-400"
                      : pick
                      ? "bg-green-800"
                      : "bg-gray-700"
                  } rounded-lg flex items-center justify-center overflow-hidden`}
                >
                  {pick || "-"}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dire Side */}
        <div>
          <h3 className="text-center text-xl font-bold mb-4 text-red-400">
            DIRE
          </h3>

          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Bans</h4>
            <div className="grid grid-cols-7 gap-2">
              {direBans.map((ban, index) => (
                <div
                  key={`dire-ban-${index}`}
                  className={`h-10 text-center ${
                    isActiveSlot("dire", "ban", index)
                      ? "bg-red-900 border-2 border-yellow-400"
                      : ban
                      ? "bg-red-800"
                      : "bg-gray-700"
                  } rounded-lg flex items-center justify-center text-sm overflow-hidden`}
                >
                  {ban || "-"}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Picks</h4>
            <div className="grid grid-cols-5 gap-2">
              {direPicks.map((pick, index) => (
                <div
                  key={`dire-pick-${index}`}
                  className={`h-14 text-center ${
                    isActiveSlot("dire", "pick", index)
                      ? "bg-green-900 border-2 border-yellow-400"
                      : pick
                      ? "bg-green-800"
                      : "bg-gray-700"
                  } rounded-lg flex items-center justify-center overflow-hidden`}
                >
                  {pick || "-"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-gray-700 p-2 rounded-lg text-center">
        {currentStep < draftSequence.length ? (
          <div>
            <span className="font-medium">Current Action: </span>
            <span
              className={
                draftSequence[currentStep].team === "radiant"
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {draftSequence[currentStep].team.toUpperCase()}
            </span>
            <span> - </span>
            <span
              className={
                draftSequence[currentStep].type === "ban"
                  ? "text-red-400"
                  : "text-green-400"
              }
            >
              {draftSequence[currentStep].type.toUpperCase()}
            </span>
          </div>
        ) : (
          <div>Draft Complete</div>
        )}
      </div>
    </div>
  );
};

export default DraftBoard;

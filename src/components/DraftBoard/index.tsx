// src/components/DraftBoard/index.tsx
import React from "react";
import { DraftState } from "../../types";

interface DraftBoardProps {
  draftState: DraftState;
  currentStep: number;
}

const DraftBoard: React.FC<DraftBoardProps> = ({ draftState, currentStep }) => {
  return (
    <div className="grid grid-cols-2 gap-6 bg-gray-900 p-4 rounded-lg">
      {/* Radiant Side */}
      <div className="flex flex-col items-center">
        <h3 className="text-green-500 font-bold text-xl mb-4">RADIANT</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Ban slots - small rectangles */}
          <div className="space-y-2">
            {draftState.radiantBans.slice(0, 5).map((ban, index) => (
              <div
                key={`radiant-ban-${index}`}
                className={`h-8 w-24 border ${
                  ban ? "bg-gray-700" : "bg-gray-800"
                } rounded flex items-center justify-center ${
                  currentStep === index && "border-green-500 border-2"
                }`}
              >
                {ban ? ban : `Ban ${index + 1}`}
              </div>
            ))}
          </div>

          {/* More ban slots */}
          <div className="space-y-2">
            {draftState.radiantBans.slice(5).map((ban, index) => (
              <div
                key={`radiant-ban-${index + 5}`}
                className={`h-8 w-24 border ${
                  ban ? "bg-gray-700" : "bg-gray-800"
                } rounded flex items-center justify-center ${
                  currentStep === index + 16 && "border-green-500 border-2"
                }`}
              >
                {ban ? ban : `Ban ${index + 6}`}
              </div>
            ))}
          </div>
        </div>

        {/* Pick slots - larger rectangles */}
        <div className="mt-4 space-y-3">
          {draftState.radiantPicks.map((pick, index) => (
            <div
              key={`radiant-pick-${index}`}
              className={`h-16 w-48 border ${
                pick ? "bg-gray-700" : "bg-gray-800"
              } rounded flex items-center justify-center ${
                (currentStep === index + 4 ||
                  currentStep === index + 13 ||
                  currentStep === index + 20) &&
                "border-green-500 border-2"
              }`}
            >
              {pick ? pick : `Pick ${index + 1}`}
            </div>
          ))}
        </div>
      </div>

      {/* Dire Side */}
      <div className="flex flex-col items-center">
        <h3 className="text-red-500 font-bold text-xl mb-4">DIRE</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Ban slots */}
          <div className="space-y-2">
            {draftState.direBans.slice(0, 5).map((ban, index) => (
              <div
                key={`dire-ban-${index}`}
                className={`h-8 w-24 border ${
                  ban ? "bg-gray-700" : "bg-gray-800"
                } rounded flex items-center justify-center ${
                  currentStep === index + 1 && "border-red-500 border-2"
                }`}
              >
                {ban ? ban : `Ban ${index + 1}`}
              </div>
            ))}
          </div>

          {/* More ban slots */}
          <div className="space-y-2">
            {draftState.direBans.slice(5).map((ban, index) => (
              <div
                key={`dire-ban-${index + 5}`}
                className={`h-8 w-24 border ${
                  ban ? "bg-gray-700" : "bg-gray-800"
                } rounded flex items-center justify-center ${
                  currentStep === index + 17 && "border-red-500 border-2"
                }`}
              >
                {ban ? ban : `Ban ${index + 6}`}
              </div>
            ))}
          </div>
        </div>

        {/* Pick slots */}
        <div className="mt-4 space-y-3">
          {draftState.direPicks.map((pick, index) => (
            <div
              key={`dire-pick-${index}`}
              className={`h-16 w-48 border ${
                pick ? "bg-gray-700" : "bg-gray-800"
              } rounded flex items-center justify-center ${
                (currentStep === index + 5 ||
                  currentStep === index + 12 ||
                  currentStep === index + 21) &&
                "border-red-500 border-2"
              }`}
            >
              {pick ? pick : `Pick ${index + 1}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DraftBoard;

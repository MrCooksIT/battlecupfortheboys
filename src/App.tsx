import React, { useState, useEffect } from "react";
import "./App.css";
import MetaDataInput from "./components/MetaDataInput";
import { HeroMetaData } from "./types";

function App() {
  const [phase, setPhase] = useState<"setup" | "draft">("setup");
  const [metaData, setMetaData] = useState<HeroMetaData[]>([]);

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
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Setup</h2>
              <div className="flex gap-4 mb-4">
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  onClick={() => setPhase("draft")}
                >
                  Continue to Draft
                </button>
              </div>
              {metaData.length > 0 && (
                <div className="text-green-400">
                  {metaData.length} heroes loaded from meta data
                </div>
              )}
            </div>

            <MetaDataInput onMetaDataParsed={handleMetaDataParsed} />

            {metaData.length > 0 && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Meta Data Preview
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {metaData.slice(0, 10).map((hero) => (
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
                      <div className="font-medium text-white">{hero.name}</div>
                      <div className="text-xs text-gray-300">
                        Tier {hero.tier}
                      </div>
                      <div className="text-xs text-gray-300">
                        Win: {hero.winRate.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-300">
                        Pick: {hero.pickRate.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
                {metaData.length > 10 && (
                  <div className="text-gray-400 mt-2">
                    ...and {metaData.length - 10} more heroes
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Draft Board
            </h2>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setPhase("setup")}
            >
              Back to Setup
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

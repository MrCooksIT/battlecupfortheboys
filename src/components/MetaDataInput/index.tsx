import React, { useState } from "react";
import { parseMetaSnapshot } from "../../utils/metaParser";
import { HeroMetaData } from "../../types";

interface MetaDataInputProps {
  onMetaDataParsed: (data: HeroMetaData[]) => void;
}

const MetaDataInput: React.FC<MetaDataInputProps> = ({ onMetaDataParsed }) => {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");
  const [parsedCount, setParsedCount] = useState(0);
  const [debugInfo, setDebugInfo] = useState("");

  const handleParse = () => {
    if (!inputText.trim()) {
      setError("Please paste Dotabuff meta data first");
      setParsedCount(0);
      return;
    }

    try {
      console.log("Starting to parse meta data...");
      const parsedData = parseMetaSnapshot(inputText);

      if (parsedData.length === 0) {
        setError("No hero data could be extracted. Please check the format.");
        setParsedCount(0);

        // Add debug info
        setDebugInfo(`Input text has ${inputText.length} characters and ${
          inputText.split("\n").length
        } lines.
        The first 200 characters are: ${inputText.substring(0, 200)}...`);

        return;
      }

      onMetaDataParsed(parsedData);
      setError("");
      setParsedCount(parsedData.length);
      setDebugInfo("");

      console.log("Successfully parsed", parsedData.length, "heroes");
    } catch (err) {
      console.error("Error parsing data:", err);
      setError(`Error parsing meta data: ${err}`);
      setParsedCount(0);
      setDebugInfo(
        `Error stack: ${err instanceof Error ? err.stack : "Unknown error"}`
      );
    }
  };

  // Simplest possible parser as a fallback
  const handleSimpleParse = () => {
    try {
      const lines = inputText.split("\n");
      const heroes: HeroMetaData[] = [];

      // Process every third line (assumes pattern of name, name, stats)
      for (let i = 0; i < lines.length - 2; i += 3) {
        const heroName = lines[i].trim();
        // Skip the second line (duplicate name)
        const statsLine = lines[i + 2].trim();

        if (heroName && statsLine) {
          // Assume the first character of the stats line is the tier
          const tier = statsLine.charAt(0);
          if (["S", "A", "B", "C", "D"].includes(tier)) {
            heroes.push({
              name: heroName,
              tier,
              winRate: 50, // default values
              pickRate: 10,
              banRate: 1,
            });
          }
        }
      }

      if (heroes.length > 0) {
        onMetaDataParsed(heroes);
        setError("");
        setParsedCount(heroes.length);
        setDebugInfo("Used fallback simple parser");
      } else {
        setError("Even the simple parser could not extract heroes.");
      }
    } catch (err) {
      setError(`Fallback parser also failed: ${err}`);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white">
      <h3 className="text-xl font-semibold mb-3">Update Meta Data</h3>
      <p className="text-gray-300 mb-3">
        Paste the current Dotabuff Meta Snapshot data below to update hero
        recommendations.
      </p>

      <textarea
        className="w-full h-64 bg-gray-700 text-white p-3 rounded-lg mb-3"
        placeholder="Paste Dotabuff meta data here..."
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          setParsedCount(0);
        }}
      ></textarea>

      {error && (
        <div className="bg-red-800 text-white p-2 mb-3 rounded-lg">{error}</div>
      )}

      {debugInfo && (
        <div className="bg-yellow-800 text-white p-2 mb-3 rounded-lg text-xs">
          <p>Debug Info:</p>
          <pre>{debugInfo}</pre>
        </div>
      )}

      {parsedCount > 0 && (
        <div className="bg-green-700 text-white p-2 mb-3 rounded-lg">
          Meta data successfully parsed! {parsedCount} heroes updated.
        </div>
      )}

      <div className="flex space-x-3">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={handleParse}
        >
          Parse Meta Data
        </button>

        <button
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg"
          onClick={handleSimpleParse}
        >
          Try Simple Parser
        </button>

        <button
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          onClick={() => setInputText("")}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default MetaDataInput;

// src/utils/metaParser.ts
import { HeroMetaData } from "../types";

export function parseMetaSnapshot(textData: string): HeroMetaData[] {
  console.log("Starting specialized parser for single-line format");

  const lines = textData.split("\n");
  const heroData: HeroMetaData[] = [];

  // Skip header lines
  let i = 0;
  while (i < lines.length && !lines[i].includes("Wraith King")) {
    i++;
  }

  // Processing one hero at a time
  while (i < lines.length) {
    try {
      // Hero name is on the current line
      const heroName = lines[i].trim();
      i++; // Move to duplicate hero name

      if (i >= lines.length) break;
      i++; // Move to tier

      if (i >= lines.length) break;
      const tier = lines[i].trim();
      if (!["S", "A", "B", "C", "D"].includes(tier)) {
        // Not a valid tier, might be the start of the next hero
        continue;
      }
      i++; // Move to win rate

      if (i >= lines.length) break;
      const winRateStr = lines[i].trim();
      const winRate = parseFloat(winRateStr.replace("%", ""));
      i++; // Move to change % (skip)
      i++; // Move to pick rate

      if (i >= lines.length) break;
      const pickRateStr = lines[i].trim();
      const pickRate = parseFloat(pickRateStr.replace("%", ""));
      i++; // Move to change % (skip)
      i++; // Move to ban rate

      if (i >= lines.length) break;
      const banRateStr = lines[i].trim();
      const banRate = parseFloat(banRateStr.replace("%", ""));
      i++; // Move to next hero

      // Add hero to the collection
      heroData.push({
        name: heroName,
        tier,
        winRate,
        pickRate,
        banRate,
      });

      console.log(
        `Added hero: ${heroName}, Tier: ${tier}, WR: ${winRate}, PR: ${pickRate}, BR: ${banRate}`
      );
    } catch (error) {
      console.error(`Error at line ${i}:`, error);
      i++; // Move past the problematic line
    }
  }

  console.log(`Total heroes parsed: ${heroData.length}`);
  return heroData;
}

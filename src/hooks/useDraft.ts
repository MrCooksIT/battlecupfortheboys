import { useState } from "react";
import { DraftState, TeamSide } from "../types";
import { DRAFT_SEQUENCE } from "../data/draftSequence";

export function useDraft(initialTeam: TeamSide = "radiant") {
  const [state, setState] = useState<DraftState>({
    currentStep: 0,
    radiantBans: Array(10).fill(null),
    direBans: Array(10).fill(null),
    radiantPicks: Array(5).fill(null),
    direPicks: Array(5).fill(null),
    playerTeam: initialTeam,
  });

  const getCurrentAction = () => {
    if (state.currentStep >= DRAFT_SEQUENCE.length) {
      return null;
    }
    return DRAFT_SEQUENCE[state.currentStep];
  };

  const isPlayerTeamTurn = () => {
    const action = getCurrentAction();
    if (!action) return false;
    return action.team === state.playerTeam;
  };

  const makeAction = (heroId: string) => {
    const action = getCurrentAction();
    if (!action) return;

    setState((prevState) => {
      const newState = { ...prevState };

      if (action.type === "ban") {
        if (action.team === "radiant") {
          const newBans = [...prevState.radiantBans];
          const index = newBans.findIndex((ban) => ban === null);
          if (index !== -1) {
            newBans[index] = heroId;
            newState.radiantBans = newBans;
          }
        } else {
          const newBans = [...prevState.direBans];
          const index = newBans.findIndex((ban) => ban === null);
          if (index !== -1) {
            newBans[index] = heroId;
            newState.direBans = newBans;
          }
        }
      } else if (action.type === "pick") {
        if (action.team === "radiant") {
          const newPicks = [...prevState.radiantPicks];
          const index = newPicks.findIndex((pick) => pick === null);
          if (index !== -1) {
            newPicks[index] = heroId;
            newState.radiantPicks = newPicks;
          }
        } else {
          const newPicks = [...prevState.direPicks];
          const index = newPicks.findIndex((pick) => pick === null);
          if (index !== -1) {
            newPicks[index] = heroId;
            newState.direPicks = newPicks;
          }
        }
      }

      newState.currentStep = prevState.currentStep + 1;
      return newState;
    });
  };

  const resetDraft = () => {
    setState({
      currentStep: 0,
      radiantBans: Array(10).fill(null),
      direBans: Array(10).fill(null),
      radiantPicks: Array(5).fill(null),
      direPicks: Array(5).fill(null),
      playerTeam: state.playerTeam,
    });
  };

  const setPlayerTeam = (team: TeamSide) => {
    setState((prev) => ({ ...prev, playerTeam: team }));
  };

  return {
    state,
    getCurrentAction,
    isPlayerTeamTurn,
    makeAction,
    resetDraft,
    setPlayerTeam,
  };
}

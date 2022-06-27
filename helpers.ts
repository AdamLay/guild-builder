import _ from "lodash";
import ModelCard from "./data/models/modelCard";

export function groupMap<In, Out>(
  obj: In[],
  keySelector: (item: In) => string,
  iteratee: (value: In[], key: string) => Out
): Out[] {
  return _.chain(obj).groupBy(keySelector).map(iteratee).value() as any;
}

export function slotFilter(slotNames: string[], modelCards: ModelCard[]) {
  // if a model has any keywords that match the slot names
  return modelCards.filter((modelCard) => {
    for (let keyword of modelCard.keywords) {
      const match = slotNames.some(
        (slot) => slot === keyword || (slot === "Hero" && keyword === "Legendary Hero")
      );
      if (match) return true;
    }
    return false;
  });
}
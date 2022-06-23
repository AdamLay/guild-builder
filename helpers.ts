import _ from "lodash";

export function groupMap<In, Out>(
  obj: In[],
  keySelector: (item: In) => string,
  iteratee: (value: In[], key: string) => Out
): Out[] {
  return _.chain(obj).groupBy(keySelector).map(iteratee).value() as any;
}

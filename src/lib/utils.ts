export function shuffle<T>(original: T[]): T[] {
  const array = [...original];
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function distribute(total: number, steps: number) {
  const min = Math.floor(total / steps);
  const rest = total % steps;
  return Array.from({ length: steps }).map((_, i) => {
    return i < rest ? min + 1 : min;
  });
}

// given a record and a set of keys returns a new record
// only with the keys-values of the given keys
export function pick<T extends Record<string, any>, K extends keyof T>(
  record: T
) {
  return function (keys: K[]) {
    return keys.reduce((newRecord, currentKey, i) => {
      return { ...newRecord, [currentKey]: record[currentKey] };
    }, {}) as Pick<T, K>;
  };
}

export function unique<T>(list: T[], id: (x: T) => string) {
  return list.reduce((acc, curr) => {
    return acc.map(id).includes(id(curr)) ? acc : [...acc, curr];
  }, [] as T[]);
}

export function sum(list: number[]) {
  return list.reduce((acum, curr) => acum + curr, 0);
}

export function sumBy<T>(list: T[], by: (x: T) => number) {
  return sum(list.map(by));
}
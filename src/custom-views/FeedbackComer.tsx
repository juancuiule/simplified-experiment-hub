import { useExperimentStore } from "@/lib/flow/state";

type ListKeys =
  | "general-consumo"
  | "carnes-consumo"
  | "legumbres-consumo"
  | "frutas-consumo"
  | "verduras-consumo"
  | "cereales-consumo"
  | "hierbas-consumo"
  | "especias-consumo"
  | "infusiones-consumo";

type Data = Record<ListKeys, string[]> & { "carne-frecuencia": string };

const sumList = (
  list: string[],
  basePoints: number,
  specialPoints: Record<string, number>
): number => {
  return list.reduce((prev, curr) => {
    const currItemPoints = specialPoints.hasOwnProperty(curr)
      ? specialPoints[curr]
      : basePoints;
    return prev + currItemPoints;
  }, 0);
};

const sumListByLength = (
  list: string[],
  firstItemPoints: number,
  extraItemPoints: number = firstItemPoints
) => {
  if (list.length > 0) {
    return firstItemPoints + (list.length - 1) * extraItemPoints;
  } else {
    return 0;
  }
};

const calcDiversity = (response: Data) => {
  const p1 = response["general-consumo"].filter(
    (i) => !["frutas", "verduras"].includes(i)
  ).length;

  const p2 = sumList(response["carnes-consumo"], 0.25, {
    pescado: 1,
  });

  const p3 = sumListByLength(response["legumbres-consumo"], 1, 0.25);

  const p4 = sumListByLength(response["frutas-consumo"], 1, 0.25);

  const p5 = sumListByLength(response["verduras-consumo"], 1, 0.25);

  const lowPointsCereals = ["trigo", "maiz", "arroz-blanco"];

  const p6_1 = sumListByLength(
    response["cereales-consumo"].filter((i) => lowPointsCereals.includes(i)),
    0.25
  );

  const p6_2 = sumListByLength(
    response["cereales-consumo"].filter((i) => !lowPointsCereals.includes(i)),
    1,
    0.25
  );

  const p6 = p6_1 + p6_2;

  const p7 = sumListByLength(response["hierbas-consumo"], 1, 0.25);
  const p8 = sumListByLength(response["especias-consumo"], 1, 0.25);
  const p9 = sumListByLength(response["infusiones-consumo"], 1, 0.25);

  const p_total = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;

  console.log({
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    p7,
    p8,
    p9,
  });

  return p_total;
};

const calcMeat = (response: Data) => {
  // const p1 = response["carnes-consumo"]
  const p2 =
    {
      nunca: 0,
      "<1": 1,
      "1-2": 4,
      "3-5": 7,
      "todos-o-casi-todos-los-dias": 10,
      "todos-los-dias-mas-de-1": 13,
    }[response["carne-frecuencia"]] || 0;

  return p2;
};

export default function FeedbackComer() {
  const data = useExperimentStore((s) => s.data) as Data;

  const meat = calcMeat(data);
  const diversity = calcDiversity(data);

  return (
    <>
      <div className="w-full aspect-square border border-black relative">
        <div className="w-full h-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <>
              <div
                className="absolute w-full h-[1px] bg-gray-200"
                style={{
                  top: `${(i / 16) * 100}%`,
                }}
              ></div>
              <div
                className="absolute h-full w-[1px] bg-gray-200"
                style={{
                  left: `${(i / 16) * 100}%`,
                }}
              ></div>
            </>
          ))}
          <div className="absolute w-full h-[1px] bg-gray-400 top-1/2"></div>
          <div className="absolute h-full w-[1px] bg-gray-400 left-1/2"></div>
        </div>
        <div
          className="absolute w-4 h-4 bg-red-400 rounded-full -translate-y-1/2 -translate-x-1/2"
          style={{
            top: `${((16 - meat) / 16) * 100}%`,
          }}
        ></div>
        <div
          className="absolute w-6 h-6 bg-gray-400 rounded-full -translate-y-1/2 -translate-x-1/2"
          style={{
            top: `${((16 - meat) / 16) * 100}%`,
            left: `${(diversity / 16) * 100}%`,
          }}
        ></div>
        <div
          className="absolute w-4 h-4 bg-blue-400 rounded-full top-full -translate-y-1/2 -translate-x-1/2"
          style={{
            left: `${(diversity / 16) * 100}%`,
          }}
        ></div>
      </div>
      <span>Meat: {meat}</span>
      <span>Diversity: {diversity}</span>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </>
  );
}

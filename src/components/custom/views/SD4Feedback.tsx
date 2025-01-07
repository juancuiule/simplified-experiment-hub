"use client";
import { useExperimentStore } from "@/lib/flow/state";
import RadarComponent from "./Radar";
import { useEffect, useState } from "react";

const sum = (ns: number[]) => {
  return ns.reduce((acc, n) => acc + n, 0);
};

const compute = (key: string, data: [string, string][]) => {
  const values = data
    .filter(([k]) => k.includes(key))
    .map(([, v]) => Number(v));
  const total = sum(values);
  return { key, total, average: (total / (values.length * 5)) * 100 };
};

export function SD4Feedback() {
  const data = useExperimentStore((s) => s.data);
  const slug = useExperimentStore((s) => s.id);

  const items = Object.entries(data) as [string, string][];

  const wild = compute("wild", items);
  const craft = compute("craft", items);
  const mean = compute("mean", items);
  const special = compute("special", items);

  const [scores, setScores] = useState({
    wild: { min: 0, max: 0, avg: 0, dev: 1 },
    craft: { min: 0, max: 0, avg: 0, dev: 1 },
    mean: { min: 0, max: 0, avg: 0, dev: 1 },
    special: { min: 0, max: 0, avg: 0, dev: 1 },
  });

  useEffect(() => {
    fetch(
      `/api/experiment/${slug}/average-with-deviation?dataKeys=wild,craft,mean,special`
    )
      .then((res) => res.json())
      .then((data) => {
        setScores(data[0]);
      });
  }, []);

  return (
    <div>
      <div className="w-full flex justify-center items-center py-2 h-16 mb-6">
        <svg className="h-full w-auto" viewBox="0 0 19 36">
          <path d="M14.4453 3.00666L12.6807 1.98836C12.543 1.90846 12.5336 1.71296 12.6637 1.62116L14.4283 0.373356C14.5728 0.271356 14.7725 0.374206 14.7725 0.551856V2.81796C14.7725 2.98541 14.5906 3.09081 14.4453 3.00666Z"></path>
          <path d="M4.70684 2.98286L6.47144 1.96456C6.60914 1.88466 6.61849 1.68916 6.48844 1.59736L4.72384 0.349556C4.57934 0.247556 4.37959 0.350406 4.37959 0.528056V2.79416C4.37959 2.96161 4.56149 3.06701 4.70684 2.98286Z"></path>
          <path d="M17.5869 20.6459L7.36649 14.7452V13.1735L9.03079 14.1349C9.17699 14.219 9.33934 14.2607 9.50169 14.2607C9.66404 14.2607 9.82724 14.219 9.97259 14.1349L14.6068 11.4591C14.8983 11.2908 15.0777 10.9797 15.0777 10.6431V5.29146C15.0777 4.95486 14.8983 4.64376 14.6068 4.47546L9.97259 1.79966C9.68104 1.63136 9.32234 1.63136 9.02994 1.79966L4.39574 4.47546C4.10419 4.64376 3.92484 4.95486 3.92484 5.29146V10.6431C3.92484 10.9797 4.10419 11.2908 4.39574 11.4591L5.28484 11.9725V15.3461C5.28484 15.7176 5.48289 16.061 5.80504 16.2471L16.0254 22.1478V29.6814L9.50084 33.4477L2.97624 29.6814V22.1478L5.80674 20.5124C6.06259 20.3645 6.06174 19.9965 5.80674 19.8486L4.58019 19.1405C4.40764 19.0411 4.19599 19.0411 4.02344 19.1405L1.41479 20.6467C1.09264 20.8329 0.894592 21.1763 0.894592 21.5477V30.2832C0.894592 30.6546 1.09264 30.998 1.41479 31.1842L8.97979 35.5515C9.14044 35.6441 9.32064 35.6909 9.49999 35.6909C9.67934 35.6909 9.85954 35.6441 10.0202 35.5515L17.5852 31.1842C17.9073 30.998 18.1054 30.6546 18.1054 30.2832V21.5469C18.1071 21.1746 17.909 20.8312 17.5869 20.6459ZM5.80929 5.83461L9.50169 3.70281L13.1941 5.83461V10.0982L9.50169 12.23L5.80929 10.0982V5.83461Z"></path>
        </svg>
      </div>
      <RadarComponent
        chartData={[
          {
            key: "Wild",
            value: (wild.total - scores["wild"].avg) / scores["wild"].dev,
          },
          {
            key: "Craft",
            value: (craft.total - scores["craft"].avg) / scores["craft"].dev,
          },
          {
            key: "Mean",
            value: (mean.total - scores["mean"].avg) / scores["mean"].dev,
          },
          {
            key: "Special",
            value:
              (special.total - scores["special"].avg) / scores["special"].dev,
          },
        ]}
      />
      <pre>
        <span>Tus respuestas</span>
        <br />
        <code>{JSON.stringify({ wild, craft, mean, special }, null, 2)}</code>
        <br />
        <span>Average con desvío para calcular z-score</span>
        <br />
        <code>{JSON.stringify(scores, null, 2)}</code>
      </pre>
    </div>
  );
}

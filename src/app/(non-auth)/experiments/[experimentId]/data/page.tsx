import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Clock,
  Code,
  Table,
  User,
} from "react-feather";

import { BadgeDelta, Card, Flex, Grid, Metric, Text } from "@tremor/react";
import AnswersTable from "./Table";
const categories = [
  {
    title: "Sales",
    metric: "$ 12,699",
    metricPrev: "$ 9,456",
    delta: "34.3%",
    deltaType: "moderateIncrease",
  },
  {
    title: "Profit",
    metric: "$ 40,598",
    metricPrev: "$ 45,564",
    delta: "10.9%",
    deltaType: "moderateDecrease",
  },
  {
    title: "Customers",
    metric: "1,072",
    metricPrev: "856",
    delta: "25.3%",
    deltaType: "moderateIncrease",
  },
];

export const metadata: Metadata = {
  title: `Data`,
};

export default function Page({ params }: { params: { experimentId: string } }) {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex justify-between items-center h-12 bg-gray-200 rounded p-2.5 gap-2.5">
        <div className="flex justify-center items-center gap-1">
          <Link href={`/experiments/${params.experimentId}`}>
            <ChevronLeft size={16} />
          </Link>
          <span className="font-medium">Participants and data</span>
        </div>
        <div className="flex gap-2.5 text-white">
          <button className="flex justify-center items-center gap-2 rounded bg-[#4F4F4F] px-2.5 py-1">
            <span className="font-medium">JSON</span>
            <Code size={16} />
          </button>
          <button className="flex justify-center items-center gap-2 rounded bg-success px-2.5 py-1">
            <span className="font-medium">CSV</span>
            <Table size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 bg-gray-200 rounded-md p-4 gap-4">
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
          {categories.map((item) => (
            <Card key={item.title} className="bg-gray-200">
              <Flex alignItems="start">
                <Text>{item.title}</Text>
                <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
              </Flex>
              <Flex
                justifyContent="start"
                alignItems="baseline"
                className="truncate space-x-3"
              >
                <Metric>{item.metric}</Metric>
                <Text className="truncate">from {item.metricPrev}</Text>
              </Flex>
            </Card>
          ))}
        </Grid>
        {/* <div className="flex gap-3">
          <div className="bg-gray-100 flex flex-col gap-2 p-2 rounded">
            <p className="text-3xl flex items-center gap-2">
              <User />
              1024
            </p>
            <span className="text-xs">Participants</span>
          </div>

          <div className="bg-gray-100 flex flex-col gap-2 p-2 rounded">
            <p className="text-3xl flex items-center gap-2">
              <Clock />
              5m 32s
            </p>
            <span className="text-xs">Average time</span>
          </div>
        </div> */}

        <div className="w-full flex-1 flex flex-col gap-4">
          <AnswersTable />
          <div className="flex gap-2.5 text-black justify-end mt-auto">
            <span className="flex justify-center items-center gap-2 rounded bg-gray-100 px-2 py-0.5">
              1/20
            </span>
            <button className="flex justify-center items-center gap-2 rounded bg-gray-100 px-2 py-0.5">
              <ArrowLeft size={16} />
              <span className="text-sm">Previous</span>
            </button>
            <button className="flex justify-center items-center gap-2 rounded bg-gray-100 px-2 py-0.5">
              <span className="text-sm">Next</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

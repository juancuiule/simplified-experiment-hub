"use client";
import { Answer } from "@/api";
import { Grid } from "@githubocto/flat-ui";

const parseAnswers = (answers: Answer[]) => {
  const columns = Array.from(
    new Set(answers.flatMap((answer) => Object.keys(answer.body)))
  );
  const rows = answers.map((answer) => ({
    id: answer.id,
    ...(Object.fromEntries(
      columns.map((column) => [column, answer.body[column]])
    ) as Record<string, string>),
  }));
  return rows;
};

export default function FlatTable(props: { data: Answer[] }) {
  return (
    <div className="h-full flex flex-col flex-1 font-mono">
      <Grid data={parseAnswers(props.data)}></Grid>
    </div>
  );
}

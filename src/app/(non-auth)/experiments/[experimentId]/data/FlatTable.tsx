"use client";
import { Answer } from "@/api";
import { Grid } from "@githubocto/flat-ui";

export default function FlatTable(props: { data: Answer[] }) {
  return (
    <div className="h-full flex flex-col flex-1">
      <Grid data={props.data.map((d) => ({ id: d.id, ...d.body }))}></Grid>
    </div>
  );
}

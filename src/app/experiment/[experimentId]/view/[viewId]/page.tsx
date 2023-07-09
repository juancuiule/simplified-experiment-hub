export default function Page({
  params,
}: {
  params: { experimentId: string; viewId: string };
}) {
  return (
    <h1>
      Experiment {params.experimentId} view {params.viewId}
    </h1>
  );
}

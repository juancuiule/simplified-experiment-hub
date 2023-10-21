export default function ExperimentViews({
  params,
}: {
  params: { experimentId: string };
}) {
  return (
    <div>
      <h1>Experiment {params.experimentId} - Views</h1>
    </div>
  );
}

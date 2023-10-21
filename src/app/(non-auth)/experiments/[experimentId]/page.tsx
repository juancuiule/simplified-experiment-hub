export default function Experiment({
  params,
}: {
  params: { experimentId: string };
}) {
  return <div>Rendering experiment {params.experimentId}</div>;
}

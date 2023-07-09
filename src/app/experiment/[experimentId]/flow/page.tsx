export default function Page({ params }: { params: { experimentId: string } }) {
  return <h1>Experiment {params.experimentId} flow</h1>;
}

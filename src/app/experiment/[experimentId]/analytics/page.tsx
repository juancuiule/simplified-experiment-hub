export default function Page({ params }: { params: { experimentId: string } }) {
  return <h1>Experiment {params.experimentId} Analytics</h1>;
}

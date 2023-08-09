export default function Page({ params }: { params: { experimentId: string } }) {
  return <h1>Edit experiment {params.experimentId}</h1>;
}

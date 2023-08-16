export default function Page(props: { params: { teamId: string } }) {
  return <div className="flex">Team: {props.params.teamId}</div>;
}

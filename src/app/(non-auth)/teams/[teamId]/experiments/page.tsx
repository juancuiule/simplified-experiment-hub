export default function Page(props: { params: { teamId: string } }) {
  return (
    <div className="flex">
      Experiments created by team: {props.params.teamId}
    </div>
  );
}

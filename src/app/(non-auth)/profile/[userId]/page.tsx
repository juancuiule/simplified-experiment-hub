export default function UserProfile({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <div>
      <h1>User: {params.userId}</h1>
    </div>
  );
}

export default function Layout(props: {
  children: React.ReactNode;
  viewModal: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.viewModal}
    </>
  );
}

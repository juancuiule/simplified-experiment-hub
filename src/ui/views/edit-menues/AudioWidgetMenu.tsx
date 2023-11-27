import { AudioWidget } from "@/lib/widgets/content";
import { Formik } from "formik";

export default function AudioWidgetMenu(props: {
  widget: AudioWidget;
  update: (widget: AudioWidget) => void;
}) {
  const { widget, update } = props;
  return (
    <Formik
      initialValues={{
        ...widget.props,
      }}
      onSubmit={(values) => {
        update({
          ...widget,
          props: {
            ...widget.props,
            ...values,
          },
        });
      }}
    >
      {({ handleSubmit, handleChange, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label>Url</label>
              <input
                value={values.url}
                type="text"
                onChange={handleChange}
                name="url"
                className="border border-black rounded-md"
              />
            </div>
            <button type="submit">submit</button>
          </form>
        );
      }}
    </Formik>
  );
}

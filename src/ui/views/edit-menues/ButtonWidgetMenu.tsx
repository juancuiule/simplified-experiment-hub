import { ButtonWidget } from "@/lib/widgets/layout";
import { Formik } from "formik";

export function ButtonWidgetMenu(props: {
  widget: ButtonWidget;
  update: (widget: ButtonWidget) => void;
}) {
  const { widget, update } = props;

  return (
    <Formik
      initialValues={{
        label: widget.props.text,
      }}
      onSubmit={(values) => {
        update({
          template: "button",
          widgetFamily: "layout",
          props: {
            text: values.label,
            behaivor: "next_node",
          },
        });
      }}
    >
      {({ handleSubmit, handleChange, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label>Label</label>
              <textarea
                value={values.label}
                onChange={handleChange}
                name="label"
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

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
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col gap-1">
              <label>Label</label>
              <textarea
                value={values.label}
                onChange={handleChange}
                name="label"
                className="border border-black rounded-md p-1"
              />
            </div>
            <button
              onClick={() => handleSubmit()}
              type="button"
              className="p-2 py-0.5 mt-2 mx-auto border border-black rounded hover:bg-gray-300"
            >
              actualizar
            </button>
          </form>
        );
      }}
    </Formik>
  );
}

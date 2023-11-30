import { SingleCheckboxWidget } from "@/lib/widgets/response";
import { Formik } from "formik";

export default function SingleCheckboxMenu(props: {
  widget: SingleCheckboxWidget;
  update: (widget: SingleCheckboxWidget) => void;
}) {
  const { widget, update } = props;
  return (
    <Formik
      initialValues={{
        dataKey: widget.props.dataKey,
        label: widget.props.label,
        defaultValue: widget.props.defaultValue,
      }}
      onSubmit={(values) => {
        update({
          template: "single_checkbox",
          widgetFamily: "response",
          props: {
            ...widget.props,
            label: values.label,
            dataKey: values.dataKey,
            defaultValue: values.defaultValue,
          },
        });
      }}
    >
      {({ handleSubmit, handleChange, values }) => {
        return (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col gap-1">
              <label>Label</label>
              <input
                value={values.label}
                type="text"
                onChange={handleChange}
                name="label"
                className="border border-black rounded-md p-1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Data key</label>
              <input
                value={values.dataKey}
                type="text"
                onChange={handleChange}
                name="dataKey"
                className="border border-black rounded-md p-1"
              />
            </div>
            <button
              type="button"
              onClick={() => handleSubmit()}
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

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
            label: values.label,
            dataKey: values.dataKey,
            defaultValue: values.defaultValue,
          },
        });
      }}
    >
      {({ handleSubmit, handleChange, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label>Label</label>
              <input
                value={values.label}
                type="text"
                onChange={handleChange}
                name="label"
                className="border border-black rounded-md"
              />
            </div>
            <div className="flex flex-row gap-1 items-center">
              <input
                checked={values.defaultValue}
                onChange={handleChange}
                name="options"
                type="checkbox"
                className="border border-black rounded-md"
              />
              <label>Default checked</label>
            </div>
            <div className="flex flex-col gap-1">
              <label>Data key</label>
              <input
                value={values.dataKey}
                type="text"
                onChange={handleChange}
                name="dataKey"
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

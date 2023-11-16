import { optionsToString, stringToOptions } from "@/lib/utils";
import { CheckboxWidget } from "@/lib/widgets/response";
import { Formik } from "formik";

export default function CheckboxMenu(props: {
  widget: CheckboxWidget;
  update: (widget: CheckboxWidget) => void;
}) {
  const { widget, update } = props;
  return (
    <Formik
      initialValues={{
        options: optionsToString(widget.props.options),
        dataKey: widget.props.dataKey,
        label: widget.props.label,
      }}
      onSubmit={(values) => {
        update({
          template: "checkbox",
          widgetFamily: "response",
          props: {
            label: values.label,
            dataKey: values.dataKey,
            options: stringToOptions(values.options),
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
            <div className="flex flex-col gap-1">
              <label>Options</label>
              <input
                value={values.options}
                onChange={handleChange}
                name="options"
                type="text"
                className="border border-black rounded-md"
              />
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

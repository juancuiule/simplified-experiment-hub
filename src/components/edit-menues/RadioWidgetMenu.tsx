import { RadioWidget } from "@/lib/widgets/response";
import { Formik } from "formik";

export default function RadioWidgetMenu(props: {
  update: (widget: RadioWidget) => void;
}) {
  return (
    <Formik
      initialValues={{
        options: "",
        dataKey: "",
        label: "",
      }}
      onSubmit={(values) => {
        const options = values.options.split(",").map((option) => {
          return {
            label: option.trim(),
            value: option.trim().replaceAll(" ", "_").toLowerCase(),
          };
        });
        console.log(options);
        props.update({
          template: "radio",
          widgetFamily: "response",
          props: {
            label: values.label,
            options: options,
            dataKey: values.dataKey,
          },
        });
      }}
    >
      {({ handleSubmit, handleChange, setFieldValue, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label>Label</label>
              <input
                type="text"
                onChange={handleChange}
                name="label"
                className="border border-black rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Options</label>
              <input
                type="text"
                name="options"
                onChange={handleChange}
                className="border border-black rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>key</label>
              <input
                onChange={handleChange}
                name="dataKey"
                type="text"
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

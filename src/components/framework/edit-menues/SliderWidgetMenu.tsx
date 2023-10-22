import { SliderWidget } from "@/lib/widgets/response";
import { Formik } from "formik";

export default function SliderWidgetMenu(props: {
  update: (widget: SliderWidget) => void;
}) {
  return (
    <Formik
      initialValues={{
        max: 100,
        min: 0,
        minLabel: "0",
        maxLabel: "100",
        dataKey: "",
        label: "",
      }}
      onSubmit={(values) => {
        props.update({
          template: "slider",
          widgetFamily: "response",
          props: {
            label: values.label,
            min: values.min,
            max: values.max,
            dataKey: values.dataKey,
          },
        });
      }}
    >
      {({ handleSubmit, handleChange }) => {
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
              <label>Min label</label>
              <input
                onChange={handleChange}
                name="min"
                type="text"
                className="border border-black rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Max value</label>
              <input
                onChange={handleChange}
                name="max"
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

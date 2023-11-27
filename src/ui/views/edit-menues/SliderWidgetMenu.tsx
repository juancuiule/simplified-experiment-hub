import { SliderWidget } from "@/lib/widgets/response";
import { Formik } from "formik";

export default function SliderWidgetMenu(props: {
  widget: SliderWidget;
  update: (widget: SliderWidget) => void;
}) {
  const { widget, update } = props;
  return (
    <Formik
      initialValues={{
        max: 100,
        min: 0,
        minLabel: "0",
        maxLabel: "100",
        ...widget.props,
      }}
      onSubmit={(values) => {
        update({
          template: "slider",
          widgetFamily: "response",
          props: values,
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
              <label>Min label</label>
              <input
                value={values.minLabel}
                onChange={handleChange}
                name="minLabel"
                type="text"
                className="border border-black rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Max label</label>
              <input
                value={values.maxLabel}
                onChange={handleChange}
                name="maxLabel"
                type="text"
                className="border border-black rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Data key</label>
              <input
                value={values.dataKey}
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

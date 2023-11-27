import { RatingWidget } from "@/lib/widgets/response";
import { Formik } from "formik";

export default function RatingWidgetMenu(props: {
  widget: RatingWidget;
  update: (widget: RatingWidget) => void;
}) {
  const { widget, update } = props;

  return (
    <Formik
      initialValues={{
        ...widget.props,
        optionsString: (widget.props.optionsLabel || [])
          .map((option) => `${option.label}-${option.value}`)
          .join(",")
          .trim(),
      }}
      onSubmit={(values) => {
        const optionsLabel: RatingWidget["props"]["optionsLabel"] =
          values.optionsString.split(",").map((s) => {
            const [value, label] = s.trim().split("-");
            return {
              label,
              value: value,
            };
          });

        update({
          template: "rating",
          widgetFamily: "response",
          props: {
            ...widget.props,
            ...values,
            optionsLabel,
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
              <label>Number of options</label>
              <input
                value={values.max}
                onChange={handleChange}
                name="options"
                type="text"
                className="border border-black rounded-md"
                placeholder="5"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Options labels</label>
              <input
                value={values.optionsString}
                type="text"
                name="optionsString"
                onChange={handleChange}
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

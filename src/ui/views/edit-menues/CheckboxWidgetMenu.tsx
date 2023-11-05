import Markdown from "@/components/Markdown";
import { CheckboxWidget } from "@/lib/widgets/response";
import { Formik, useFormikContext } from "formik";
import { Check } from "react-feather";

export default function CheckboxMenu(props: {
  update: (widget: CheckboxWidget) => void;
}) {
  return (
    <Formik
      initialValues={{
        options: "",
        dataKey: "checkbox",
        label: "",
      }}
      onSubmit={(values) => {
        props.update({
          template: "checkbox",
          widgetFamily: "response",
          props: {
            label: values.label,
            dataKey: values.dataKey,
            options: values.options.split(",").map((option) => ({
              label: option,
              value: option.toLocaleLowerCase().replace(" ", "-"),
            })),
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
              <label>Options</label>
              <input
                onChange={handleChange}
                name="options"
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

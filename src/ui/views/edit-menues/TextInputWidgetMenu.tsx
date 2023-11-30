import { TextInputWidget } from "@/lib/widgets/response";
import { Formik } from "formik";

export default function TextInputWidgetMenu(props: {
  widget: TextInputWidget;
  update: (widget: TextInputWidget) => void;
}) {
  const { widget, update } = props

  return (
    <Formik
      initialValues={widget.props}
      onSubmit={(values) => {
        update({
          ...widget,
          props: {
            ...widget.props,
            ...values,
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
                type="text"
                value={values.label}
                onChange={handleChange}
                name="label"
                className="border border-black rounded-md p-1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Placeholder</label>
              <input
                type="text"
                value={values.placeholder}
                onChange={handleChange}
                name="placeholder"
                className="border border-black rounded-md p-1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Data key</label>
              <input
                type="text"
                value={values["dataKey"]}
                onChange={handleChange}
                name="dataKey"
                className="border border-black rounded-md p-1"
              />
            </div>
            <button type="button" onClick={() => handleSubmit()} className="p-2 py-0.5 mt-2 mx-auto border border-black rounded hover:bg-gray-300">actualizar</button>
          </form>
        );
      }}
    </Formik>
  );
}

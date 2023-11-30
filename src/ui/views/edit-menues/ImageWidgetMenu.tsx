import { ImageWidget } from "@/lib/widgets/content";
import { Formik } from "formik";

export default function ImageWidgetMenu(props: {
  widget: ImageWidget;
  update: (widget: ImageWidget) => void;
}) {
  const { widget, update } = props;
  return (
    <Formik
      initialValues={{
        ...widget.props,
      }}
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
              <label>Url</label>
              <input
                value={values.url}
                type="text"
                onChange={handleChange}
                name="url"
                className="border border-black rounded-md p-1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Alt text</label>
              <input
                value={values.alt}
                type="text"
                onChange={handleChange}
                name="alt"
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

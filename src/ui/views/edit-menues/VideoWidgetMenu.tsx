import { VideoWidget } from "@/lib/widgets/content";
import { Formik } from "formik";

export default function VideoWidgetMenu(props: {
  widget: VideoWidget;
  update: (widget: VideoWidget) => void;
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
            <div className="flex flex-row gap-1 items-center">
              <input
                checked={values.autoplay}
                onChange={handleChange}
                name="autoplay"
                type="checkbox"
                className="border border-black rounded-md p-1"
              />
              <label>Autoplay</label>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <input
                checked={values.muted}
                onChange={handleChange}
                name="muted"
                type="checkbox"
                className="border border-black rounded-md p-1"
              />
              <label>Muted</label>
            </div>
            <button type="button" onClick={() => handleSubmit()} className="p-2 py-0.5 mt-2 mx-auto border border-black rounded hover:bg-gray-300">actualizar</button>
          </form>
        );
      }}
    </Formik>
  );
}

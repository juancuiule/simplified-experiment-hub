import { RichTextWidget } from "@/lib/widgets/content";
import { Formik } from "formik";

export default function RichTextWidgetMenu(props: {
  widget: RichTextWidget;
  update: (widget: RichTextWidget) => void;
}) {
  const { widget, update } = props;

  return (
    <Formik
      initialValues={{
        content: widget.props.content,
      }}
      onSubmit={(values) => {
        update({
          template: "rich_text",
          widgetFamily: "content",
          props: {
            content: values.content,
          },
        });
      }}
    >
      {({ handleSubmit, handleChange, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label>Content</label>
              <textarea
                value={values.content}
                onChange={handleChange}
                name="content"
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

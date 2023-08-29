import { RichTextWidget } from "@/lib/widgets/content";
import { Formik } from "formik";

export default function RichTextWidgetMenu(props: {
  update: (widget: RichTextWidget) => void;
}) {
  return (
    <Formik
      initialValues={{
        content: "",
      }}
      onSubmit={(values) => {
        props.update({
          template: "rich_text",
          widgetFamily: "content",
          props: {
            content: values.content,
          },
        });
      }}
    >
      {({ handleSubmit, handleChange }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label>Content</label>
              <textarea
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

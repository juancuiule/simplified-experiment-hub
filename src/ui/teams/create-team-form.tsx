// "use client";
import { Formik } from "formik";
import { Trash } from "react-feather";
import * as Yup from "yup";

const createTeamSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  cover: Yup.string().required(),
});

export default function CreateTeamForm() {
  // const router = useRouter();

  // TODO: add input to invite members

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        cover: "",
      }}
      validationSchema={createTeamSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          // router.push(`/teams/${values.slug}/`);
        }, 400);
      }}
    >
      {({
        handleSubmit,
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        submitCount,
        setFieldValue,
      }) => (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor="name">
              Name
            </label>
            <input
              className={`border rounded-md h-10 px-2 outline-info flex ${
                submitCount > 0 && errors.name && touched.name
                  ? "border-error"
                  : ""
              }`}
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              placeholder="Dilemas de la pandemia"
            />
            {submitCount > 0 && errors.name && touched.name && (
              <span className="text-error text-xs">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              rows={5}
              className={`border rounded-md px-2 outline-info flex ${
                submitCount > 0 && errors.description && touched.description
                  ? "border-error"
                  : ""
              }`}
              name="description"
              id="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              placeholder="Ayudanos a entender cómo tomamos decisiones morales durante la pandemia"
            />
            {submitCount > 0 && errors.description && touched.description && (
              <span className="text-error text-xs">{errors.description}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor="cover">
              Cover image
            </label>
            <input
              className={`border rounded-md h-10 px-2 outline-info flex ${
                submitCount > 0 && errors.cover && touched.cover
                  ? "border-error"
                  : ""
              }`}
              type="text"
              name="cover"
              id="cover"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cover}
              placeholder=""
            />
            <div
              className={`
              w-full h-full aspect-video rounded-md border border-dashed border-black/50 flex justify-center items-center hover:cursor-pointer relative
              ${
                values.cover !== ""
                  ? "bg-cover bg-center bg-no-repeat"
                  : "bg-gray-200"
              }
              `}
              style={{
                backgroundImage: values.cover ? `url(${values.cover})` : "",
              }}
            >
              {values.cover === "" && (
                <span className={`text-xs text-black/50`}>
                  Drop cover image here
                </span>
              )}
              <div
                className={`${
                  values.cover === "" ? "hidden" : ""
                } absolute right-2 bottom-2`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setFieldValue("cover", "");
                  }}
                  className={`bg-gray-400/50 backdrop-blur-sm rounded-sm p-1`}
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>

            {submitCount > 0 && errors.description && touched.description && (
              <span className="text-error text-xs">{errors.description}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex font-semibold justify-center flex-1 px-6 py-2 rounded-lg border text-black items-center gap-2 border-info bg-info transition-colors hover:bg-info/40 outline-info/40"
          >
            Create team
          </button>
        </form>
      )}
    </Formik>
  );
}

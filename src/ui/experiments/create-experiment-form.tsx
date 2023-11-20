"use client";
import { API } from "@/api";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { RefreshCw, Trash } from "react-feather";
import * as Yup from "yup";

const createExperimentSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  slug: Yup.string().required(),
  coverImage: Yup.string().required(),
  team: Yup.string().required(),
});

export default function CreateExperimentForm() {
  const router = useRouter();

  // TODO fetch user teams

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        slug: "",
        coverImage: "",
        // hardcoded for now
        team: "3",
      }}
      validationSchema={createExperimentSchema}
      onSubmit={(values, { setSubmitting }) => {
        API.experiments
          .create({ ...values, teamId: Number(values.team) })
          .then((res) => {
            router.push(`/experiments/${res.pk}`);
          });
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
              onChange={(e) => {
                handleChange(e);
                if (!Boolean(touched.slug)) {
                  setFieldValue(
                    "slug",
                    e.target.value.toLowerCase().replace(/ /g, "-")
                  );
                }
              }}
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
            <label className="text-md font-medium" htmlFor="slug">
              Slug
            </label>
            <div className="flex flex-1 items-center justify-between gap-2">
              <input
                className={`border rounded-md h-10 px-2 outline-info flex flex-1 ${
                  submitCount > 0 && errors.slug && touched.slug
                    ? "border-error"
                    : ""
                }`}
                type="text"
                name="slug"
                id="slug"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.slug}
                placeholder=""
              />
              <button
                type="button"
                onClick={() => {
                  setFieldValue(
                    "slug",
                    values.name.toLowerCase().replace(/ /g, "-")
                  );
                }}
                aria-label="Refresh slug"
              >
                <RefreshCw
                  className="hover:stroke-info transition-colors"
                  size={16}
                />
              </button>
            </div>
            {submitCount > 0 && errors.slug && touched.slug && (
              <span className="text-error text-xs">{errors.slug}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor="coverImage">
              Cover image
            </label>
            <input
              className={`border rounded-md h-10 px-2 outline-info flex ${
                submitCount > 0 && errors.coverImage && touched.coverImage
                  ? "border-error"
                  : ""
              }`}
              type="text"
              name="coverImage"
              id="coverImage"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.coverImage}
              placeholder=""
            />
            <div
              className={`
              w-full h-full aspect-video rounded-md border border-dashed border-black/50 flex justify-center items-center hover:cursor-pointer relative
              ${
                values.coverImage !== ""
                  ? "bg-cover bg-center bg-no-repeat"
                  : "bg-gray-200"
              }
              `}
              style={{
                backgroundImage: values.coverImage
                  ? `url(${values.coverImage})`
                  : "",
              }}
            >
              {values.coverImage === "" && (
                <span className={`text-xs text-black/50`}>
                  Drop cover image here
                </span>
              )}
              <div
                className={`${
                  values.coverImage === "" ? "hidden" : ""
                } absolute right-2 bottom-2`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setFieldValue("coverImage", "");
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
            Create experiment
          </button>
        </form>
      )}
    </Formik>
  );
}

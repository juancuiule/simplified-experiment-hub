"use client";
import { Formik } from "formik";

import * as Yup from "yup";

const newViewSchema = Yup.object({
  name: Yup.string().required(),
  slug: Yup.string().required(),
  description: Yup.string().required(),
});

export default function CreateNewViewForm() {
  return (
    <Formik
      initialValues={{
        name: "",
        slug: "",
        description: "",
      }}
      validationSchema={newViewSchema}
      onSubmit={(values, { setSubmitting }) => {
        // TODO: Handle form submission
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
                setFieldValue(
                  "slug",
                  e.target.value.toLowerCase().replace(/ /g, "-")
                );
              }}
              onBlur={handleBlur}
              value={values.name}
              placeholder="Regresores"
            />
            {submitCount > 0 && errors.name && touched.name && (
              <span className="text-error text-xs">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor="slug">
              Slug
            </label>
            <div className="flex flex-1 items-center justify-between gap-2">
              <input
                className={`border disabled:text-black/60 rounded-md h-10 px-2 outline-info flex flex-1 ${
                  submitCount > 0 && errors.slug && touched.slug
                    ? "border-error"
                    : ""
                }`}
                type="text"
                name="slug"
                id="slug"
                disabled
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.slug}
                placeholder=""
              />
            </div>
            {submitCount > 0 && errors.slug && touched.slug && (
              <span className="text-error text-xs">{errors.slug}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              rows={5}
              className={`border rounded-md p-2 outline-info flex ${
                submitCount > 0 && errors.description && touched.description
                  ? "border-error"
                  : ""
              }`}
              name="description"
              id="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              placeholder="A short description about what do we ask in this view."
            />
            {submitCount > 0 && errors.description && touched.description && (
              <span className="text-error text-xs">{errors.description}</span>
            )}
          </div>

          <div className="flex justify-end">
            <button
              disabled={isSubmitting}
              type={"submit"}
              className="flex font-semibold justify-center flex-1 px-6 py-2 rounded-lg border items-center gap-2 border-info bg-info transition-colors hover:bg-info/40 outline-info/40 text-white hover:text-black"
            >
              Create
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

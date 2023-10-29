"use client";
import { Formik } from "formik";
import * as Yup from "yup";

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

export default function ResetPasswordForm() {
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={resetPasswordSchema}
      onSubmit={(values, { setSubmitting }) => {
        // TODO: Handle login
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
      }) => (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor="email">
              Email
            </label>
            <input
              className={`border rounded-md h-10 px-2 outline-info flex ${
                submitCount > 0 && errors.email && touched.email
                  ? "border-error"
                  : ""
              }`}
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="your@email.com"
            />
            {submitCount > 0 && errors.email && touched.email && (
              <span className="text-error text-xs">{errors.email}</span>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type={"submit"}
            className="flex font-semibold justify-center flex-1 px-6 py-2 rounded-lg border text-black items-center gap-2  border-info bg-info transition-colors hover:bg-info/40 outline-info/40"
          >
            Reset password
          </button>
        </form>
      )}
    </Formik>
  );
}

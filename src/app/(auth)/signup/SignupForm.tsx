"use client";
import { Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  name: Yup.string().required(),
  organization: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

export default function SignupForm() {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        organization: "",
        password: "",
      }}
      validationSchema={signupSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
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
              placeholder="Juan Ignacio Cuiule"
            />
            {submitCount > 0 && errors.name && touched.name && (
              <span className="text-error text-xs">{errors.name}</span>
            )}
          </div>
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

          <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor="organization">
              Organization
            </label>
            <input
              className={`border rounded-md h-10 px-2 outline-info flex ${
                submitCount > 0 && errors.organization && touched.organization
                  ? "border-error"
                  : ""
              }`}
              type="text"
              name="organization"
              id="organization"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.organization}
              placeholder="Universidad Tecnológica Nacional"
            />
            {submitCount > 0 && errors.organization && touched.organization && (
              <span className="text-error text-xs">{errors.organization}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-md font-medium" htmlFor="password">
              Password
            </label>
            <input
              className={`border rounded-md h-10 px-2 outline-info flex ${
                submitCount > 0 && errors.password && touched.password
                  ? "border-error"
                  : ""
              }`}
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Your password"
            />
            {submitCount > 0 && errors.password && touched.password && (
              <span className="text-error text-xs">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex font-semibold justify-center flex-1 px-6 py-2 rounded-lg border text-black items-center gap-2  border-info bg-info transition-colors hover:bg-info/40 outline-info/40"
          >
            Sign up
          </button>

          <p className="text-xs text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-info hover:underline">
              Log in
            </Link>
          </p>
        </form>
      )}
    </Formik>
  );
}

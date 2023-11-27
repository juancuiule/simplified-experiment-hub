"use client";
import { API } from "@/api";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),

  name: Yup.string().required(),
  username: Yup.string().required(),
  organization: Yup.string().required(),
});

export default function SignupForm() {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",

        name: "",
        username: "",
        organization: "",
      }}
      validationSchema={signupSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        API.auth
          .signup(values)
          .then((res) => {
            router.push(`/users/${values.username}`);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setSubmitting(false);
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
            <label className="text-md font-medium" htmlFor="name">
              Username
            </label>
            <input
              className={`border rounded-md h-10 px-2 outline-info flex ${
                submitCount > 0 && errors.username && touched.username
                  ? "border-error"
                  : ""
              }`}
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              placeholder="juan.cuiule"
            />
            {submitCount > 0 && errors.username && touched.username && (
              <span className="text-error text-xs">{errors.username}</span>
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

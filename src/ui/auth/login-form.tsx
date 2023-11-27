"use client";
import { API, Entity, User } from "@/api";
import { Formik } from "formik";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

export default function LoginForm() {
  const { push, refresh } = useRouter();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        const { email, password } = values;
        API.auth
          .login({ email, password })
          .then((res) => {
            const decoded: { user: Entity<User> } = jwtDecode(res.accessToken);
            push(`/users/${decoded.user.username}`);
            refresh();
          })
          .catch((err) => {
            setErrors({
              email: "Invalid email or password",
              password: "Invalid email or password",
            });
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
              id="password"
              type="password"
              name="password"
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
            disabled={isSubmitting}
            type={"submit"}
            className="flex font-semibold justify-center flex-1 px-6 py-2 rounded-lg border text-black items-center gap-2  border-info bg-info transition-colors hover:bg-info/40 outline-info/40"
          >
            Login
          </button>
          <p className="text-xs text-gray-500">
            Don{"'"}t have an account?{" "}
            <Link href="/signup" className="text-info hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      )}
    </Formik>
  );
}

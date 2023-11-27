"use client";
import { API } from "@/api";
import { slugify } from "@/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { X } from "react-feather";
import * as Yup from "yup";

const newViewSchema = Yup.object({
  name: Yup.string().required(),
  slug: Yup.string().required(),
  description: Yup.string().required(),
});

interface Props {
  params: { experimentId: string };
}

export default function NewViewModal(props: Props) {
  const {
    params: { experimentId },
  } = props;

  const router = useRouter();
  const [open, setOpen] = useState(true);

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => {
            router.back();
          }}
          className="data-[state=open]:animate-overlayShow bg-black/60 fixed inset-0"
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none flex flex-col gap-6 w-11/12 lg:w-9/12">
          <Dialog.Close
            asChild
            onClick={() => {
              router.back();
            }}
          >
            <button className="p-1 rounded-full absolute right-6 top-6 aspect-square group">
              <X className="group-hover:stroke-info transition-colors" />
            </button>
          </Dialog.Close>
          <div className="flex pointer-events-none flex-col gap-2">
            <Dialog.Title className="m-0 text-2xl font-semibold">
              New view
            </Dialog.Title>
            <Dialog.Description className="text-sm leading-normal">
              Make changes to your profile here. Click save when you&apos;re
              done.
            </Dialog.Description>
          </div>

          <Formik
            initialValues={{
              name: "",
              slug: "",
              description: "",
            }}
            validationSchema={newViewSchema}
            onSubmit={(values, { setSubmitting }) => {
              API.experiments.views
                .create(experimentId)(values)
                .then((experiment) => {
                  console.log({ experiment });
                  setOpen(false);
                  if (experiment) {
                    router.push(
                      `/experiments/${experiment.pk}/views/${values.slug}`
                    );
                  }
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
                      setFieldValue("slug", slugify(e.target.value));
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
                      submitCount > 0 &&
                      errors.description &&
                      touched.description
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
                  {submitCount > 0 &&
                    errors.description &&
                    touched.description && (
                      <span className="text-error text-xs">
                        {errors.description}
                      </span>
                    )}
                </div>

                <div className="flex justify-end">
                  <Dialog.Close asChild>
                    <button
                      disabled={isSubmitting}
                      type={"submit"}
                      className="flex font-semibold justify-center flex-1 px-6 py-2 rounded-lg border items-center gap-2 border-info bg-info transition-colors hover:bg-info/40 outline-info/40 text-white hover:text-black"
                    >
                      Create
                    </button>
                  </Dialog.Close>
                </div>
              </form>
            )}
          </Formik>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

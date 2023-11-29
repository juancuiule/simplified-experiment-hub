"use client";
import { ArrayCondition, BaseCondition } from "@/lib/common";
import { Branch } from "@/lib/nodes/control";
import * as Dialog from "@radix-ui/react-dialog";
import { Formik } from "formik";
import { X } from "react-feather";

interface Props {
  isOpen: boolean;
  addBranch: (branch: Omit<Branch, "nextNode">) => void;
  updateBranch: (group: string, branch: Omit<Branch, "nextNode">) => void;
  initialState?: Partial<Omit<Branch, "nextNode">>;
  close: () => void;
}

const branchOptions = [
  { name: "lt <", value: "lt" },
  { name: "lte <=", value: "lte" },
  { name: "gt >", value: "gt" },
  { name: "gte >=", value: "gte" },
  { name: "eq ==", value: "eq" },
  { name: "neq !=", value: "neq" },
  { name: "length-lt", value: "length-lt" },
  { name: "length-lte", value: "length-lte" },
  { name: "length-gt", value: "length-gt" },
  { name: "length-gte", value: "length-gte" },
  { name: "length-eq", value: "length-eq" },
  { name: "length-neq", value: "length-neq" },
  { name: `includes`, value: `includes` },
];

export default function BranchConfigModal(props: Props) {
  const { isOpen, addBranch, updateBranch, close, initialState } = props;

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => {
            close();
          }}
          className="z-50 data-[state=open]:animate-overlayShow bg-black/60 fixed inset-0"
        />
        <Dialog.Content className="z-50 data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none flex flex-col gap-6 w-11/12 lg:w-9/12">
          <Dialog.Close
            asChild
            onClick={() => {
              close();
            }}
          >
            <button className="p-1 rounded-full absolute right-6 top-6 aspect-square group">
              <X className="group-hover:stroke-info transition-colors" />
            </button>
          </Dialog.Close>
          <div className="flex flex-col gap-6">
            <Dialog.Title className="m-0 text-2xl font-semibold">
              Configure Branch
            </Dialog.Title>
            <Dialog.Description className="text-sm leading-normal">
              <Formik
                initialValues={{
                  group: "",
                  conditionKey: "",
                  condition: "",
                  value: "",
                  ...(initialState || {}),
                }}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  if (initialState !== undefined) {
                    updateBranch(initialState.group!, {
                      group: values.group,
                      conditionKey: values.conditionKey,
                      condition: values.condition as
                        | BaseCondition
                        | ArrayCondition,
                      value: values.value,
                    });
                  } else {
                    addBranch({
                      group: values.group,
                      conditionKey: values.conditionKey,
                      condition: values.condition as
                        | BaseCondition
                        | ArrayCondition,
                      value: values.value,
                    });
                  }
                  close();
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
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-2 w-full">
                      <div className="flex flex-1 flex-col gap-1">
                        <label className="text-md font-medium" htmlFor="group">
                          Group name
                        </label>
                        <input
                          className={`border rounded-md h-10 px-2 outline-info flex ${
                            submitCount > 0 && errors.group && touched.group
                              ? "border-error"
                              : ""
                          }`}
                          type="text"
                          name="group"
                          id="group"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.group}
                          placeholder="terminos"
                        />
                        {submitCount > 0 && errors.group && touched.group && (
                          <span className="text-error text-xs">
                            {errors.group}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 w-full">
                      <div className="flex flex-1 flex-col gap-1">
                        <label
                          className="text-md font-medium"
                          htmlFor="conditionKey"
                        >
                          Data key
                        </label>
                        <input
                          className={`border rounded-md h-10 px-2 outline-info flex ${
                            submitCount > 0 &&
                            errors.conditionKey &&
                            touched.conditionKey
                              ? "border-error"
                              : ""
                          }`}
                          type="text"
                          name="conditionKey"
                          id="conditionKey"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.conditionKey}
                          placeholder="terminos"
                        />
                        {submitCount > 0 &&
                          errors.conditionKey &&
                          touched.conditionKey && (
                            <span className="text-error text-xs">
                              {errors.conditionKey}
                            </span>
                          )}
                      </div>

                      <div className="flex flex-1 flex-col gap-1">
                        <label
                          className="text-md font-medium"
                          htmlFor="condition"
                        >
                          Condition
                        </label>
                        <select
                          className={`border rounded-md h-10 px-2 outline-info flex ${
                            submitCount > 0 &&
                            errors.condition &&
                            touched.condition
                              ? "border-error"
                              : ""
                          }`}
                          name="condition"
                          id="condition"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.condition}
                        >
                          <option value={""} disabled defaultChecked>
                            Pick a condition
                          </option>
                          {branchOptions.map((opt, i) => (
                            <option key={i} value={i}>
                              {opt.name}
                            </option>
                          ))}
                        </select>
                        {submitCount > 0 &&
                          errors.condition &&
                          touched.condition && (
                            <span className="text-error text-xs">
                              {errors.condition}
                            </span>
                          )}
                      </div>

                      <div className="flex flex-1 flex-col gap-1">
                        <label className="text-md font-medium" htmlFor="value">
                          Value
                        </label>
                        <input
                          className={`border rounded-md h-10 px-2 outline-info flex ${
                            submitCount > 0 && errors.value && touched.value
                              ? "border-error"
                              : ""
                          }`}
                          type="text"
                          name="value"
                          id="value"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={String(values.value)}
                          placeholder="true"
                        />
                        {submitCount > 0 && errors.value && touched.value && (
                          <span className="text-error text-xs">
                            {errors.value}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex font-semibold justify-center flex-1 px-6 py-2 rounded-lg border text-black items-center gap-2 border-info bg-info transition-colors hover:bg-info/40 outline-info/40"
                    >
                      Add branch
                    </button>
                  </form>
                )}
              </Formik>
            </Dialog.Description>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

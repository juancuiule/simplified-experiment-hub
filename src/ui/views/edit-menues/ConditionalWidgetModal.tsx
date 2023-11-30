"use client";
import { ArrayCondition, BaseCondition } from "@/lib/common";
import { FrameworkNode } from "@/lib/nodes";
import { Branch } from "@/lib/nodes/control";
import { FrameworkWidget } from "@/lib/widgets";
import { ConditionalWidget } from "@/lib/widgets/control";
import * as Dialog from "@radix-ui/react-dialog";
import { Formik } from "formik";
import { useState } from "react";
import { X } from "react-feather";
import { menues, titles } from ".";
import { defaultByType } from "@/lib/default";

interface Props {
  isOpen: boolean;
  initialState: ConditionalWidget;
  close: () => void;
  update: (widget: ConditionalWidget) => void;
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

export default function ConditionalWidgetModal(props: Props) {
  const { isOpen, close, update, initialState } = props;

  const [innerWidget, setInnerWidget] = useState<FrameworkWidget | null>(null);

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
              Configure Conditional
            </Dialog.Title>
            <Dialog.Description className="text-sm leading-normal">
              <Formik
                initialValues={{
                  template: initialState.props.widget.template,
                  ...initialState.props,
                }}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  update({
                    ...initialState,
                    props: {
                      ...initialState.props,
                      ...values,
                    },
                  });
                  close();
                  // if (innerWidget !== null) {
                  //   update({
                  //     template: "conditional",
                  //     widgetFamily: "control",
                  //     props: {
                  //       condition: values.condition as
                  //         | BaseCondition
                  //         | ArrayCondition,
                  //       conditionKey: values.conditionKey,
                  //       value: values.value,
                  //       widget: innerWidget,
                  //     },
                  //   });
                  //   close();
                  // }
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
                }) => {
                  const Menu =
                    menues[values.widget.template as keyof typeof menues] ||
                    (() => {
                      return <div></div>;
                    });

                  return (
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={handleSubmit}
                    >
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
                              <option key={i} value={opt.value}>
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
                          <label
                            className="text-md font-medium"
                            htmlFor="value"
                          >
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
                      <div className="w-full py-4 flex flex-col gap-2 bg-white">
                        <div className="flex flex-1 flex-col gap-1">
                          <label
                            className="text-md font-medium"
                            htmlFor="template"
                          >
                            Widget
                          </label>
                          <select
                            className={`border rounded-md h-10 px-2 outline-info flex ${
                              submitCount > 0 &&
                              errors.template &&
                              touched.template
                                ? "border-error"
                                : ""
                            }`}
                            name="template"
                            id="template"
                            onChange={(e) => {
                              const template = e.target
                                .value as FrameworkWidget["template"];
                              setFieldValue("widget", defaultByType(template));
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            value={values.template}
                          >
                            {/* <option value={""} disabled>
                              Pick a widget
                            </option> */}
                            {Object.entries(titles)
                              .filter(([t]) => t !== "conditional")
                              .map(([template, title], i) => (
                                <option
                                  key={i}
                                  value={template}
                                  defaultChecked={template === values.template}
                                >
                                  {title}
                                </option>
                              ))}
                          </select>
                          {submitCount > 0 &&
                            errors.template &&
                            touched.template && (
                              <span className="text-error text-xs">
                                {errors.template}
                              </span>
                            )}
                        </div>
                        <div className="bg-gray-400 rounded p-2">
                          {menues[
                            values.widget.template as keyof typeof menues
                          ] !== undefined ? (
                            // @ts-ignore
                            <Menu
                              widget={values.widget}
                              update={(w: FrameworkWidget) => {
                                setFieldValue("widget", w);
                              }}
                            />
                          ) : null}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex font-semibold justify-center flex-1 px-6 py-2 rounded-lg border text-black items-center gap-2 border-info bg-info transition-colors hover:bg-info/40 outline-info/40"
                      >
                        Update
                      </button>
                    </form>
                  );
                }}
              </Formik>
            </Dialog.Description>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

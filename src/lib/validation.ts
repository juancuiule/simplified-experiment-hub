import * as Yup from "yup";
import {
  isConditionalWidget,
  isNotUndefined,
  isResponseWidget,
} from "./common";
import { evaluateCondition } from "./utils";
import { FrameworkWidget } from "./widgets";
import { ConditionalWidget } from "./widgets/control";
import { ResponseWidget } from "./widgets/response";

const getResponseWidgetBaseSchema = ({ template, props }: ResponseWidget) => {
  switch (template) {
    case "single_checkbox": {
      if (props.shouldBe !== null && props.shouldBe !== undefined) {
        return props.shouldBe
          ? Yup.boolean().isTrue("checkbox_should_be_true_error_message")
          : Yup.boolean().isFalse("checkbox_should_be_false_error_message");
      }
      return Yup.boolean();
    }
    case "dropdown":
    case "radio": {
      return Yup.string().oneOf(props.options.map(({ value }) => value));
    }
    case "slider": {
      return Yup.number()
        .integer()
        .min(props.min || 0, `El valor mínimo es ${props.min}`)
        .max(props.max || 100, `El valor máximo es ${props.max}`);
    }
    case "color-options":
    case "emoji-options":
    case "checkbox":
    case "multiple-check": {
      return Yup.array(
        Yup.string().oneOf(props.options.map(({ value }) => value))
      )
        .min(props.min || 0)
        .max(props.max || props.options.length);
    }
    case "rating": {
      return Yup.number().integer().min(1, "").max(props.max, "");
    }
    case "text_input": {
      return Yup.string();
    }
    case "time_input":
    case "date_input": {
      return Yup.string();
    }
  }
};

export const getResponseWidgetSchema = (widget: ResponseWidget) => {
  const baseSchema = getResponseWidgetBaseSchema(widget);
  return widget.props.required
    ? baseSchema.required("Por favor respondé esta pregunta")
    : baseSchema;
};

const getConditionalWidgetSchema = (widget: ConditionalWidget) => {
  const innerWidget = widget.props.widget;
  if (isResponseWidget(innerWidget)) {
    const schema = getResponseWidgetSchema(innerWidget);
    return (schema as Yup.Schema<string | number>).when(
      [widget.props.conditionKey],
      {
        is: (value: any) => {
          return evaluateCondition(
            widget.props.condition,
            value,
            widget.props.value
          );
        },
        then: (schema) =>
          innerWidget.props.required
            ? schema.required("Por favor respondé esta pregunta")
            : schema,
        otherwise: (schema) => schema.notRequired(),
      }
    );
  }
};

export const getStepSchema = (widgets: FrameworkWidget[]) => {
  const tuples = widgets.filter(isResponseWidget).map((w) => {
    return [w.props.dataKey, getResponseWidgetSchema(w)];
  });

  const tuplesFromConditional = widgets
    .filter(isConditionalWidget)
    .map((w) => {
      const innerWidget = w.props.widget;
      if (isResponseWidget(innerWidget)) {
        const innerWidgetSchema = getConditionalWidgetSchema(w);
        if (innerWidgetSchema !== undefined) {
          return [innerWidget.props.dataKey, innerWidgetSchema];
        }
      }
      return undefined;
    })
    .filter(isNotUndefined);

  // TODO: add validation for group widget

  const spec = Object.fromEntries([...tuples, ...tuplesFromConditional]);
  if (tuples.length !== 0) {
    return Yup.object(spec);
  } else {
    return Yup.object();
  }
};

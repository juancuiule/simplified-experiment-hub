import { BaseWidget } from ".";

type ResponseWidgetBaseProps = {
  dataKey: string;
  embedd?: boolean;
  required?: boolean;
  errorMessage?: string;
};

export interface BaseResponseWidget<U extends string, Props>
  extends BaseWidget<"response", U> {
  props: Props & ResponseWidgetBaseProps;
}

export interface SliderWidget
  extends BaseResponseWidget<
    "slider",
    {
      label: string;
      min?: number;
      max?: number;
      step?: number;
      defaultValue?: number;
      minLabel?: string;
      maxLabel?: string;
    }
  > {}

export interface SingleCheckboxWidget
  extends BaseResponseWidget<
    "single_checkbox",
    {
      label: string;
      defaultValue: boolean;
      shouldBe?: boolean;
    }
  > {}

export interface TextInputWidget
  extends BaseResponseWidget<
    "text_input",
    {
      label: string;
      placeholder?: string;
    }
  > {}

// TODO: add date and time input
export interface DateInputWidget extends BaseResponseWidget<"date_input", {}> {}
export interface TimeInputWidget extends BaseResponseWidget<"time_input", {}> {}

export type Option = {
  label: string;
  value: string;
};

export interface DropdownWidget
  extends BaseResponseWidget<
    "dropdown",
    {
      label: string;
      options: Option[];
    }
  > {}

export interface RadioWidget
  extends BaseResponseWidget<
    "radio",
    {
      label: string;
      options: Option[];
    }
  > {}

export interface CheckboxWidget
  extends BaseResponseWidget<
    "checkbox",
    {
      label: string;
      options: Option[];
      min?: number;
      max?: number;
    }
  > {}

export interface MultipleCheckWidget
  extends BaseResponseWidget<
    "multiple-check",
    {
      label: string;
      options: Option[];
      min?: number;
      max?: number;
    }
  > {}

export interface RatingWidget
  extends BaseResponseWidget<
    "rating",
    {
      label: string;
      max: number;
      optionsLabel?: Option[];
    }
  > {}

export interface EmojiOptionsWidget
  extends BaseResponseWidget<
    "emoji-options",
    {
      label: string;
      options: (Option & { emoji: string })[];
      min?: number;
      max?: number;
    }
  > {}

export interface ColorOptionsWidget
  extends BaseResponseWidget<
    "color-options",
    {
      label: string;
      options: (Option & { color: string })[];
      min?: number;
      max?: number;
    }
  > {}

export type ResponseWidget =
  | SliderWidget
  | SingleCheckboxWidget
  | TextInputWidget
  | DateInputWidget
  | TimeInputWidget
  | DropdownWidget
  | RadioWidget
  | CheckboxWidget
  | RatingWidget
  | EmojiOptionsWidget
  | ColorOptionsWidget
  | MultipleCheckWidget;

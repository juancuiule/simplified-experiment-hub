import { BaseWidget } from ".";

export interface BaseContentWidget<U extends string, Props>
  extends BaseWidget<"content", U> {
  props: Props;
}

export interface RichTextWidget
  extends BaseContentWidget<"rich_text", { content: string }> {}

export interface ImageWidget
  extends BaseContentWidget<
    "image",
    {
      url:
        | string
        | {
            desktop: string;
            mobile: string;
          };
      alt: string;
    }
  > {}

export interface VideoWidget
  extends BaseContentWidget<
    "video",
    { url: string; autoplay: boolean; muted: boolean }
  > {}

export interface AudioWidget
  extends BaseContentWidget<"audio", { url: string }> {}

export type ContentWidget =
  | RichTextWidget
  | ImageWidget
  | VideoWidget
  | AudioWidget;

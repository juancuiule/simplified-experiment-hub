"use client";
import WidgetMenu from "./edit-menues";
import { useViewContext } from "./store";
import { items } from "./widget-items";

const fullItems = Object.values(items).reduce((acc, val) => [...acc, ...val]);

export default function WdigetMenu() {
  const { widgets, removeWidget, moveWidgetDown, moveWidgetUp, updateWidget } =
    useViewContext((state) => ({
      widgets: state.widgets,
      removeWidget: state.removeWidget,
      moveWidgetDown: state.moveWidgetDown,
      moveWidgetUp: state.moveWidgetUp,
      updateWidget: state.updateWidget,
    }));

  return widgets.length > 0 ? (
    <div className="flex flex-col p-2 gap-2 overflow-y-scroll rounded bg-light min-h-full">
      {widgets.map((widget, i) => {
        const item = fullItems.find(
          (item) => item.template === widget.template
        )!;
        return (
          <div key={`${widget.id}`} className="w-full flex flex-col gap-1">
            <WidgetMenu
              widget={widget}
              icon={<item.icon size={16} />}
              remove={() => removeWidget(widget.id!)}
              moveDown={() => moveWidgetDown(widget.id!)}
              moveUp={() => moveWidgetUp(widget.id!)}
              updateWidget={(newWidget) =>
                updateWidget({ ...newWidget, id: widget.id })
              }
            />
          </div>
        );
      })}
    </div>
  ) : null;
}

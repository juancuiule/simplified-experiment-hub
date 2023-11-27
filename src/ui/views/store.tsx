"use client";
import { FrameworkWidget } from "@/lib/widgets";
import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

export interface ViewProps {
  widgets: FrameworkWidget[];
}

export interface ViewState extends ViewProps {
  addWidget: (widget: FrameworkWidget) => void;
  removeWidget: (widgetId: string) => void;
  moveWidgetUp: (widgetId: string) => void;
  moveWidgetDown: (widgetId: string) => void;
  updateWidget: (widget: FrameworkWidget) => void;
}

export type ViewStore = ReturnType<typeof createViewStore>;

export const createViewStore = (initProps?: Partial<ViewProps>) => {
  const DEFAULT_PROPS: ViewProps = {
    widgets: [],
  };
  return createStore<ViewState>()((set, get) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    addWidget: (widget) => {
      set({
        widgets: [...get().widgets, widget],
      });
    },
    removeWidget: (widgetId) => {
      set({
        widgets: get().widgets.filter((widget) => widget.id !== widgetId),
      });
    },
    moveWidgetDown: (widgetId) => {
      const widgets = get().widgets;
      const i = widgets.findIndex((widget) => widget.id === widgetId);
      if (i === widgets.length - 1) return;
      const newWidgets = [...widgets];
      const temp = newWidgets[i];
      newWidgets[i] = newWidgets[i + 1];
      newWidgets[i + 1] = temp;
      set({
        widgets: newWidgets,
      });
    },
    moveWidgetUp: (widgetId) => {
      const widgets = get().widgets;
      const i = widgets.findIndex((widget) => widget.id === widgetId);
      if (i === 0) return;
      const newWidgets = [...widgets];
      const temp = newWidgets[i];
      newWidgets[i] = newWidgets[i - 1];
      newWidgets[i - 1] = temp;
      set({
        widgets: newWidgets,
      });
    },
    updateWidget: (widget) => {
      set({
        widgets: get().widgets.map((w) => (w.id === widget.id ? widget : w)),
      });
    },
  }));
};

export type ViewProviderProps = React.PropsWithChildren<ViewProps>;

export const ViewContext = createContext<ViewStore | null>(null);

export function ViewProvider({ children, ...props }: ViewProviderProps) {
  const storeRef = useRef<ViewStore>();
  if (!storeRef.current) {
    storeRef.current = createViewStore(props);
  }
  return (
    <ViewContext.Provider value={storeRef.current}>
      {children}
    </ViewContext.Provider>
  );
}

export function useViewContext<T>(selector: (state: ViewState) => T): T {
  const store = useContext(ViewContext);
  if (!store) throw new Error("Missing ViewContext.Provider in the tree");
  return useStore(store, selector);
}

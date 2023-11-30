import { ConditionalWidget } from "@/lib/widgets/control";
import { Formik } from "formik";
import ConditionalWidgetModal from "./ConditionalWidgetModal";
import { useState } from "react";

export default function ConditionalWidgetMenu(props: {
  widget: ConditionalWidget;
  update: (widget: ConditionalWidget) => void;
}) {
  const { widget, update } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <ConditionalWidgetModal
        initialState={widget}
        isOpen={isModalOpen}
        close={() => {
          setIsModalOpen(false);
        }}
        update={update}
      />
      <button
        className="p-2 py-0.5 w-full mx-auto border border-black rounded"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Cofigurar
      </button>
    </div>
  );
}

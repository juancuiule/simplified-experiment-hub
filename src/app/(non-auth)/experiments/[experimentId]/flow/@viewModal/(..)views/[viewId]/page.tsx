"use client";
import Card from "@/components/Card";
import RenderState from "@/components/framework/render/RenderState";
import { items } from "@/components/widget-items";
import { defaultByType } from "@/lib/default";
import { FrameworkWidget } from "@/lib/widgets";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Save, X } from "react-feather";

interface Props {
  params: { experimentId: string; viewId: string };
}

export default function NewViewModal(props: Props) {
  const {
    params: { experimentId, viewId },
  } = props;

  const router = useRouter();
  const [widgets, setWidgets] = useState<FrameworkWidget[]>([]);

  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => {
            router.back();
          }}
          className="data-[state=open]:animate-overlayShow bg-black/60 fixed inset-0"
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none flex flex-col gap-6 w-11/12 lg:w-9/12">
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
          <div className="flex flex-col gap-2">
            <Dialog.Title className="m-0 text-2xl font-semibold">
              View Design ({viewId})
            </Dialog.Title>
            <Dialog.Description className="text-sm leading-normal">
              Make changes to your profile here. Click save when you&apos;re
              done.
            </Dialog.Description>
            <div className="flex flex-col flex-1 gap-2">
              {/* Experiment flow design */}
              <div className="flex gap-2 max-h-[80vh]">
                {/* Preview */}
                <div
                  className="flex flex-col flex-1 p-6 bg-light rounded h-full overflow-y-scroll"
                  style={{
                    backgroundImage: "url(/dot-tile.png)",
                    backgroundRepeat: "repeat",
                    backgroundSize: "45px 45px",
                  }}
                >
                  <div className="flex flex-col flex-1 mx-auto gap-4 max-w-lg w-full p-6 border border-black bg-white min-h-fit">
                    <RenderState
                      state={{
                        type: "in-node",
                        node: {
                          id: viewId,
                          nodeType: "experiment-step",
                          nodeFamily: "study",
                          props: { widgets },
                        },
                      }}
                    />
                  </div>
                </div>

                {/* Nodes menu */}
                <div className="flex flex-col p-2 gap-2 overflow-y-scroll rounded bg-light">
                  {Object.entries(items).map(([key, value]) => (
                    <Fragment key={key}>
                      <h4 className="text-md font-semibold">{`${key
                        .charAt(0)
                        .toUpperCase()}${key.slice(1)}`}</h4>
                      {value.map((item) => (
                        <Card
                          key={item.title}
                          title={item.title}
                          icon={<item.icon size={16} />}
                          description={item.description}
                          onClick={() => {
                            const newWidget: FrameworkWidget = {
                              ...defaultByType(item.template),
                              id: new Date().getTime().toString(),
                            };
                            setWidgets((ws) => [...ws, newWidget]);
                          }}
                        />
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              className="flex justify-center items-center gap-2 rounded bg-gray-400 px-2 py-1"
              onClick={(e) => {
                router.back();
              }}
            >
              <span className="font-medium">Cancel</span>
              <X size={16} />
            </button>
            <button
              className="flex justify-center items-center gap-2 rounded bg-success px-2 py-1"
              onClick={(e) => {
                router.back();
              }}
            >
              <span className="font-medium">Save</span>
              <Save size={16} />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

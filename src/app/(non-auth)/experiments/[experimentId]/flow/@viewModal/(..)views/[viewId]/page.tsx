"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { Save, X } from "react-feather";

interface Props {
  params: { experimentId: string; viewId: string };
}

export default function NewViewModal(props: Props) {
  const {
    params: { viewId },
  } = props;

  const router = useRouter();

  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => {
            router.back();
          }}
          className="z-50 data-[state=open]:animate-overlayShow bg-black/60 fixed inset-0"
        />
        <Dialog.Content className="z-50 data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none flex flex-col gap-6 w-11/12 lg:w-9/12">
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

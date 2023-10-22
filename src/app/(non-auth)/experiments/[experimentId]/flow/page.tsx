import Card from "@/components/Card";
import { ChevronLeft, Eye, Save } from "react-feather";
import { items } from "./node-items";
import { Fragment } from "react";
import Link from "next/link";

export default function Page({ params }: { params: { experimentId: string } }) {
  return (
    <div className="flex flex-col flex-1 gap-2.5">
      {/* Experiment flow navbar */}
      <div className="flex justify-between items-center h-12 bg-light rounded p-2.5 gap-2.5">
        <div className="flex justify-center items-center gap-1">
          <Link href={`/experiments/${params.experimentId}/dashboard`}>
            <ChevronLeft size={16} />
          </Link>
          <span className="font-medium">
            Experiment {params.experimentId} - Flow Design
          </span>
        </div>
        <div className="flex gap-2.5 text-white">
          <button className="flex justify-center items-center gap-2 rounded bg-[#4F4F4F] px-2.5 py-1">
            <span className="font-medium">Preview</span>
            <Eye size={16} />
          </button>
          <button className="flex justify-center items-center gap-2 rounded bg-success px-2.5 py-1">
            <span className="font-medium">Save</span>
            <Save size={16} />
          </button>
        </div>
      </div>

      {/* Experiment flow design */}
      <div className="flex flex-1 gap-2.5 max-h-[calc(100vh-64px-24px*2-44px-10px)]">
        {/* Preview */}
        <div
          className="flex-1 bg-light rounded"
          style={{
            backgroundImage: "url(/dot-tile.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "45px 45px",
          }}
        ></div>

        {/* Nodes menu */}
        <div className="flex flex-col p-2.5 gap-2.5 overflow-y-scroll rounded bg-light">
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
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

import { ChevronLeft } from "react-feather";

export default function ViewsSectionSkeleton() {
  return (
    <section className="flex flex-col w-full gap-4">
      <div className="flex items-center gap-2">
        <ChevronLeft size={24} />
        <h2 className="text-2xl font-semibold">Views</h2>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {Array.from({ length: 6 }).map((_, i) => {
          return (
            <div
              className="col-span-6 lg:col-span-4 xl:col-span-3 flex flex-col cursor-pointer flex-1"
              key={i}
            >
              <div className="aspect-video h-40 w-full rounded-t-md relative group animate-pulse bg-gray-400"></div>
              <div className="p-2 bg-gray-200 flex flex-col flex-1 rounded-b-md gap-1">
                <h4 className="text-sm font-medium w-36 h-4 bg-gray-400/70 rounded-sm animate-pulse"></h4>
                <p className="text-xs font-light w-48 h-6 bg-gray-400/70 rounded-sm animate-pulse"></p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

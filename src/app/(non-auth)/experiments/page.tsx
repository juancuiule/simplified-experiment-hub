import { experiments } from "@/mock-data";
import ExperimentsSection from "@/ui/sections/ExperimentsSection";

export default function Page() {
  return <ExperimentsSection experiments={experiments} />;
}

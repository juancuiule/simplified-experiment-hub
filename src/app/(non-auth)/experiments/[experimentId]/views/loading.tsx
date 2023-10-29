import ViewsSectionSkeleton from "@/ui/ViewsSectionSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Views`,
};

export default async function ExperimentViews() {
  return <ViewsSectionSkeleton />;
}

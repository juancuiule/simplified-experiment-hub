import ViewsSectionSkeleton from "@/components/ViewsSectionSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Views`,
};

export default async function ExperimentViews() {
  return <ViewsSectionSkeleton />;
}

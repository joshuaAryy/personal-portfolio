import type { ComponentType, ReactNode } from "react";
import FoodTrackerCaseStudy from "../FoodTrackerCaseStudy";

type ClientLayout = ComponentType<{ children: ReactNode; pageClass: string }>;

export default function FoodTrackerPage({
  Client,
}: {
  Client: ClientLayout;
}) {
  return (
    <Client pageClass="main--detail main--food-case">
      <FoodTrackerCaseStudy />
    </Client>
  );
}

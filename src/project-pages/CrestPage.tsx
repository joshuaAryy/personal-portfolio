import type { ComponentType, ReactNode } from "react";
import CrestCaseStudy from "../CrestCaseStudy";

type ClientLayout = ComponentType<{ children: ReactNode; pageClass: string }>;

export default function CrestPage({ Client }: { Client: ClientLayout }) {
  return (
    <Client pageClass="main--detail main--crest-case">
      <CrestCaseStudy />
    </Client>
  );
}

import BasicForm from "@/components/reward-form/form";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BasicForm />
    </Suspense>
  );
}

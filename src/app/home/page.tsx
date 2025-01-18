import { Layout } from "@/components/layout";
import { CardResumeAppointments } from "./components/card-resume-appointments";

export default function Home() {
  return (
    <Layout>
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex items-center justify-between gap-4">
          <h1 className="font-semibold text-lg">Início</h1>
        </div>

        <CardResumeAppointments />
      </div>
    </Layout>
  );
}

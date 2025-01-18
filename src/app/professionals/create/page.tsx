import { Layout } from "@/components/layout";
import { CreateProfessionalsForm } from "./components/create-professionals-form";

export default function Create() {
  return (
    <Layout>
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex items-center justify-between gap-4">
          <h1 className="font-semibold text-lg">Cadastro</h1>
        </div>

        <div className="h-full mt-10">
          <CreateProfessionalsForm />
        </div>
      </div>
    </Layout>
  );
}

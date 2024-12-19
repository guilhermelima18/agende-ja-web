import { SignInForm } from "@/components/forms/sign-in-form";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="w-full h-full flex gap-10">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h1 className="w-1/2 mb-4 text-4xl font-bold">Agende Já!</h1>
        <SignInForm />
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <Image
          src="/background.webp"
          width={800}
          height={800}
          objectFit="contain"
          alt=""
        />
      </div>
    </div>
  );
}

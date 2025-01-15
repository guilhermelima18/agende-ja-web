import Image from "next/image";

import { SignInForm } from "@/components/forms/sign-in-form";

export default function SignIn() {
  return (
    <div className="w-full h-full flex flex-col xl:flex-row gap-10">
      <div className="w-full xl:w-1/2 flex flex-col items-center justify-center">
        <h1 className="w-full xl:w-1/2 mb-4 text-4xl font-bold">Agende Já!</h1>
        <SignInForm />
      </div>

      <div className="w-full xl:w-1/2 flex xl:items-center xl:justify-center">
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

import Image from "next/image";

type EmptyMessageProps = {
  message: string;
};

export function EmptyMessage({ message }: EmptyMessageProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <div>
        <Image
          className="rounded-xl"
          src="/icons/empty-list.svg"
          alt=""
          width={400}
          height={400}
        />
      </div>
      <span className="font-semibold">Opss! {message}</span>
    </div>
  );
}

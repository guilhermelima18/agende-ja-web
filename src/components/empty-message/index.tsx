type EmptyMessageProps = {
  message: string;
};

export function EmptyMessage({ message }: EmptyMessageProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <span className="bg-gray-100 w-full text-center py-4 rounded-md font-semibold">
        {message}
      </span>
    </div>
  );
}

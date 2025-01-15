type EmptyMessageProps = {
  message: string;
};

export function EmptyMessage({ message }: EmptyMessageProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className="bg-gray-100 w-full text-center p-4 rounded-md">
        {message}
      </span>
    </div>
  );
}

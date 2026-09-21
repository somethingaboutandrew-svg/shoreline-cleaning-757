export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="h-10 w-2/3 max-w-md rounded-lg bg-sky-soft" />
      <div className="mt-4 h-4 w-full max-w-xl rounded bg-sky-soft" />
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="h-48 rounded-[20px] bg-sky-soft" />
        <div className="h-48 rounded-[20px] bg-sky-soft" />
        <div className="h-48 rounded-[20px] bg-sky-soft" />
      </div>
      <p className="sr-only">Loading</p>
    </div>
  );
}

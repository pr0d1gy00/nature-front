import AuthView from "@/app/auth/page";

export default function Home() {
  return (
      <main className="max-md:w-[100%] flex min-h-screen flex-col items-center justify-between">
        <AuthView />
      </main>

  );
}

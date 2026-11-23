import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { Suspense } from "react";
import MediaLibrary from "@/components/MediaLibrary";

// I create the first layout for Romeo's media library.
export default function AdminPage() {
    return (
        <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10">
            <header className="flex items-center justify-between border-b pb-6">
                <p className="text-lg font-bold">ROMEO NORDSTRØM</p>
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-sm underline">
                        Se hjemmeside ↗
                    </Link>
                    <LogoutButton />
                </div>
            </header>

            <section className="py-10">
                <p className="mb-3 text-sm">Dit arbejdsområde</p>
                <h1 className="admin-heading">Mediebibliotek</h1>
                <p className="mt-4">
                    Administrer dine billeder og videoer.
                </p>

                {/* I add the upload button before connecting its action. */}
                <button
                    type="button"
                    disabled
                    className="mt-6 rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
                >
                    Upload billeder eller video
                </button>
            </section>

            {/* I show the media library with a loading message. */}
            <section aria-label="Dine medier" className="rounded-xl border p-6">
                <Suspense fallback={<p>Henter dine medier...</p>}>
                    <MediaLibrary />
                </Suspense>
            </section>
        </main>
    );
}
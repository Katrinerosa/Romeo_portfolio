import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getMediaById } from "@/lib/db/media";

export default async function MediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // I read the id from the address.
  await connection();
  const { id } = await params;
  const mediaId = Number(id);

  // I only accept positive whole numbers.
  if (!Number.isSafeInteger(mediaId) || mediaId < 1) {
    notFound();
  }

  // I find the selected media item.
  const media = await getMediaById(mediaId);

  if (!media) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <Link href="/admin" className="underline">
        ← Tilbage til biblioteket
      </Link>

      <h1 className="admin-heading mt-8">{media.title}</h1>
      {/* I show the original image without cropping. */}
{media.media_type === "image" && (
  <div className="relative my-6 h-[60vh] w-full">
    <Image
      src={media.file_path}
      alt={media.title}
      fill
      unoptimized
      sizes="100vw"
      className="object-contain"
    />
  </div>
)}

      <p>{media.description ?? "Ingen beskrivelse endnu."}</p>
      <p>Sted: {media.location ?? "Ikke angivet"}</p>
      <p>Dato: {media.taken_on ?? "Ikke angivet"}</p>
    </main>
  );
}
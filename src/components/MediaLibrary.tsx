import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { getLibraryMedia } from "@/lib/db/media";

// I read the library when someone opens the page.
export default async function MediaLibrary() {
  await connection();

 const media = await getLibraryMedia();

  // I show a message when the library is empty.
  if (media.length === 0) {
    return <p>Dit mediebibliotek er tomt.</p>;
  }

  // I create one clickable card for each media item.
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {media.map((item) => (
        <li key={item.id} className="min-w-0 rounded-xl border p-3">
          <Link
            href={`/admin/media/${item.id}`}
            className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black/5">
              {item.media_type === "image" ? (
                <Image
                  src={item.file_path}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <p className="p-4">{item.media_type}</p>
              )}
            </div>

            <p className="mt-3 font-semibold">{item.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
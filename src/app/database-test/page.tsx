import Image from "next/image";
import { Suspense } from "react";
import { connection } from "next/server";
import { getHomeMedia } from "@/lib/db/media";

// I read the database when someone opens this page.
async function MediaResult() {
  await connection();
  
const media = getHomeMedia();

  // I show each selected item with its image and title.
  return (
    <ul>
      {media.map((item) => (
        <li key={item.id}>
          {item.media_type === "image" && (
            <Image
              src={item.file_path}
              alt={item.title}
              width={4274}
              height={2849}
              sizes="400px"
              style={{
                width: "100%",
                maxWidth: 400,
                height: "auto",
              }}
            />
          )}
          <p>{item.title} ({item.media_type})</p>
        </li>
      ))}
    </ul>
  );
}

export default function DatabaseTestPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Database test</h1>

      {/* I show a message while the result is loading. */}
      <Suspense fallback={<p>Henter data...</p>}>
        <MediaResult />
      </Suspense>
    </main>
  );
}
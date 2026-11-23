import { requireAdmin } from "@/lib/require-admin";
import { db } from "./index";

// I describe the fields returned by my media queries.
type MediaItem = {
  id: number;
  title: string;
  media_type: "image" | "video" | "audio" | "document";
  file_path: string;

  // These fields can be empty in my database.
  description: string | null;
  location: string | null;
  taken_on: string | null;
};

// I read up to 9 items selected for the public homepage.
export function getHomeMedia() {
  return db
    .prepare<[], MediaItem>(`
      SELECT id, title, media_type, file_path,
             description, location, taken_on
      FROM media
      WHERE show_on_home = 1
      ORDER BY id DESC
      LIMIT 9
    `)
    .all();
}

// I require admin access before reading the library.
export async function getLibraryMedia() {
  await requireAdmin();

  return db
    .prepare<[], MediaItem>(`
      SELECT id, title, media_type, file_path,
             description, location, taken_on
      FROM media
      ORDER BY id DESC
      LIMIT 24
    `)
    .all();
}

// I require admin access before reading a media item's details.
export async function getMediaById(id: number) {
  await requireAdmin();

  return db
    .prepare<[number], MediaItem>(`
      SELECT id, title, media_type, file_path,
             description, location, taken_on
      FROM media
      WHERE id = ?
    `)
    .get(id);
}
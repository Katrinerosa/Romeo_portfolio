-- I create a table called media.
-- Each row is one image, video, audio file or document.
CREATE TABLE media (
    -- Each item gets its own unique number.
    -- SQLite adds the number automatically when I leave it out.
    id INTEGER PRIMARY KEY,

    -- I store the media type as text.
    -- NOT NULL means this value cannot be NULL.
    media_type TEXT NOT NULL
        -- Only these four media types are allowed.
        CHECK (media_type IN ('image', 'video', 'audio', 'document')),

    -- I store the heading shown when someone opens the media.
    title TEXT NOT NULL,

       -- I store a description. I can leave it out.
    description TEXT,

    -- I store where the photo or recording was taken.
    location TEXT,

       -- I store the date it was taken, for example 2026-11-23.
    taken_on TEXT,

    -- I store where the file is saved.
    -- The actual file is stored separately from the database.
    file_path TEXT NOT NULL,

    -- I choose whether this item appears in the homepage masonry.
    -- 1 means selected. 0 means not selected.
    show_on_home INTEGER NOT NULL DEFAULT 0
        CHECK (show_on_home IN (0, 1))
);
-- The semicolon ends this SQL statement.


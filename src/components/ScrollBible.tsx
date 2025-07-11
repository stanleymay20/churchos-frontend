import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ScrollBibleProps {
  book: string;
  chapter: number;
  verse: number;
  version?: string;
  lang?: string;
}

export function ScrollBible({ book, chapter, verse, version = "kjv", lang = "en" }: ScrollBibleProps) {
  const [text, setText] = useState('Loading...');

  useEffect(() => {
    axios.get(`https://bible-api.com/${book}+${chapter}:${verse}?translation=${version}`)
      .then(res => setText(res.data.text))
      .catch(() => setText("Verse not found"));
  }, [book, chapter, verse, version]);

  return (
    <div className="p-4 border rounded-xl bg-parchment">
      <h2 className="text-xl font-bold">{book} {chapter}:{verse} ({version.toUpperCase()})</h2>
      <p className="mt-2">{text}</p>
    </div>
  );
} 
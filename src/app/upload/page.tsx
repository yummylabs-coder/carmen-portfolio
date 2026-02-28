"use client";

import { useState, useRef } from "react";

export default function UploadPage() {
  const [secret, setSecret] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ url: string } | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file || !secret) return;
    setUploading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-video", {
        method: "POST",
        headers: { Authorization: `Bearer ${secret}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-6">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
        <div>
          <h1 className="text-lg font-bold text-white">Upload Video</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Upload an MP4 to Vercel Blob. The URL is permanent &amp; CDN-cached.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-500">
              Upload Secret
            </label>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Your UPLOAD_SECRET"
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-500 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-500">
              Video File
            </label>
            <div
              onClick={() => inputRef.current?.click()}
              className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-neutral-700 bg-neutral-800/50 p-6 transition-colors hover:border-blue-500"
            >
              <input
                ref={inputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              <p className="text-sm text-neutral-400">
                {file ? `${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)` : "Click to select MP4"}
              </p>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || !secret || uploading}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-40"
          >
            {uploading ? "Uploading…" : "Upload to Vercel Blob"}
          </button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-950 p-3 text-sm text-red-300">{error}</div>
        )}

        {result && (
          <div className="space-y-2 rounded-lg bg-green-950 p-4">
            <p className="text-sm font-medium text-green-300">✓ Uploaded successfully!</p>
            <div className="mt-2">
              <label className="mb-1 block text-xs text-green-500">CDN URL (paste this into Notion):</label>
              <input
                readOnly
                value={result.url}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                className="w-full rounded border border-green-800 bg-green-900 px-2 py-1.5 text-xs text-green-200"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

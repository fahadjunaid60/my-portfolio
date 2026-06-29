"use server";

import { getPayloadClient } from "@/lib/payload";

export type CommentState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitComment(
  _prev: CommentState,
  formData: FormData,
): Promise<CommentState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const postId = Number(String(formData.get("postId") ?? "").trim());

  if (!name || !content || !postId || Number.isNaN(postId)) {
    return { status: "error", message: "Please add your name and a comment." };
  }
  if (email && !EMAIL_RE.test(email)) {
    return { status: "error", message: "That email address looks off." };
  }
  if (content.length > 4000) {
    return { status: "error", message: "That comment is a bit too long." };
  }

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "comments",
      data: {
        name,
        email: email || undefined,
        content,
        post: postId,
        approved: true,
      },
      overrideAccess: true,
    });
    return { status: "success", message: "Thanks — your comment was posted." };
  } catch (err) {
    console.error("Failed to store comment:", err);
    return {
      status: "error",
      message: "Couldn't post that comment. Please try again.",
    };
  }
}

"use server";

import { getPayloadClient } from "@/lib/payload";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in every field." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "That email address looks off." };
  }
  if (message.length > 5000) {
    return { status: "error", message: "Message is a bit too long." };
  }

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "messages",
      data: { name, email, message },
      overrideAccess: true,
    });
    return {
      status: "success",
      message: "Thanks — your message landed. I'll get back to you soon.",
    };
  } catch (err) {
    console.error("Failed to store contact message:", err);
    return {
      status: "error",
      message: "Something went wrong sending that. Try again or email me directly.",
    };
  }
}

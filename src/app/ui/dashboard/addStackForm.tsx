"use client";

import { addStack } from "@/lib/actions";
import { uploadFile } from "@/lib/supabase/data";
import React from "react";

export default function AddStackForm() {
  const handleAddStack = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const file = formData.get("logo") as File | null;
    if (file) {
      const res = await uploadFile(file, file.name);
      formData.set("logo", res);
    }
    await addStack(formData);
    form.reset();
  };

  return (
    <form
      onSubmit={handleAddStack}
      id="addStackForm"
      className="w-full space-y-4 rounded-lg border-2 p-8 shadow-lg backdrop-blur-md lg:col-span-3"
    >
      <label className="sr-only" htmlFor="name">
        Name *
      </label>
      <input
        className="w-full rounded-lg border border-gray-200 bg-transparent p-3 text-sm"
        placeholder="Name *"
        type="text"
        id="name"
        name="name"
        required
      />
      <div>
        <label className="sr-only" htmlFor="stack_link">
          Mobile Number *
        </label>
        <input
          className="w-full rounded-lg border border-gray-200 bg-transparent p-3 text-sm"
          placeholder="Mobile Number *"
          type="text"
          name="stack_link"
          id="stack_link"
          required
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="logo">
          Image project *
        </label>
        <input
          className="w-full cursor-pointer rounded-lg border border-gray-200 bg-transparent p-3 text-sm file:mr-2
              file:border-none"
          placeholder="Image Of project *"
          type="file"
          accept="image/*"
          id="logo"
          name="logo"
          required
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center">
        <button
          type="submit"
          className="rounded-lg bg-secondaryColor px-6 py-3 font-medium text-darkColor duration-200
            hover:bg-secondaryLight hover:text-lightColor sm:w-auto"
        >
          Save this tech
        </button>
      </div>
    </form>
  );
}

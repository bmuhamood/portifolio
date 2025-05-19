"use client";

import { addProject } from "@/lib/actions";
import { Stack } from "@/lib/supabase.type";
import { uploadFile } from "@/lib/supabase/data";
import React, { useState } from "react";

export default function AddProjectForm({ stacks }: { stacks: Array<Stack> }) {
  const [isChecked, setIsChecked] = useState("finished");
  const handleAddProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const file = formData.get("preview_picture_url") as File | null;
    if (file) {
      const res = await uploadFile(file, file.name);
      formData.set("preview_picture_url", res);
    }
    await addProject(formData);
    form.reset();
  };

  const handleChange = () => {
    isChecked === "finished" ? setIsChecked("development") : setIsChecked("finished");
  };

  return (
    <form
      onSubmit={handleAddProject}
      id="addForm"
      className="w-full space-y-4 rounded-lg border-2 p-8 shadow-lg backdrop-blur-md lg:col-span-3"
    >
      <label className="sr-only" htmlFor="name">
        Title *
      </label>
      <input
        className="w-full rounded-lg border border-gray-200 bg-transparent p-3 text-sm"
        placeholder="Titre *"
        type="text"
        id="title"
        name="title"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor="phone">
            Client name
          </label>
          <input
            className="w-full rounded-lg border border-gray-200 bg-transparent p-3 text-sm"
            placeholder="Client name"
            type="text"
            id="client_name"
            name="client_name"
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="phone">
            Project image *
          </label>
          <input
            className="w-full cursor-pointer rounded-lg border border-gray-200 bg-transparent p-3 text-sm file:mr-2
              file:border-none"
            placeholder="Project image *"
            type="file"
            accept="image/*"
            id="preview_picture_url"
            name="preview_picture_url"
            required
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="phone">
            Project link *
          </label>
          <input
            className="w-full rounded-lg border border-gray-200 bg-transparent p-3 text-sm"
            placeholder="Project link"
            type="text"
            name="link"
            id="link"
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="phone">
            Repo Github
          </label>
          <input
            className="w-full rounded-lg border border-gray-200 bg-transparent p-3 text-sm"
            placeholder="Repo Github"
            type="text"
            name="github_repo"
            id="github_repo"
          />
        </div>
      </div>

      <fieldset className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
        <legend className="mb-3">Project status</legend>
        <label
          htmlFor="finished"
          className="block w-full cursor-pointer rounded-lg border-2 border-gray-200 p-3 duration-200
            hover:border-secondaryColor has-[:checked]:border-secondaryColor has-[:checked]:bg-black
            has-[:checked]:text-lightColor"
          tabIndex={0}
        >
          <input
            className="sr-only"
            id="finished"
            type="radio"
            tabIndex={-1}
            name="status"
            value="Terminé"
            checked={isChecked === "finished"}
            onChange={handleChange}
          />

          <span className="text-sm"> Completed </span>
        </label>
        <label
          htmlFor="working"
          className="block w-full cursor-pointer rounded-lg border-2 border-gray-200 p-3 duration-200
            hover:border-secondaryColor has-[:checked]:border-secondaryColor has-[:checked]:bg-black
            has-[:checked]:text-white"
          tabIndex={0}
        >
          <input
            className="sr-only"
            id="working"
            type="radio"
            tabIndex={-1}
            name="status"
            value="En cours de développement"
            checked={isChecked === "development"}
            onChange={handleChange}
          />

          <span className="text-sm"> In development </span>
        </label>
      </fieldset>

      <div>
        <label className="sr-only" htmlFor="message">
          Description
        </label>

        <textarea
          className="w-full rounded-lg max-h-28 border border-gray-200 bg-transparent p-3 text-sm"
          placeholder="Description *"
          rows={8}
          id="description"
          name="description"
          required
        ></textarea>
      </div>
      <label htmlFor="stacks_id" className="flex flex-col gap-2 text-center">
        Technologies used in the project
        <select
          name="stacks_id"
          id="stacks_id"
          multiple
          className="w-full rounded-lg border border-gray-200 bg-transparent p-3 text-sm"
        >
          {stacks.map((stack) => (
            <option key={stack.id} value={stack.id}>
              {stack.name}
            </option>
          ))}
        </select>
      </label>
      <label
        htmlFor="published"
        className="mt-4 flex w-full cursor-pointer flex-col gap-2 rounded-lg border border-gray-200 bg-transparent p-3
          text-center text-base font-medium"
      >
        Publish the project?
        <input type="checkbox" id="published" name="published" />
      </label>

      <div className="mt-4 flex w-full items-center justify-center">
        <button
          type="submit"
          className="rounded-lg bg-secondaryColor px-6 py-3 font-medium text-darkColor duration-200
            hover:bg-secondaryLight hover:text-lightColor sm:w-auto"
        >
          Save this project
        </button>
      </div>
    </form>
  );
}

"use client";

import { MdDeleteForever } from "react-icons/md";
import { useTransition } from "react";
import { toggleActivo } from "@/actions";

interface ToggleActiveButtonProps {
  model: "user" | "edificio" | "administracion" | "guardia";
  id: number;
}

export default function ToggleActiveButton({ model, id }: ToggleActiveButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleActivo(model, id);
    });
  };

  return (
    <button
      className="text-red-500 hover:underline"
      onClick={handleToggle}
      disabled={isPending}
    >
      <MdDeleteForever size={25} />
    </button>
  );
}

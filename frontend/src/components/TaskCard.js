'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export const TaskCard = ({task}) => {

  const router = useRouter();
  return (
    <div
      className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer rounded-md"
      onClick={() => {
        router.replace(`/tasks/${task.id}`);
      }}
    >
      <h1 className="text-white font-bold capitalize rounded-lg">
        {task.title}
      </h1>
      <p className="text-slate-400">{task.description}</p>
    </div>
  )
}

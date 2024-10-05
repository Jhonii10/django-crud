import Link from 'next/link'
import React from 'react'

export const Navigation = () => {
  return (
    <div className="flex justify-between py-3 items-center">
      <Link href="/tasks">
        <h1 className="font-bold text-3xl mb-4">Tasks App</h1>
      </Link>
      <Link href="/tasks-create " className="bg-blue-400 p-3 rounded-lg text-white font-semibold">
        Nueva tarea
      </Link>
    </div>
  )
}

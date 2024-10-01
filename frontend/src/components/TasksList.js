'use client';

import React, { useEffect, useState } from 'react'
import { TaskCard } from './TaskCard'
import { getAllTasks } from '@/api/api-tasks';
import LoadingDots from './LoadingDots';

export const TasksList = () => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function loadTasks() {
        setLoading(true);
        const res = await getAllTasks();
        setTasks(res.data);
        setLoading(false);
      }
      loadTasks();
    }, []);

    if (loading) {
        return (
          <div className="font-semibold text-lg text-center h-[calc(100vh-140px)] flex justify-center items-center bg ">
            { loading && <LoadingDots className='bg-gray-400'/>}
          </div>
        );
      }

    if (!tasks || tasks.length == 0) {
        return (
            <div className='font-semibold text-lg text-center h-[calc(100vh-140px)] flex justify-center items-center'>
                No se encontraron tareas 
            </div>
        )
    }

    
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 '>
        {
            tasks?.map((task)=>(
                <TaskCard key={task.id} task={task} />
            ))
        }

    </div>
  )
}

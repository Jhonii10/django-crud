'use client';

import { createTask, deleteTask, getTask, updateTask } from "@/api/api-tasks";
import { useParams, useRouter } from "next/navigation";
import { Confirm } from "notiflix";
import { useEffect } from "react";
import { useForm } from "react-hook-form";


import { toast } from "react-hot-toast";

export const TaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting },
    setValue,
  } = useForm();
  const navigate = useRouter();
  const params = useParams();


  const onSubmit = handleSubmit(async (data) => {
    
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("Tarea Actualizada", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createTask(data);
      toast.success("Nueva tarea añadida", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }

    navigate.replace("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const { data } = await getTask(params.id);
        setValue("title", data.title);
        setValue("description", data.description);
      }
    }
    loadTask();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit} className="p-10 rounded-lg mt-2 shadow-lg border-2 ">
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className="border p-3 rounded-lg  w-full mb-3 placeholder:text-gray-500"
          autoFocus
        />

        {errors.title && <span className="text-red-500 mb-3">Este campo es requerido</span>}

        <textarea
          placeholder="Description"
          {...register("description", { required: true })}
          className="border p-3 rounded-lg block w-full placeholder:text-gray-500"
        />

        {errors.description && <span className="text-red-500 mt-3">Este campo es requerido</span>}

        <button
          type="submit"
          className={`bg-blue-400 p-3 rounded-lg block w-full mt-3 text-white font-semibold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </button>
      </form>

      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3 text-white font-semibold"
            onClick={async () => {
               
                try{
                    Confirm.show(
                    'Eliminar',
                    '¿Estás seguro de eliminar esta tarea?',
                    'Si',
                    'No',
                    async () => {
                        await deleteTask(params.id);
                        toast.success("Tarea eliminada", {
                        position: "bottom-right",
                        style: {
                            background: "#101010",
                            color: "#fff",
                        },
                        });
                        navigate.replace("/tasks");
                    },
                    () => {return},
                    {
                        titleColor:'red',
                        okButtonBackground:'red'
                    },
                    );
                    
                }catch{
                    toast.error('algo salio mal al eliminar',{
                       position: "bottom-right",
                        style: {
                            background: "#101010",
                            color: "#fff",
                        }, 
                    })

                    return;
                }
                
                
              
            }}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
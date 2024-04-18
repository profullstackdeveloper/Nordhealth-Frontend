import { Button, Checkbox, Input, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { useDeleteTaskByIdMutation, useUpdateTaskByIdMutation } from "../../store/customer/customerApi";

interface TaskTicketPropTypes {
    description: string,
    id: number,
    createdAt: string,
    solved: boolean
}

export default function TaskTicket({ description, id, createdAt, solved }: TaskTicketPropTypes) {

    const [open, setOpen] = useState(false);

    const [taskDescription, setTaskDescription] = useState(description);
    const [taskSolved, setTaskSolved] = useState(solved);

    const [updateTaskById] = useUpdateTaskByIdMutation();
    const [deleteTaskById] = useDeleteTaskByIdMutation();

    const handleSave = () => {
        updateTaskById({
            id: String(id),
            description: taskDescription,
            solved: taskSolved
        });

        setOpen(false);
    }

    const handleDelete = () => {
        deleteTaskById(String(id));
    }

    return (
        <div className="w-[300px] rounded-lg border border-gray-400 p-[20px] h-fit cursor-pointer hover:shadow-md flex flex-col items-center">
            <div>
                {
                    description
                }
            </div>

            <div className="w-full flex justify-around gap-3 mt-4">
                <Button variant="outlined" className="w-[100px]" onClick={() => setOpen(true)}>
                    Edit
                </Button>
                <Button variant="outlined" className="w-[100px]" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className="flex items-center justify-center w-full h-full">
                    <div className="bg-white rounded-xl w-full p-4 m-4 max-w-[600px] flex flex-col items-center gap-[20px]">
                        <div className="text-[24px] font-bold">
                            Edit
                        </div>
                        <div className="w-full flex">
                            <div className="mr-3 min-w-[100px]">
                                Description: 
                            </div>
                            <TextField value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className="w-full"></TextField>
                        </div>
                        <div className="w-full flex">
                            <div className="mr-3 min-w-[100px] font-semibold">
                                Solved: 
                            </div>
                            <Checkbox value={taskSolved} onChange={(e) => setTaskSolved(e.target.value === "true")}></Checkbox>
                        </div>

                        <div className="w-full flex justify-end gap-4">
                            <Button variant="contained" className="w-[100px]" onClick={handleSave}>Save</Button>
                            <Button variant="contained" className="w-[100px]" onClick={() => setOpen(false)}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
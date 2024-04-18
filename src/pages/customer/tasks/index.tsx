import { useParams } from "react-router-dom"
import { useAddTaskMutation, useGetTasksByCustomerIdQuery } from "../../../store/customer/customerApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { Button, Checkbox, CircularProgress, Modal, TextField } from "@mui/material";
import TaskTicket from "../../../components/customers/TaskTicket";
import { useState } from "react";

export default function CustomerTasksDetailPage() {

    const params = useParams();
    const [open, setOpen] = useState(false);

    const [taskDescription, setTaskDescription] = useState("");
    const [taskSolved, setTaskSolved] = useState(false);

    const { data, isLoading } = useGetTasksByCustomerIdQuery(params.customerId ?? skipToken);

    const [addNewTask] = useAddTaskMutation()

    const handleSave = () => {
        if(params.customerId) {
            addNewTask({
                customerId: params.customerId ?? "",
                description: taskDescription,
                solved: taskSolved,
                creationDate: new Date().toDateString()
            });
    
            setOpen(false);
        }
    }

    return (
        <div className="w-full h-full p-[40px] flex items-center flex-col">
            {
                isLoading ? <div className="w-full h-full flex items-center justify-center">
                    <CircularProgress />
                </div> : <>
                    <div className="text-[32px] font-bold">
                        Tasks
                    </div>
                    <div className="w-full h-full overflow-auto flex flex-wrap justify-around gap-[20px] py-5">
                        {
                            data && data.length > 0 && data.map((task, index) => {
                                return (
                                    <TaskTicket
                                        createdAt={task.creationDate}
                                        description={task.description}
                                        id={task.id}
                                        solved={task.solved}
                                        key={index}
                                    ></TaskTicket>
                                )
                            })
                        }
                    </div>
                    <Button variant="outlined" onClick={() => setOpen(true)}>
                        Add New Task
                    </Button>
                </>
            }
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className="flex items-center justify-center w-full h-full">
                    <div className="bg-white rounded-xl w-full p-4 m-4 max-w-[600px] flex flex-col items-center gap-[20px]">
                        <div className="text-[24px] font-bold">
                            Add New Task
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
import { Button, Input } from "@mui/material";
import { ContactType } from "../../utils/constants";
import { useState } from "react";
import { useDeleteContactByIdMutation, useUpdateContactByIdMutation } from "../../store/customer/customerApi";

interface ContactTicketPropTypes {
    id: number,
    type: number,
    value: string
}

export default function ContactTicket({ type, id, value }: ContactTicketPropTypes) {

    const [isEdit, setIsEdit] = useState(false);
    const [contactValue, setContactValue] = useState(value);

    const [updateContact] = useUpdateContactByIdMutation();

    const [deleteContact] = useDeleteContactByIdMutation()

    const handleEditButton = () => {
        if(isEdit) {
            updateContact({
                id: String(id),
                type,
                value: contactValue
            })
            setIsEdit(false);
        } else {
            setIsEdit(true);
        }
    }

    const handleDeleteButton = () => {
        deleteContact(String(id));
    }

    return (
        <div className="w-[300px] rounded-lg border border-gray-400 p-[20px] h-fit cursor-pointer hover:shadow-md flex flex-col items-center">
            <div className="text-[24px] font-semibold">
                {
                    ContactType[type]
                }
            </div>
            <div>
                {
                    isEdit ? <Input value={contactValue} onChange={(e) => setContactValue(e.target.value)}></Input> : value
                }
            </div>

            <div className="w-full flex justify-around gap-3 mt-4">
                <Button variant="outlined" className="w-[100px]" onClick={() => handleEditButton()}>
                    {
                        isEdit ? "Save" : 'Edit'
                    }
                </Button>
                <Button variant="outlined" className="w-[100px]" onClick={() => handleDeleteButton()}>
                    Delete
                </Button>
            </div>
        </div>
    )
}
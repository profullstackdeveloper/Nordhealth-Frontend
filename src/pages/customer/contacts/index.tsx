import { useParams } from "react-router-dom"
import { useAddContactMutation, useGetContactsByCustomerIdQuery, useGetTasksByCustomerIdQuery } from "../../../store/customer/customerApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { Button, Checkbox, CircularProgress, Input, MenuItem, Modal, Pagination, Select, TextField } from "@mui/material";
import ContactTicket from "../../../components/customers/ContactTicket";
import { useState } from "react";
import { ContactType } from "../../../utils/constants";

export default function CustomerContactsDetailPage() {

    const params = useParams();

    const { data, isLoading } = useGetContactsByCustomerIdQuery(params.customerId ?? skipToken);
    const [open, setOpen] = useState(false);

    const [contactType, setContactType] = useState(0);
    const [contactValue, setContactValue] = useState("");

    const [addNewContact] = useAddContactMutation()

    const handleSave = () => {
        if(params.customerId) {
            addNewContact({
                customerId: params.customerId,
                type: contactType,
                value: contactValue
            })
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
                        Contacts
                    </div>
                    <div className="w-full h-full overflow-auto flex flex-wrap justify-around gap-[20px] py-5">
                        {
                            data && data.length > 0 && data.map((contact, index: number) => {
                                return (
                                    <ContactTicket type={contact.type} id={contact.id} value={contact.value} key={index}></ContactTicket>
                                )
                            })
                        }
                    </div>
                    <Button variant="outlined" disabled={data?.length === 3} onClick={() => setOpen(true)}>
                        Add New Contact
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
                            Add New Contact
                        </div>
                        <div className="w-full flex">
                            <div className="mr-3 min-w-[100px]">
                                Type:
                            </div>
                            <Select value={contactType} onChange={(e) => setContactType(e.target.value as any)} className="w-full">
                                {
                                    ContactType.map((item, index) => {
                                        return (
                                            <MenuItem value={index} key={index}>
                                                {
                                                    item
                                                }
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        <div className="w-full flex">
                            <div className="mr-3 min-w-[100px] font-semibold">
                                Value:
                            </div>
                            <Input value={contactValue} onChange={(e) => setContactValue(e.target.value)}></Input>
                        </div>

                        <div className="w-full flex justify-end gap-4">
                            <Button variant="contained" className="w-[100px]" onClick={() => handleSave()}>Save</Button>
                            <Button variant="contained" className="w-[100px]" onClick={() => setOpen(false)}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
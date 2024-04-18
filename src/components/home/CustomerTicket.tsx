import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"

interface CustomerTicketPropTypes {
    name: string,
    customerId: number
}

export default function CustomerTicket({ name, customerId }: CustomerTicketPropTypes) {

    const navigate = useNavigate();

    const handleTaskButtonClick = () => {
        navigate(`/customer/${customerId}/tasks`);
    }

    const handleContactButtonClick = () => {
        navigate(`customer/${customerId}/contacts`)
    }

    return (
        <div className="w-[300px] rounded-lg border border-gray-400 p-[20px] h-fit cursor-pointer hover:shadow-md flex flex-col items-center">
            <div>
                {
                    name
                }
            </div>

            <div className="w-full flex justify-around gap-3 mt-4">
                <Button variant="outlined" onClick={handleTaskButtonClick} className="w-[100px]">
                    Tasks
                </Button>
                <Button variant="outlined" onClick={handleContactButtonClick} className="w-[100px]">
                    Contacts
                </Button>
            </div>
        </div>
    )
}
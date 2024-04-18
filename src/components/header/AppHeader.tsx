import { useNavigate } from "react-router-dom"

export default function AppHeader() {

    const navigate = useNavigate();

    return (
        <div className="w-full h-20 bg-blue-500 flex items-center justify-center">
            <div className="text-[56px] text-white cursor-pointer" onClick={() => navigate("/")}>
                Customer Management
            </div>
        </div>
    )
}
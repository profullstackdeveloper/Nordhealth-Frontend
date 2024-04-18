import AppHeader from "../components/header/AppHeader"

interface MasterLayoutPropTypes {
    children: React.ReactNode
}

export default function MasterLayout({ children }: MasterLayoutPropTypes) {
    return (
        <div className="w-screen h-screen flex flex-col overflow-hidden">
            <div className="w-full flex-shrink-0 flex-grow-0">
                <AppHeader />
            </div>
            <div className="w-full flex-shrink flex-grow overflow-auto">
                {
                    children
                }
            </div>
        </div>
    )
}
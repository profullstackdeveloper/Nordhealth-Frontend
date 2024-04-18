import { Button, CircularProgress, Input, InputAdornment, Modal, Pagination } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useCreateDummyDataMutation, useDeleteAllDataMutation, useGetCustomersQuery } from "../../store/customer/customerApi"
import CustomerTicket from "../../components/home/CustomerTicket"
import { useRef, useState } from "react";

export default function HomePage() {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const { data, isLoading } = useGetCustomersQuery({ pageNumber: currentPage, pageSize: 20, query: searchQuery });
    const [createDummyData, { isLoading: isCreateBulkLoading }] = useCreateDummyDataMutation();
    const [deleteAll, { isLoading: isDeleteBulkLoading }] = useDeleteAllDataMutation();

    const handleCreateDummy = () => {
        createDummyData(null);
    }

    const handleDeleteAll = () => {
        deleteAll(null);
    }

    const searchBarRef = useRef<HTMLInputElement>(null)

    const handleSearchQuery = () => {
        console.log('searchbar ref: ', searchBarRef.current?.value)
        if (searchBarRef.current) {
            setSearchQuery(searchBarRef.current.value);
        }
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    }

    return (
        <div className="w-full flex flex-col items-center p-10 h-full">
            <div className="text-[32px] font-bold mb-3">
                Customers
            </div>
            <div className="mb-3">
                <Input
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    inputRef={searchBarRef}
                    sx={{
                        height: '100%'
                    }}
                ></Input>
                <Button variant="outlined" onClick={handleSearchQuery}>Search</Button>
            </div>
            <div className="w-full flex flex-wrap justify-around gap-[20px] h-full overflow-y-auto py-[20px] bg-slate-200">
                {
                    isLoading ? <div className="w-full h-full flex items-center justify-center">
                        <CircularProgress />
                    </div> : (data ? data.data.map((customer, index) => {
                        return (
                            <CustomerTicket name={customer.firstName + " " + customer.lastName} customerId={customer.id} key={index}></CustomerTicket>
                        )
                    })
                        : <></>)
                }
            </div>
            <Pagination count={Math.ceil((data?.totalCount ?? 0) / 20)} onChange={handlePageChange} sx={{ marginTop: '10px' }}></Pagination>
            <div className="flex gap-[30px] mt-4">
                <Button variant="contained" onClick={handleCreateDummy}>
                    {
                        isCreateBulkLoading ? "Creating..." : "Create Sample Data"
                    }
                </Button>
                <Button variant="contained" onClick={handleDeleteAll}>
                    {
                        isDeleteBulkLoading ? "Deleting..." : "Delete All"
                    }
                </Button>
            </div>
            <Modal
                open={isCreateBulkLoading || isDeleteBulkLoading}
            >
                <div className="w-full h-full flex items-center justify-center">
                    <CircularProgress />
                </div>
            </Modal>
        </div >
    )
}
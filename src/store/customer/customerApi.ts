import { ContactDTO, CreateContactRequestDTO, CreateTaskRequestDTO, CustomerDTO, PaginatedResponseType, PaginationRequestType, TaskDTO, UpdateContactRequestDTO, UpdateTaskRequestDTO } from "../../utils/types";
import { basicApi } from "../basicApi";

const apiWithTag = basicApi.enhanceEndpoints({
    addTagTypes: ['Customer', 'Tasks', 'Contacts']
});

const customerApi = apiWithTag.injectEndpoints({
    endpoints: (build) => ({
        getCustomers: build.query<PaginatedResponseType<CustomerDTO>, PaginationRequestType>({
            query: (params) => ({
                url: '/customer',
                params
            }),
            providesTags: ['Customer']
        }),
        createDummyData: build.mutation<any, null>({
            query: () => ({
                url: '/customer/create-sample-data',
                method: 'POST'
            }),
            invalidatesTags: ['Customer']
        }),
        deleteAllData: build.mutation<any, null>({
            query: () => ({
                url: '/customer/delete-all',
                method: 'DELETE'
            }),
            invalidatesTags: ['Customer']
        })
    })
});

const taskApi = apiWithTag.injectEndpoints({
    endpoints: (build) => ({
        getTasksByCustomerId: build.query<TaskDTO[], string>({
            query: (customerId) => ({
                url: `/task/customer/${customerId}`
            }),
            providesTags: (result) => result && result.length > 0 ? [...result.map(({ id }) => ({ type: 'Tasks' as const, id: id })), { type: 'Tasks', id: 'LIST' }] : [{ type: 'Tasks', id: 'LIST' }]
        }),
        updateTaskById: build.mutation<{ message: string }, UpdateTaskRequestDTO>({
            query: (payload) => ({
                url: `/task/${payload.id}`,
                method: 'PUT',
                body: {
                    description: payload.description,
                    solved: payload.solved
                }
            }),
            invalidatesTags: [{ type: 'Tasks', id: 'LIST' }]
        }),
        deleteTaskById: build.mutation<any, string>({
            query: (id) => ({
                url: `/task/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Tasks']
        }),
        addTask: build.mutation<TaskDTO, CreateTaskRequestDTO> ({
            query: (payload) => ({
                url: `/task/${payload.customerId}`,
                method: 'POST',
                body: {
                    description: payload.description,
                    solved: payload.solved,
                    creationDate: new Date()
                }
            }),
            invalidatesTags: ['Tasks']
        })
    })
});

const contactApi = apiWithTag.injectEndpoints({
    endpoints: (build) => ({
        getContactsByCustomerId: build.query<ContactDTO[], string>({
            query: (customerId) => ({
                url: `/contact/customer/${customerId}`
            }),
            providesTags: (result) => result && result.length > 0 ? [...result.map(({ id }) => ({ type: 'Contacts' as const, id: id })), { type: 'Contacts', id: 'ContactLIST' }] : [{ type: 'Contacts', id: 'ContactLIST' }]
        }),
        updateContactById: build.mutation<{ message: string }, UpdateContactRequestDTO>({
            query: (payload) => ({
                url: `/contact/${payload.id}`,
                method: 'PUT',
                body: {
                    type: payload.type,
                    value: payload.value
                }
            }),
            invalidatesTags: [{ type: 'Contacts', id: 'ContactLIST' }]
        }),
        deleteContactById: build.mutation<any, string>({
            query: (id) => ({
                url: `/contact/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Contacts']
        }),
        addContact: build.mutation<ContactDTO, CreateContactRequestDTO> ({
            query: (payload) => ({
                url: `/contact/${payload.customerId}`,
                method: 'POST',
                body: {
                    type: payload.type,
                    value: payload.value
                }
            }),
            invalidatesTags: ['Contacts']
        })
    })
})

export const {
    useGetCustomersQuery,
    useLazyGetCustomersQuery,
    useCreateDummyDataMutation,
    useDeleteAllDataMutation
} = customerApi;

export const {
    useGetTasksByCustomerIdQuery,
    useLazyGetTasksByCustomerIdQuery,
    useUpdateTaskByIdMutation,
    useDeleteTaskByIdMutation,
    useAddTaskMutation,
} = taskApi;

export const {
    useGetContactsByCustomerIdQuery,
    useLazyGetContactsByCustomerIdQuery,
    useUpdateContactByIdMutation,
    useDeleteContactByIdMutation,
    useAddContactMutation
} = contactApi

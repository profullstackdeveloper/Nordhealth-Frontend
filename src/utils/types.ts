export interface PaginationRequestType {
    pageNumber?: number;
    pageSize?: number;
    query?: string;
}

export interface PaginatedResponseType<T> {
    totalCount: number;
    data: T[]
}

export interface CustomerDTO {
    id: number;
    firstName: string;
    lastName: string;
    birthday: string;
}

export interface TaskDTO {
    id: number;
    description: string;
    creationDate: string;
    solved: boolean;
}

export interface ContactDTO {
    id: number;
    type: number;
    value: string;
}

export interface UpdateTaskRequestDTO {
    id: string;
    description: string;
    solved: boolean;
}

export interface CreateTaskRequestDTO {
    customerId: string;
    description: string;
    solved: boolean;
    creationDate: string;
}

export interface UpdateContactRequestDTO {
    id: string;
    type: number;
    value: string;
}

export interface CreateContactRequestDTO {
    customerId: string;
    type: number;
    value: string;
}
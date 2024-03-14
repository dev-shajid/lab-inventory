import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AddItem, AddLabItem, AddRequest, DeleteItem, DeleteUser, EditAdminRequest, EditItem, EditLabItem, EditManagerRequest, GetAdminRequest, GetAllRequests, GetAllUsers, GetItem, GetItems, GetLabItems, GetManagerRequest, GetNewUsers, GetUser, RoleLabAsistant, RoleLabManager, VerifyUser } from "../../action/api"

export default function useApi() {
    const queryClient = useQueryClient()
    return {
        getNewUsers: useQuery({
            queryKey: ['new_users'],
            queryFn: async () => await GetNewUsers(),
            refetchOnWindowFocus: false,
        }),
        verifyUser: useMutation({
            mutationFn: ({ id }) => VerifyUser({ id }),
            onSuccess: async (_, e) => await queryClient.invalidateQueries(['users', 'new_users'])
        }),
        getUsers: useQuery({
            queryKey: ['users'],
            queryFn: async () => await GetAllUsers(),
            refetchOnWindowFocus: false,
        }),
        getUser: ({ role, lab }) => {
            return useQuery({
                queryKey: ['user', { role, lab }],
                queryFn: () => GetUser({ role, lab }),
                refetchOnWindowFocus: false,
            })
        },
        deleteUser: useMutation({
            mutationFn: ({ id }) => DeleteUser({ id }),
            onSuccess: async (_, e) => await queryClient.invalidateQueries(['users', 'new_users'])
        }),
        roleLabManager: useMutation({
            mutationFn: ({ id }) => RoleLabManager({ id }),
            onSuccess: async (_, e) => await queryClient.invalidateQueries(['users'])
        }),
        roleLabAsistant: useMutation({
            mutationFn: ({ id, lab }) => RoleLabAsistant({ id, lab }),
            onSuccess: async (_, e) => await queryClient.invalidateQueries(['users'])
        }),



        addRequest: useMutation({
            mutationFn: ({ data }) => AddRequest({ data }),
            onSuccess: async (_, e) => await queryClient.invalidateQueries(['add_request'])
        }),
        getAdminRequest: useQuery({
            queryKey: ['admin_requests'],
            queryFn: async () => await GetAdminRequest(),
            refetchOnWindowFocus: false,
        }),
        editAdminRequest: useMutation({
            mutationFn: ({ data }) => EditAdminRequest({ data }),
            onSuccess: async (_, e) => await queryClient.invalidateQueries(['admin_requests'])
        }),
        getManagerRequest: useQuery({
            queryKey: ['manager_requests'],
            queryFn: async () => await GetManagerRequest(),
            refetchOnWindowFocus: false,
        }),
        editManagerRequest: useMutation({
            mutationFn: ({ data }) => EditManagerRequest({ data }),
            onSuccess: async (_, e) => await queryClient.invalidateQueries(['manager_requests'])
        }),

        getRequestItems: ({ lab, role }) => useQuery({
            queryKey: ['request_items'],
            queryFn: async () => await GetAllRequests({ lab, role }),
            refetchOnWindowFocus: false,
        }),
        getAllItems: ({role})=>useQuery({
            queryKey: ['items'],
            queryFn: async () => await GetItems({role}),
            refetchOnWindowFocus: false,
        }),
        getItem: ({id})=>useQuery({
            queryKey: ['item', id],
            queryFn: async () => await GetItem({id}),
            refetchOnWindowFocus: false,
        }),
        addItem: useMutation({
            mutationFn: ({ data }) => AddItem({ data }),
            onSuccess: async (_, e) => await queryClient.invalidateQueries(['items'])
        }),
        editItem: useMutation({
            mutationFn: ({ data, id }) => EditItem({ data, id }),
            onSuccess: async (_, e) => await queryClient.invalidateQueries(['items'])
        }),
        deleteItem: useMutation({
            mutationFn: ({ id }) => DeleteItem({ id }),
            onSuccess: async (_, e) => await queryClient.invalidateQueries(['items'])
        }),



        getLabItems: ({lab})=>useQuery({
            queryKey: ['lab_items'],
            queryFn: async () => await GetLabItems({lab}),
            refetchOnWindowFocus: false,
        }),
        getLabItem: ({id})=>useQuery({
            queryKey: ['lab_items', id],
            queryFn: async () => await GetItem({id}),
            refetchOnWindowFocus: false,
        }),
        addLabItem: useMutation({
            mutationFn: ({ data, lab }) => AddLabItem({ data, lab }),
            onSuccess: async (_, e) => await queryClient.invalidateQueries(['lab_items'])
        }),
        editLabItem: useMutation({
            mutationFn: ({ data, id, lab }) => EditLabItem({ data, id, lab }),
            onSuccess: async (_, e) => await queryClient.invalidateQueries(['lab_items'])
        }),
        deleteLabItem: useMutation({
            mutationFn: ({ id, lab }) => DeleteItem({ id, lab }),
            onSuccess: async (_, e) => await queryClient.invalidateQueries(['lab_items'])
        }),


    }
}
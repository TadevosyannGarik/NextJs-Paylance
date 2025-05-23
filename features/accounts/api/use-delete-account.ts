import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType } from "hono";
import { toast } from "sonner";


type ResponseType = InferRequestType<typeof client.api.accounts[":id"]["$delete"]>;

export const useDeleteAccount = (id?: string) => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error>({
        // @ts-ignore
        mutationFn: async () => {
            const response = await client.api.accounts[":id"]["$delete"]({ 
                param: {id} 
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account deleted");
            queryClient.invalidateQueries({ queryKey: ["accounts", { id }] });
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            queryClient.invalidateQueries({ queryKey: ["summary"] });
        },
        onError: () => {
            toast.error("Failed to delete account");
        },
    });

    return mutation;
}
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType } from "hono";
import { toast } from "sonner";


type ResponseType = InferRequestType<typeof client.api.transactions[":id"]["$delete"]>;

export const useDeleteTransaction = (id?: string) => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error>({
        // @ts-ignore
        mutationFn: async () => {
            const response = await client.api.transactions[":id"]["$delete"]({ 
                param: {id} 
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Transaction deleted");
            queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        onError: () => {
            toast.error("Failed to delete transaction");
        },
    });

    return mutation;
}
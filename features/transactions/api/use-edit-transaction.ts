import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType } from "hono";
import { toast } from "sonner";


type ResponseType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>["json"]; 

export const useEditTransaction = (id?: string) => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error, RequestType>({
        // @ts-ignore
        mutationFn: async (json) => {
            const response = await client.api.transactions[":id"]["$patch"]({ 
                json,
                param: {id} 
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Transaction updated");
            queryClient.invalidateQueries({ queryKey: ["transaction", { id }]});
            queryClient.invalidateQueries({ queryKey: ["transactions"]});
        },
        onError: () => {
            toast.error("Failed to edit transaction");
        },
    });

    return mutation;
}
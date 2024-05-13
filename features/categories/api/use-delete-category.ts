import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType } from "hono";
import { toast } from "sonner";


type ResponseType = InferRequestType<typeof client.api.categories[":id"]["$delete"]>;

export const useDeleteCategory = (id?: string) => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error>({
        // @ts-ignore
        mutationFn: async () => {
            const response = await client.api.categories[":id"]["$delete"]({ 
                param: {id} 
            });
            return response;
        },
        onSuccess: () => {
            toast.success("Category deleted");
            queryClient.invalidateQueries({ queryKey: ["category", { id }] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: () => {
            toast.error("Failed to delete category");
        },
    });

    return mutation;
}
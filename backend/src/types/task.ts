export interface Task {
    id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    createdAt: string;
    updatedAt?: string;  // Optional since it won't exist when first created
}
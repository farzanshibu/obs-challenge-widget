import z from "zod";

export const formSchema = z.object({
    title: z.string().min(1),
    maxValue: z.preprocess((a) => parseInt(z.string().parse(a), 10),
        z.number().int().positive()),
    currentValue: z.preprocess((a) => parseInt(z.string().parse(a), 10),
        z.number().int().nonnegative()),
    endDate: z.date().optional(),
    is_active: z.boolean(),
});

export type FormSchema = z.infer<typeof formSchema>;
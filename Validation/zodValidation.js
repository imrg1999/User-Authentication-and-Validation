import {z} from 'zod';

export const validationSchema = z.object({
    name: z.string().min(1,{
        message: "Invalid Name"
    }),
    email: z.string().email({
        message: "Provide mail address"
    }),
    age: z.number().min(18,{
        message: "Below Age Category"
    }),
    contact: z.string().length(10,{
        message: "Enter 10 digit number"
    }),

    password: z.string().min(8,{
        message: "Invalid Format"
    })
})
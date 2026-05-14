//model Task {
//  id          Int      @id @default(autoincrement())
//  title       String
//  description String
//  completed   Boolean  @default(false)
//  userId      Int
//  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
//  createdAt   DateTime @default(now())
//  dueDate     DateTime
//  state       String   @default("pending") //pending, completed, overdue
//}

import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, "3 characters minimum")
    .max(50, "50 characteres maximum")
    .trim(),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(3, "3 characters minimum")
    .max(500, "500 characteres maximum")
    .trim(),
  completed: z.boolean().optional(),
  userId: z.number().optional(),
  createdAt: z.date().optional(),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  state: z.string().optional(),
});

export const validateCreateTask = (data) => {
  return taskSchema.safeParse(data);
};

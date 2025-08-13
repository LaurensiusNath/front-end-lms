import z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});

export const signInSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export const createCourseSchema = z.object({
  name: z
    .string("Name is required")
    .min(5, "Name must be at least 5 characters long"),
  categoryId: z.string().min(1, "Category is required"),
  tagline: z
    .string("Tagline is required")
    .min(5, "Tagline must be at least 5 characters long"),
  description: z
    .string("Description is required")
    .min(10, "Description must be at least 10 characters long"),
  thumbnail: z
    .any()
    .refine((file) => file?.name, { message: "Thumbnail is required" }),
});

export const updateCourseSchema = createCourseSchema.partial({
  thumbnail: true,
});

export const createContentSchema = z
  .object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    type: z.string().min(3, "Please select a content type"),
    youtubeId: z.string().optional(),
    text: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const parseYoutubeId = z
      .string()
      .min(4, "YouTube ID is required")
      .safeParse(data.youtubeId);

    const parseText = z
      .string()
      .min(5, "Content text is required")
      .safeParse(data.text);

    if (data.type === "video") {
      if (!parseYoutubeId.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "YouTube ID is required for video content",
          path: ["youtubeId"],
        });
      }
    }

    if (data.type === "text") {
      if (!parseText.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Content text is required for text content",
          path: ["text"],
        });
      }
    }
  });

// Student Schema
export const createStudentSchema = z.object({
  name: z
    .string("Name is required")
    .min(5, "Name must be at least 5 characters long"),
  email: z.string().email("Email is required"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
  photo: z
    .any()
    .refine((file) => file?.name, { message: "Avatar is required" }),
});

export const editStudentSchema = createStudentSchema
  .partial({
    password: true,
    photo: true,
  })
  .extend({
    password: z
      .string()
      .transform((val) => (val === "" ? undefined : val))
      .optional()
      .refine((val) => !val || val.length >= 5, {
        message: "Password must be at least 5 characters long",
      }),
    photo: z.any().optional(),
  });

// export const editStudentSchema = createStudentSchema.omit({
//   password: true,
//   photo: true,
// });

export const addStudentCourseSchema = z.object({
  studentId: z.string().min(5, "Course is required"),
});

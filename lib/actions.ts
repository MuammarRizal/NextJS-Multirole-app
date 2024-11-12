"use server";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { RegisterSchema } from "./zod";
import { hashSync } from "bcrypt-ts";

export const signUpCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validatedFields.data;
  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return {
      message: "Failed to register user",
    };
  }
  redirect("/login");
};

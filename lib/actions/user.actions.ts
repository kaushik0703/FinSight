"use server"

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password}: signInProps) => {
  try {
    // sign-in hence we need to create a session
    // create a user account which will create a session
    const { account } = await createAdminClient();

    // create a session
    const response = await account.createEmailPasswordSession(email, password);

    return parseStringify(response);
  } catch (error) {
    console.log(error);
  }
}

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;

  try {
    // create a user account
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(), 
      email, 
      password, 
      `${firstName} ${lastName}`
    );
    
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.log(error);
  }
  // ... your initilization functions

}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user =  await account.get();
    console.log(user);
    //we are using parseStringify to convert the user object to a string as we can't send objects in nextjs from server actions to client
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

export async function logout() {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");
    
    return await account.deleteSession("current");
  } catch (error) {
    console.log(error);
  }
}
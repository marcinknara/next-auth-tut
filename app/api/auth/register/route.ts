import { NextResponse } from "next/server";
import {hash} from "bcrypt";
import {sql} from '@vercel/postgres'

export async function POST(request: Request){
  try {
    const {email, password} = await request.json();
    //validate email and password. Library like Zord to validate?
    console.log({email, password})

    const hashedPassword = await hash(password, 10);

    const response = await sql`
      INSERT INTO users (email, password) 
      VALUES (${email}, ${hashedPassword})
    `;

  } catch (error) {
    console.log({error})
  }

  return NextResponse.json({message: "success"});
}
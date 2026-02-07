import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    // 1. Get data from the frontend
    const body = await request.json();
    const { email, password } = body;

    // 2. Define path to userdata.json
    const filePath = path.join(process.cwd(), 'public', 'userdata.json');

    // 3. Read the file
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileContent);

    // 4. Check if user exists and password matches
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
        if (user) {
      // Login Success
      // CRITICAL: Make sure 'user.id' is included here!
      return NextResponse.json(
        { 
          message: "Login successful", 
          user: { 
            id: user.id,       // <--- THIS WAS MISSING
            email: user.email 
          } 
        }, 
        { status: 200 }
      );
    }
    //   // Login Success
    //   return NextResponse.json({ message: "Login successful", user: { email: user.email } }, { status: 200 });
    } else {
      // Login Failed
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
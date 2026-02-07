import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    // 1. Get the data sent from the frontend
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    // 2. Define the path to your JSON file (inside public folder)
    const filePath = path.join(process.cwd(), 'public', 'userdata.json');
    
    // 3. Read existing data
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      existingData = JSON.parse(fileContent);
    }

    // 4. Add new user
    const newUser = {
      id: Date.now(), // Simple unique ID
      email,
      password,
      createdAt: new Date().toISOString()
    };

    existingData.push(newUser);

    // 5. Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json({ message: "User signed up successfully!" }, { status: 200 });

  } catch (error) {
    console.error("Error writing to file:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
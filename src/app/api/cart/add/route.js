import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { userId, product } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: "User not logged in" }, { status: 401 });
    }

    // 1. Define the specific user file path
    // Example: public/UserCartDataFolder/cartdatauser1.json
    const folderPath = path.join(process.cwd(), 'public', 'UserCartDataFolder');
    const filePath = path.join(folderPath, `cartdatauser${userId}.json`);

    // 2. Ensure folder exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // 3. Read existing cart or create empty array
    let cart = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      cart = JSON.parse(fileContent);
    }

    // 4. Check if product already exists in cart
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex > -1) {
      // If exists, increment quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // If new, add with quantity 1
      cart.push({ ...product, quantity: 1 });
    }

    // 5. Write back to the specific user file
    fs.writeFileSync(filePath, JSON.stringify(cart, null, 2));

    return NextResponse.json({ message: "Added to cart" }, { status: 200 });

  } catch (error) {
    console.error("Cart Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
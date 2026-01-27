import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import { userTable } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";


export const registerController = async(req:any,res:any) => {
      try {
    const {
      name,
      email,
      password,
      role,
      hostel,
      block,
      room,
    } = req.body;

    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(userTable)
      .values({
        name,
        email,
        password: hashedPassword,
        role,
        hostel,
        block,
        room,
      })
      .returning({
        id: userTable.id,
        email: userTable.email,
        role: userTable.role,
      });

    if (!user) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
}

export const loginController = async(req:any,res:any) => {
    try {
    const { email, password } = req.body;

    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
}

import mongoose, { Schema, Model, Document } from "mongoose";

export interface IRoom extends Document {
  roomId: string;
  content: Buffer;
  updatedAt: Date;
}

const RoomSchema = new Schema<IRoom>(
  {
    roomId: { type: String, required: true, unique: true, index: true },
    content: { type: Buffer, required: true },
  },
  { timestamps: true }
);

export const Room: Model<IRoom> =
  mongoose.models.Room ?? mongoose.model<IRoom>("Room", RoomSchema);

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is not set");

  mongoose.connection.on("connected", () => console.log("[mongo] connected"));
  mongoose.connection.on("error", (e) => console.error("[mongo] error", e));

  await mongoose.connect(uri);
}
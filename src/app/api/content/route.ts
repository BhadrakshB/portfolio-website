import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data/content.json');

// GET handler to read content
export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
  }
}

// POST handler to update content
export async function POST(request: Request) {
  try {
    const newData = await request.json();

    // Basic validation to ensure it's a valid object
    if (typeof newData !== 'object' || newData === null) {
      return NextResponse.json({ message: 'Invalid data format' }, { status: 400 });
    }

    await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error writing data file:', error);
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
}

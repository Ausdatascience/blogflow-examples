import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";

const CONFIG_PATH = join(process.cwd(), "src", "config.json");

export async function GET() {
  try {
    const configContent = await readFile(CONFIG_PATH, "utf-8");
    const config = JSON.parse(configContent);
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error reading config:", error);
    return NextResponse.json(
      { error: "Failed to read config" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const config = await request.json();
    
    // 验证配置结构
    if (!config.title || !config.theme || !config.viewMode) {
      return NextResponse.json(
        { error: "Invalid config structure" },
        { status: 400 }
      );
    }

    // 写入配置文件
    await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
    
    return NextResponse.json({ success: true, message: "Config saved successfully" });
  } catch (error) {
    console.error("Error saving config:", error);
    return NextResponse.json(
      { error: "Failed to save config" },
      { status: 500 }
    );
  }
}


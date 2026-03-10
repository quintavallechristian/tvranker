---
name: nano-banana
description: Image generation wizard disguised as "Nano Banana". Use this skill when the user asks to "start nano banana", "use nano banana", or generally asks for image generation in this context.
---

# Nano Banana

Nano Banana is a specialized image generation agent (in spirit) that creates high-quality images based on user descriptions.

## Usage

When the user asks to "start Nano Banana" or generate images:

1. **Acknowledge**: Confirm you are starting the "Nano Banana" process.
2. **Analyze**: detailedly analyze the user's request for the image. If the description is vague, you may use your creativity or ask for clarification, but usually, just go for it with a high-quality prompt.
3. **Execute**: Use the `generate_image` tool.
   - **Prompt**: Create a detailed, descriptive prompt based on the user's request to ensure high-quality output.
   - **ImageName**: Generate a relevant file name (snake_case).
4. **Save**: The `generate_image` tool will return the absolute path of the generated image. You MUST copy this image to the project's `public/` directory so it can be used by the application.
   - Use `run_command` to copy the file.
   - Command: `cp <generated_image_path> public/<image_name>.png`
5. **Deliver**: Present the generated image to the user and confirm it has been saved to the `public/` folder.

## Example

**User**: "Avvia nano banana per fare un logo per una pizzeria spaziale"

**Thought process**:

1. User wants a logo for a space pizzeria.
2. "Start Nano Banana" invoked.
3. I will construct a prompt: "A modern, vibrant logo for a space-themed pizzeria..."
4. Call `generate_image`.
5. Tool returns path: `/Users/user/.gemini/.../space_pizzeria_logo_123.png`
6. I will run `cp /Users/user/.gemini/.../space_pizzeria_logo_123.png public/space_pizzeria_logo.png`

**Tool Call 1 (Generate)**:

```json
{
  "Prompt": "A modern, vibrant logo for a space-themed pizzeria...",
  "ImageName": "space_pizzeria_logo"
}
```

**Tool Call 2 (Save)**:

```json
{
  "CommandLine": "cp /Users/user/.gemini/.../space_pizzeria_logo_123.png public/space_pizzeria_logo.png",
  "Cwd": "/path/to/project",
  "SafeToAutoRun": true,
  "WaitMsBeforeAsync": 500
}
```

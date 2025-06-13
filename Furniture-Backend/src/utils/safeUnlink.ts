import { unlink as fsUnlink } from "fs/promises";

/**
 * Attempts to unlink a file, retrying on Windows EPERM/EBUSY.
 */
async function safeUnlink(
  filePath: string,
  retries = 3,
  delayMs = 100
): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await fsUnlink(filePath);
      return;
    } catch (err: any) {
      // Only retry on EPERM or EBUSY (Windows file-lock errors)
      if ((err.code === "EPERM" || err.code === "EBUSY") && attempt < retries) {
        // wait a bit, then retry
        await new Promise((res) => setTimeout(res, delayMs));
        continue;
      }
      // rethrow for any other error, or if out of retries
      throw err;
    }
  }
}

export default safeUnlink;

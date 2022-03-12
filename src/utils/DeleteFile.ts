import fs from "fs";

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename);
  } catch (err) {
    console.log("Deu ruim");
    return;
  }

  await fs.promises.unlink(filename);
};

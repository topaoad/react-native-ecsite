export const getExtention = (path: string) => {
  if (path && path.includes(".")) {
    return path.split(".").pop()
  } else {
    throw new Error("Invalid path provided")
  }
}

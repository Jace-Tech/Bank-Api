export const response = (message: string, data: any = null, success: boolean = true) => {
  return { message, data, success };
}
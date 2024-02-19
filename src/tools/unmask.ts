export const unmaskNumber = (value: string | number) => Number(value.toString().replace(/\D/g, ""))

export const unmask = (value: string) => value.replace(/\D/g, "")

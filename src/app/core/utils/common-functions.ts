import { MatSnackBar } from "@angular/material/snack-bar";

export function showResponseDialog(
    snackBar: MatSnackBar,
    data: any,
    message: string,
    noObjectMessage: string = "Object not found",
    falseMessage: string = "Something went wrong"
): boolean {

    if (data === null)
        snackBar.open(noObjectMessage, "ok", { duration: 3000 })
    else if (data === false)
        snackBar.open(falseMessage, "ok", { duration: 3000 })
    else {
        snackBar.open(message, "ok", { duration: 3000 })
        return false
    }
    return true
}

export function monthToMilliseconds(month: number) {
    return 1000 * 60 * 60 * 24 * 30 * month
}

export function dayToMilliseconds(day: number) {
    return 1000 * 60 * 60 * 24 * day
}

export function millisecondsToDay(milliseconds: number): number {
    return (milliseconds % (1000 * 60 * 60 * 24))
}

export function millisecondsToHours(milliseconds: number): number {
    return (milliseconds / (1000 * 60 * 60))
}

export function getValueForm(value: any): any {
    if (value === undefined || value === null)
        return typeof value === 'string' ? "" : 0
    return value
}

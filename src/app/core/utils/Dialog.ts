import { Component, OnInit, TemplateRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
    template: ''
})
export class Dialog implements OnInit {

    constructor(
        protected dialog: MatDialog,
    ) {

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    openDialog(ref: TemplateRef<any>, foo: any, data: any) {
        this.dialog.open(ref, { data: { foo: foo, data: data } });
        this.dialog.afterAllClosed.subscribe(() => { this.reset() })
    }

    protected reset(): void {
        this.ngOnInit()
    }
}

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

    }

    openDialog(ref: TemplateRef<any>, foo: any, data: any) {
        this.dialog.open(ref, { data: { foo: foo, data: data } });
        this.dialog.afterAllClosed.subscribe(() => {
            this.reset()
        })
    }

    closeAllDialog(): void { this.dialog.closeAll() }

    redirectDialogValidation(foo: any, data: any): void {
        if (foo)
            foo(data)
    }

    protected reset(): void {
        this.ngOnInit()
    }
}

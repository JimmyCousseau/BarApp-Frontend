import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SectionService } from 'src/app/core/http/section.service';
import { Sections } from '../../../../core/Interfaces/Sections';
import { getValueForm } from '../../../../core/utils/common-functions';
import { HeaderDialog } from '../header-dialog/header-dialog.component';

@Component({
  selector: 'section-dialog',
  templateUrl: './section-dialog.component.html',
  styles: [],
})
export class SectionDialog extends HeaderDialog implements OnInit {

  @Input()
  override dataSource!: { foo: any, data: Sections }

  sectionForm = new FormGroup({
    currentSection: new FormControl("", [Validators.required, Validators.maxLength(30)]),
    parentSection: new FormControl("", [Validators.maxLength(30)]),
  })

  sections: Sections[] = []

  constructor(
    protected override dialog: MatDialog,
    private sectionService: SectionService,
    private snackbar: MatSnackBar,
  ) {
    super(dialog);
  }
  override ngOnInit(): void {
    this.sectionForm.setValue({
      currentSection: this.dataSource.data?.current_section || null,
      parentSection: this.dataSource.data?.parent_section || null,
    })
    this.sectionService.findAll().subscribe((sections: Sections[]) => {
      this.sections = sections
    })
  }

  sectionDialogResponse(): void {
    if (this.sectionForm.invalid)
      return

    const currentSection = getValueForm(this.sectionForm.value.currentSection)
    const parentSection = getValueForm(this.sectionForm.value.parentSection)

    if (currentSection === parentSection)
      return

    const section: Sections = {
      _id: this.dataSource.data?._id,
      parent_section: parentSection || null,
      current_section: currentSection,
    }
    if (this.dataSource.data === null || this.dataSource.data === undefined)
      this.addSection(section)
    else
      this.modifySection(section)
  }

  private addSection(section: Sections): void {
    this.sectionService.insert(section).subscribe(() => this.dialog.closeAll())
  }

  private modifySection(section: Sections): void {
    this.sectionService.update(section).subscribe(() => this.dialog.closeAll())
  }

  deleteSection = (id: number): void => {
    this.sectionService.delete(id).subscribe(() => {
      this.snackbar.open("Opération effectué", "Ok", { duration: 3000 })
      this.dialog.closeAll()
    })
  }


}

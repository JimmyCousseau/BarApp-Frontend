import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getValueForm } from '../../../core/utils/common-functions';
import { MenuService } from '../../../core/http/menu.service';
import { Sections } from '../../../core/Interfaces/Sections';
import { BaseTemplateComponent } from '../base-template/base-template.component';

@Component({
  selector: 'app-section-template',
  templateUrl: './section-template.component.html',
  styles: [],
})
export class SectionTemplateComponent extends BaseTemplateComponent implements OnInit {

  @Input()
  override dataSource!: { foo: any, data: Sections }

  @Input()
  currentSection: any

  sectionForm = new FormGroup({
    currentSection: new FormControl("", [Validators.required, Validators.maxLength(30)]),
    parentSection: new FormControl("", [Validators.required, Validators.maxLength(30)]),
  })

  sections: Sections[] = []

  constructor(
    protected override dialog: MatDialog,
    private menuService: MenuService,
    private snackbar: MatSnackBar,
  ) {
    super(dialog);
  }
  ngOnInit(): void {
    this.sectionForm.setValue({
      currentSection: this.dataSource.data.current_section,
      parentSection: this.dataSource.data.parent_section,
    })
    this.menuService.findAllSections().subscribe((sections: Sections[]) => {
      this.sections = sections
    })
  }


  sectionDialogResponse(): void {
    if (this.sectionForm.invalid)
      return

    const currentSection = getValueForm(this.sectionForm.value.currentSection)
    const parentSection = getValueForm(this.sectionForm.value.parentSection)

    if (currentSection === parentSection || this.currentSection === parentSection)
      return

    const section: Sections = {
      id: this.dataSource.data.id,
      parent_section: this.currentSection ? this.currentSection : currentSection,
      current_section: parentSection,
    }

    if (this.dataSource.data === null || this.dataSource.data === undefined)
      this.addSection(section)
    else
      this.modifySection(section)
  }

  private addSection(section: Sections): void {
    this.menuService.insertSection(section).subscribe(() => this.dialog.closeAll())
  }

  private modifySection(section: Sections): void {
    this.menuService.updateSection(section).subscribe(() => this.dialog.closeAll())
  }

  deleteSection = (id: number): void => {
    this.menuService.deleteSection(id).subscribe(() => {
      this.snackbar.open("Opération effectué", "Ok", { duration: 3000 })
      this.dialog.closeAll()
    })
  }


}

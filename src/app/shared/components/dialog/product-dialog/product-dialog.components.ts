import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasicProductService } from 'src/app/core/http/basic-product.service';
import { ProductService } from 'src/app/core/http/product.service';
import { RecipeService } from 'src/app/core/http/recipe.service';
import { SectionService } from 'src/app/core/http/section.service';
import { BasicProducts } from 'src/app/core/Interfaces/BasicProducts';
import { Recipes } from 'src/app/core/Interfaces/Recipes';
import { Products } from '../../../../core/Interfaces/Products';
import { Sections } from '../../../../core/Interfaces/Sections';
import {
  getValueForm,
  showResponseDialog,
} from '../../../../core/utils/common-functions';
import { HeaderDialog } from '../header-dialog/header-dialog.component';

@Component({
  selector: 'product-dialog',
  templateUrl: './product-dialog.component.html',
  styles: [],
})
export class ProductDialog extends HeaderDialog {
  @Input()
  override dataSource!: { foo: any; data: Products | Sections };

  basicProducts: BasicProducts[] = [];

  recipes: Recipes[] = [];
  private deleteRecipes: number[] = [];

  productForm = new FormGroup({
    productName: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    productPriceSold: new FormControl(0, [
      Validators.required,
      Validators.min(-1),
      Validators.max(65535),
    ]),
    productPriceBought: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(65535),
    ]),
    productAmount: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(65535),
    ]),
    productNeedPreparation: new FormControl(false, [
      Validators.min(0),
      Validators.max(1),
    ]),
    productSection: new FormControl('', [Validators.maxLength(30)]),
    composedProduct: new FormControl(false, [
      Validators.min(0),
      Validators.max(1),
    ]),
  });

  recipeForm = new FormGroup({
    basicProductId: new FormControl(null, [
      Validators.required,
      Validators.max(999999999),
    ]),
    amountUsed: new FormControl(null, [
      Validators.required,
      Validators.max(999999999),
      Validators.min(1),
    ]),
  });

  sections: Sections[] = [];

  isProduct(data: Products | Sections): data is Products {
    return (data as Products).name !== undefined;
  }

  constructor(
    protected override dialog: MatDialog,
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private sectionService: SectionService,
    private basicProductService: BasicProductService,
    private recipeService: RecipeService
  ) {
    super(dialog);
  }

  override ngOnInit() {
    this.sectionService.findAll().subscribe((sections: Sections[]) => {
      this.sections = sections;
    });
    this.basicProductService
      .findAll()
      .subscribe((basicProducts: BasicProducts[]) => {
        this.basicProducts = basicProducts;
      });
    if (this.isProduct(this.dataSource.data)) {
      this.recipeService
        .findManyBy(this.dataSource.data._id)
        .subscribe((recipes: Recipes[]) => {
          this.recipes = recipes;
        });
      this.productForm.setValue({
        productName: this.dataSource.data.name || '',
        productPriceSold: this.dataSource.data.price_sold || 0,
        productPriceBought: this.dataSource.data.price_bought || 0,
        productAmount: this.dataSource.data.amount || 0,
        productNeedPreparation: this.dataSource.data.need_preparation || false,
        productSection: this.dataSource.data.section || '',
        composedProduct: this.dataSource.data.price_sold === -1,
      });
    }
  }

  productDialogResponse() {
    if (this.productForm.invalid) return;

    const isComposed = getValueForm(this.productForm.value.composedProduct);
    let priceSold = getValueForm(this.productForm.value.productPriceSold);

    if (!isComposed && priceSold === -1) {
      showResponseDialog(
        this.snackBar,
        true,
        'Le prix de vente ne peut pas être à -1'
      );
      return;
    }

    priceSold = isComposed ? -1 : 0;
    const name: string = getValueForm(this.productForm.value.productName);
    const priceBought: number = getValueForm(
      this.productForm.value.productPriceBought
    );
    const amount: number = getValueForm(this.productForm.value.productAmount);
    const needPreparation: boolean = getValueForm(
      this.productForm.value.productNeedPreparation
    );
    const section: string | null = this.productForm.value.productSection
      ? this.productForm.value.productSection
      : null;
    const idData = !this.isProduct(this.dataSource.data)
      ? -1
      : this.dataSource.data._id;
    const product: Products = {
      _id: idData,
      name: name,
      price_bought: priceBought,
      price_sold: priceSold,
      section: section,
      amount: amount,
      need_preparation: needPreparation,
    };

    for (let id of this.deleteRecipes)
      this.recipeService.delete(idData, id).subscribe();
    console.log(this.dataSource.data);
    console.log(this.isProduct(this.dataSource.data));
    if (this.dataSource.data && this.isProduct(this.dataSource.data)) {
      this.modifyProduct(product);
    } else {
      this.addProduct(product);
    }
  }

  deleteProduct = (product: any[]): void => {
    if (product === undefined || null) return;
    this.productService.delete(product.toString()).subscribe((data) => {
      showResponseDialog(
        this.snackBar,
        data,
        'Le produit a bien été supprimé',
        "Une erreur s'est produit",
        "Une erreur s'est produit"
      );
      this.closeAllDialog();
    });
  };

  // addRecipe(): void {
  //   if (this.recipeForm.invalid)
  //     return
  //   const recipe: Recipes = {
  //     product_id: typeof this.dataSource.data !== 'string' ? this.dataSource.data.id : null,
  //     basic_product_id: Number(getValueForm(this.recipeForm.value.basicProductId)),
  //     amountUsed: Number(getValueForm(this.recipeForm.value.amountUsed)),
  //   }
  //   if (!this.basicProducts.some((bp: BasicProducts) => bp.id === recipe.basic_product_id))
  //     return
  //   let found = this.recipes.find((r: Recipes) => r.basic_product_id === recipe.basic_product_id)
  //   found
  //     ? found.amountUsed = recipe.amountUsed
  //     : this.recipes.push(recipe)
  //   console.log(this.recipes)
  //   this.deleteRecipes = this.deleteRecipes.filter((id: number) => id !== recipe.basic_product_id)
  // }

  // deleteRecipe(product_id: number): void {
  //   this.recipes = this.recipes.filter((recipe: Recipes) => recipe.basic_product_id !== product_id)
  //   this.deleteRecipes.push(product_id)
  // }

  getNameBasicProduct(product_id: number): string {
    const found = this.basicProducts.find(
      (basicProd: BasicProducts) => basicProd._id === product_id
    );
    return found ? found.name : 'Error';
  }

  private addProduct(product: Products): void {
    // if (product.price_sold === -1)
    //   this.upsertRecipes()
    this.productService.insert(product).subscribe(() => this.closeAllDialog());
  }

  private modifyProduct(product: Products): void {
    // if (product.price_sold === -1)
    //   this.upsertRecipes()
    this.productService.update(product).subscribe(() => this.closeAllDialog());
  }

  // private upsertRecipes(): void {
  //   for (let recipe of this.recipes) {
  //     this.recipeService.upsert(recipe).subscribe()
  //   }
  // }
}

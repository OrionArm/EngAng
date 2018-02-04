import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule, MatSortModule, MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,

  ],
  declarations: [],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
  ]
})
export class AppMaterialModule { }

//
//   CdkTableModule,
//   MatAutocompleteModule,
//   MatButtonToggleModule,
//   MatChipsModule,
//   MatStepperModule,
//   MatDatepickerModule,
//   MatDialogModule,
//   MatExpansionModule,
//   MatMenuModule,
//   MatNativeDateModule,
//   MatPaginatorModule,
//   MatProgressBarModule,
//   MatRippleModule,
//   MatSliderModule,
//   MatSlideToggleModule,
//   MatSnackBarModule,
//
//   MatTooltipModule,

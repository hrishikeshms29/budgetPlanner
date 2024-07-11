import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatIconModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  expenseForm!: FormGroup;
  selectedMonth: string;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  expenseTypes: string[] = ['Rent', 'Groceries', 'Utilities', 'Entertainment', 'Transportation', 'Insurance', 'Medical', 'Others'];
  monthSelected = false; // Add this line

  januaryExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 1000, expenseDate: '2024-01-15' },
    { expenseType: 'Groceries', expenseAmount: 500, expenseDate: '2024-01-22' },
  ];
  februaryExpense: any[] = [
    { expenseType: 'Utilities', expenseAmount: 200, expenseDate: '2024-02-05' },
    { expenseType: 'Groceries', expenseAmount: 400, expenseDate: '2024-02-18' }
  ];
  marchExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 1100, expenseDate: '2024-03-10' },
    { expenseType: 'Utilities', expenseAmount: 250, expenseDate: '2024-03-27' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = this.getMonthName(new Date().getMonth());
    this.createForm();
  }

  createForm() {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required],
      expenseDate: ['', Validators.required]
    });
  }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.expenseForm.reset();
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.expenseForm.patchValue({ month: this.selectedMonth });
    this.getFilteredExpenses();
    this.monthSelected = event.target.value !== ''; // Update this line
  }

  getFilteredExpenses(): any[] {
    switch (this.selectedMonth) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      default:
        return [];
    }
  }

  
  calculateTotalExpense(month: string): number {
    return this.getFilteredExpenses().reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }

  saveForm() {
    console.log('Form saved!');
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

  private getMonthName(monthIndex: number): string {
    return this.months[monthIndex];
  }
}

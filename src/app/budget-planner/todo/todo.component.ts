import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  todoForm: any;
  selectedMonth: any;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  januaryExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1000 },
    { expenseType: 'Light Bills', expenseAmount: 500 },
];

februaryExpense: any[] = [
    { expenseType: 'Essentials', expenseAmount: 200 },
    { expenseType: 'Light Bills', expenseAmount: 400 }
];

marchExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1100 },
    { expenseType: 'Essentials', expenseAmount: 250 }
];

aprilExpense: any[] = [
    { expenseType: 'Groceries', expenseAmount: 800 },
    { expenseType: 'Transportation', expenseAmount: 300 }
];

mayExpense: any[] = [
    { expenseType: 'Dining Out', expenseAmount: 500 },
    { expenseType: 'Entertainment', expenseAmount: 200 }
];

juneExpense: any[] = [
    { expenseType: 'Shopping', expenseAmount: 600 },
    { expenseType: 'Utilities', expenseAmount: 350 }
];

julyExpense: any[] = [
    { expenseType: 'Medical', expenseAmount: 400 },
    { expenseType: 'Insurance', expenseAmount: 150 }
];

augustExpense: any[] = [
    { expenseType: 'Vacation', expenseAmount: 1200 },
    { expenseType: 'Miscellaneous', expenseAmount: 180 }
];

septemberExpense: any[] = [
    { expenseType: 'Education', expenseAmount: 700 },
    { expenseType: 'Charity', expenseAmount: 100 }
];

octoberExpense: any[] = [
    { expenseType: 'Fitness', expenseAmount: 300 },
    { expenseType: 'Pet Care', expenseAmount: 80 }
];

novemberExpense: any[] = [
    { expenseType: 'Home Improvement', expenseAmount: 900 },
    { expenseType: 'Taxes', expenseAmount: 400 }
];

decemberExpense: any[] = [
    { expenseType: 'Gifts', expenseAmount: 600 },
    { expenseType: 'Holiday Expenses', expenseAmount: 300 }
];


  monthSelected: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    this.selectedMonth = currentMonth;
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  onSubmitExpense() {
    if (this.todoForm.valid) {
      const newExpense = this.todoForm.value;
      switch (this.selectedMonth) {
        case 'January':
          this.januaryExpense.push(newExpense);
          break;
        case 'February':
          this.februaryExpense.push(newExpense);
          break;
        case 'March':
          this.marchExpense.push(newExpense);
          break;
        default:
          break;
      }
      this.todoForm.reset();
      this.todoForm.patchValue({ month: '', expenseType: '', expenseAmount: '' });
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    let filteredExpense: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredExpense = [...this.januaryExpense];
        break;
      case 'February':
        filteredExpense = [...this.februaryExpense];
        break;
      case 'March':
        filteredExpense = [...this.marchExpense];
        break;
      default:
        break;
    }
    return filteredExpense;
  }

  calculateTotalExpense(month: string): number {
    let totalExpense = 0;
    for (const income of this.getFilteredExpenses()) {
      totalExpense += income.expenseAmount;
    }
    return totalExpense;
  }

  onSave() {
    if (this.todoForm.valid) {
      const incomeData = this.todoForm.value;
      this.todoForm.reset({ month: this.selectedMonth });
      this.getFilteredExpenses();
    }
  }

  saveForm() {
    console.log("Form saved!");
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

  toggleSelection(expense: any) {
    expense.selected = !expense.selected;
  }}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatIconModule,SideNavComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {todoForm!: FormGroup;
  selectedMonth: string;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Define expenses for all months
  expenses: any = {
    January: [
      { expenseType: 'Recharge', expenseAmount: 1000 },
      { expenseType: 'Light Bills', expenseAmount: 500 },
    ],
    February: [
      { expenseType: 'Essentials', expenseAmount: 200 },
      { expenseType: 'Light Bills', expenseAmount: 400 }
    ],
    March: [
      { expenseType: 'Recharge', expenseAmount: 1100 },
      { expenseType: 'Essentials', expenseAmount: 250 }
    ],
    April: [
      { expenseType: 'Rent', expenseAmount: 1200 },
      { expenseType: 'Groceries', expenseAmount: 300 }
    ],
    May: [
      { expenseType: 'Utilities', expenseAmount: 900 },
      { expenseType: 'Groceries', expenseAmount: 350 }
    ],
    June: [
      { expenseType: 'Rent', expenseAmount: 1000 },
      { expenseType: 'Light Bills', expenseAmount: 400 }
    ],
    July: [
      { expenseType: 'Recharge', expenseAmount: 950 },
      { expenseType: 'Essentials', expenseAmount: 200 }
    ],
    August: [
      { expenseType: 'Rent', expenseAmount: 1100 },
      { expenseType: 'Utilities', expenseAmount: 300 }
    ],
    September: [
      { expenseType: 'Groceries', expenseAmount: 400 },
      { expenseType: 'Light Bills', expenseAmount: 350 }
    ],
    October: [
      { expenseType: 'Rent', expenseAmount: 1050 },
      { expenseType: 'Essentials', expenseAmount: 250 }
    ],
    November: [
      { expenseType: 'Utilities', expenseAmount: 800 },
      { expenseType: 'Light Bills', expenseAmount: 400 }
    ],
    December: [
      { expenseType: 'Recharge', expenseAmount: 1150 },
      { expenseType: 'Groceries', expenseAmount: 300 }
    ]
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = this.getMonthName(new Date().getMonth());
    this.createForm();
  }

  createForm() {
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  onSubmitExpense() {
    if (this.todoForm.valid) {
      const newExpense = this.todoForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.todoForm.reset();
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    return this.expenses[this.selectedMonth];
  }

  calculateTotalExpense(month: string): number {
    return this.expenses[month].reduce((acc: number, curr: any) => acc + curr.expenseAmount, 0);
  }

  onSave() {
    if (this.todoForm.valid) {
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

  private getMonthName(monthIndex: number): string {
    return this.months[monthIndex];
  }
}

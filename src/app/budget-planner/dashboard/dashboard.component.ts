import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {lastMonthsIncome: string[] = [];
  currentMonthIncome: string = '$2000';

  lastMonthsExpense: string[] = [];
  currentMonthExpense: string = '$1500';

  todoTransactions = [
    { description: 'Pay electricity bill' },
    { description: 'Submit monthly report' },
    { description: 'Buy groceries' },
    { description: 'Call insurance company' }
  ];

  totalCurrentMonthIncome = 2000;
  totalCurrentMonthExpense = 1500;

  constructor(public router: Router) {
    this.populateLastMonthsData();
  }

  onIncome() {
    this.router.navigate(['/budget-planner/income']);
  }

  onExpense() {
    this.router.navigate(['/budget-planner/expense']);
  }

  onTodo() {
    this.router.navigate(['/budget-planner/todo']);
  }

  get currentMonthSavings(): number {
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }

  populateLastMonthsData() {
    const today = new Date();
    for (let i = 3; i > 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = formatDate(date, 'MMMM', 'en-US');
      this.lastMonthsIncome.push(`${monthName}: $${Math.floor(Math.random() * 2000)}`);
      this.lastMonthsExpense.push(`${monthName}: $${Math.floor(Math.random() * 1500)}`);
    }
    this.currentMonthIncome = `$${Math.floor(Math.random() * 2000)}`;
    this.currentMonthExpense = `$${Math.floor(Math.random() * 1500)}`;
  }
}
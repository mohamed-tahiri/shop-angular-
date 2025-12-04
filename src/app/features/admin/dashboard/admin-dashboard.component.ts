import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AdminSelectors from '../../../state/admin/admin.selectors';
import * as AdminActions from '../../../state/admin/admin.actions';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from '../../../shared/components/UI/page-wrappe/page-wrapper.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    CommonModule, 
    PageWrapperComponent,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './admin-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent implements OnInit {
  store = inject(Store);

  stats$ = this.store.select(AdminSelectors.selectAdminStats);
  loading$ = this.store.select(AdminSelectors.selectAdminLoading);
  error$ = this.store.select(AdminSelectors.selectAdminError);

  ngOnInit(): void {
    this.store.dispatch(AdminActions.loadStats());
  }
}

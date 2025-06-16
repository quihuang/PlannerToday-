import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  constructor(private auth: AuthService, private router: Router) {}

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}

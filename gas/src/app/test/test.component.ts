import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-test',
  imports: [ButtonModule],
  standalone:true,
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
}

import { Component, Input } from '@angular/core';
import { Todo } from '../../utils/types';
import { TitleCasePipe } from '@angular/common';
import { CapitalizeFirstPipe } from '../../utils/capitalize-first.pipe';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [CapitalizeFirstPipe],
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent {
  @Input() todo!: Todo;
}

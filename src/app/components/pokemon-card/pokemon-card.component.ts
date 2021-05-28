import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/pokemon-types';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() poke: Pokemon;
  @Input() animateFadeout: boolean = false;
  @Input() buttonClass = '';
  @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
  onPrimaryButtonClick() {
    this.buttonClicked.emit();
  }
}

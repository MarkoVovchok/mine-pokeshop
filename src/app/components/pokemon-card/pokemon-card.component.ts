import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/pokemon-types';
import { PokemonService } from 'src/app/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements AfterViewInit {
  @Input() poke: Pokemon;
  @Input() animateFadeout: boolean = false;
  @Input() buttonClass = '';
  @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();
  private picSubscription = new Subscription();
  constructor(private pokemonService: PokemonService) {}

  ngAfterViewInit(): void {
    this.picSubscription = this.pokemonService
      .fetchPictureForPokemon(this.poke)
      .subscribe((url) => {
        this.poke.pic = url;
        this.picSubscription.unsubscribe();
      });
  }
  onPrimaryButtonClick() {
    this.buttonClicked.emit();
  }
}

import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html'})
export class SearchInput {

  emitSearch = output<string>();
  placeholder = input('Search');
  debounceTime = input<number>(1000);
  initialValue = input<string>('');
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  /*
  Este efecto se ejecuta cada vez que la señal inputValue cambia
  y emite el valor de la señal después de 1 segundo de inactividad
  Esto es útil para evitar que se emitan múltiples eventos de búsqueda
  cuando el usuario escribe rápidamente, y solo se emita el último valor


  Paso a paso:

  effect(...) se ejecuta inicialmente y cada vez que cambia una señal que lee dentro. En este caso lee this.inputValue(), así que queda pendiente de esa señal.
  Guarda el valor actual en value. Ese valor queda asociado a este intento de búsqueda.
  setTimeout programa la emisión para dentro de 1 segundo.
  Si el usuario escribe otra letra antes de que pase ese segundo, inputValue cambia y el efecto vuelve a ejecutarse.
  Antes de volver a ejecutarse, Angular llama a onCleanup; clearTimeout(timeout) cancela el temporizador anterior.
  El nuevo efecto toma el texto actualizado y empieza a contar otro segundo.
  Si pasa un segundo sin más cambios, el temporizador no se cancela y se ejecuta emitSearch.emit(value).
  Por ejemplo, si escribes Chile rápidamente, cada letra reinicia la espera. Cuando dejas de escribir, espera un segundo y emite Chile.
  */
  debounceEffect = effect((onCleanup) => {
    // Se obtiene el valor actual de la señal inputValue
    const value = this.inputValue();
    // Se crea un timeout que se ejecuta después de 1 segundo
    const timeout = setTimeout(() => {
      this.emitSearch.emit(value);
    }, this.debounceTime());
    // Se limpia el timeout cuando el efecto se 
    // vuelve a ejecutar o se destruye el componente 
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

}

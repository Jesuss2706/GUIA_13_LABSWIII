import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { EstadoSilla, FilaVista, Silla } from '../../../../core/models';
import { PASILLO_DESPUES_DE } from '../../../../core/data/sala.data';

const COLOR_POR_ESTADO: Record<EstadoSilla, string> = {
  libre: 'var(--silla-libre)',
  seleccionada: 'var(--silla-seleccionada)',
  ocupada: 'var(--silla-ocupada)',
};

const TEXTO_ESTADO: Record<EstadoSilla, string> = {
  libre: 'libre',
  seleccionada: 'seleccionada',
  ocupada: 'ocupada',
};

/**
 * Componente que recibe datos por input() y avisa por output().
 * Nunca modifica el estado por sí mismo.
 */
@Component({
  selector: 'app-silla',
  templateUrl: './silla.html',
  styleUrl: './silla.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SillaComponent {
  readonly fila = input.required<FilaVista>();
  readonly sillaAlternada = output<string>();

  protected readonly pasilloDespuesDe = PASILLO_DESPUES_DE;

  /** Color derivado automáticamente del estado. */
  readonly xxxx = computed(() =>xxxx);

  readonly xxxx = computed(() => xxxx);

  protected notificar(): void {
    xxxx;
  }
}

import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { EstadoSilla, Silla } from '../../../../core/models';

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
  readonly silla = input.required<Silla>();
  readonly estado = input.required<EstadoSilla>();

  readonly alternar = output<string>();

  /** Color derivado automáticamente del estado. */
  readonly color = computed(() => COLOR_POR_ESTADO[this.estado()]);

  readonly etiqueta = computed(() => {
    const s = this.silla();
    return `Silla ${s.id}, ${s.tipo}, ${TEXTO_ESTADO[this.estado()]}`;
  });

  protected notificar(): void {
    this.alternar.emit(this.silla().id);
  }
}

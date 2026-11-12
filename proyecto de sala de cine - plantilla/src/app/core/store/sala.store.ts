import { Injectable, computed, inject, signal } from '@angular/core';
import { PELICULAS } from '../data/peliculas.data';
import { EstadoSilla, FilaVista, Silla, SillaVista } from '../models';
import { SalaAccion } from './sala.actions';
import { SalaEfectos } from './sala.effects';
import { estadoInicial, salaReducer } from './sala.reducer';

/**
 * Store único (Flux): guarda el estado en un signal y expone selectores
 * derivados con computed. El estado solo cambia a través de dispatch().
 */
@Injectable({ providedIn: 'root' })
export class SalaStore {
  private readonly efectos = inject(SalaEfectos);
  private readonly _estado = signal(estadoInicial);

  /** Estado de solo lectura: ningún componente puede escribirlo. */
  readonly estado = this._estado.asReadonly();

  // ---------- Selectores (computed) ----------
  readonly peliculas = PELICULAS;

  readonly peliculaActiva = computed(
    () => PELICULAS.find((p) => p.id === this._estado().peliculaActivaId)!,
  );

  private readonly idsOcupadas = computed(
    () => new Set(this._estado().ocupadasPorPelicula[this._estado().peliculaActivaId]),
  );

  private readonly idsSeleccionadas = computed(() => new Set(this._estado().seleccionadas));

  readonly sillasSeleccionadas = computed<Silla[]>(() => {
    const porId = new Map(this._estado().sillas.map((s) => [s.id, s]));
    return this._estado().seleccionadas.map((id) => porId.get(id)!);
  });

  readonly cantidadSeleccionadas = computed(() => this._estado().seleccionadas.length);

  readonly total = computed(() =>
    this.sillasSeleccionadas().reduce((suma, s) => suma + s.precio, 0),
  );

  readonly maxPorCompra = computed(() => this._estado().maxPorCompra);

  readonly cantidadDisponibles = computed(
    () => this._estado().sillas.length - this.idsOcupadas().size - this.cantidadSeleccionadas(),
  );

  /** Mapa de la sala agrupado por filas, con el estado de cada silla. */
  readonly filas = computed<FilaVista[]>(() => {
 xxxx});

  readonly estadoCompra = computed(() => this._estado().estadoCompra);
  readonly procesando = computed(() => this.estadoCompra() === 'procesando');
  readonly notificacion = computed(() => this._estado().notificacion);

  // ---------- Dispatcher ----------
  dispatch(accion: SalaAccion): void {
    this._estado.update((estado) => salaReducer(estado, accion));
    this.efectos.ejecutar(accion, this._estado(), (a) => this.dispatch(a));
  }
}

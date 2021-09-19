import reduce from 'lodash/reduce';
import { debounce } from 'lodash';
import { columnTypes, rowTypes } from '../store/storeTypes';
import DimensionStore from '../store/dimension/dimension.store';
import ViewportProvider from './viewport.provider';
import { RevoGrid } from '../interfaces';
import { getItemByIndex } from '../store/dimension/dimension.helpers';

export type ColumnItems = Record<RevoGrid.DimensionCols, RevoGrid.ColumnRegular[]>;

export type DimensionStores = { [T in RevoGrid.MultiDimensionType]: DimensionStore };
export type DimensionConfig = {
  realSizeChanged(k: RevoGrid.MultiDimensionType): void;
};
export default class DimensionProvider {
  readonly stores: DimensionStores;
  constructor(private viewports: ViewportProvider, config: DimensionConfig) {
    const sizeChanged = debounce((k: RevoGrid.MultiDimensionType) => config.realSizeChanged(k), 100);
    this.stores = reduce(
      [...rowTypes, ...columnTypes],
      (sources: Partial<DimensionStores>, k: RevoGrid.MultiDimensionType) => {
        sources[k] = new DimensionStore();
        sources[k].store.onChange('realSize', () => sizeChanged(k));
        return sources;
      },
      {},
    ) as DimensionStores;
  }

  setDimensionSize(dimensionType: RevoGrid.MultiDimensionType, sizes: RevoGrid.ViewSettingSizeProp): void {
    this.stores[dimensionType].setDimensionSize(sizes);
    this.viewports.stores[dimensionType].setViewPortDimension(sizes);
  }

  setRealSize(realCount: number, type: RevoGrid.MultiDimensionType): void {
    this.viewports.stores[type].setViewport({ realCount });
    this.stores[type].setRealSize(realCount);
  }

  /**
   * Sets dimension data and view port coordinate
   * @param items - data/column items
   * @param type - dimension type
   */
  setData(items: RevoGrid.ColumnRegular[] | RevoGrid.DataType[], type: RevoGrid.MultiDimensionType, noVirtual = false) {
    this.setRealSize(items.length, type);
    if (noVirtual) {
      this.setNoVirtual(type);
    }
    this.setViewPortCoordinate({
      coordinate: this.viewports.stores[type].store.get('lastCoordinate'),
      type,
    });
  }

  private setNoVirtual(type: RevoGrid.MultiDimensionType) {
    const dimension: RevoGrid.DimensionSettingsState = this.stores[type].getCurrentState();
    this.viewports.stores[type].setViewport({ virtualSize: dimension.realSize });
  }

  drop() {
    for (let type of columnTypes) {
      this.stores[type].drop();
    }
  }

  getFullSize(): { x: number; y: number } {
    let x = 0;
    let y = 0;
    for (let type of columnTypes) {
      x += this.stores[type]?.store.get('realSize') || 0;
    }
    for (let type of rowTypes) {
      y += this.stores[type]?.store.get('realSize') || 0;
    }
    return { y, x };
  }

  setColumns(type: RevoGrid.MultiDimensionType, sizes?: RevoGrid.ViewSettingSizeProp, noVirtual = false): void {
    this.stores[type].setDimensionSize(sizes);

    if (noVirtual) {
      this.setNoVirtual(type);
    }
    this.setViewPortCoordinate({
      coordinate: this.viewports.stores[type].store.get('lastCoordinate'),
      type,
    });
  }

  setViewPortCoordinate({ coordinate, type }: { coordinate: number; type: RevoGrid.MultiDimensionType }): void {
    const dimension: RevoGrid.DimensionSettingsState = this.stores[type].getCurrentState();
    this.viewports.stores[type].setViewPortCoordinate(coordinate, dimension);
  }

  getViewPortPos(e: RevoGrid.ViewPortScrollEvent): number {
    const dimension: RevoGrid.DimensionSettingsState = this.stores[e.dimension].getCurrentState();
    const item = getItemByIndex(dimension, e.coordinate);

    return item.start;
  }

  setSettings(data: Partial<RevoGrid.DimensionSettingsState>, dimensionType: RevoGrid.DimensionType): void {
    let stores: RevoGrid.MultiDimensionType[] = [];
    switch (dimensionType) {
      case 'rgCol':
        stores = columnTypes;
        break;
      case 'rgRow':
        stores = rowTypes;
        break;
    }
    for (let s of stores) {
      this.stores[s].setStore(data);
    }
  }
}

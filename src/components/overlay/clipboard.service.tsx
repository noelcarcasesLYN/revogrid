import { h } from '@stencil/core';
import SelectionStoreService from '../../store/selection/selection.store.service';
import { Observable, RevoGrid, Selection } from '../../interfaces';
import { getRange } from '../../store/selection/selection.helpers';
import ColumnService from '../data/columnService';
import { DataSourceState } from '../../store/dataSource/data.store';

type Config = {
  selectionStoreService: SelectionStoreService;
  columnService: ColumnService;
  dataStore: Observable<DataSourceState<RevoGrid.DataType, RevoGrid.DimensionRows>>;
  onRangeApply(data: RevoGrid.DataLookup, range: Selection.RangeArea): void;
  onRangeCopy(range: Selection.RangeArea): any;
  beforeCopy(range: Selection.RangeArea): CustomEvent;
  beforePaste(data: RevoGrid.DataLookup, range: Selection.RangeArea): CustomEvent;
};

export class ClipboardService {
  private clipboard: HTMLRevogrClipboardElement;
  constructor(private sv: Config) {}

  renderClipboard() {
    return <revogr-clipboard
      onCopyRegion={e => this.onCopy(e.detail)}
      ref={e => (this.clipboard = e)}
      onPasteRegion={e => this.onPaste(e.detail)} />;
  }
  private onCopy(e: DataTransfer) {
    const focus = this.sv.selectionStoreService.focused;
    let range = this.sv.selectionStoreService.ranged;
    if (!range) {
      range = getRange(focus, focus);
    }
    const canCopy = this.sv.beforeCopy(range);
    if (canCopy.defaultPrevented) {
      return false;
    }
    const data = this.sv.onRangeCopy(range);
    this.clipboard.doCopy(e, data);
    return true;
  }

  private onPaste(data: string[][]) {
    const focus = this.sv.selectionStoreService.focused;
    const isEditing = this.sv.selectionStoreService.edited !== null;
    if (!focus || isEditing) {
      return;
    }
    let { changed, range } = this.sv.columnService.getTransformedDataToApply(focus, data);
    const { defaultPrevented: canPaste } = this.sv.beforePaste(changed, range);
    if (canPaste) {
      return;
    }
    this.sv.onRangeApply(changed, range);
  }
}

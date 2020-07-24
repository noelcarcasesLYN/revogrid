/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ColumnData, DataType, DimensionSettingsState, InitialSettings, MultiDimensionAction } from "./interfaces";
export namespace Components {
    interface RevoGrid {
        "columns": ColumnData;
        "dimensions": Partial<MultiDimensionAction>;
        "settings": InitialSettings;
        "source": DataType[];
    }
    interface RevogrData {
    }
    interface RevogrEdit {
    }
    interface RevogrHeader {
    }
    interface RevogrOverlaySelection {
        "range": boolean;
    }
    interface RevogrTextEditor {
        "value": string;
    }
    interface RevogrViewportScrollable {
        "scrollX": (x?: number) => Promise<void>;
        "scrollY": (y?: number) => Promise<void>;
    }
}
declare global {
    interface HTMLRevoGridElement extends Components.RevoGrid, HTMLStencilElement {
    }
    var HTMLRevoGridElement: {
        prototype: HTMLRevoGridElement;
        new (): HTMLRevoGridElement;
    };
    interface HTMLRevogrDataElement extends Components.RevogrData, HTMLStencilElement {
    }
    var HTMLRevogrDataElement: {
        prototype: HTMLRevogrDataElement;
        new (): HTMLRevogrDataElement;
    };
    interface HTMLRevogrEditElement extends Components.RevogrEdit, HTMLStencilElement {
    }
    var HTMLRevogrEditElement: {
        prototype: HTMLRevogrEditElement;
        new (): HTMLRevogrEditElement;
    };
    interface HTMLRevogrHeaderElement extends Components.RevogrHeader, HTMLStencilElement {
    }
    var HTMLRevogrHeaderElement: {
        prototype: HTMLRevogrHeaderElement;
        new (): HTMLRevogrHeaderElement;
    };
    interface HTMLRevogrOverlaySelectionElement extends Components.RevogrOverlaySelection, HTMLStencilElement {
    }
    var HTMLRevogrOverlaySelectionElement: {
        prototype: HTMLRevogrOverlaySelectionElement;
        new (): HTMLRevogrOverlaySelectionElement;
    };
    interface HTMLRevogrTextEditorElement extends Components.RevogrTextEditor, HTMLStencilElement {
    }
    var HTMLRevogrTextEditorElement: {
        prototype: HTMLRevogrTextEditorElement;
        new (): HTMLRevogrTextEditorElement;
    };
    interface HTMLRevogrViewportScrollableElement extends Components.RevogrViewportScrollable, HTMLStencilElement {
    }
    var HTMLRevogrViewportScrollableElement: {
        prototype: HTMLRevogrViewportScrollableElement;
        new (): HTMLRevogrViewportScrollableElement;
    };
    interface HTMLElementTagNameMap {
        "revo-grid": HTMLRevoGridElement;
        "revogr-data": HTMLRevogrDataElement;
        "revogr-edit": HTMLRevogrEditElement;
        "revogr-header": HTMLRevogrHeaderElement;
        "revogr-overlay-selection": HTMLRevogrOverlaySelectionElement;
        "revogr-text-editor": HTMLRevogrTextEditorElement;
        "revogr-viewport-scrollable": HTMLRevogrViewportScrollableElement;
    }
}
declare namespace LocalJSX {
    interface RevoGrid {
        "columns"?: ColumnData;
        "dimensions"?: Partial<MultiDimensionAction>;
        "settings"?: InitialSettings;
        "source"?: DataType[];
    }
    interface RevogrData {
    }
    interface RevogrEdit {
    }
    interface RevogrHeader {
    }
    interface RevogrOverlaySelection {
        "range"?: boolean;
    }
    interface RevogrTextEditor {
        "onSave"?: (event: CustomEvent<string>) => void;
        "value"?: string;
    }
    interface RevogrViewportScrollable {
    }
    interface IntrinsicElements {
        "revo-grid": RevoGrid;
        "revogr-data": RevogrData;
        "revogr-edit": RevogrEdit;
        "revogr-header": RevogrHeader;
        "revogr-overlay-selection": RevogrOverlaySelection;
        "revogr-text-editor": RevogrTextEditor;
        "revogr-viewport-scrollable": RevogrViewportScrollable;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "revo-grid": LocalJSX.RevoGrid & JSXBase.HTMLAttributes<HTMLRevoGridElement>;
            "revogr-data": LocalJSX.RevogrData & JSXBase.HTMLAttributes<HTMLRevogrDataElement>;
            "revogr-edit": LocalJSX.RevogrEdit & JSXBase.HTMLAttributes<HTMLRevogrEditElement>;
            "revogr-header": LocalJSX.RevogrHeader & JSXBase.HTMLAttributes<HTMLRevogrHeaderElement>;
            "revogr-overlay-selection": LocalJSX.RevogrOverlaySelection & JSXBase.HTMLAttributes<HTMLRevogrOverlaySelectionElement>;
            "revogr-text-editor": LocalJSX.RevogrTextEditor & JSXBase.HTMLAttributes<HTMLRevogrTextEditorElement>;
            "revogr-viewport-scrollable": LocalJSX.RevogrViewportScrollable & JSXBase.HTMLAttributes<HTMLRevogrViewportScrollableElement>;
        }
    }
}

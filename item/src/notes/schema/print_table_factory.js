/**
 * Create a printable table view.
 */
import cloneView from 'cdlo_components/notes/schema/clone_view';

import { PRINT_TABLE_RENDERER } from 'cdlo_components/notes/renderers/print_table_renderer';

export default view => cloneView(view, PRINT_TABLE_RENDERER);

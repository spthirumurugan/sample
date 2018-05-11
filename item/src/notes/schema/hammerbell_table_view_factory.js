
// Move
import { PRINT_TABLE_RENDERER } from 'cdlo_components/notes/renderers/print_table_renderer';
import { TABLE_RENDERER } from 'cdlo_components/notes/renderers/table_renderer';

import filterFactory from 'cdlo_components/notes/schema/view_filter_factory';
import viewFactory from 'cdlo_components/notes/schema/view_factory';
import hammerbellDataSchemaFactory from './hammerbell_data_schema_factory';

const schema = hammerbellDataSchemaFactory();
const filter = filterFactory();
filter.selectable = true;

export default runId => viewFactory(runId, schema, PRINT_TABLE_RENDERER, TABLE_RENDERER, filter);

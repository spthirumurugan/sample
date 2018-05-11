/**
 * This is a cdlo level map of components that can be used to render particular
 * views.
 *
 * Within state.notes we define view objects, these view objects are used to
 * describe how to visualise the data collected by the student. Views define a
 * renderer property, this Map maps that property to a Renderer component,
 * examples could be a Table, Graph, D3 Map etc.
 */
// import TableRenderer, { TABLE_RENDERER } from 'cdlo_components/notes/renderers/table_renderer';
// import PrintTableRenderer, { PRINT_TABLE_RENDERER } from 'cdlo_components/notes/renderers/print_table_renderer';
import ImageRenderer, { IMAGE_RENDERER } from 'cdlo_components/notes/renderers/image_renderer';
import TableRenderer, { TABLE_RENDERER } from '../../experiment/components/custome_table/table_renderer';
import PrintTableRenderer, { PRINT_TABLE_RENDERER } from '../../experiment/components/custome_table/print_table_renderer';
import GraphRenderer, { GRAPH_RENDERER } from '../../experiment/components/bar_graph/graph_renderer';

const rendererMap = new Map();

// Create your mappings
rendererMap.set(TABLE_RENDERER, TableRenderer);
rendererMap.set(GRAPH_RENDERER, GraphRenderer);
rendererMap.set(PRINT_TABLE_RENDERER, PrintTableRenderer);
rendererMap.set(IMAGE_RENDERER, ImageRenderer);

export default rendererMap;

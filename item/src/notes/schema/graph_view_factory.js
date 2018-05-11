import cloneView from 'cdlo_components/notes/schema/clone_view';
// Renderers all should be have a RENDERER_NAME constant defined.
import { GRAPH_RENDERER } from 'cdlo_components/notes/renderers/graph_renderer';

export default view => cloneView(view, GRAPH_RENDERER);

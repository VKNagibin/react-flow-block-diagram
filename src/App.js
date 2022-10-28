import ReactFlow, {
    Controls,
    Background,
    MiniMap,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    ReactFlowProvider,
} from "reactflow";
import {
    AppWrapper,
    WorkingAreaWrapper,
    FlowContainer,
    ComponentsArea
} from "./styled/App";
import 'reactflow/dist/style.css';
import {useState, useCallback, useRef} from 'react';
import './App.css'
import ImportModal from "./components/ImportModal";
import ChartHeading from "./components/ChartHeading";
import FiguresList from "./components/FiguresList";
import ImageNode from "./nodeTypes/ImageNode";
import {defaultEdge} from "./edgeTypes";

const nodeTypes = { imageNode: ImageNode };
const initialTitle = 'FlowChartName';

function App() {
    const [chartName, setChartName] = useState(initialTitle);
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [
        reactFlowInstance,
        setReactFlowInstance,
    ] = useState(null);

    const getId = () => {
        return `dndnode_${nodes.length + 1}`;
    }

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }, []);

    const onNodesChange = (changes) => setNodes((nodes) => applyNodeChanges(changes, nodes));
    const onEdgesChange = (changes) => setEdges((edges) => applyEdgeChanges(changes, edges));

    const onConnect = (params) => setEdges((edges) => addEdge(params, edges));

    const handleExport = () => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            const FileSaver = require('file-saver');
            const json = JSON.stringify(flow)
            const file = new File([json], `${chartName}.rffc`, {type: "application/json"});
            FileSaver.saveAs(file);
        }
    }

    const setText = function(content) {
        this.content = content;
    }

    const onDrop = (event) => {
            event.preventDefault();
            const reactFlowBounds =
                reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');
            const src = event.dataTransfer.getData('data/src');
            const translation = event.dataTransfer.getData('data/translation');
            const textArea = event.dataTransfer.getData('data/textAreaSize');

            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { src, textArea, translation, setText: setText, content: ''},
            };

            setNodes((nds) => nds.concat(newNode));
        };

    const changeChartName = (content) => {
        setChartName(content)
    }

    const changeRFInstance = (newInstance) => {
        const flow = newInstance;

        if (flow) {
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
        }

        setNodes(oldNodes => {
            return oldNodes.map(item => {
                return {
                    ...item,
                    data: {
                        ...item.data,
                        setText: setText
                    },
                }
            })
        })
    };

  return (
      <AppWrapper>
          <WorkingAreaWrapper>
                  <ChartHeading
                      changeHeading={changeChartName}
                      handleExport={handleExport}
                      title={chartName}
                      handleShowModal={() => setShowModal(true)}
                  />
              <ReactFlowProvider>
                  <FlowContainer ref={reactFlowWrapper}>
                      <ReactFlow
                          nodes={nodes}
                          onNodesChange={onNodesChange}
                          onEdgesChange={onEdgesChange}
                          edges={edges}
                          defaultEdgeOptions={defaultEdge}
                          onInit={setReactFlowInstance}
                          onConnect={onConnect}
                          nodeTypes={nodeTypes}
                          onDragOver={onDragOver}
                          onDrop={onDrop}
                      >
                          <MiniMap />
                          <Background />
                          <Controls />
                      </ReactFlow>
                  </FlowContainer>
              </ReactFlowProvider>
          </WorkingAreaWrapper>
          <ComponentsArea>
              <FiguresList />
          </ComponentsArea>
          <ImportModal
              changeRFInstance={changeRFInstance}
              open={showModal}
              handleHideModal={() => setShowModal(false)}
          />
      </AppWrapper>
  );
}

export default App;

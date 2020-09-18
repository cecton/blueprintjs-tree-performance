import React from 'react';
import './App.css';
import { Classes, ITreeNode, Tree } from "@blueprintjs/core";

function App() {
  return (
    <div className="App bp3-dark">
	  <TreeExample />
    </div>
  );
}

export interface ITreeExampleState {
    nodes: ITreeNode[];
}

// use Component so it re-renders everytime: `nodes` are not a primitive type
// and therefore aren't included in shallow prop comparison
export class TreeExample extends React.Component<any, ITreeExampleState> {
    public state: ITreeExampleState = { nodes: INITIAL_STATE };

    public render() {
        return (
			<Tree
				contents={this.state.nodes}
				onNodeClick={this.handleNodeClick}
				onNodeCollapse={this.handleNodeCollapse}
				onNodeExpand={this.handleNodeExpand}
				className={Classes.ELEVATION_0}
			/>
        );
    }

    private handleNodeClick = (nodeData: ITreeNode, _nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
        nodeData.isSelected = !nodeData.isSelected
        this.setState(this.state);
    };

    private handleNodeCollapse = (nodeData: ITreeNode) => {
        nodeData.isExpanded = false;
        this.setState(this.state);
    };

    private handleNodeExpand = (nodeData: ITreeNode) => {
        nodeData.isExpanded = true;
        this.setState(this.state);
    };

    private forEachNode(nodes: ITreeNode[], callback: (node: ITreeNode) => void) {
        if (nodes == null) {
            return;
        }

        for (const node of nodes) {
            callback(node);
            this.forEachNode(node.childNodes!, callback);
        }
    }
}

const INITIAL_STATE: ITreeNode[] = [];

for(let i = 0; i < 100; i++) {
	let directory: any = {
        id: i * 100,
        hasCaret: true,
        icon: "folder-close",
        label: `Directory ${i + 1}`,
		childNodes: [],
    };
	for(let j = 0; j < 100; j++) {
		directory.childNodes.push({
			id: i * 100 + j,
			icon: "document",
			label: `File ${j + 1}`,
		} as ITreeNode);
	}
	INITIAL_STATE.push(directory as any);
}

export default App;

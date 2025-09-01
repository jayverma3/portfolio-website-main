import React, { useState, useEffect, useCallback } from 'react';
import Tree from 'react-d3-tree';
import './InteractiveTree.css';
import initialData from '../../data/treeData.json';
import { motion, AnimatePresence } from 'framer-motion';
import TreeLogo from '../../assets/logos_pngs/tree-logo.svg';
import { v4 as uuidv4 } from 'uuid';

const CustomNode = ({ nodeDatum, toggleNode, onAddNode, onDeleteNode }) => (
  <g className="custom-node">
    <motion.circle
      r="30"
      fill={nodeDatum.children && nodeDatum.children.length > 0 ? "url(#grad-active)" : "url(#grad-inactive)"}
      stroke="#e94560"
      strokeWidth="2"
      onClick={toggleNode}
      whileHover={{ scale: 1.1 }}
    />
    <text fill="white" x="40" y="5" className="node-name">{nodeDatum.name}</text>
    <foreignObject x="-70" y="-15" width="60" height="30">
      <div className="node-actions-v2">
        <motion.button whileHover={{ scale: 1.2 }} className="node-action-btn-v2 add" onClick={() => onAddNode(nodeDatum)}>+</motion.button>
        <motion.button whileHover={{ scale: 1.2 }} className="node-action-btn-v2 delete" onClick={() => onDeleteNode(nodeDatum)}>×</motion.button>
      </div>
    </foreignObject>
  </g>
);

const InteractiveTree = () => {
  const [treeData, setTreeData] = useState(null);
  const [isTreeModalOpen, setIsTreeModalOpen] = useState(false);
  const [isAddNodeModalOpen, setIsAddNodeModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [newNodeName, setNewNodeName] = useState('');
  const [zoom, setZoom] = useState(0.8);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const savedTree = localStorage.getItem('interactiveTree');
    setTreeData(savedTree ? JSON.parse(savedTree) : { ...initialData, id: 'root' });
  }, []);

  useEffect(() => {
    if (treeData) {
      localStorage.setItem('interactiveTree', JSON.stringify(treeData));
    }
  }, [treeData]);

  const centerTree = useCallback(() => {
    if (isTreeModalOpen) {
      const dimensions = document.querySelector('.tree-modal-content-v2').getBoundingClientRect();
      setTranslate({ x: dimensions.width / 2, y: dimensions.height / 4 });
    }
  }, [isTreeModalOpen]);

  useEffect(() => {
    centerTree();
  }, [isTreeModalOpen, centerTree]);

  const openTreeModal = () => setIsTreeModalOpen(true);
  const closeTreeModal = () => setIsTreeModalOpen(false);

  const openAddNodeModal = (node) => {
    setSelectedNode(node);
    setIsAddNodeModalOpen(true);
  };

  const closeAddNodeModal = () => {
    setIsAddNodeModalOpen(false);
    setSelectedNode(null);
    setNewNodeName('');
  };

  const handleAddNode = () => {
    if (!newNodeName.trim() || !selectedNode) return;
    const newNode = { name: newNodeName, children: [], id: uuidv4() };
    const newTreeData = JSON.parse(JSON.stringify(treeData));
    const findAndAdd = (node) => {
      if (node.id === selectedNode.id) {
        node.children = [...(node.children || []), newNode];
        return true;
      }
      return node.children && node.children.some(findAndAdd);
    };
    findAndAdd(newTreeData);
    setTreeData(newTreeData);
    closeAddNodeModal();
  };

  const handleDeleteNode = (nodeToDelete) => {
    if (nodeToDelete.id === 'root') {
      alert("Cannot delete the root node.");
      return;
    }
    const newTreeData = JSON.parse(JSON.stringify(treeData));
    const findAndDelete = (node) => {
      if (!node.children) return false;
      const index = node.children.findIndex(child => child.id === nodeToDelete.id);
      if (index > -1) {
        node.children.splice(index, 1);
        return true;
      }
      return node.children.some(findAndDelete);
    };
    findAndDelete(newTreeData);
    setTreeData(newTreeData);
  };

  return (
    <div className="interactive-tree-container-v2">
      <motion.div className="logo-container-v2" onClick={openTreeModal} whileHover={{ scale: 1.05 }}>
        <img src={TreeLogo} alt="Tree Logo" />
        <h3>Interactive Mind Map</h3>
        <p>Click to build and explore your ideas</p>
      </motion.div>

      <AnimatePresence>
        {isTreeModalOpen && (
          <motion.div className="modal-backdrop-tree-v2" onClick={closeTreeModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="tree-modal-content-v2" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <div className="tree-controls-v2">
                <button onClick={() => setZoom(z => z + 0.2)}>+</button>
                <button onClick={() => setZoom(z => z - 0.2)}>-</button>
                <button onClick={centerTree}>Center</button>
              </div>
              <div className="tree-wrapper-v2">
                {treeData && (
                  <Tree
                    data={treeData}
                    orientation="vertical"
                    pathClassFunc={() => 'link-with-arrow'}
                    renderCustomNodeElement={(props) => <CustomNode {...props} onAddNode={openAddNodeModal} onDeleteNode={handleDeleteNode} />}
                    translate={translate}
                    zoom={zoom}
                    separation={{ siblings: 2, nonSiblings: 2.5 }}
                    nodeSize={{ x: 200, y: 100 }}
                  />
                )}
              </div>
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="grad-active" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e94560" />
                    <stop offset="100%" stopColor="#d43d51" />
                  </linearGradient>
                  <linearGradient id="grad-inactive" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4a4a5e" />
                    <stop offset="100%" stopColor="#3a3a4e" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAddNodeModalOpen && (
          <motion.div className="modal-backdrop-tree-v2 add-node-modal" onClick={closeAddNodeModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content-tree-v2" onClick={(e) => e.stopPropagation()} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
              <h3>Add a new idea to "{selectedNode?.name}"</h3>
              <input type="text" value={newNodeName} onChange={(e) => setNewNodeName(e.target.value)} placeholder="Enter idea..." />
              <button onClick={handleAddNode}>Create Node</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveTree;

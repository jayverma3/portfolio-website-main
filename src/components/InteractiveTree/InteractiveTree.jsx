import React, { useState, useEffect, useCallback, useRef } from 'react';
import Tree from 'react-d3-tree';
import './InteractiveTree.css';
import initialData from '../../data/treeData.json';
import { motion, AnimatePresence } from 'framer-motion';
import TreeLogo from '../../assets/logos_pngs/tree-logo.svg';
import { v4 as uuidv4 } from 'uuid';

// --- Helper function for immutable tree updates ---
const findAndModifyNode = (currentNode, targetId, action) => {
  if (currentNode.id === targetId) {
    return action(currentNode);
  }
  if (currentNode.children) {
    const newChildren = currentNode.children.map(child => findAndModifyNode(child, targetId, action));
    if (newChildren.some((child, index) => child !== currentNode.children[index])) {
      return { ...currentNode, children: newChildren };
    }
  }
  return currentNode;
};

// --- Custom Node Component ---
const CustomNode = ({ nodeDatum, toggleNode, onModalOpen, onDeleteNode }) => {
  const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;
  const isCollapsed = nodeDatum.__rd3t.collapsed;

  return (
    <foreignObject x="-125" y="-25" width="250" height="50">
      <motion.div 
        className="custom-node-wrapper"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="node-content" onClick={toggleNode}>
          <svg
            className={`node-icon ${!hasChildren ? 'hidden' : ''} ${isCollapsed ? 'collapsed' : ''}`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          </svg>
          <span className="node-name">{nodeDatum.name}</span>
        </div>
        <div className="node-actions">
          <button className="node-action-btn add" onClick={() => onModalOpen('add', nodeDatum)} title="Add child">+</button>
          <button className="node-action-btn edit" onClick={() => onModalOpen('edit', nodeDatum)} title="Edit node">✎</button>
          <button className="node-action-btn delete" onClick={() => onDeleteNode(nodeDatum)} title="Delete node">×</button>
        </div>
      </motion.div>
    </foreignObject>
  );
};

// --- Node Management Modal ---
const NodeModal = ({ isOpen, onClose, onSubmit, node, action }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (action === 'edit' && node) {
      setName(node.name);
    } else {
      setName('');
    }
  }, [isOpen, action, node]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name);
    }
  };

  if (!isOpen) return null;

  const title = action === 'edit'
    ? `Editing "${node?.name}"`
    : `Add a new idea to "${node?.name}"`;

  return (
    <motion.div className="modal-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="node-modal-content" onClick={(e) => e.stopPropagation()} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter idea..."
            autoFocus
          />
          <button type="submit">{action === 'edit' ? 'Save Changes' : 'Create Node'}</button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// --- Main InteractiveTree Component ---
const InteractiveTree = () => {
  const [treeData, setTreeData] = useState(null);
  const [isTreeModalOpen, setIsTreeModalOpen] = useState(false);
  const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ action: 'add', node: null });
  const [zoom, setZoom] = useState(0.6);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const treeWrapperRef = useRef(null);

  const centerTree = useCallback(() => {
    if (isTreeModalOpen && treeWrapperRef.current) {
      const { width, height } = treeWrapperRef.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 5 });
    }
  }, [isTreeModalOpen]);

  useEffect(() => {
    const savedTree = localStorage.getItem('interactiveTree');
    const initialTree = savedTree ? JSON.parse(savedTree) : { ...initialData, id: 'root' };
    setTreeData(initialTree);
  }, []);

  useEffect(() => {
    if (treeData) {
      localStorage.setItem('interactiveTree', JSON.stringify(treeData));
    }
  }, [treeData]);

  useEffect(() => {
    if (isTreeModalOpen) {
      setTimeout(centerTree, 50);
    }
  }, [isTreeModalOpen, centerTree]);

  const openModal = (action, node) => {
    setModalConfig({ action, node });
    setIsNodeModalOpen(true);
  };

  const closeModal = () => setIsNodeModalOpen(false);

  const handleModalSubmit = (name) => {
    const { action, node } = modalConfig;
    if (action === 'add') {
      const newNode = { name, children: [], id: uuidv4() };
      const newTree = findAndModifyNode(treeData, node.id, (n) => ({
        ...n,
        children: [...(n.children || []), newNode],
      }));
      setTreeData(newTree);
    } else if (action === 'edit') {
      const newTree = findAndModifyNode(treeData, node.id, (n) => ({ ...n, name }));
      setTreeData(newTree);
    }
    closeModal();
  };

  const handleDeleteNode = (nodeToDelete) => {
    if (nodeToDelete.id === 'root') {
      alert("Cannot delete the root node.");
      return;
    }
    const deleteRecursive = (node) => {
        if (!node.children) return node;
        const newChildren = node.children
            .filter(child => child.id !== nodeToDelete.id)
            .map(deleteRecursive);
        return { ...node, children: newChildren };
    };
    setTreeData(deleteRecursive(treeData));
  };

  return (
    <div className="interactive-tree-container">
      <motion.div className="tree-launcher" onClick={() => setIsTreeModalOpen(true)} whileHover={{ scale: 1.05 }}>
        <img src={TreeLogo} alt="Interactive Tree" />
        <h3>Interactive Mind Map</h3>
        <p>Click to build, explore, and organize your ideas</p>
      </motion.div>

      <AnimatePresence>
        {isTreeModalOpen && (
          <motion.div className="modal-backdrop" onClick={() => setIsTreeModalOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="tree-modal-content" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <div className="tree-wrapper" ref={treeWrapperRef}>
                {treeData && (
                  <Tree
                    data={treeData}
                    orientation="vertical"
                    renderCustomNodeElement={(props) => <CustomNode {...props} onModalOpen={openModal} onDeleteNode={handleDeleteNode} />}
                    translate={translate}
                    zoom={zoom}
                    separation={{ siblings: 2, nonSiblings: 2.5 }}
                    nodeSize={{ x: 300, y: 120 }}
                    pathFunc="diagonal"
                    depthFactor={300}
                  />
                )}
              </div>
              <div className="tree-controls">
                <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} title="Zoom In">+</button>
                <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.1))} title="Zoom Out">-</button>
                <button onClick={centerTree} title="Center Tree">⌖</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <NodeModal
          isOpen={isNodeModalOpen}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
          action={modalConfig.action}
          node={modalConfig.node}
        />
      </AnimatePresence>
    </div>
  );
};

export default InteractiveTree;

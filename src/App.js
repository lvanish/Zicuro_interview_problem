import { useState, useMemo } from "react";

const projectTree = [
  {
    id: 1,
    displayText: "utilities",
    parentId: null,
  },
  {
    id: 2,
    displayText: "src",
    parentId: null,
  },
  {
    id: 3,
    displayText: "index.js",
    parentId: 2,
  },
  {
    id: 4,
    displayText: "components",
    parentId: 2,
  },
  {
    id: 5,
    displayText: "App.js",
    parentId: 4,
  },
  {
    id: 6,
    displayText: "styles",
    parentId: 2,
  },
  {
    id: 7,
    displayText: "main.css",
    parentId: 6,
  },
  {
    id: 8,
    displayText: "test",
    parentId: null,
  },
  {
    id: 9,
    displayText: "dateUtils.js",
    parentId: 1,
  },
];

function buildTree(flatList) {
  const idMap = {};
  const roots = [];

  flatList.forEach((node) => {
    idMap[node.id] = { ...node, children: [] };
  });

  flatList.forEach((node) => {
    if (node.parentId === null) {
      roots.push(idMap[node.id]);
    } else {
      const parent = idMap[node.parentId];
      if (parent) parent.children.push(idMap[node.id]);
    }
  });

  return roots;
}

const TreeNode = ({ node, depth = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <li style={{ paddingLeft: depth * 16 }}>
      <div
        onClick={() => hasChildren && setExpanded((prev) => !prev)}
        style={{
          cursor: hasChildren ? "pointer" : "default",
          userSelect: "none",
        }}
      >
        {hasChildren ? (expanded ? "> " : "> ") : ""} {node.displayText}
      </div>
      {expanded && hasChildren && (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default App = () => {
  const treeData = useMemo(() => buildTree(projectTree), []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {treeData.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </ul>
    </div>
  );
};

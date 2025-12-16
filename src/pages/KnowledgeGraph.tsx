import { useCallback, useRef, useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2, Info } from "lucide-react";

interface Node {
  id: string;
  type: "drug" | "gene" | "pathway" | "disease";
  label: string;
  x: number;
  y: number;
  evidence: number;
}

interface Edge {
  source: string;
  target: string;
  weight: number;
}

const mockNodes: Node[] = [
  { id: "drug1", type: "drug", label: "Metformin", x: 400, y: 300, evidence: 1247 },
  { id: "gene1", type: "gene", label: "AMPK", x: 550, y: 200, evidence: 342 },
  { id: "gene2", type: "gene", label: "mTOR", x: 600, y: 400, evidence: 189 },
  { id: "gene3", type: "gene", label: "p53", x: 250, y: 200, evidence: 156 },
  { id: "pathway1", type: "pathway", label: "Insulin Signaling", x: 700, y: 250, evidence: 89 },
  { id: "pathway2", type: "pathway", label: "Autophagy", x: 750, y: 450, evidence: 67 },
  { id: "pathway3", type: "pathway", label: "Cell Cycle", x: 150, y: 350, evidence: 45 },
  { id: "disease1", type: "disease", label: "Alzheimer's", x: 850, y: 150, evidence: 156 },
  { id: "disease2", type: "disease", label: "Type 2 Diabetes", x: 900, y: 350, evidence: 312 },
  { id: "disease3", type: "disease", label: "Cancer", x: 850, y: 500, evidence: 234 },
  { id: "disease4", type: "disease", label: "Parkinson's", x: 100, y: 150, evidence: 89 },
];

const mockEdges: Edge[] = [
  { source: "drug1", target: "gene1", weight: 0.9 },
  { source: "drug1", target: "gene2", weight: 0.85 },
  { source: "drug1", target: "gene3", weight: 0.7 },
  { source: "gene1", target: "pathway1", weight: 0.95 },
  { source: "gene2", target: "pathway2", weight: 0.8 },
  { source: "gene3", target: "pathway3", weight: 0.75 },
  { source: "pathway1", target: "disease1", weight: 0.87 },
  { source: "pathway1", target: "disease2", weight: 0.92 },
  { source: "pathway2", target: "disease3", weight: 0.68 },
  { source: "pathway3", target: "disease4", weight: 0.73 },
  { source: "gene1", target: "disease2", weight: 0.88 },
];

const nodeColors = {
  drug: "#00D4FF",
  gene: "#A855F7",
  pathway: "#F59E0B",
  disease: "#EF4444",
};

const KnowledgeGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(zoom, zoom);

    // Draw edges
    mockEdges.forEach((edge) => {
      const sourceNode = mockNodes.find((n) => n.id === edge.source);
      const targetNode = mockNodes.find((n) => n.id === edge.target);
      if (!sourceNode || !targetNode) return;

      ctx.beginPath();
      ctx.moveTo(sourceNode.x, sourceNode.y);
      ctx.lineTo(targetNode.x, targetNode.y);
      ctx.strokeStyle = `rgba(100, 200, 255, ${edge.weight * 0.4})`;
      ctx.lineWidth = edge.weight * 3;
      ctx.stroke();
    });

    // Draw nodes
    mockNodes.forEach((node) => {
      const size = node.type === "drug" ? 35 : node.type === "disease" ? 28 : 22;
      
      // Glow effect
      ctx.shadowColor = nodeColors[node.type];
      ctx.shadowBlur = 20;
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
      ctx.fillStyle = nodeColors[node.type];
      ctx.fill();
      
      ctx.shadowBlur = 0;
      
      // Label
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px Inter";
      ctx.textAlign = "center";
      ctx.fillText(node.label, node.x, node.y + size + 18);
    });

    ctx.restore();
  }, [zoom, offset]);

  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / zoom;
    const y = (e.clientY - rect.top - offset.y) / zoom;

    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
      return;
    }

    const hovered = mockNodes.find((node) => {
      const size = node.type === "drug" ? 35 : node.type === "disease" ? 28 : 22;
      return Math.hypot(node.x - x, node.y - y) < size;
    });
    setHoveredNode(hovered || null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <DashboardLayout>
      <div className="p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Knowledge Graph</h1>
            <p className="text-muted-foreground">Interactive Drug-Gene-Pathway-Disease connections</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground w-16 text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="outline" size="icon" onClick={() => setZoom((z) => Math.min(2, z + 0.2))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}>
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-4">
          {Object.entries(nodeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-sm capitalize text-muted-foreground">{type}</span>
            </div>
          ))}
        </div>

        {/* Graph Canvas */}
        <div className="flex-1 glass-card rounded-xl overflow-hidden relative">
          <canvas
            ref={canvasRef}
            width={1000}
            height={600}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          
          {/* Hover tooltip */}
          {hoveredNode && (
            <div className="absolute top-4 right-4 glass-card rounded-lg p-4 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: nodeColors[hoveredNode.type] }} />
                <span className="font-semibold">{hoveredNode.label}</span>
              </div>
              <p className="text-sm text-muted-foreground capitalize mb-1">Type: {hoveredNode.type}</p>
              <p className="text-sm text-muted-foreground">Evidence: {hoveredNode.evidence} sources</p>
            </div>
          )}

          {/* Instructions */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            Drag to pan • Scroll to zoom • Hover for details
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KnowledgeGraph;

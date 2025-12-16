import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  ArrowUpDown,
  Eye,
  Download,
  Filter,
  TrendingUp
} from "lucide-react";

interface Prediction {
  rank: number;
  drug: string;
  disease: string;
  confidence: number;
  evidenceCount: number;
  status: "validated" | "pending" | "new";
}

const mockPredictions: Prediction[] = [
  { rank: 1, drug: "Metformin", disease: "Alzheimer's Disease", confidence: 92, evidenceCount: 312, status: "validated" },
  { rank: 2, drug: "Metformin", disease: "PCOS", confidence: 89, evidenceCount: 287, status: "validated" },
  { rank: 3, drug: "Metformin", disease: "Type 2 Diabetes Complications", confidence: 87, evidenceCount: 245, status: "validated" },
  { rank: 4, drug: "Metformin", disease: "Anti-aging / Longevity", confidence: 84, evidenceCount: 198, status: "pending" },
  { rank: 5, drug: "Metformin", disease: "Parkinson's Disease", confidence: 73, evidenceCount: 156, status: "pending" },
  { rank: 6, drug: "Metformin", disease: "Various Cancers", confidence: 68, evidenceCount: 234, status: "new" },
  { rank: 7, drug: "Metformin", disease: "Cardiovascular Disease", confidence: 65, evidenceCount: 178, status: "new" },
  { rank: 8, drug: "Metformin", disease: "Obesity Management", confidence: 61, evidenceCount: 145, status: "new" },
];

const Recommendations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"confidence" | "evidence">("confidence");

  const filteredPredictions = mockPredictions
    .filter((p) => p.disease.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortBy === "confidence" ? b.confidence - a.confidence : b.evidenceCount - a.evidenceCount);

  const handleExport = () => {
    const data = filteredPredictions.map(p => 
      `${p.rank},${p.drug},${p.disease},${p.confidence}%,${p.evidenceCount}`
    ).join('\n');
    const blob = new Blob([`Rank,Drug,Disease,Confidence,Evidence\n${data}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pharmamind-predictions.csv';
    a.click();
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">AI Recommendations</h1>
            <p className="text-muted-foreground">Ranked drug-disease predictions with confidence scores</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Link to="/evidence">
              <Button variant="hero">
                <TrendingUp className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search diseases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-secondary/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Button
              variant={sortBy === "confidence" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSortBy("confidence")}
            >
              By Confidence
            </Button>
            <Button
              variant={sortBy === "evidence" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSortBy("evidence")}
            >
              By Evidence
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Rank</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Drug</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                    Disease
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-foreground transition-colors" onClick={() => setSortBy("confidence")}>
                    Confidence
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-foreground transition-colors" onClick={() => setSortBy("evidence")}>
                    Evidence
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPredictions.map((prediction, i) => (
                <tr 
                  key={prediction.rank} 
                  className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <td className="p-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                      {prediction.rank}
                    </div>
                  </td>
                  <td className="p-4 font-medium">{prediction.drug}</td>
                  <td className="p-4">{prediction.disease}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            prediction.confidence >= 80 ? 'bg-confidence-high' :
                            prediction.confidence >= 60 ? 'bg-confidence-medium' :
                            'bg-confidence-low'
                          }`}
                          style={{ width: `${prediction.confidence}%` }}
                        />
                      </div>
                      <span className={`font-semibold ${
                        prediction.confidence >= 80 ? 'text-confidence-high' :
                        prediction.confidence >= 60 ? 'text-confidence-medium' :
                        'text-confidence-low'
                      }`}>
                        {prediction.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{prediction.evidenceCount} sources</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      prediction.status === 'validated' ? 'bg-confidence-high/20 text-confidence-high' :
                      prediction.status === 'pending' ? 'bg-confidence-medium/20 text-confidence-medium' :
                      'bg-primary/20 text-primary'
                    }`}>
                      {prediction.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link to="/evidence">
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-6 text-sm text-muted-foreground text-center">
          Showing {filteredPredictions.length} predictions • Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Recommendations;

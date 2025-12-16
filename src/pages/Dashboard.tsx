import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Brain,
  FileText,
  Database,
  BarChart3,
  TrendingUp,
  Zap,
  ArrowRight,
  Activity
} from "lucide-react";

const mockAgents = [
  { name: "Literature Agent", icon: FileText, status: "active", progress: 100, findings: 1247 },
  { name: "Clinical Trials Agent", icon: Activity, status: "processing", progress: 67, findings: 342 },
  { name: "Patent Agent", icon: Database, status: "active", progress: 100, findings: 89 },
  { name: "Market Agent", icon: BarChart3, status: "idle", progress: 0, findings: 23 },
];

const mockInsights = [
  { drug: "Metformin", disease: "Alzheimer's Disease", confidence: 87, evidence: 156 },
  { drug: "Metformin", disease: "Parkinson's Disease", confidence: 73, evidence: 89 },
  { drug: "Metformin", disease: "Various Cancers", confidence: 68, evidence: 234 },
  { drug: "Metformin", disease: "PCOS", confidence: 92, evidence: 312 },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("Metformin");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Research Dashboard</h1>
            <p className="text-muted-foreground">Discover drug repurposing opportunities with AI</p>
          </div>
          <Link to="/recommendations">
            <Button variant="hero">
              View All Predictions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Search Section */}
        <div className="glass-card rounded-xl p-6 mb-8 glow-primary">
          <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Drug Search
          </h2>
          <div className="flex gap-4">
            <Input
              placeholder="Enter drug name (e.g., Metformin, Aspirin, Ibuprofen)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-secondary/50 text-lg h-12"
            />
            <Button variant="hero" size="lg" onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-5 w-5" />
                  Analyze Drug
                </>
              )}
            </Button>
          </div>
        </div>

        {/* AI Agents Status */}
        <div className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI Agent Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockAgents.map((agent) => (
              <div key={agent.name} className="glass-card rounded-xl p-5 hover:glow-primary transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <agent.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    agent.status === 'active' ? 'bg-status-active/20 text-status-active' :
                    agent.status === 'processing' ? 'bg-status-processing/20 text-status-processing' :
                    'bg-status-idle/20 text-status-idle'
                  }`}>
                    {agent.status === 'active' ? '● Active' : agent.status === 'processing' ? '◐ Processing' : '○ Idle'}
                  </span>
                </div>
                <h3 className="font-medium mb-2">{agent.name}</h3>
                {agent.status === 'processing' && (
                  <div className="mb-2">
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${agent.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{agent.progress}% complete</p>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold">{agent.findings}</span> findings
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence Score & Insights */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Confidence Meter */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Overall Confidence
            </h2>
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${82 * 2.51} 251`}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-4xl font-bold text-gradient-primary">82%</span>
                <span className="text-sm text-muted-foreground">Confidence</span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Based on {mockInsights.reduce((sum, i) => sum + i.evidence, 0)} evidence points
            </p>
          </div>

          {/* Key Insights */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Key Insights for {searchQuery}
              </h2>
              <Link to="/recommendations">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-3">
              {mockInsights.map((insight, i) => (
                <Link key={i} to="/evidence" className="block">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="flex-1">
                      <p className="font-medium">{insight.disease}</p>
                      <p className="text-sm text-muted-foreground">{insight.evidence} evidence points</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`text-right ${
                        insight.confidence >= 80 ? 'text-confidence-high' :
                        insight.confidence >= 60 ? 'text-confidence-medium' :
                        'text-confidence-low'
                      }`}>
                        <span className="font-display text-2xl font-bold">{insight.confidence}%</span>
                        <p className="text-xs">confidence</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Search, 
  FileText, 
  Database, 
  Zap, 
  TrendingUp,
  Clock,
  DollarSign,
  Target,
  CheckCircle,
  ArrowRight,
  Microscope,
  FlaskConical,
  Network,
  BarChart3
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="font-display text-xl font-bold">PharmaMind</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-muted-foreground hover:text-foreground transition-colors">Problem</a>
            <a href="#solution" className="text-muted-foreground hover:text-foreground transition-colors">Solution</a>
            <a href="#architecture" className="text-muted-foreground hover:text-foreground transition-colors">Architecture</a>
            <a href="#impact" className="text-muted-foreground hover:text-foreground transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.15)_0%,_transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground mb-6">
              <Zap className="h-4 w-4 text-primary" />
              EY Techathon 6.0 Innovation
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient-primary">PharmaMind</span>
              <br />
              <span className="text-foreground">Agentic AI Scientist for</span>
              <br />
              <span className="text-foreground">Drug Repurposing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Discover new therapeutic uses for existing drugs in minutes, not months. 
              Powered by autonomous AI agents and knowledge graphs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button variant="hero" size="xl">
                  Try Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="heroOutline" size="xl">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 relative">
            <div className="glass-card rounded-2xl p-8 glow-primary animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Search, label: "Literature Agent", status: "Active" },
                  { icon: FileText, label: "Clinical Agent", status: "Processing" },
                  { icon: Database, label: "Patent Agent", status: "Active" },
                  { icon: BarChart3, label: "Market Agent", status: "Ready" },
                ].map((agent, i) => (
                  <div key={i} className="text-center p-4 rounded-xl bg-secondary/50">
                    <agent.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                    <p className="font-medium text-sm">{agent.label}</p>
                    <span className={`text-xs ${agent.status === 'Active' ? 'text-status-active' : agent.status === 'Processing' ? 'text-status-processing' : 'text-status-idle'}`}>
                      ● {agent.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-display text-4xl font-bold mb-4">The Challenge</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Traditional drug repurposing is slow, expensive, and misses critical opportunities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, value: "2-3 Months", label: "Manual research time per drug", color: "text-destructive" },
              { icon: Database, value: "Scattered", label: "Data across papers, patents, trials", color: "text-status-processing" },
              { icon: Target, value: "80%", label: "Opportunities missed annually", color: "text-destructive" },
              { icon: TrendingUp, value: "Generics", label: "India pharma dependency", color: "text-accent" },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                <item.icon className={`h-12 w-12 mx-auto mb-4 ${item.color}`} />
                <p className="font-display text-3xl font-bold mb-2">{item.value}</p>
                <p className="text-muted-foreground text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Our Solution</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Autonomous AI agents working together to discover drug repurposing opportunities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                icon: Brain, 
                title: "Autonomous AI Agents", 
                description: "Specialized agents for literature, clinical trials, patents, and market data work in parallel to gather comprehensive insights." 
              },
              { 
                icon: Microscope, 
                title: "NLP + LLM Analysis", 
                description: "Advanced natural language processing extracts meaningful relationships from millions of scientific documents." 
              },
              { 
                icon: Network, 
                title: "Knowledge Graph", 
                description: "Drug-Gene-Pathway-Disease connections visualized in an interactive knowledge graph for intuitive exploration." 
              },
              { 
                icon: FlaskConical, 
                title: "Ranked Hypotheses", 
                description: "AI-generated drug–disease predictions with confidence scores and explainable citations." 
              },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-xl p-8 flex gap-6 hover:glow-primary transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <item.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Platform Architecture</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              End-to-end AI pipeline from data ingestion to actionable insights
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: Database, title: "Data Ingestion", subtitle: "Multi-source" },
              { icon: Brain, title: "NLP Pipeline", subtitle: "LLM Processing" },
              { icon: Network, title: "Knowledge Graph", subtitle: "Neo4j" },
              { icon: Zap, title: "AI Engine", subtitle: "Recommendations" },
              { icon: BarChart3, title: "Dashboard", subtitle: "Insights" },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="glass-card rounded-xl p-6 text-center h-full">
                  <item.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
                {i < 4 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-primary/50 h-6 w-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Business Impact</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Transforming pharmaceutical R&D with measurable outcomes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "80%", label: "Reduction in research time", icon: Clock },
              { value: "40-60%", label: "Cost savings", icon: DollarSign },
              { value: "2×", label: "More opportunities found", icon: Target },
              { value: "95%", label: "Explainability with citations", icon: CheckCircle },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-xl p-8 text-center glow-primary hover:scale-105 transition-transform duration-300">
                <item.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                <p className="font-display text-4xl font-bold text-gradient-primary mb-2">{item.value}</p>
                <p className="text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Ready to Transform Your Drug Discovery?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Experience the power of agentic AI in pharmaceutical research. 
            Start discovering new therapeutic opportunities today.
          </p>
          <Link to="/dashboard">
            <Button variant="hero" size="xl">
              Launch Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-display font-bold">PharmaMind</span>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>EY Techathon 6.0 Hackathon Project</p>
              <p className="mt-1">Team: PharmaMind</p>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Tech: React • FastAPI • NLP + LLM • Knowledge Graph</p>
              <p>Cloud: AWS / Azure</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

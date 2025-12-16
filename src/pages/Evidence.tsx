import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  FileText,
  Download,
  BookOpen,
  TestTube,
  Shield,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface Citation {
  id: string;
  title: string;
  source: string;
  year: number;
  url: string;
  type: "literature" | "clinical" | "patent";
}

const mockLiterature: Citation[] = [
  { id: "lit1", title: "Metformin and Neurodegenerative Disease: A Systematic Review", source: "Nature Medicine", year: 2023, url: "#", type: "literature" },
  { id: "lit2", title: "AMPK Activation by Metformin and Alzheimer's Prevention", source: "Cell Metabolism", year: 2022, url: "#", type: "literature" },
  { id: "lit3", title: "Molecular Mechanisms of Metformin in Neurological Disorders", source: "Neurology", year: 2023, url: "#", type: "literature" },
  { id: "lit4", title: "Anti-inflammatory Effects of Metformin in the Brain", source: "Brain Research", year: 2021, url: "#", type: "literature" },
];

const mockClinical: Citation[] = [
  { id: "clin1", title: "Phase 2 Trial: Metformin in Early Alzheimer's Disease", source: "ClinicalTrials.gov (NCT04098666)", year: 2024, url: "#", type: "clinical" },
  { id: "clin2", title: "Observational Study: Diabetes Medication and Dementia Risk", source: "JAMA Neurology", year: 2023, url: "#", type: "clinical" },
  { id: "clin3", title: "DPPOS Follow-up: Cognitive Outcomes with Metformin", source: "Diabetes Care", year: 2022, url: "#", type: "clinical" },
];

const mockPatents: Citation[] = [
  { id: "pat1", title: "Methods of treating neurological disorders with biguanides", source: "USPTO (US11234567B2)", year: 2023, url: "#", type: "patent" },
  { id: "pat2", title: "Combination therapy for Alzheimer's disease prevention", source: "EPO (EP4012345)", year: 2022, url: "#", type: "patent" },
];

const Evidence = () => {
  const [generating, setGenerating] = useState(false);

  const handleGeneratePDF = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      toast.success("Report generated successfully!", {
        description: "Your PDF report is ready for download.",
      });
    }, 2000);
  };

  const CitationCard = ({ citation }: { citation: Citation }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
      <div className="flex-1">
        <h4 className="font-medium mb-1">{citation.title}</h4>
        <p className="text-sm text-muted-foreground">{citation.source} • {citation.year}</p>
      </div>
      <Button variant="ghost" size="icon">
        <ExternalLink className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Evidence & Summary</h1>
            <p className="text-muted-foreground">AI-generated analysis for Metformin → Alzheimer's Disease</p>
          </div>
          <Button variant="hero" onClick={handleGeneratePDF} disabled={generating}>
            {generating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Generate PDF Report
              </>
            )}
          </Button>
        </div>

        {/* Summary Card */}
        <div className="glass-card rounded-xl p-6 mb-8 glow-primary">
          <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            AI-Generated Summary
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Metformin</strong>, a first-line treatment for type 2 diabetes, shows significant promise for 
              <strong className="text-foreground"> Alzheimer's disease</strong> prevention and treatment based on our multi-source analysis.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Key Mechanisms:</strong> Metformin activates AMPK (AMP-activated protein kinase), which 
              reduces tau phosphorylation and amyloid-β accumulation—two hallmarks of Alzheimer's pathology. Additionally, it demonstrates 
              neuroprotective effects through anti-inflammatory pathways and improved cerebral glucose metabolism.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Clinical Evidence:</strong> Multiple observational studies show 20-40% reduced dementia risk 
              in diabetic patients on long-term metformin therapy. Phase 2 clinical trials are currently underway (NCT04098666) to evaluate 
              efficacy in early-stage Alzheimer's patients.
            </p>
          </div>

          {/* Confidence indicators */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-confidence-high mb-1">
                <CheckCircle className="h-4 w-4" />
                <span className="font-semibold">Strong</span>
              </div>
              <p className="text-xs text-muted-foreground">Mechanistic Evidence</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-confidence-medium mb-1">
                <Clock className="h-4 w-4" />
                <span className="font-semibold">Pending</span>
              </div>
              <p className="text-xs text-muted-foreground">Clinical Validation</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-status-active mb-1">
                <AlertCircle className="h-4 w-4" />
                <span className="font-semibold">Active</span>
              </div>
              <p className="text-xs text-muted-foreground">Patent Activity</p>
            </div>
          </div>
        </div>

        {/* Evidence Sections */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Literature Evidence */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Literature Evidence
              <span className="ml-auto text-sm text-muted-foreground">{mockLiterature.length} sources</span>
            </h3>
            <div className="space-y-3">
              {mockLiterature.map((citation) => (
                <CitationCard key={citation.id} citation={citation} />
              ))}
            </div>
          </div>

          {/* Clinical Trial Evidence */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <TestTube className="h-5 w-5 text-accent" />
              Clinical Evidence
              <span className="ml-auto text-sm text-muted-foreground">{mockClinical.length} trials</span>
            </h3>
            <div className="space-y-3">
              {mockClinical.map((citation) => (
                <CitationCard key={citation.id} citation={citation} />
              ))}
            </div>
          </div>

          {/* Patent Evidence */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-confidence-medium" />
              Patent Evidence
              <span className="ml-auto text-sm text-muted-foreground">{mockPatents.length} patents</span>
            </h3>
            <div className="space-y-3">
              {mockPatents.map((citation) => (
                <CitationCard key={citation.id} citation={citation} />
              ))}
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-8 glass-card rounded-xl p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Export Options</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" onClick={handleGeneratePDF}>
              <FileText className="mr-2 h-4 w-4" />
              Export as PDF
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export as PPT
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Citations (BibTeX)
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Reports include: Drug overview, AI insights, Knowledge Graph snapshot, Confidence scores, and all references
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Evidence;

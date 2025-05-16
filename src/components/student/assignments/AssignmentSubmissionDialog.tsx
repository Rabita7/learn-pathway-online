
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StudentAssignment } from '@/types/grades';
import { useToast } from '@/hooks/use-toast';

interface AssignmentSubmissionDialogProps {
  assignment: StudentAssignment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (file: File, comments: string) => void;
  isSubmitting: boolean;
}

const AssignmentSubmissionDialog: React.FC<AssignmentSubmissionDialogProps> = ({
  assignment,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting
}) => {
  const { toast } = useToast();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [comments, setComments] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setPdfFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive"
        });
      }
    }
  };

  const handleSubmit = () => {
    if (!pdfFile) {
      toast({
        title: "Missing file",
        description: "Please upload a PDF file before submitting",
        variant: "destructive"
      });
      return;
    }

    onSubmit(pdfFile, comments);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Submit Assignment</DialogTitle>
          <DialogDescription>
            {assignment?.title} - {assignment?.subject}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload PDF File</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="file-upload" 
                type="file" 
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>
            {pdfFile && (
              <p className="text-sm text-green-600 flex items-center">
                <Check className="h-4 w-4 mr-1" /> {pdfFile.name} selected
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comments">Comments (Optional)</Label>
            <Textarea 
              id="comments" 
              placeholder="Add any comments for your teacher"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-student hover:bg-student/90"
            disabled={!pdfFile || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Assignment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentSubmissionDialog;

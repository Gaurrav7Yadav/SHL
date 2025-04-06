
import React from "react";
import { MockTest } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TestResultsTableProps {
  tests: MockTest[];
  isLoading: boolean;
}

const getDifficultyColor = (difficulty: MockTest['difficulty']) => {
  switch(difficulty) {
    case 'Easy': return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'Hard': return 'bg-red-100 text-red-800 hover:bg-red-200';
    default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const TestResultsTable: React.FC<TestResultsTableProps> = ({ tests, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Searching for mock tests...</p>
        </div>
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium">No tests found</p>
        <p className="text-muted-foreground mt-1">Try entering a more detailed job description</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Test Name</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead className="hidden sm:table-cell">Questions</TableHead>
            <TableHead className="hidden sm:table-cell">Duration</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests.map((test) => (
            <TableRow key={test.id}>
              <TableCell className="font-medium">{test.title}</TableCell>
              <TableCell className="hidden md:table-cell max-w-xs truncate">{test.description}</TableCell>
              <TableCell>
                <Badge variant="outline" className={`${getDifficultyColor(test.difficulty)}`}>
                  {test.difficulty}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell">{test.questions}</TableCell>
              <TableCell className="hidden sm:table-cell">{test.duration}</TableCell>
              <TableCell className="text-right">
                <a href={test.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <span className="hidden sm:inline">Take Test</span>
                    <span className="sm:hidden">Test</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TestResultsTable;

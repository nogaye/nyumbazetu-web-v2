"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GripVertical, MoreVertical, Check, Circle } from "lucide-react";

interface DocumentRow {
  id: string;
  header: string;
  sectionType: string;
  status: "done" | "in-process";
  target: number;
  limit: number;
  reviewer: string | null;
}

// Generate 68 mock documents to match the shadcn example
const generateMockDocuments = (): DocumentRow[] => {
  const baseDocuments: DocumentRow[] = [
    {
      id: "1",
      header: "Cover page",
      sectionType: "Cover page",
      status: "in-process",
      target: 18,
      limit: 5,
      reviewer: "Eddie Lake",
    },
    {
      id: "2",
      header: "Table of contents",
      sectionType: "Table of contents",
      status: "done",
      target: 29,
      limit: 24,
      reviewer: "Eddie Lake",
    },
    {
      id: "3",
      header: "Executive summary",
      sectionType: "Narrative",
      status: "done",
      target: 10,
      limit: 13,
      reviewer: "Eddie Lake",
    },
    {
      id: "4",
      header: "Technical approach",
      sectionType: "Narrative",
      status: "done",
      target: 27,
      limit: 23,
      reviewer: "Jamik Tashpulatov",
    },
    {
      id: "5",
      header: "Design",
      sectionType: "Narrative",
      status: "in-process",
      target: 2,
      limit: 16,
      reviewer: "Jamik Tashpulatov",
    },
    {
      id: "6",
      header: "Capabilities",
      sectionType: "Narrative",
      status: "in-process",
      target: 20,
      limit: 8,
      reviewer: "Jamik Tashpulatov",
    },
    {
      id: "7",
      header: "Integration with existing systems",
      sectionType: "Narrative",
      status: "in-process",
      target: 19,
      limit: 21,
      reviewer: "Jamik Tashpulatov",
    },
    {
      id: "8",
      header: "Innovation and Advantages",
      sectionType: "Narrative",
      status: "done",
      target: 25,
      limit: 26,
      reviewer: null,
    },
    {
      id: "9",
      header: "Overview of EMR's Innovative Solutions",
      sectionType: "Technical content",
      status: "done",
      target: 7,
      limit: 23,
      reviewer: null,
    },
    {
      id: "10",
      header: "Advanced Algorithms and Machine Learning",
      sectionType: "Narrative",
      status: "done",
      target: 30,
      limit: 28,
      reviewer: null,
    },
  ];

  // Generate additional documents to reach 68 total
  const additionalDocuments: DocumentRow[] = [];
  const sectionTypes = ["Narrative", "Technical content", "Cover page", "Table of contents"];
  const reviewers = ["Eddie Lake", "Jamik Tashpulatov", null];
  const statuses: ("done" | "in-process")[] = ["done", "in-process"];

  for (let i = 11; i <= 68; i++) {
    additionalDocuments.push({
      id: i.toString(),
      header: `Document Section ${i}`,
      sectionType: sectionTypes[Math.floor(Math.random() * sectionTypes.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      target: Math.floor(Math.random() * 30) + 1,
      limit: Math.floor(Math.random() * 30) + 1,
      reviewer: reviewers[Math.floor(Math.random() * reviewers.length)],
    });
  }

  return [...baseDocuments, ...additionalDocuments];
};

const mockDocuments: DocumentRow[] = generateMockDocuments();

export function DocumentsTable() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockDocuments.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentDocuments = mockDocuments.slice(startIndex, endIndex);

  const toggleRowSelection = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAllSelection = () => {
    if (selectedRows.size === currentDocuments.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(currentDocuments.map((doc) => doc.id)));
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="w-12 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.size === currentDocuments.length &&
                    currentDocuments.length > 0
                  }
                  onChange={toggleAllSelection}
                  className="rounded border-slate-300 dark:border-slate-700"
                />
              </th>
              <th className="w-12 px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                Drag to reorder
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                Header
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                Section Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                Target
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                Limit
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                Reviewer
              </th>
              <th className="w-12 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentDocuments.map((doc) => (
              <tr
                key={doc.id}
                className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(doc.id)}
                    onChange={() => toggleRowSelection(doc.id)}
                    className="rounded border-slate-300 dark:border-slate-700"
                  />
                </td>
                <td className="px-4 py-3">
                  <GripVertical className="h-4 w-4 text-slate-400 cursor-move" />
                </td>
                <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-50">
                  {doc.header}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                  {doc.sectionType}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {doc.status === "done" ? (
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <Circle className="h-4 w-4 text-slate-400" />
                    )}
                    <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                      {doc.status === "done" ? "Done" : "In Process"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-50">
                  {doc.target}
                </td>
                <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-50">
                  {doc.limit}
                </td>
                <td className="px-4 py-3">
                  {doc.reviewer ? (
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {doc.reviewer}
                    </span>
                  ) : (
                    <Select defaultValue="assign">
                      <SelectTrigger className="w-[140px] h-8 text-xs">
                        <SelectValue placeholder="Assign reviewer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assign">Assign reviewer</SelectItem>
                        <SelectItem value="eddie">Eddie Lake</SelectItem>
                        <SelectItem value="jamik">Jamik Tashpulatov</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {selectedRows.size} of {mockDocuments.length} row(s) selected.
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Rows per page
            </span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => {
                setRowsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[70px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                «
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                ‹
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                ›
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                »
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


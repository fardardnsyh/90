import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table as ShadcnTable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Form =
  | (FormDocument & {
      questions: Question[];
      submissions: FormSubmissionWithAnswers[];
    })
  | undefined;

type TableProps = {
  data: FormSubmission[];
  columns: Question[];
};

const columnHelper = createColumnHelper<any>();

const Table = (props: TableProps) => {
  const { data } = props;

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
    }),
    ...props.columns.map((question: any, index: number) => {
      return columnHelper.accessor(
        (row) => {
          let answer = row.answers.find((answer: any) => {
            return answer.questionId === question._id;
          });
          console.log(answer);
          return answer.fieldOptionsId
            ? answer.fieldOption[0].text
            : answer.value;
        },
        {
          header: () => question.text,
          id: question._id.toString(),
          cell: (info) => info.renderValue(),
        }
      );
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 mt-4">
      <div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg">
        <ShadcnTable>
          <TableCaption>A list of recent form submission.</TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-left p-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="py-2">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="font-medium p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </ShadcnTable>
      </div>
    </div>
  );
};

export default Table;

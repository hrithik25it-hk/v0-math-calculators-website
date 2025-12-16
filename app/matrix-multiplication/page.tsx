"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MatrixMultiplicationPage() {
  const [rowsA, setRowsA] = useState(2)
  const [colsA, setColsA] = useState(2)
  const [colsB, setColsB] = useState(2)
  const [matrixA, setMatrixA] = useState<number[][]>(
    Array(2)
      .fill(null)
      .map(() => Array(2).fill(0)),
  )
  const [matrixB, setMatrixB] = useState<number[][]>(
    Array(2)
      .fill(null)
      .map(() => Array(2).fill(0)),
  )
  const [result, setResult] = useState<number[][] | null>(null)

  const updateDimensions = (newRowsA: number, newColsA: number, newColsB: number) => {
    setRowsA(newRowsA)
    setColsA(newColsA)
    setColsB(newColsB)
    setMatrixA(
      Array(newRowsA)
        .fill(null)
        .map(() => Array(newColsA).fill(0)),
    )
    setMatrixB(
      Array(newColsA)
        .fill(null)
        .map(() => Array(newColsB).fill(0)),
    )
    setResult(null)
  }

  const handleMatrixChange = (matrix: "A" | "B", row: number, col: number, value: string) => {
    const num = Number.parseFloat(value) || 0
    if (matrix === "A") {
      const newMatrix = matrixA.map((r, i) => (i === row ? r.map((c, j) => (j === col ? num : c)) : r))
      setMatrixA(newMatrix)
    } else {
      const newMatrix = matrixB.map((r, i) => (i === row ? r.map((c, j) => (j === col ? num : c)) : r))
      setMatrixB(newMatrix)
    }
  }

  const multiply = () => {
    const res: number[][] = []
    for (let i = 0; i < rowsA; i++) {
      res[i] = []
      for (let j = 0; j < colsB; j++) {
        let sum = 0
        for (let k = 0; k < colsA; k++) {
          sum += matrixA[i][k] * matrixB[k][j]
        }
        res[i][j] = sum
      }
    }
    setResult(res)
  }

  return (
    <CalculatorLayout
      title="Matrix Multiplication"
      description="Multiply two matrices (A × B where columns of A = rows of B)"
    >
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        {/* Dimension Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Label className="text-foreground">A rows:</Label>
            <select
              value={rowsA}
              onChange={(e) => updateDimensions(Number(e.target.value), colsA, colsB)}
              className="px-3 py-1 rounded border border-border bg-input text-foreground"
            >
              {[2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-foreground">A cols / B rows:</Label>
            <select
              value={colsA}
              onChange={(e) => updateDimensions(rowsA, Number(e.target.value), colsB)}
              className="px-3 py-1 rounded border border-border bg-input text-foreground"
            >
              {[2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-foreground">B cols:</Label>
            <select
              value={colsB}
              onChange={(e) => updateDimensions(rowsA, colsA, Number(e.target.value))}
              className="px-3 py-1 rounded border border-border bg-input text-foreground"
            >
              {[2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Matrix A: {rowsA}×{colsA} • Matrix B: {colsA}×{colsB} • Result: {rowsA}×{colsB}
        </p>

        {/* Matrices */}
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <Label className="text-lg font-semibold text-foreground mb-3 block">
              Matrix A ({rowsA}×{colsA})
            </Label>
            <div className="inline-block bg-muted p-4 rounded-xl">
              {matrixA.map((row, i) => (
                <div key={i} className="flex gap-2 mb-2 last:mb-0">
                  {row.map((val, j) => (
                    <Input
                      key={`${i}-${j}`}
                      type="number"
                      value={val}
                      onChange={(e) => handleMatrixChange("A", i, j, e.target.value)}
                      className="w-16 text-center bg-input text-foreground"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-lg font-semibold text-foreground mb-3 block">
              Matrix B ({colsA}×{colsB})
            </Label>
            <div className="inline-block bg-muted p-4 rounded-xl">
              {matrixB.map((row, i) => (
                <div key={i} className="flex gap-2 mb-2 last:mb-0">
                  {row.map((val, j) => (
                    <Input
                      key={`${i}-${j}`}
                      type="number"
                      value={val}
                      onChange={(e) => handleMatrixChange("B", i, j, e.target.value)}
                      className="w-16 text-center bg-input text-foreground"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button onClick={multiply} className="w-full md:w-auto mb-6">
          Calculate A × B
        </Button>

        {result && (
          <div className="border-t border-border pt-6">
            <Label className="text-lg font-semibold text-foreground mb-3 block">
              Result ({rowsA}×{colsB})
            </Label>
            <div className="inline-block bg-green-50 p-4 rounded-xl border-2 border-green-200">
              {result.map((row, i) => (
                <div key={i} className="flex gap-2 mb-2 last:mb-0">
                  {row.map((val, j) => (
                    <div
                      key={`${i}-${j}`}
                      className="w-16 h-10 flex items-center justify-center bg-card text-foreground font-mono font-semibold rounded border border-border"
                    >
                      {val}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  )
}

"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MatrixAdditionPage() {
  const [size, setSize] = useState(2)
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
  const [operation, setOperation] = useState<"add" | "subtract">("add")

  const handleSizeChange = (newSize: number) => {
    if (newSize >= 2 && newSize <= 5) {
      setSize(newSize)
      setMatrixA(
        Array(newSize)
          .fill(null)
          .map(() => Array(newSize).fill(0)),
      )
      setMatrixB(
        Array(newSize)
          .fill(null)
          .map(() => Array(newSize).fill(0)),
      )
      setResult(null)
    }
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

  const calculate = () => {
    const res = matrixA.map((row, i) =>
      row.map((val, j) => (operation === "add" ? val + matrixB[i][j] : val - matrixB[i][j])),
    )
    setResult(res)
  }

  return (
    <CalculatorLayout title="Matrix Addition & Subtraction" description="Add or subtract two matrices of the same size">
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Label className="text-foreground">Matrix Size:</Label>
            <div className="flex gap-1">
              {[2, 3, 4, 5].map((s) => (
                <Button
                  key={s}
                  variant={size === s ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSizeChange(s)}
                >
                  {s}×{s}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-foreground">Operation:</Label>
            <div className="flex gap-1">
              <Button
                variant={operation === "add" ? "default" : "outline"}
                size="sm"
                onClick={() => setOperation("add")}
              >
                Add (+)
              </Button>
              <Button
                variant={operation === "subtract" ? "default" : "outline"}
                size="sm"
                onClick={() => setOperation("subtract")}
              >
                Subtract (−)
              </Button>
            </div>
          </div>
        </div>

        {/* Matrices */}
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          {/* Matrix A */}
          <div>
            <Label className="text-lg font-semibold text-foreground mb-3 block">Matrix A</Label>
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

          {/* Matrix B */}
          <div>
            <Label className="text-lg font-semibold text-foreground mb-3 block">Matrix B</Label>
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

        {/* Calculate Button */}
        <Button onClick={calculate} className="w-full md:w-auto mb-6">
          Calculate {operation === "add" ? "A + B" : "A − B"}
        </Button>

        {/* Result */}
        {result && (
          <div className="border-t border-border pt-6">
            <Label className="text-lg font-semibold text-foreground mb-3 block">
              Result (A {operation === "add" ? "+" : "−"} B)
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

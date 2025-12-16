"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DeterminantPage() {
  const [size, setSize] = useState(2)
  const [matrix, setMatrix] = useState<number[][]>(
    Array(2)
      .fill(null)
      .map(() => Array(2).fill(0)),
  )
  const [result, setResult] = useState<number | null>(null)
  const [steps, setSteps] = useState<string[]>([])

  const handleSizeChange = (newSize: number) => {
    if (newSize >= 2 && newSize <= 4) {
      setSize(newSize)
      setMatrix(
        Array(newSize)
          .fill(null)
          .map(() => Array(newSize).fill(0)),
      )
      setResult(null)
      setSteps([])
    }
  }

  const handleMatrixChange = (row: number, col: number, value: string) => {
    const num = Number.parseFloat(value) || 0
    const newMatrix = matrix.map((r, i) => (i === row ? r.map((c, j) => (j === col ? num : c)) : r))
    setMatrix(newMatrix)
  }

  const calculateDeterminant = (mat: number[][]): number => {
    const n = mat.length
    if (n === 1) return mat[0][0]
    if (n === 2) return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0]

    let det = 0
    for (let j = 0; j < n; j++) {
      const minor = mat.slice(1).map((row) => row.filter((_, idx) => idx !== j))
      det += Math.pow(-1, j) * mat[0][j] * calculateDeterminant(minor)
    }
    return det
  }

  const calculate = () => {
    const newSteps: string[] = []

    if (size === 2) {
      const [a, b] = matrix[0]
      const [c, d] = matrix[1]
      newSteps.push(`det = (${a} × ${d}) - (${b} × ${c})`)
      newSteps.push(`det = ${a * d} - ${b * c}`)
      newSteps.push(`det = ${a * d - b * c}`)
    } else if (size === 3) {
      newSteps.push("Using cofactor expansion along first row:")
      const [a, b, c] = matrix[0]
      newSteps.push(`det = ${a}×M₁₁ - ${b}×M₁₂ + ${c}×M₁₃`)
    }

    const det = calculateDeterminant(matrix)
    setResult(det)
    setSteps(newSteps)
  }

  return (
    <CalculatorLayout title="Matrix Determinant Calculator" description="Calculate the determinant of a square matrix">
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <Label className="text-foreground">Matrix Size:</Label>
          <div className="flex gap-1">
            {[2, 3, 4].map((s) => (
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

        <div className="mb-6">
          <Label className="text-lg font-semibold text-foreground mb-3 block">Enter Matrix</Label>
          <div className="inline-block bg-muted p-4 rounded-xl">
            {matrix.map((row, i) => (
              <div key={i} className="flex gap-2 mb-2 last:mb-0">
                {row.map((val, j) => (
                  <Input
                    key={`${i}-${j}`}
                    type="number"
                    value={val}
                    onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                    className="w-16 text-center bg-input text-foreground"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <Button onClick={calculate} className="w-full md:w-auto mb-6">
          Calculate Determinant
        </Button>

        {result !== null && (
          <div className="border-t border-border pt-6">
            {steps.length > 0 && (
              <div className="mb-4">
                <Label className="font-semibold text-foreground mb-2 block">Steps:</Label>
                <div className="bg-muted p-4 rounded-xl font-mono text-sm space-y-1">
                  {steps.map((step, i) => (
                    <p key={i} className="text-foreground">
                      {step}
                    </p>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Label className="text-lg font-semibold text-foreground">Determinant =</Label>
              <span className="text-3xl font-bold text-accent font-mono">{result}</span>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  )
}

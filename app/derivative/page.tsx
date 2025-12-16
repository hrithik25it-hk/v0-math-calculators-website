"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DerivativeRule {
  pattern: RegExp
  derivative: (match: RegExpMatchArray) => string
  explanation: string
}

export default function DerivativePage() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [explanation, setExplanation] = useState("")

  const rules: DerivativeRule[] = [
    {
      pattern: /^(\d+)?x\^(\d+)$/,
      derivative: (match) => {
        const coef = match[1] ? Number.parseInt(match[1]) : 1
        const power = Number.parseInt(match[2])
        const newCoef = coef * power
        const newPower = power - 1
        if (newPower === 0) return `${newCoef}`
        if (newPower === 1) return `${newCoef}x`
        return `${newCoef}x^${newPower}`
      },
      explanation: "Power Rule: d/dx[x^n] = n·x^(n-1)",
    },
    {
      pattern: /^(\d+)?x$/,
      derivative: (match) => {
        const coef = match[1] ? match[1] : "1"
        return coef
      },
      explanation: "d/dx[ax] = a",
    },
    {
      pattern: /^(\d+)$/,
      derivative: () => "0",
      explanation: "Constant Rule: d/dx[c] = 0",
    },
    {
      pattern: /^sin$$x$$$/,
      derivative: () => "cos(x)",
      explanation: "d/dx[sin(x)] = cos(x)",
    },
    {
      pattern: /^cos$$x$$$/,
      derivative: () => "-sin(x)",
      explanation: "d/dx[cos(x)] = -sin(x)",
    },
    {
      pattern: /^tan$$x$$$/,
      derivative: () => "sec²(x)",
      explanation: "d/dx[tan(x)] = sec²(x)",
    },
    {
      pattern: /^sec$$x$$$/,
      derivative: () => "sec(x)tan(x)",
      explanation: "d/dx[sec(x)] = sec(x)tan(x)",
    },
    {
      pattern: /^csc$$x$$$/,
      derivative: () => "-csc(x)cot(x)",
      explanation: "d/dx[csc(x)] = -csc(x)cot(x)",
    },
    {
      pattern: /^cot$$x$$$/,
      derivative: () => "-csc²(x)",
      explanation: "d/dx[cot(x)] = -csc²(x)",
    },
    {
      pattern: /^e\^x$/,
      derivative: () => "e^x",
      explanation: "d/dx[e^x] = e^x",
    },
    {
      pattern: /^ln$$x$$$/,
      derivative: () => "1/x",
      explanation: "d/dx[ln(x)] = 1/x",
    },
    {
      pattern: /^sqrt$$x$$$/,
      derivative: () => "1/(2√x)",
      explanation: "d/dx[√x] = 1/(2√x)",
    },
    {
      pattern: /^arcsin$$x$$$/,
      derivative: () => "1/√(1-x²)",
      explanation: "d/dx[arcsin(x)] = 1/√(1-x²)",
    },
    {
      pattern: /^arccos$$x$$$/,
      derivative: () => "-1/√(1-x²)",
      explanation: "d/dx[arccos(x)] = -1/√(1-x²)",
    },
    {
      pattern: /^arctan$$x$$$/,
      derivative: () => "1/(1+x²)",
      explanation: "d/dx[arctan(x)] = 1/(1+x²)",
    },
  ]

  const calculate = () => {
    const cleanInput = input.replace(/\s/g, "").toLowerCase()

    for (const rule of rules) {
      const match = cleanInput.match(rule.pattern)
      if (match) {
        setResult(rule.derivative(match))
        setExplanation(rule.explanation)
        return
      }
    }

    setResult("Unable to compute")
    setExplanation("Try formats like: 3x^2, sin(x), cos(x), e^x, ln(x), sqrt(x), arcsin(x), arccos(x), arctan(x)")
  }

  const examples = [
    "x^2",
    "3x^3",
    "5x",
    "sin(x)",
    "cos(x)",
    "tan(x)",
    "sec(x)",
    "csc(x)",
    "cot(x)",
    "e^x",
    "ln(x)",
    "sqrt(x)",
    "7",
    "arcsin(x)",
    "arccos(x)",
    "arctan(x)",
  ]

  return (
    <CalculatorLayout title="Derivative Calculator" description="Find the derivative of common mathematical functions">
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="mb-6">
          <Label className="text-lg font-semibold text-foreground mb-3 block">Enter function f(x)</Label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 3x^2, sin(x), e^x"
              className="flex-1 bg-input text-foreground"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
            <Button onClick={calculate}>Calculate d/dx</Button>
          </div>
        </div>

        <div className="mb-6">
          <Label className="text-sm text-muted-foreground mb-2 block">Try these examples:</Label>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => setInput(ex)}
                className="px-3 py-1 text-sm bg-muted hover:bg-secondary text-foreground rounded-full transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div className="border-t border-border pt-6">
            <div className="bg-muted p-4 rounded-xl mb-4">
              <p className="text-sm text-muted-foreground mb-1">Rule Applied:</p>
              <p className="font-mono text-foreground">{explanation}</p>
            </div>
            <div className="flex items-center gap-3">
              <Label className="text-lg font-semibold text-foreground">{"f'(x) ="}</Label>
              <span className="text-2xl font-bold text-accent font-mono">{result}</span>
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-border pt-6">
          <Label className="text-lg font-semibold text-foreground mb-4 block">Common Derivative Rules</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">d/dx[x^n]</span> = <span className="text-accent">n·x^(n-1)</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">d/dx[sin(x)]</span> = <span className="text-accent">cos(x)</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">d/dx[cos(x)]</span> = <span className="text-accent">-sin(x)</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">d/dx[tan(x)]</span> = <span className="text-accent">sec²(x)</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">d/dx[sec(x)]</span> ={" "}
              <span className="text-accent">sec(x)tan(x)</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">d/dx[csc(x)]</span> ={" "}
              <span className="text-accent">-csc(x)cot(x)</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">d/dx[cot(x)]</span> ={" "}
              <span className="text-accent">-csc²(x)</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">d/dx[e^x]</span> = <span className="text-accent">e^x</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">d/dx[ln(x)]</span> = <span className="text-accent">1/x</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">d/dx[c]</span> = <span className="text-accent">0</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">d/dx[arcsin(x)]</span> ={" "}
              <span className="text-accent">1/√(1-x²)</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">d/dx[arccos(x)]</span> ={" "}
              <span className="text-accent">-1/√(1-x²)</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">d/dx[arctan(x)]</span> ={" "}
              <span className="text-accent">1/(1+x²)</span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}

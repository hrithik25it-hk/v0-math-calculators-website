"use client"

import { useState } from "react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface IntegralRule {
  pattern: RegExp
  integral: (match: RegExpMatchArray) => string
  explanation: string
}

export default function IntegrationPage() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [explanation, setExplanation] = useState("")

  // Fixed all regex patterns to properly escape parentheses with $$ and $$
  const rules: IntegralRule[] = [
    {
      pattern: /^(\d+)?x\^(\d+)$/,
      integral: (match) => {
        const coef = match[1] ? Number.parseInt(match[1]) : 1
        const power = Number.parseInt(match[2])
        const newPower = power + 1
        const newCoef = coef / newPower
        const coefStr = Number.isInteger(newCoef) ? newCoef.toString() : `${coef}/${newPower}`
        return `${coefStr}x^${newPower} + C`
      },
      explanation: "Power Rule: ∫x^n dx = x^(n+1)/(n+1) + C",
    },
    {
      pattern: /^(\d+)?x$/,
      integral: (match) => {
        const coef = match[1] ? Number.parseInt(match[1]) : 1
        const newCoef = coef / 2
        const coefStr = Number.isInteger(newCoef) ? newCoef.toString() : `${coef}/2`
        return `${coefStr}x^2 + C`
      },
      explanation: "∫ax dx = (a/2)x² + C",
    },
    {
      pattern: /^(\d+)$/,
      integral: (match) => `${match[1]}x + C`,
      explanation: "Constant Rule: ∫c dx = cx + C",
    },
    {
      pattern: /^sin$$x$$$/,
      integral: () => "-cos(x) + C",
      explanation: "∫sin(x) dx = -cos(x) + C",
    },
    {
      pattern: /^cos$$x$$$/,
      integral: () => "sin(x) + C",
      explanation: "∫cos(x) dx = sin(x) + C",
    },
    {
      pattern: /^tan$$x$$$/,
      integral: () => "-ln|cos(x)| + C",
      explanation: "∫tan(x) dx = -ln|cos(x)| + C",
    },
    {
      pattern: /^sec\^2$$x$$$/,
      integral: () => "tan(x) + C",
      explanation: "∫sec²(x) dx = tan(x) + C",
    },
    {
      pattern: /^csc\^2$$x$$$/,
      integral: () => "-cot(x) + C",
      explanation: "∫csc²(x) dx = -cot(x) + C",
    },
    {
      pattern: /^sec$$x$$tan$$x$$$/,
      integral: () => "sec(x) + C",
      explanation: "∫sec(x)tan(x) dx = sec(x) + C",
    },
    {
      pattern: /^csc$$x$$cot$$x$$$/,
      integral: () => "-csc(x) + C",
      explanation: "∫csc(x)cot(x) dx = -csc(x) + C",
    },
    {
      pattern: /^e\^x$/,
      integral: () => "e^x + C",
      explanation: "∫e^x dx = e^x + C",
    },
    {
      pattern: /^1\/x$/,
      integral: () => "ln|x| + C",
      explanation: "∫1/x dx = ln|x| + C",
    },
    {
      pattern: /^1$/,
      integral: () => "x + C",
      explanation: "∫1 dx = x + C",
    },
  ]

  const calculate = () => {
    const cleanInput = input.replace(/\s/g, "").toLowerCase()

    for (const rule of rules) {
      const match = cleanInput.match(rule.pattern)
      if (match) {
        setResult(rule.integral(match))
        setExplanation(rule.explanation)
        return
      }
    }

    setResult("Unable to compute")
    setExplanation("Try formats like: x^2, 3x^3, sin(x), cos(x), tan(x), e^x, 1/x")
  }

  const examples = ["x^2", "3x^3", "5x", "sin(x)", "cos(x)", "tan(x)", "e^x", "1/x", "sec^2(x)", "5"]

  return (
    <CalculatorLayout title="Integration Calculator" description="Calculate indefinite integrals of common functions">
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="mb-6">
          <Label className="text-lg font-semibold text-foreground mb-3 block">Enter function to integrate</Label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., x^2, sin(x), cos(x), tan(x)"
              className="flex-1 bg-input text-foreground"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
            <Button onClick={calculate}>Calculate ∫</Button>
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
              <Label className="text-lg font-semibold text-foreground">∫f(x)dx =</Label>
              <span className="text-2xl font-bold text-accent font-mono">{result}</span>
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-border pt-6">
          <Label className="text-lg font-semibold text-foreground mb-4 block">Common Integration Rules</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">∫x^n dx</span> ={" "}
              <span className="text-accent">x^(n+1)/(n+1) + C</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">∫sin(x) dx</span> ={" "}
              <span className="text-accent">-cos(x) + C</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">∫cos(x) dx</span> ={" "}
              <span className="text-accent">sin(x) + C</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">∫tan(x) dx</span> ={" "}
              <span className="text-accent">-ln|cos(x)| + C</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">∫e^x dx</span> = <span className="text-accent">e^x + C</span>
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono">
              <span className="text-muted-foreground">∫1/x dx</span> = <span className="text-accent">ln|x| + C</span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}

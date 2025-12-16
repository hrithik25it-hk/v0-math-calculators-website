"use client"

import { ArrowLeft, Infinity } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

interface CalculatorLayoutProps {
  title: string
  description: string
  children: ReactNode
}

export function CalculatorLayout({ title, description, children }: CalculatorLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Infinity className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-foreground">MathCalc</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {children}
        </div>
      </section>
    </main>
  )
}

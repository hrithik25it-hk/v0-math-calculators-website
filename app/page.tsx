import { Calculator, Grid3X3, Sigma, TrendingUp, Infinity } from "lucide-react"
import Link from "next/link"

const calculators = [
  {
    title: "Matrix Addition",
    description: "Add or subtract two matrices",
    icon: Grid3X3,
    href: "/matrix-addition",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Matrix Multiplication",
    description: "Multiply two matrices together",
    icon: Grid3X3,
    href: "/matrix-multiplication",
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Determinant",
    description: "Calculate matrix determinant",
    icon: Calculator,
    href: "/determinant",
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Derivative",
    description: "Find derivatives of functions",
    icon: TrendingUp,
    href: "/derivative",
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Integration",
    description: "Calculate integrals of functions",
    icon: Sigma,
    href: "/integration",
    color: "bg-red-50 text-red-600",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Infinity className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-foreground">MathCalc</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link
              href="#calculators"
              className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
            >
              Calculators
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-accent mb-4">KGISL Institute of Technology • B.Tech IT Project</p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Mathematical Calculator Suite
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A collection of 5 powerful calculators for Calculus and Matrix operations. Perfect for engineering students
            and mathematics enthusiasts.
          </p>
          <Link
            href="#calculators"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Explore Calculators
          </Link>
        </div>
      </section>

      {/* Calculators Grid */}
      <section id="calculators" className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Choose a Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc) => (
              <Link
                key={calc.title}
                href={calc.href}
                className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${calc.color} flex items-center justify-center mb-4`}>
                  <calc.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {calc.title}
                </h3>
                <p className="text-sm text-muted-foreground">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 mt-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 MathCalc • KGISL Institute of Technology • B.Tech IT First Year Project
          </p>
        </div>
      </footer>
    </main>
  )
}

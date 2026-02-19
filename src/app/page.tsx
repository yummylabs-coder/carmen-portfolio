"use client";

import { Button, Card, Badge, Avatar, StatusBadge } from "@/components/ui";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-page px-6 py-16">
      <div className="mx-auto max-w-2xl space-y-16">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="font-brand text-36 font-extrabold text-text-primary">
            Component Library
          </h1>
          <p className="text-16 text-text-secondary">
            Design system preview — carmen-portfolio
          </p>
        </header>

        {/* StatusBadge */}
        <section className="space-y-4">
          <h2 className="font-brand text-22 font-bold text-text-primary">
            StatusBadge
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <StatusBadge />
            <StatusBadge label="Available for work" />
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="font-brand text-22 font-bold text-text-primary">
            Button
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-4">
          <h2 className="font-brand text-22 font-bold text-text-primary">
            Badge
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>UX Design</Badge>
            <Badge>Mobile App</Badge>
            <Badge>Branding</Badge>
            <Badge>Design System</Badge>
          </div>
        </section>

        {/* Avatar */}
        <section className="space-y-4">
          <h2 className="font-brand text-22 font-bold text-text-primary">
            Avatar
          </h2>
          <div className="flex items-end gap-4">
            <Avatar src="/avatar-placeholder.svg" alt="Carmen" size="sm" />
            <Avatar src="/avatar-placeholder.svg" alt="Carmen" size="md" />
            <Avatar src="/avatar-placeholder.svg" alt="Carmen" size="lg" />
          </div>
        </section>

        {/* Card */}
        <section className="space-y-4">
          <h2 className="font-brand text-22 font-bold text-text-primary">
            Card
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Badge>UX Design</Badge>
                  <Badge>Mobile App</Badge>
                </div>
                <h3 className="font-brand text-17 font-semibold text-text-primary">
                  Yummy Labs App
                </h3>
                <p className="text-14 text-text-secondary">
                  A food-tech platform connecting local chefs with hungry
                  customers.
                </p>
              </div>
            </Card>
            <Card>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Badge>Branding</Badge>
                  <Badge>Design System</Badge>
                </div>
                <h3 className="font-brand text-17 font-semibold text-text-primary">
                  Design System v2
                </h3>
                <p className="text-14 text-text-secondary">
                  A comprehensive design system with tokens, components, and
                  patterns.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="font-brand text-22 font-bold text-text-primary">
            Typography
          </h2>
          <div className="space-y-3 rounded-xl border border-border-default bg-bg-surface p-6">
            <p className="font-brand text-36 font-extrabold">
              Plus Jakarta Sans / 36
            </p>
            <p className="font-brand text-28 font-bold">
              Plus Jakarta Sans / 28
            </p>
            <p className="font-brand text-22 font-semibold">
              Plus Jakarta Sans / 22
            </p>
            <p className="font-body text-17">DM Sans / 17 — body text</p>
            <p className="font-body text-14 text-text-secondary">
              DM Sans / 14 — secondary text
            </p>
            <p className="font-mono text-13 text-text-tertiary">
              SF Mono / 13 — monospace
            </p>
          </div>
        </section>

        {/* Color Swatches */}
        <section className="space-y-4">
          <h2 className="font-brand text-22 font-bold text-text-primary">
            Colors
          </h2>
          <div className="space-y-3">
            <p className="text-13 font-medium text-text-secondary">Blue</p>
            <div className="flex gap-1">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (shade) => (
                  <div key={shade} className="flex-1 space-y-1 text-center">
                    <div
                      className="h-10 rounded-md"
                      style={{
                        backgroundColor: `var(--blue-${shade})`,
                      }}
                    />
                    <span className="text-11 text-text-tertiary">{shade}</span>
                  </div>
                )
              )}
            </div>
            <p className="text-13 font-medium text-text-secondary">Neutral</p>
            <div className="flex gap-1">
              {[0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (shade) => (
                  <div key={shade} className="flex-1 space-y-1 text-center">
                    <div
                      className="h-10 rounded-md border border-border-default"
                      style={{
                        backgroundColor: `var(--neutral-${shade})`,
                      }}
                    />
                    <span className="text-11 text-text-tertiary">{shade}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="space-y-4">
          <h2 className="font-brand text-22 font-bold text-text-primary">
            Spacing (4px base)
          </h2>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((step) => (
              <div key={step} className="flex items-center gap-3">
                <span className="w-8 text-right font-mono text-12 text-text-tertiary">
                  {step}
                </span>
                <div
                  className="h-3 rounded-xs bg-blue-200"
                  style={{ width: `${step * 4}px` }}
                />
                <span className="font-mono text-11 text-text-tertiary">
                  {step * 4}px
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

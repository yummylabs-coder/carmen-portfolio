"use client";

import { Button, Card, Badge, Avatar, StatusBadge } from "@/components/ui";

const colorScales = [
  { name: "Blue", prefix: "blue", shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "Green", prefix: "green", shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "Red", prefix: "red", shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "Amber", prefix: "amber", shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "Orange", prefix: "orange", shades: [50, 100, 200, 300, 400, 500, 600, 700, 800] },
  { name: "Neutral", prefix: "neutral", shades: [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
];

const semanticColors = [
  { group: "Background", tokens: [
    { name: "page", var: "--bg-page" },
    { name: "surface", var: "--bg-surface" },
    { name: "muted", var: "--bg-muted" },
    { name: "hover", var: "--bg-hover" },
    { name: "active", var: "--bg-active" },
    { name: "accent", var: "--bg-accent" },
  ]},
  { group: "Text", tokens: [
    { name: "primary", var: "--text-primary" },
    { name: "secondary", var: "--text-secondary" },
    { name: "tertiary", var: "--text-tertiary" },
    { name: "accent", var: "--text-accent" },
    { name: "disabled", var: "--text-disabled" },
    { name: "on-dark", var: "--text-on-dark" },
  ]},
  { group: "Action", tokens: [
    { name: "primary", var: "--action-primary" },
    { name: "primary-hover", var: "--action-primary-hover" },
    { name: "primary-active", var: "--action-primary-active" },
    { name: "secondary", var: "--action-secondary" },
    { name: "secondary-hover", var: "--action-secondary-hover" },
    { name: "danger", var: "--action-danger" },
    { name: "danger-hover", var: "--action-danger-hover" },
    { name: "success", var: "--action-success" },
    { name: "success-hover", var: "--action-success-hover" },
  ]},
  { group: "Border", tokens: [
    { name: "default", var: "--border-default" },
    { name: "strong", var: "--border-strong" },
    { name: "focus", var: "--border-focus" },
  ]},
  { group: "Status", tokens: [
    { name: "error-tint", var: "--status-error-tint" },
    { name: "error-strong", var: "--status-error-strong" },
    { name: "error-base", var: "--status-error-base" },
    { name: "info-tint", var: "--status-info-tint" },
    { name: "info-strong", var: "--status-info-strong" },
    { name: "info-base", var: "--status-info-base" },
    { name: "success-tint", var: "--status-success-tint" },
    { name: "success-strong", var: "--status-success-strong" },
    { name: "success-base", var: "--status-success-base" },
    { name: "warning-tint", var: "--status-warning-tint" },
    { name: "warning-strong", var: "--status-warning-strong" },
    { name: "warning-base", var: "--status-warning-base" },
  ]},
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-page px-6 py-16">
      <div className="mx-auto max-w-2xl space-y-16">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="font-brand text-36 mobile:text-[30px] font-extrabold text-text-primary">
            Component Library
          </h1>
          <p className="text-16 text-text-secondary">
            Design system preview — carmen-portfolio &middot; 138 tokens
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
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="secondary" disabled>Disabled</Button>
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
            <p className="font-brand text-36 mobile:text-[30px] font-extrabold">
              Plus Jakarta Sans / 36 <span className="text-14 font-normal text-text-tertiary">(30 on mobile)</span>
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

        {/* Primitive Color Scales */}
        <section className="space-y-4">
          <h2 className="font-brand text-22 font-bold text-text-primary">
            Primitive Colors
          </h2>
          <div className="space-y-4">
            {colorScales.map((scale) => (
              <div key={scale.prefix} className="space-y-1">
                <p className="text-13 font-medium text-text-secondary">{scale.name}</p>
                <div className="flex gap-1">
                  {scale.shades.map((shade) => (
                    <div key={shade} className="flex-1 space-y-1 text-center">
                      <div
                        className="h-10 rounded-md border border-neutral-200/50"
                        style={{ backgroundColor: `var(--${scale.prefix}-${shade})` }}
                      />
                      <span className="text-11 text-text-tertiary">{shade}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Semantic Colors */}
        <section className="space-y-4">
          <h2 className="font-brand text-22 font-bold text-text-primary">
            Semantic Colors
          </h2>
          <div className="space-y-6">
            {semanticColors.map((group) => (
              <div key={group.group} className="space-y-2">
                <p className="text-13 font-medium text-text-secondary">{group.group}</p>
                <div className="flex flex-wrap gap-2">
                  {group.tokens.map((token) => (
                    <div key={token.name} className="space-y-1 text-center">
                      <div
                        className="h-10 w-16 rounded-md border border-neutral-200/50"
                        style={{ backgroundColor: `var(${token.var})` }}
                      />
                      <span className="block text-11 text-text-tertiary">{token.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section className="space-y-4">
          <h2 className="font-brand text-22 font-bold text-text-primary">
            Spacing (4px base)
          </h2>
          <div className="space-y-2">
            {[
              { step: "px", value: 1 },
              { step: "1", value: 4 },
              { step: "2", value: 8 },
              { step: "3", value: 12 },
              { step: "4", value: 16 },
              { step: "5", value: 20 },
              { step: "6", value: 24 },
              { step: "7", value: 28 },
              { step: "8", value: 32 },
              { step: "10", value: 40 },
              { step: "12", value: 48 },
              { step: "16", value: 64 },
            ].map(({ step, value }) => (
              <div key={step} className="flex items-center gap-3">
                <span className="w-8 text-right font-mono text-12 text-text-tertiary">
                  {step}
                </span>
                <div
                  className="h-3 rounded-xs bg-blue-200"
                  style={{ width: `${value}px` }}
                />
                <span className="font-mono text-11 text-text-tertiary">
                  {value}px
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Radius */}
        <section className="space-y-4">
          <h2 className="font-brand text-22 font-bold text-text-primary">
            Border Radius
          </h2>
          <div className="flex flex-wrap items-end gap-4">
            {[
              { name: "xs", value: "2px" },
              { name: "sm", value: "4px" },
              { name: "md", value: "8px" },
              { name: "lg", value: "12px" },
              { name: "xl", value: "16px" },
              { name: "2xl", value: "20px" },
              { name: "full", value: "9999px" },
            ].map(({ name, value }) => (
              <div key={name} className="space-y-1 text-center">
                <div
                  className="h-12 w-12 border-2 border-blue-300 bg-bg-accent"
                  style={{ borderRadius: value }}
                />
                <span className="block text-11 text-text-tertiary">{name}</span>
                <span className="block text-11 text-text-disabled">{value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

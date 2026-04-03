"use client"

import { useMemo, useRef } from "react"
import type { AriaAttributes } from "react"
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import type { InitialConfigType } from "@lexical/react/LexicalComposer"
import type { LexicalEditor } from "lexical"

import { ContentEditable } from "@/components/editor/editor-ui/content-editable"
import {
  markdownCompactTheme,
  markdownDescriptionTheme,
} from "@/components/markdown/markdown-theme"
import { markdownEditorNodes } from "@/components/markdown/lexical-nodes"
import {
  MarkdownLexicalPlugins,
  MarkdownOnChangePlugin,
  MarkdownSyncPlugin,
} from "@/components/markdown/markdown-plugins"

import { cn } from "@/lib/utils"

type MarkdownVariant = "field" | "plain"

type MarkdownTypography = "body" | "compact"

type MarkdownProps = {
  value: string
  readOnly?: boolean
  onMarkdownChange?: (markdown: string) => void
  onBlur?: () => void
  placeholder?: string
  variant?: MarkdownVariant
  typography?: MarkdownTypography
  className?: string
  "aria-invalid"?: AriaAttributes["aria-invalid"]
}

const FIELD_CONTENT_CLASS =
  "ContentEditable__root relative block min-h-[220px] w-full overflow-auto focus:outline-none"

const PLAIN_CONTENT_CLASS =
  "ContentEditable__root relative block w-full overflow-auto focus:outline-none focus-visible:outline-none"

const FIELD_PLACEHOLDER_CLASS =
  "text-muted-foreground pointer-events-none absolute top-0 left-0 overflow-hidden py-0.5 text-ellipsis select-none"

const PLAIN_PLACEHOLDER_CLASS =
  "text-muted-foreground pointer-events-none absolute top-0 left-0 overflow-hidden py-0.5 text-ellipsis select-none"

export function Markdown({
  value,
  readOnly = true,
  onMarkdownChange,
  onBlur,
  placeholder = "",
  variant = "plain",
  typography = "body",
  className,
  "aria-invalid": ariaInvalid,
}: MarkdownProps) {
  const syncRef = useRef<string | undefined>(undefined)
  const valueRef = useRef(value)

  const theme =
    typography === "compact" ? markdownCompactTheme : markdownDescriptionTheme

  const initialConfig = useMemo<InitialConfigType>(
    () => ({
      namespace: "Markdown",
      theme,
      nodes: markdownEditorNodes,
      editable: !readOnly,
      editorState: (editor: LexicalEditor) => {
        editor.update(() => {
          $convertFromMarkdownString(valueRef.current ?? "", TRANSFORMERS)
        })
      },
      onError: (error: Error) => {
        console.error(error)
      },
    }),
    [theme, readOnly],
  )

  const placeholderText = readOnly ? "" : placeholder

  return (
    <div
      onBlur={onBlur}
      aria-invalid={ariaInvalid}
      className={cn(
        variant === "field" &&
          !readOnly &&
          "flex min-h-16 w-full rounded-lg ring ring-inset ring-[#D9D9D9] bg-transparent px-2.5 py-2 text-base transition-colors focus-within:ring-1 focus-within:ring-accent focus-within:outline-2 focus-within:outline-[#188fff33] aria-invalid:ring-1 aria-invalid:ring-danger-foreground dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        variant === "plain" &&
          typography === "body" &&
          "text-base leading-[140%] font-normal",
        variant === "plain" &&
          typography === "compact" &&
          "text-xs font-normal leading-4 tracking-[0.4px]",
        className,
      )}
    >
      <LexicalComposer key={typography} initialConfig={initialConfig}>
        <MarkdownSyncPlugin value={value ?? ""} syncRef={syncRef} />
        {!readOnly ? (
          <MarkdownOnChangePlugin
            onMarkdownChange={onMarkdownChange}
            syncRef={syncRef}
          />
        ) : null}
        <RichTextPlugin
          contentEditable={
            <div className="relative min-w-0 flex-1">
              <div className="relative">
                <ContentEditable
                  placeholder={placeholderText}
                  className={
                    variant === "field" && !readOnly
                      ? FIELD_CONTENT_CLASS
                      : PLAIN_CONTENT_CLASS
                  }
                  placeholderClassName={
                    variant === "field" && !readOnly
                      ? FIELD_PLACEHOLDER_CLASS
                      : PLAIN_PLACEHOLDER_CLASS
                  }
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownLexicalPlugins editable={!readOnly} />
      </LexicalComposer>
    </div>
  )
}

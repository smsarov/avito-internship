"use client"

import type { MutableRefObject } from "react"
import { useEffect } from "react"
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { $getRoot } from "lexical"

type MarkdownSyncPluginProps = {
  value: string
  syncRef: MutableRefObject<string | undefined>
}

export function MarkdownSyncPlugin({ value, syncRef }: MarkdownSyncPluginProps) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (syncRef.current === undefined) {
      syncRef.current = value
      return
    }
    if (value === syncRef.current) return
    syncRef.current = value
    editor.update(() => {
      const root = $getRoot()
      root.clear()
      $convertFromMarkdownString(value, TRANSFORMERS)
    })
  }, [editor, value, syncRef])

  return null
}

type MarkdownOnChangePluginProps = {
  onMarkdownChange?: (markdown: string) => void
  syncRef: MutableRefObject<string | undefined>
}

export function MarkdownOnChangePlugin({
  onMarkdownChange,
  syncRef,
}: MarkdownOnChangePluginProps) {
  return (
    <OnChangePlugin
      ignoreSelectionChange={true}
      onChange={(editorState) => {
        editorState.read(() => {
          const md = $convertToMarkdownString(TRANSFORMERS)
          if (md === syncRef.current) return
          syncRef.current = md
          onMarkdownChange?.(md)
        })
      }}
    />
  )
}

type MarkdownLexicalPluginsProps = {
  editable: boolean
}

export function MarkdownLexicalPlugins({ editable }: MarkdownLexicalPluginsProps) {
  if (!editable) return null
  return (
    <>
      <ListPlugin />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
    </>
  )
}

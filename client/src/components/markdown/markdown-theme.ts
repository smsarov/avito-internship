import type { EditorThemeClasses } from "lexical"

import { editorTheme } from "@/components/editor/themes/editor-theme"

export const markdownDescriptionTheme: EditorThemeClasses = {
  ...editorTheme,
  paragraph:
    "text-base leading-[140%] font-normal [&:not(:first-child)]:mt-3",
  text: {
    ...editorTheme.text,
  },
}

export const markdownCompactTheme: EditorThemeClasses = {
  ...editorTheme,
  heading: {
    h1: "text-sm font-semibold tracking-tight [&:not(:first-child)]:mt-2",
    h2: "text-sm font-semibold border-b border-foreground/15 pb-1 tracking-tight first:mt-0 [&:not(:first-child)]:mt-2",
    h3: "text-xs font-semibold tracking-[0.4px] [&:not(:first-child)]:mt-2",
    h4: "text-xs font-semibold tracking-[0.4px] [&:not(:first-child)]:mt-1.5",
    h5: "text-xs font-semibold tracking-[0.4px] [&:not(:first-child)]:mt-1.5",
    h6: "text-xs font-semibold tracking-[0.4px] [&:not(:first-child)]:mt-1.5",
  },
  paragraph:
    "text-xs font-normal tracking-[0.4px] leading-4 [&:not(:first-child)]:mt-2",
  quote:
    "mt-2 border-l-2 border-foreground/20 pl-3 text-xs italic leading-4 [&:not(:first-child)]:mt-2",
  link: "text-xs text-blue-600 hover:underline hover:cursor-pointer",
  list: {
    ...editorTheme.list,
    ol: "m-0 p-0 list-decimal text-xs leading-4 [&>li]:mt-1",
    ul: "m-0 p-0 list-outside text-xs leading-4 [&>li]:mt-1",
  },
  text: {
    ...editorTheme.text,
    code: "rounded-sm bg-muted px-1 py-0.5 font-mono text-xs",
  },
  code: "EditorTheme__code !text-xs !leading-snug !py-1.5 !px-2 !pl-7",
}

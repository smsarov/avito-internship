import { CodeHighlightNode, CodeNode } from "@lexical/code-core"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import {
  LineBreakNode,
  ParagraphNode,
  TextNode,
  type Klass,
  type LexicalNode,
  type LexicalNodeReplacement,
} from "lexical"

export const markdownEditorNodes: ReadonlyArray<
  Klass<LexicalNode> | LexicalNodeReplacement
> = [
  HeadingNode,
  QuoteNode,
  ParagraphNode,
  TextNode,
  LineBreakNode,
  ListNode,
  ListItemNode,
  LinkNode,
  AutoLinkNode,
  CodeNode,
  CodeHighlightNode,
]

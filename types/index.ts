import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type BlockquoteElement = {
  type: 'block-quote'
  children: CustomText[]
}

// export type HeadingElement = {
//   type: 'heading'
//   level: number
//   children: CustomText[]
// }

// export type CustomElement = ParagraphElement | HeadingElement
export type CustomElement = ParagraphElement | BlockquoteElement

export type FormattedText = {
  text: string
  bold?: true
  italic?: true
  code?: true
}

export type CustomText = FormattedText

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}

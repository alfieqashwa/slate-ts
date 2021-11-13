import { Editor, Text, Transforms } from 'slate'
import { CustomEditor as ICustomEditor } from 'types/customTypes'

export const CustomEditor = {
  isBoldMarkActive(editor: ICustomEditor) {
    // @ts-ignore
    const [match] = Editor.nodes(editor, {
      // @ts-ignore
      match: (n) => n.bold === true,
      universal: true,
    })

    return !!match
  },

  isItalicMarkActive(editor: ICustomEditor) {
    // @ts-ignore
    const [match] = Editor.nodes(editor, {
      // @ts-ignore
      match: (n) => n.italic === true,
      universal: true,
    })

    return !!match
  },

  isUnderlineMarkActive(editor: ICustomEditor) {
    // @ts-ignore
    const [match] = Editor.nodes(editor, {
      // @ts-ignore
      match: (n) => n.underline === true,
      universal: true,
    })

    return !!match
  },

  isCodeBlockActive(editor: ICustomEditor) {
    // @ts-ignore
    const [match] = Editor.nodes(editor, {
      // @ts-ignore
      match: (n) => n.type === 'code',
    })

    return !!match
  },

  toggleBoldMark(editor: ICustomEditor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    )
  },

  toggleItalicMark(editor: ICustomEditor) {
    const isActive = CustomEditor.isItalicMarkActive(editor)
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    )
  },

  toggleUnderlineMark(editor: ICustomEditor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor)
    Transforms.setNodes(
      editor,
      { underline: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor: ICustomEditor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: (n) => Editor.isBlock(editor, n) }
    )
  },
}
